import type * as StackbitTypes from '@stackbit/types';
import type * as HygraphTypes from './gql-types/gql-management-types';
import { HygraphApiClient, HygraphEntry, HygraphAsset, HygraphWebhook } from './hygraph-api-client';
import { convertModels, SchemaContext, ModelContext, ModelWithContext } from './hygraph-schema-converter';
import { convertDocument, convertDocuments, DocumentContext, DocumentWithContext } from './hygraph-entries-converter';
import { convertAsset, convertAssets, AssetContext, AssetWithContext } from './hygraph-assets-converter';
import { convertOperations, convertUpdateOperationFields } from './hygraph-operation-converter';

interface HygraphContentSourceOptions {
    /**
     * Hygraph project ID. Can be found in project settings screen in Hygraph Studio.
     */
    projectId: string;
    /**
     * Hygraph project region. Can be found in project settings screen in Hygraph Studio.
     */
    region: string;
    /**
     * Hygraph project environment.
     * @default master
     */
    environment?: string;
    /**
     * Hygraph content API endpoint URL. Must match the configured region.
     * e.g.: https://{REGION}.cdn.hygraph.com/content/{...}/{ENVIRONMENT}
     */
    contentApi: string;
    /**
     * Hygraph management API endpoint URL. Must match the configured region.
     * e.g.: https://management-{REGION}.hygraph.com/graphql
     */
    managementApi: string;
    /**
     * The management token.
     */
    managementToken: string;
}

// TODO: implement filtering of models and entries by passing options to graphql queries
// TODO: implement caching

export class HygraphContentSource
    implements
        StackbitTypes.ContentSourceInterface<unknown, SchemaContext, DocumentContext, AssetContext, ModelContext>
{
    private projectId: string;
    private region: string;
    private environment: string;
    private contentApi: string;
    private managementApi: string;
    private managementToken: string;
    private client!: HygraphApiClient;
    private logger!: StackbitTypes.Logger;
    private userLogger!: StackbitTypes.Logger;
    private cache!: StackbitTypes.Cache<SchemaContext, DocumentContext, AssetContext, ModelContext>;
    private localDev!: boolean;

    constructor(options: HygraphContentSourceOptions) {
        this.projectId = options.projectId;
        this.region = options.region;
        this.environment = options.environment ?? 'master';
        this.contentApi = options.contentApi;
        this.managementApi = options.managementApi;
        this.managementToken = options.managementToken;
    }

    async getVersion(): Promise<StackbitTypes.Version> {
        return {
            interfaceVersion: '2.0.3',
            contentSourceVersion: '0.1.0'
        };
    }

    getContentSourceType(): string {
        return 'hygraph';
    }

    getProjectId(): string {
        return this.projectId;
    }

    getProjectEnvironment(): string {
        return this.environment;
    }

    getProjectManageUrl(): string {
        return `https://studio-${this.region.toLowerCase()}.hygraph.com/${this.projectId}/${this.environment}`;
    }
    async init(
        options: StackbitTypes.InitOptions<SchemaContext, DocumentContext, AssetContext, ModelContext>
    ): Promise<void> {
        this.logger = options.logger.createLogger({ label: 'hygraph-content-source' });
        this.userLogger = options.userLogger;
        this.cache = options.cache;
        this.localDev = options.localDev;
        this.logger.info('initializing...');

        this.client = new HygraphApiClient({
            projectId: this.projectId,
            environment: this.environment,
            contentApi: this.contentApi,
            managementApi: this.managementApi,
            managementToken: this.managementToken,
            logger: this.logger
        });

        if (this.localDev && !options.webhookUrl) {
            this.logger.info(
                'Detected local development without webhook URL' +
                    '\n  While developing locally, you can use webhooks to enable automatic content updates in the visual editor. ' +
                    '\n  First, install and start ngrok by typing "\x1b[32mngrok http 8090\x1b[0m" in a new terminal window. ' +
                    '\n  Ngrok will print a public url in the form of https://xyz.ngrok.app or https://xyz.ngrok.io' +
                    '\n  Restart "stackbit dev" with \x1b[32m--csi-webhook-url\x1b[0m argument. ' +
                    '\n  Set the \x1b[32m--csi-webhook-url\x1b[0m argument to your ngrok\'s public URL ending with the "/_stackbit/onWebhook" path. ' +
                    '\n  For example: "\x1b[32mstackbit dev --csi-webhook-url=https://REPLACE.ngrok.app/_stackbit/onWebhook\x1b[0m"\n'
            );
        } else {
            await this.createWebhookIfNeeded(options.webhookUrl);
        }
    }

    async reset(): Promise<void> {}
    async destroy(): Promise<void> {}

    async hasAccess(options: {
        userContext?: StackbitTypes.User | undefined;
    }): Promise<{ hasConnection: boolean; hasPermissions: boolean }> {
        // TODO: Once Hygraph adds OAuth capabilities,
        //  use userContext.accessToken to authorize user
        return { hasConnection: true, hasPermissions: true };
    }

    async getSchema(): Promise<StackbitTypes.Schema<SchemaContext, ModelContext>> {
        this.logger.debug('fetching schema');
        const schema = await this.client.getSchema();
        const models = convertModels({
            models: schema.models as HygraphTypes.Model[],
            enumerations: schema.enumerations,
            components: schema.components,
            logger: this.logger
        });
        return {
            models: models,
            locales: [],
            context: {
                assetModelId: schema.assetModelId,
                maxPaginationSize: schema.maxPaginationSize
            }
        };
    }

    async getDocuments(options?: { syncContext?: unknown } | undefined): Promise<DocumentWithContext[]> {
        this.logger.debug('fetching documents');
        const {
            models,
            context: { maxPaginationSize }
        } = this.cache.getSchema();
        const hygraphEntries = await this.client.getEntries({ models, maxPaginationSize });
        return convertDocuments({
            hygraphEntries,
            getModelByName: this.cache.getModelByName,
            baseManageUrl: this.getProjectManageUrl(),
            logger: this.logger
        });
    }

    async getAssets(): Promise<AssetWithContext[]> {
        this.logger.debug('fetching assets');
        const {
            context: { maxPaginationSize, assetModelId }
        } = this.cache.getSchema();
        const hygraphAssets = await this.client.getAssets({ maxPaginationSize });
        return convertAssets({
            hygraphAssets,
            assetModelId,
            baseManageUrl: this.getProjectManageUrl()
        });
    }

    async createWebhookIfNeeded(webhookUrl?: string): Promise<void> {
        if (!webhookUrl) {
            this.userLogger.warn('webhookURL is not set, the visual editor may not work properly!');
            return;
        }
        const result = await this.client.getWebhooks();
        const existingWebhook = result.webhooks.find((webhook) => webhook.url === webhookUrl);
        if (existingWebhook) {
            this.logger.info(`The provided webhook \x1b[32m${webhookUrl}\x1b[0m. already exists in Hygraph.`);
        } else {
            this.logger.info(
                `The provided webhook \x1b[32m${webhookUrl}\x1b[0m. does not exist in Hygraph. Creating a new webhook...`
            );
            const webhook = await this.client.createWebhook({
                url: webhookUrl,
                environmentId: result.environmentId
            });
            this.logger.info(`Created webhook, id: ${webhook.id}`);
        }
    }

    async onWebhook({ data, headers }: { data: HygraphWebhook; headers: Record<string, string> }): Promise<void> {
        const modelName = data.data.__typename;
        const isAsset = modelName === 'Asset';
        this.logger.debug(`got webhook request, ${modelName}:${data.operation}`);

        function isNewerVersion(
            hygraphItem: HygraphAsset | HygraphEntry,
            cachedItem?: StackbitTypes.Asset | StackbitTypes.Document
        ) {
            if (data.operation === 'create') {
                return true;
            }
            if (data.operation === 'update') {
                return !cachedItem || cachedItem.updatedAt < hygraphItem.updatedAt;
            }
            if (data.operation === 'publish') {
                const publishedItem = hygraphItem.documentInStages?.find((doc) => doc.stage === 'PUBLISHED');
                return publishedItem && publishedItem.updatedAt === hygraphItem.updatedAt;
            }
            if (data.operation === 'unpublish') {
                const publishedItem = hygraphItem.documentInStages?.find((doc) => doc.stage === 'PUBLISHED');
                return !publishedItem;
            }
        }

        switch (data.operation) {
            case 'create':
            case 'update':
            case 'publish':
            case 'unpublish': {
                if (isAsset) {
                    const cachedAsset = this.cache.getAssetById(data.data.id);
                    let hygraphAsset: HygraphAsset | undefined;
                    let tries = 0;
                    do {
                        if (tries > 0) {
                            this.logger.debug(
                                'onWebhook => received older asset from Hygraph, waiting 500ms and retrying'
                            );
                            await new Promise((resolve) => setTimeout(resolve, 500));
                        }
                        hygraphAsset = await this.client.getAssetById(data.data.id);
                        if (!hygraphAsset) {
                            return;
                        }
                    } while (!isNewerVersion(hygraphAsset, cachedAsset) && ++tries < 10);
                    if (!isNewerVersion(hygraphAsset, cachedAsset)) {
                        this.logger.warn(
                            `Could not fetch updated asset from Hygraph after receiving ${data.operation} webhook!`
                        );
                    }
                    const asset = convertAsset({
                        hygraphAsset,
                        assetModelId: this.cache.getSchema().context.assetModelId,
                        baseManageUrl: this.getProjectManageUrl()
                    });
                    this.cache.updateContent({
                        assets: [asset]
                    });
                } else {
                    const cachedDocument = this.cache.getDocumentById(data.data.id);
                    let hygraphEntry: HygraphEntry | undefined;
                    let tries = 0;
                    do {
                        if (tries > 0) {
                            this.logger.debug(
                                'onWebhook => received older entry from Hygraph, waiting 500ms and retrying'
                            );
                            await new Promise((resolve) => setTimeout(resolve, 500));
                        }
                        hygraphEntry = await this.client.getEntryById({
                            entryId: data.data.id,
                            modelName,
                            getModelByName: this.cache.getModelByName
                        });
                        if (!hygraphEntry) {
                            return;
                        }
                    } while (!isNewerVersion(hygraphEntry, cachedDocument) && ++tries < 10);
                    if (!isNewerVersion(hygraphEntry, cachedDocument)) {
                        this.logger.warn(
                            `Could not fetch updated entry from Hygraph after receiving ${data.operation} webhook!`
                        );
                    }
                    const document = convertDocument({
                        hygraphEntry,
                        getModelByName: this.cache.getModelByName,
                        baseManageUrl: this.getProjectManageUrl(),
                        logger: this.logger
                    });
                    if (!document) {
                        return;
                    }
                    this.cache.updateContent({
                        documents: [document]
                    });
                }
                break;
            }
            case 'delete': {
                if (isAsset) {
                    this.cache.updateContent({
                        deletedAssetIds: [data.data.id]
                    });
                } else {
                    this.cache.updateContent({
                        deletedDocumentIds: [data.data.id]
                    });
                }
                break;
            }
        }
    }

    async createDocument(options: {
        updateOperationFields: Record<string, StackbitTypes.UpdateOperationField>;
        model: ModelWithContext;
        locale?: string | undefined;
        defaultLocaleDocumentId?: string | undefined;
        userContext?: StackbitTypes.User | undefined;
    }): Promise<{ documentId: string }> {
        const data = convertUpdateOperationFields({
            updateOperationFields: options.updateOperationFields,
            model: options.model,
            getModelByName: this.cache.getModelByName,
            getModelNameForDocumentId: this._getModelNameForDocumentId.bind(this)
        });
        const result = await this.client.createEntry({
            modelName: options.model.name,
            data: data
        });
        return { documentId: result.id };
    }

    async updateDocument(options: {
        document: DocumentWithContext;
        operations: StackbitTypes.UpdateOperation[];
        userContext?: StackbitTypes.User | undefined;
    }): Promise<void> {
        const data = convertOperations({
            operations: options.operations,
            document: options.document,
            getModelByName: this.cache.getModelByName,
            getModelNameForDocumentId: this._getModelNameForDocumentId.bind(this)
        });
        await this.client.updateEntry({
            entryId: options.document.id,
            modelName: options.document.modelName,
            data: data
        });
    }

    async deleteDocument(options: {
        document: DocumentWithContext;
        userContext?: StackbitTypes.User | undefined;
    }): Promise<void> {
        await this.client.deleteEntry({
            entryId: options.document.id,
            modelName: options.document.modelName
        });
    }

    async uploadAsset(options: {
        url?: string | undefined;
        base64?: string | undefined;
        fileName: string;
        mimeType: string;
        locale?: string | undefined;
        userContext?: StackbitTypes.User | undefined;
    }): Promise<AssetWithContext> {
        const assetId = await this.client.uploadAsset({
            fileName: options.fileName,
            mimeType: options.mimeType,
            base64: options.base64,
            url: options.url
        });

        if (!assetId) {
            throw new Error('Error uploading asset');
        }

        let hygraphAsset: HygraphAsset | undefined;
        let tries = 0;
        do {
            if (tries > 0) {
                this.logger.debug('uploadAsset => asset is being created, waiting 500ms and retrying');
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
            hygraphAsset = await this.client.getAssetById(assetId);
            if (!hygraphAsset) {
                throw new Error('Error finding uploaded asset');
            }
        } while (hygraphAsset.upload.status === 'ASSET_CREATE_PENDING' && ++tries < 10);

        return convertAsset({
            hygraphAsset,
            assetModelId: this.cache.getSchema().context.assetModelId,
            baseManageUrl: this.getProjectManageUrl()
        });
    }

    updateAsset?(options: {
        asset: AssetWithContext;
        operations: StackbitTypes.UpdateOperation[];
        userContext?: StackbitTypes.User | undefined;
    }): Promise<void> {
        // TODO: implement update asset
        throw new Error('Method not implemented.');
    }

    async validateDocuments(options: {
        documents: DocumentWithContext[];
        assets: AssetWithContext[];
        locale?: string | undefined;
        userContext?: StackbitTypes.User | undefined;
    }): Promise<{ errors: StackbitTypes.ValidationError[] }> {
        return { errors: [] };
    }

    async publishDocuments(options: {
        documents: DocumentWithContext[];
        assets: AssetWithContext[];
        userContext?: StackbitTypes.User | undefined;
    }): Promise<void> {
        // TODO: optimize - batch publish by IDs
        for (const document of options.documents) {
            await this.client.publishEntry({
                entryId: document.id,
                modelName: document.modelName
            });
        }
    }

    async unpublishDocuments?(options: {
        documents: DocumentWithContext[];
        assets: AssetWithContext[];
        userContext?: StackbitTypes.User | undefined;
    }): Promise<void> {
        // TODO: optimize - batch publish by IDs
        for (const document of options.documents) {
            await this.client.unpublishEntry({
                entryId: document.id,
                modelName: document.modelName
            });
        }
    }

    /*
     * Hygraph does not support archiving/unatchiving documents.
     * When it does, implement the following methods to enable this capability in Netlify visual editor.
     *
    archiveDocument?(options: { document: DocumentWithContext; userContext?: StackbitTypes.User | undefined; }): Promise<void> {
        throw new Error('Method not implemented.');
    }

    unarchiveDocument?(options: { document: DocumentWithContext; userContext?: StackbitTypes.User | undefined; }): Promise<void> {
        throw new Error('Method not implemented.');
    }
    */

    /*
     * Hygraph does support scheduled publishing.
     * TODO: Implement the following methods

    getScheduledActions?(): Promise<ScheduledAction[]> {
        throw new Error('Method not implemented.');
    }

    createScheduledAction?(options: { name: string; action: ScheduledActionActionType; documentIds: string[]; executeAt: string; userContext?: StackbitTypes.User | undefined; }): Promise<{ newScheduledActionId: string; }> {
        throw new Error('Method not implemented.');
    }

    cancelScheduledAction?(options: { scheduledActionId: string; userContext?: StackbitTypes.User | undefined; }): Promise<{ cancelledScheduledActionId: string; }> {
        throw new Error('Method not implemented.');
    }

    updateScheduledAction?(options: { scheduledActionId: string; name?: string | undefined; documentIds?: string[] | undefined; executeAt?: string | undefined; userContext?: StackbitTypes.User | undefined; }): Promise<{ updatedScheduledActionId: string; }> {
        throw new Error('Method not implemented.');
    }
    */

    /*
     * Hygraph does support document versioning.
     * TODO: Implement the following methods
    getDocumentVersions?(options: { documentId: string; }): Promise<{ versions: DocumentVersion[]; }> {
        throw new Error('Method not implemented.');
    }

    getDocumentForVersion?(options: { documentId: string; versionId: string; }): Promise<{ version: DocumentVersionWithDocument; }> {
        throw new Error('Method not implemented.');
    }
    */

    _getModelNameForDocumentId(documentId: string) {
        const document = this.cache.getDocumentById(documentId);
        return document?.modelName;
    }
}

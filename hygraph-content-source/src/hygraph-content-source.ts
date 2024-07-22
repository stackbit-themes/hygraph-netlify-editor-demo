import type * as StackbitTypes from '@stackbit/types';
import type * as HygraphTypes from './gql-types';
import { HygraphApiClient, HygraphWebhook } from './hygraph-api-client';
import { convertModels, SchemaContext, ModelContext } from './hygraph-schema-converter';
import { convertDocument, convertDocuments, DocumentContext, DocumentWithContext } from './hygraph-document-converter';
import { convertAssets, AssetContext, AssetWithContext, convertAsset } from './hygraph-asset-converter';
import { convertOperations } from './hygraph-operation-converter';

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
        return `https://app-${this.region.toLowerCase()}.hygraph.com/${this.projectId}/master`;
    }
    async init(
        options: StackbitTypes.InitOptions<SchemaContext, DocumentContext, AssetContext, ModelContext>
    ): Promise<void> {
        this.logger = options.logger.createLogger({ label: 'hygraph-content-source' });
        this.cache = options.cache;
        this.localDev = options.localDev;
        this.logger.info('initializing...');
        if (this.localDev) {
            if (!options.webhookUrl) {
                this.logger.info(
                    'While developing locally, you can use webhooks to enable automatic ' +
                        'content updated in the visual editor. First, start ngrok by typing "\x1b[32mngrok http 8090\x1b[0m" ' +
                        'in a new terminal window. Ngrok will print a public url starting with https://... ' +
                        'Use it to restart "stackbit dev", this time provide --csi-webhook-url argument ' +
                        'by appending the "/_stackbit/onWebhook" to the ngrok\'s public URL. For example: ' +
                        '"\x1b[32mstackbit dev --csi-webhook-url=https://REPLACE.ngrok.app/_stackbit/onWebhook\x1b[0m"'
                );
            } else {
                this.logger.info(
                    `The webhook is \x1b[32m${options.webhookUrl}\x1b[0m. ` +
                        'Add this webhook to your Hygraph project. ' +
                        'In webhook\'s configuration, set the method to POST, and check the "Include payload" option.'
                );
            }
        }

        this.client = new HygraphApiClient({
            projectId: this.projectId,
            environment: this.environment,
            contentApi: this.contentApi,
            managementApi: this.managementApi,
            managementToken: this.managementToken,
            logger: this.logger
        });
    }

    async reset(): Promise<void> {}
    async destroy(): Promise<void> {}

    async hasAccess(options: {
        userContext?: StackbitTypes.User | undefined;
    }): Promise<{ hasConnection: boolean; hasPermissions: boolean }> {
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
            context: null
        };
    }

    async getDocuments(options?: { syncContext?: unknown } | undefined): Promise<DocumentWithContext[]> {
        this.logger.debug('fetching documents');
        const hygraphDocuments = await this.client.getDocuments(this.cache.getSchema().models);
        return convertDocuments({
            hygraphDocuments,
            // TODO: generate URL to the document using documentId and other properties available in this content source.
            manageUrl: (documentId) => `https://sutdio-${this.region.toLowerCase()}.hygraph.com`,
            getModelByName: this.cache.getModelByName,
            logger: this.logger
        });
    }

    async getAssets(): Promise<AssetWithContext[]> {
        this.logger.debug('fetching assets');
        const hygraphAssets = await this.client.getAssets();
        return convertAssets({
            hygraphAssets,
            // TODO: generate URL to the asset using assetId and other properties available in this content source.
            manageUrl: (assetId) => `https://sutdio-${this.region.toLowerCase()}.hygraph.com`
        });
    }

    async onWebhook({ data, headers }: { data: HygraphWebhook; headers: Record<string, string> }): Promise<void> {
        const modelName = data.data.__typename;
        const isAsset = modelName === 'Asset';
        this.logger.debug(`got webhook request, ${modelName}:${data.operation}`);
        switch (data.operation) {
            case 'create':
            case 'update':
            case 'publish':
            case 'unpublish': {
                if (isAsset) {
                    const hygraphAsset = await this.client.getAssetById(data.data.id);
                    if (!hygraphAsset) {
                        return;
                    }
                    const asset = convertAsset({
                        hygraphAsset,
                        // TODO: generate URL to the asset using assetId and other properties available in this content source.
                        manageUrl: (assetId) => `https://sutdio-${this.region.toLowerCase()}.hygraph.com`
                    });
                    this.cache.updateContent({
                        assets: [asset]
                    });
                } else {
                    const hygraphDocument = await this.client.getDocumentById({
                        documentId: data.data.id,
                        modelName,
                        getModelByName: this.cache.getModelByName
                    });
                    if (!hygraphDocument) {
                        return;
                    }
                    const document = convertDocument({
                        hygraphDocument,
                        manageUrl: (documentId) => `https://sutdio-${this.region.toLowerCase()}.hygraph.com`,
                        getModelByName: this.cache.getModelByName,
                        logger: this.logger
                    });
                    if (!document) {
                        return;
                    }
                    this.cache.updateContent({
                        documents: [document]
                    });
                }
            }
            case 'delete': {
                if (isAsset) {
                    this.cache.updateContent({
                        deletedDocumentIds: [data.data.id]
                    });
                } else {
                    this.cache.updateContent({
                        deletedAssetIds: [data.data.id]
                    });
                }
            }
        }
    }

    createDocument(options: {
        updateOperationFields: Record<string, StackbitTypes.UpdateOperationField>;
        model: StackbitTypes.Model<unknown>;
        locale?: string | undefined;
        defaultLocaleDocumentId?: string | undefined;
        userContext?: StackbitTypes.User | undefined;
    }): Promise<{ documentId: string }> {
        throw new Error('Method not implemented.');
    }

    async updateDocument(options: {
        document: DocumentWithContext;
        operations: StackbitTypes.UpdateOperation[];
        userContext?: StackbitTypes.User | undefined;
    }): Promise<void> {
        const data = convertOperations({ operations: options.operations });
        await this.client.updateDocument({
            documentId: options.document.id,
            modelName: options.document.modelName,
            data: data
        });
    }

    deleteDocument(options: {
        document: DocumentWithContext;
        userContext?: StackbitTypes.User | undefined;
    }): Promise<void> {
        throw new Error('Method not implemented.');
    }

    // archiveDocument?(options: { document: DocumentWithContext; userContext?: StackbitTypes.User | undefined; }): Promise<void> {
    //     throw new Error('Method not implemented.');
    // }

    // unarchiveDocument?(options: { document: DocumentWithContext; userContext?: StackbitTypes.User | undefined; }): Promise<void> {
    //     throw new Error('Method not implemented.');
    // }

    // getScheduledActions?(): Promise<ScheduledAction[]> {
    //     throw new Error('Method not implemented.');
    // }

    // createScheduledAction?(options: { name: string; action: ScheduledActionActionType; documentIds: string[]; executeAt: string; userContext?: StackbitTypes.User | undefined; }): Promise<{ newScheduledActionId: string; }> {
    //     throw new Error('Method not implemented.');
    // }

    // cancelScheduledAction?(options: { scheduledActionId: string; userContext?: StackbitTypes.User | undefined; }): Promise<{ cancelledScheduledActionId: string; }> {
    //     throw new Error('Method not implemented.');
    // }

    // updateScheduledAction?(options: { scheduledActionId: string; name?: string | undefined; documentIds?: string[] | undefined; executeAt?: string | undefined; userContext?: StackbitTypes.User | undefined; }): Promise<{ updatedScheduledActionId: string; }> {
    //     throw new Error('Method not implemented.');
    // }

    uploadAsset(options: {
        url?: string | undefined;
        base64?: string | undefined;
        fileName: string;
        mimeType: string;
        locale?: string | undefined;
        userContext?: StackbitTypes.User | undefined;
    }): Promise<AssetWithContext> {
        throw new Error('Method not implemented.');
    }

    updateAsset?(options: {
        asset: AssetWithContext;
        operations: StackbitTypes.UpdateOperation[];
        userContext?: StackbitTypes.User | undefined;
    }): Promise<void> {
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
            await this.client.publishDocument({
                documentId: document.id,
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
            await this.client.unpublishDocument({
                documentId: document.id,
                modelName: document.modelName
            });
        }
    }

    // getDocumentVersions?(options: { documentId: string; }): Promise<{ versions: DocumentVersion[]; }> {
    //     throw new Error('Method not implemented.');
    // }

    // getDocumentForVersion?(options: { documentId: string; versionId: string; }): Promise<{ version: DocumentVersionWithDocument; }> {
    //     throw new Error('Method not implemented.');
    // }
}

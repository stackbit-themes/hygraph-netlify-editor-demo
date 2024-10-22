import type * as StackbitTypes from '@stackbit/types';
import type * as HygraphTypes from './gql-types';
import { HygraphApiClient, HygraphEntry, HygraphWebhook } from './hygraph-api-client';
import { convertModels, SchemaContext, ModelContext, ModelWithContext } from './hygraph-schema-converter';
import { convertDocument, convertDocuments, DocumentContext, DocumentWithContext } from './hygraph-entries-converter';
import { convertAssets, AssetContext, AssetWithContext, convertAsset } from './hygraph-assets-converter';
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

export class HygraphContentSource
    implements
    StackbitTypes.ContentSourceInterface<unknown, SchemaContext, DocumentContext, AssetContext, ModelContext> {
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

    async reset(): Promise<void> { }
    async destroy(): Promise<void> { }

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
            context: {
                assetModelId: schema.assetModelId,
            }
        };
    }

    async getDocuments(options?: { syncContext?: unknown } | undefined): Promise<DocumentWithContext[]> {
        this.logger.debug('fetching documents');
        const { models } = this.cache.getSchema();

        const modelIdByNameMapping = models.reduce((acc, model) => {
            acc[model.name] = model.context!.internalId;
            return acc;
        }, {} as Record<string, string>);

        const hygraphEntries = await this.client.getEntries(models);
        return convertDocuments({
            hygraphEntries,
            manageUrl: (documentId, modelName) => {
                const modelId = modelIdByNameMapping[modelName];
                return `https://studio-${this.region.toLowerCase()}.hygraph.com/${this.getProjectId()}/${this.getProjectEnvironment()}/content/${modelId}/entry/${documentId}`;
            },
            getModelByName: this.cache.getModelByName,
            logger: this.logger
        });
    }

    async getAssets(): Promise<AssetWithContext[]> {
        this.logger.debug('fetching assets');
        const hygraphAssets = await this.client.getAssets();
        const { assetModelId } = this.cache.getSchema().context;

        return convertAssets({
            hygraphAssets,
            manageUrl: (assetId) => `https://studio-${this.region.toLowerCase()}.hygraph.com/${this.getProjectId()}/${this.getProjectEnvironment()}/assets/${assetModelId}/entry/${assetId}`,
        });
    }

    async onWebhook({ data, headers }: { data: HygraphWebhook; headers: Record<string, string> }): Promise<void> {
        const modelName = data.data.__typename;
        const isAsset = modelName === 'Asset';
        this.logger.info(`got webhook request, ${modelName}:${data.operation}`);
        this.logger.info(`Webhook Data, ${JSON.stringify(data.data, null, 2)}`);
        switch (data.operation) {
            case 'create':
            case 'update': {
                if (isAsset) {
                    const hygraphAsset = await this.client.getAssetById(data.data.id);
                    if (!hygraphAsset) {
                        return;
                    }
                    const asset = convertAsset({
                        hygraphAsset,
                        manageUrl: (assetId) => {
                            const { assetModelId } = this.cache.getSchema().context;
                            return `https://studio-${this.region.toLowerCase()}.hygraph.com/${this.getProjectId()}/${this.getProjectEnvironment()}/assets/${assetModelId}/entry/${assetId}`;
                        }
                    });
                    this.cache.updateContent({
                        assets: [asset]
                    });
                } else {
                    const document = convertDocument({
                        hygraphEntry: data.data as HygraphEntry,
                        manageUrl: (documentId, modelName) => {
                            const { models } = this.cache.getSchema();
                            const modelId = models.find(model => model.name === modelName)?.context?.internalId;
                            return `https://studio-${this.region.toLowerCase()}.hygraph.com/${this.getProjectId()}/${this.getProjectEnvironment()}/content/${modelId}/entry/${documentId}`;
                        },
                        getModelByName: this.cache.getModelByName,
                        logger: this.logger
                    });

                    if (!document) {
                        return;
                    }

                    const cachedDoc = this.cache.getDocumentById(data.data.id);
                    document.status = cachedDoc?.status ?? document.status;

                    this.cache.updateContent({
                        documents: [document],
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
            case 'publish': {
                if (isAsset) {
                    const asset = this.cache.getAssetById(data.data.id);
                    if (asset) {
                        asset.status = 'published';
                        this.cache.updateContent({
                            assets: [asset]
                        });
                    }
                } else {
                    const document = this.cache.getDocumentById(data.data.id);
                    if (document) {
                        document.status = 'published';
                        this.cache.updateContent({
                            documents: [document]
                        });
                    }
                }

                break;
            }
            case 'unpublish': {
                if (isAsset) {
                    const asset = this.cache.getAssetById(data.data.id);
                    if (asset) {
                        asset.status = 'added';
                        this.cache.updateContent({
                            assets: [asset]
                        });
                    }
                } else {
                    const document = this.cache.getDocumentById(data.data.id);
                    if (document) {
                        document.status = 'added';
                        this.cache.updateContent({
                            documents: [document]
                        });
                    }
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
            getModelByName: this.cache.getModelByName
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
            getModelByName: this.cache.getModelByName
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

    async uploadAsset(options: {
        url?: string | undefined;
        base64?: string | undefined;
        fileName: string;
        mimeType: string;
        locale?: string | undefined;
        userContext?: StackbitTypes.User | undefined;
    }): Promise<AssetWithContext> {
        const assetId = await this.client.uploadAsset({
            base64: options.base64!,
            fileName: options.fileName,
            mimeType: options.mimeType,
        });

        if (!assetId) {
            throw new Error('Error uploading asset');
        }

        const hygraphAsset = await this.client.getAssetById(assetId);

        if (!hygraphAsset) {
            throw new Error('Error finding uploaded asset');
        }

        return convertAsset({
            hygraphAsset,
            manageUrl: (assetId) => {
                const { assetModelId } = this.cache.getSchema().context;
                return `https://studio-${this.region.toLowerCase()}.hygraph.com/${this.getProjectId()}/${this.getProjectEnvironment()}/assets/${assetModelId}/entry/${assetId}`;
            }
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

    // getDocumentVersions?(options: { documentId: string; }): Promise<{ versions: DocumentVersion[]; }> {
    //     throw new Error('Method not implemented.');
    // }

    // getDocumentForVersion?(options: { documentId: string; versionId: string; }): Promise<{ version: DocumentVersionWithDocument; }> {
    //     throw new Error('Method not implemented.');
    // }
}

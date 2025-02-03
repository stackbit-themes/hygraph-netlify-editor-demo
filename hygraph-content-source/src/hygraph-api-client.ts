import _ from 'lodash';
import type * as StackbitTypes from '@stackbit/types';
import { deepMap } from '@stackbit/utils';
import { GraphQLClient } from 'graphql-request';
import type * as HygraphTypes from './gql-types/gql-management-types';
import {
    Asset,
    AssetUpload,
    PageInfo,
    Stage,
    Maybe,
    ScheduledOperation,
    Version,
    UserKind
} from './gql-types/gql-content-types';
import type { ModelWithContext } from './hygraph-schema-converter';
import { getSchema } from './gql-queries/schema';
import { createWebhook, getWebhooks, updateWebhook } from './gql-queries/webhooks';
import {
    getAssets,
    getAssetById,
    createAssetWithURL,
    createAssetWithPostData,
    publishAssets,
    unpublishAssets
} from './gql-queries/assets';

// The generated graphql types in the "gql-management-types.ts" file include the original field properties.
// However, some fields in the "schema.ts" query were aliased due to conflicts between types.
// Remap some of the field names matching aliases in the query.
type AliasedHygraphField =
    | (Omit<HygraphTypes.SimpleField, 'type' | 'validations'> & {
          type_simple: HygraphTypes.SimpleField['type'];
          validations?:
              | Exclude<HygraphTypes.SimpleFieldValidations, HygraphTypes.FloatFieldValidations>
              | (Omit<HygraphTypes.FloatFieldValidations, 'range'> & {
                    range_float?: HygraphTypes.FloatFieldValidations['range'];
                });
      })
    | (Omit<HygraphTypes.EnumerableField, 'type' | 'initialValue'> & {
          type_enum: HygraphTypes.EnumerableFieldType;
          initialValue_enum?: HygraphTypes.EnumerableField['initialValue'];
      })
    | (Omit<HygraphTypes.ComponentField, 'type'> & {
          type_component: HygraphTypes.ComponentField['type'];
      })
    | (Omit<HygraphTypes.ComponentUnionField, 'type'> & {
          type_componentUnion: HygraphTypes.ComponentUnionField['type'];
      })
    | (Omit<HygraphTypes.RelationalField, 'type'> & {
          type_relation: HygraphTypes.RelationalFieldType;
      })
    | (Omit<HygraphTypes.UniDirectionalRelationalField, 'type'> & {
          type_relation: HygraphTypes.RelationalFieldType;
      })
    | (Omit<HygraphTypes.UnionField, 'type'> & {
          type_union: HygraphTypes.UnionField['type'];
      })
    | (Omit<HygraphTypes.RemoteField, 'type'> & {
          type_remote: HygraphTypes.RemoteField['type'];
      });

export type HygraphField =
    | HygraphTypes.SimpleField
    | HygraphTypes.EnumerableField
    | HygraphTypes.ComponentField
    | HygraphTypes.ComponentUnionField
    | HygraphTypes.RelationalField
    | HygraphTypes.UniDirectionalRelationalField
    | HygraphTypes.UnionField
    | HygraphTypes.RemoteField;

export type HygraphEntryConnectionResult = Record<
    string,
    {
        edges: { node: HygraphEntry }[];
        pageInfo: Pick<PageInfo, 'hasNextPage' | 'pageSize'>;
    }
>;

export type HygraphEntry = {
    __typename: string;
    id: string;
    createdAt: string;
    createdBy?: HygraphUser;
    updatedAt: string;
    updatedBy?: HygraphUser;
    publishedAt: string | null;
    publishedBy: HygraphUser | null;
    stage: Stage;
    documentInStages: {
        stage: Stage;
        updatedAt: string;
    }[];
    scheduledIn?: ScheduledOperation[];
    history?: Version[];
    [key: string]: any;
};

export type HygraphAsset = Pick<
    Asset,
    | 'id'
    | 'createdAt'
    | 'createdBy'
    | 'updatedAt'
    | 'updatedBy'
    | 'stage'
    | 'url'
    | 'fileName'
    | 'handle'
    | 'mimeType'
    | 'size'
    | 'width'
    | 'height'
> & {
    __typename: 'Asset';
    documentInStages: Pick<Asset, 'stage' | 'updatedAt'>[];
    upload?: Maybe<Pick<AssetUpload, 'status'>>;
};

export type GetWebhooksResult = {
    viewer: {
        project?: {
            environment: {
                id: string;
                webhooks: Pick<HygraphTypes.Webhook, '__typename' | 'id' | 'name' | 'url' | 'isActive'>[];
            };
        };
    };
};

export type CreateWebhookResponse = {
    createWebhook: {
        createdWebhook: Pick<HygraphTypes.Webhook, '__typename' | 'id' | 'name' | 'url' | 'isActive'>;
    };
};

export type UpdateWebhookResponse = {
    updateWebhook: {
        updatedWebhook: Pick<HygraphTypes.Webhook, '__typename' | 'id' | 'name' | 'url' | 'isActive'>;
    };
};

export type HygraphWebhookPayload = {
    operation: 'create' | 'update' | 'publish' | 'unpublish' | 'delete';
    data: HygraphEntry | HygraphAsset;
};

export type HygraphUser = {
    id: string;
    name: string;
    kind: UserKind;
};

export interface HygraphApiClientOptions {
    projectId: string;
    environment: string;
    contentApi: string;
    managementApi: string;
    managementToken: string;
    logger: StackbitTypes.Logger;
}

export interface HygraphAssetUploadOptions {
    fileName: string;
    mimeType: string;
    base64?: string;
    url?: string;
}

export interface HygraphCreateAssetWithURLResponse {
    id: string;
    url: string;
    upload: {
        status: string;
        error: {
            code: string;
            message: string;
        };
    };
}

export interface HygraphCreateAssetWithPostDataResponse {
    id: string;
    url: string;
    upload: {
        status: string;
        expiresAt: string;
        error: {
            code: string;
            message: string;
        };
        requestPostData: {
            url: string;
            date: string;
            key: string;
            signature: string;
            algorithm: string;
            policy: string;
            credential: string;
            securityToken: string;
        };
    };
}

export class HygraphApiClient {
    private contentClient: GraphQLClient;
    private managementClient: GraphQLClient;
    private projectId: string;
    private environment: string;
    private logger: StackbitTypes.Logger;
    private debugGraphQLQueries: boolean;

    constructor(options: HygraphApiClientOptions) {
        this.projectId = options.projectId;
        this.environment = options.environment;
        this.logger = options.logger;
        this.debugGraphQLQueries = false;

        let contentApi = options.contentApi;
        // Replace "High performance endpoint" with "Regular read & write endpoint".
        // This is to get read-after-write consistency. https://hygraph.com/docs/api-reference/basics/caching
        const match = contentApi.match(
            /https:\/\/(?<region>[\w-]+)\.cdn.hygraph.com\/content\/(?<hash>\w+)\/(?<environment>[\w-]+)/
        );
        if (match) {
            contentApi = `https://api-${match.groups?.region}.hygraph.com/v2/${match.groups?.hash}/${match.groups?.environment}`;
            this.logger.info(
                `Replaced High performance endpoint '${options.contentApi}' with Regular read & write endpoint '${contentApi}' to ensure read-after-write consistency (https://hygraph.com/docs/api-reference/basics/caching)`
            );
        }

        this.contentClient = new GraphQLClient(contentApi, {
            headers: {
                Authorization: `Bearer ${options.managementToken}`
            }
        });
        this.managementClient = new GraphQLClient(options.managementApi, {
            headers: {
                Authorization: `Bearer ${options.managementToken}`
            }
        });
    }

    async getSchema() {
        const result = await this.managementClient.request<HygraphTypes.Query>(getSchema, {
            projectId: this.projectId,
            environmentName: this.environment
        });

        const environment = result.viewer.project?.environment;
        if (environment) {
            const { models, components, ...rest } = environment.contentModel;
            environment.contentModel = {
                ...rest,
                models: models.map((model) => removeSchemaAliases(model)),
                components: components.map((component) => removeSchemaAliases(component))
            };
        }

        return {
            models: environment?.contentModel.models ?? [],
            components: environment?.contentModel.components ?? [],
            enumerations: environment?.contentModel.enumerations ?? [],
            assetModelId: environment?.contentModel.assetModel.id ?? null,
            maxPaginationSize: result.viewer.project?.maxPaginationSize ?? 100
        };
    }

    async getWebhooks() {
        const result = await this.managementClient.request<GetWebhooksResult>(getWebhooks, {
            projectId: this.projectId,
            environmentName: this.environment
        });
        return {
            environmentId: result.viewer.project?.environment.id!,
            webhooks: result.viewer.project?.environment.webhooks ?? []
        };
    }

    async createWebhook({ url, environmentId }: { url: string; environmentId: string }) {
        const result = await this.managementClient.request<CreateWebhookResponse>(createWebhook, {
            environmentId: environmentId,
            url: url
        });
        return result.createWebhook.createdWebhook;
    }

    async updateWebhook({ webhookId }: { webhookId: string }) {
        const result = await this.managementClient.request<UpdateWebhookResponse>(updateWebhook, {
            webhookId: webhookId
        });
        return result.updateWebhook.updatedWebhook;
    }

    async getEntries({
        models,
        maxPaginationSize,
        entriesFilter
    }: {
        models: ModelWithContext[];
        maxPaginationSize?: number;
        entriesFilter?: Record<string, string>;
    }): Promise<HygraphEntry[]> {
        const queryAst: any = { query: {} };
        const dataModels = models.filter((model) => model.type === 'data');
        const modelsByName = _.keyBy(models, 'name');
        maxPaginationSize = maxPaginationSize ?? 100;

        for (const model of dataModels) {
            const queryModelName = toLowerCaseFirst(model.context!.pluralId) + 'Connection';
            queryAst.query[queryModelName] = {
                __arguments: {
                    stage: wrapEnumValue('DRAFT'),
                    first: maxPaginationSize,
                    skip: 0,
                    ...(entriesFilter?.[model.name] ? { where: { __raw: entriesFilter[model.name] } } : null)
                },
                edges: {
                    node: {
                        ...defaultDocumentQueryFields({
                            model,
                            getModelByName: (modelName: string) => modelsByName[modelName],
                            logger: this.logger
                        })
                    }
                },
                pageInfo: {
                    hasNextPage: 1,
                    pageSize: 1
                }
            };
        }

        const result: HygraphEntry[] = [];
        let query;
        try {
            let hasNextPage: boolean;
            do {
                query = convertASTToQuery(queryAst);
                if (this.debugGraphQLQueries) {
                    this.logger.debug(query);
                }
                query = removeNewLinesAndCollapseSpaces(query);
                const queryResult = await this.contentClient.request<HygraphEntryConnectionResult>(query);
                const typesWithNextPage: string[] = [];

                for (const [queryModelName, modelResult] of Object.entries(queryResult)) {
                    const hygraphEntries = modelResult.edges.map((edge) => removeAliasFieldNames(edge.node));
                    result.push(...hygraphEntries);
                    if (modelResult.pageInfo.hasNextPage) {
                        typesWithNextPage.push(queryModelName);
                        queryAst.query[queryModelName].__arguments.skip +=
                            modelResult.pageInfo.pageSize ?? maxPaginationSize;
                    }
                }

                queryAst.query = _.pick(queryAst.query, typesWithNextPage);
                hasNextPage = typesWithNextPage.length > 0;
            } while (hasNextPage);

            return result;
        } catch (error: any) {
            this.logger.warn(`Error fetching entries:\n${error.toString()}\nQuery:\n${query}`);
            return [];
        }
    }

    async getEntryById({
        entryId,
        modelName,
        getModelByName
    }: {
        entryId: string;
        modelName: string;
        getModelByName: (modelName: string) => ModelWithContext | undefined;
    }): Promise<HygraphEntry | undefined> {
        const model = getModelByName(modelName);
        if (!model) {
            return undefined;
        }
        const queryModelName = toLowerCaseFirst(model.name);
        const queryAst = {
            query: {
                [queryModelName]: {
                    __arguments: {
                        stage: wrapEnumValue('DRAFT'),
                        where: { id: entryId }
                    },
                    ...defaultDocumentQueryFields({
                        model,
                        getModelByName,
                        logger: this.logger
                    })
                }
            }
        };
        let query = convertASTToQuery(queryAst);
        if (this.debugGraphQLQueries) {
            this.logger.debug(query);
        }
        query = removeNewLinesAndCollapseSpaces(query);
        try {
            const result = await this.contentClient.request<Record<string, HygraphEntry>>(query);
            return removeAliasFieldNames(result[queryModelName]);
        } catch (error: any) {
            this.logger.warn(`Error fetching entry by id:\n${error.toString()}\nQuery:\n${query}`);
            return undefined;
        }
    }

    async createEntry({ modelName, data }: { modelName: string; data: Record<string, any> }): Promise<{ id: string }> {
        const createModelName = `create${modelName}`;
        const queryAst: any = {
            mutation: {
                [createModelName]: {
                    __arguments: {
                        data: data
                    },
                    id: 1
                }
            }
        };
        let query = convertASTToQuery(queryAst);
        query = removeNewLinesAndCollapseSpaces(query);
        try {
            this.logger.debug(`Create entry: ${query}`);
            const result = await this.contentClient.request<Record<string, { id: string }>>(query);
            const entry = result[createModelName];
            if (!entry) {
                throw new Error(`Error creating an entry`);
            }
            this.logger.debug(`Successfully created entry ${entry.id}`);
            return entry;
        } catch (error: any) {
            this.logger.warn(`Error creating entry:\n${error.toString()}\nQuery:\n${query}`);
            throw new Error(`Error creating an entry ${error.message}`);
        }
    }

    async updateEntry({
        entryId,
        modelName,
        data
    }: {
        entryId: string;
        modelName: string;
        data: Record<string, any>;
    }): Promise<void> {
        const updateModelName = `update${modelName}`;
        const queryAst: any = {
            mutation: {
                [updateModelName]: {
                    __arguments: {
                        where: { id: entryId },
                        data: data
                    },
                    id: 1
                }
            }
        };
        let query = convertASTToQuery(queryAst);
        query = removeNewLinesAndCollapseSpaces(query);
        try {
            this.logger.debug(`Update entry ${entryId}: ${query}`);
            await this.contentClient.request(query);
            this.logger.debug(`Successfully updated entry ${entryId}`);
        } catch (error: any) {
            this.logger.warn(`Error updating entry:\n${error.toString()}\nQuery:\n${query}`);
            throw new Error(`Error updating an entry ${entryId}: ${error.message}`);
        }
    }

    async deleteEntry({ entryId, modelName }: { entryId: string; modelName: string }): Promise<void> {
        const deleteModelName = `delete${modelName}`;
        const queryAst: any = {
            mutation: {
                [deleteModelName]: {
                    __arguments: {
                        where: { id: entryId }
                    },
                    id: 1
                }
            }
        };
        let query = convertASTToQuery(queryAst);
        query = removeNewLinesAndCollapseSpaces(query);
        try {
            this.logger.debug(`Delete entry ${entryId}: ${query}`);
            await this.contentClient.request(query);
            this.logger.debug(`Successfully deleted entry ${entryId}`);
        } catch (error: any) {
            this.logger.warn(`Error deleting entry:\n${error.toString()}\nQuery:\n${query}`);
            throw new Error(`Error deleting an entry ${entryId}: ${error.message}`);
        }
    }

    async publishEntry({ entryId, modelName }: { entryId: string; modelName: string }): Promise<void> {
        const publishModelName = `publish${modelName}`;
        const queryAst: any = {
            mutation: {
                [publishModelName]: {
                    __arguments: {
                        where: { id: entryId },
                        to: wrapEnumValue('PUBLISHED')
                    },
                    id: 1
                }
            }
        };
        let query = convertASTToQuery(queryAst);
        query = removeNewLinesAndCollapseSpaces(query);
        try {
            this.logger.debug(`Publish entry ${entryId}: ${query}`);
            await this.contentClient.request(query);
            this.logger.debug(`Successfully published entry ${entryId}`);
        } catch (error: any) {
            this.logger.warn(`Error publishing entry:\n${error.toString()}\nQuery:\n${query}`);
        }
    }

    async unpublishEntry({ entryId, modelName }: { entryId: string; modelName: string }): Promise<void> {
        const publishModelName = `unpublish${modelName}`;
        const queryAst: any = {
            mutation: {
                [publishModelName]: {
                    __arguments: {
                        where: { id: entryId },
                        from: wrapEnumValue('PUBLISHED')
                    },
                    id: 1
                }
            }
        };
        let query = convertASTToQuery(queryAst);
        query = removeNewLinesAndCollapseSpaces(query);
        try {
            this.logger.debug(`Unpublish entry ${entryId}: ${query}`);
            await this.contentClient.request(query);
            this.logger.debug(`Successfully unpublished entry ${entryId}`);
        } catch (error: any) {
            this.logger.warn(`Error unpublishing entry:\n${error.toString()}\nQuery:\n${query}`);
        }
    }

    async publishEntries(entryMap: Record<string, string[]>): Promise<void> {
        const queryAst: any = { mutation: {} };
        for (const [pluralModelName, entryIds] of Object.entries(entryMap)) {
            const publishManyConnection = `publishMany${toLowerCaseFirst(pluralModelName)}Connection`;
            queryAst.mutation[publishManyConnection] = {
                __arguments: {
                    where: { id_in: entryIds },
                    to: wrapEnumValue('PUBLISHED')
                },
                edges: {
                    node: {
                        __typename: 1,
                        id: 1
                    }
                }
            };
        }

        let query = convertASTToQuery(queryAst);
        if (this.debugGraphQLQueries) {
            this.logger.debug(query);
        }
        query = removeNewLinesAndCollapseSpaces(query);
        try {
            this.logger.debug(
                `Publish entries ${Object.entries(entryMap)
                    .map(([pluralModelName, entryIds]) => `${pluralModelName}: [${entryIds.join(', ')}]`)
                    .join(', ')}: ${query}`
            );
            type ResponseType = Record<string, { edges: { node: { __typename: string; id: string } }[] }>;
            const result = await this.contentClient.request<ResponseType>(query);
            const publishedEntryIds = Object.values(result)
                .map(
                    (item) =>
                        `${item.edges[0]?.node.__typename}: [${item.edges.map((edge) => edge.node.id).join(', ')}]`
                )
                .join(', ');
            this.logger.debug(`Successfully published entries ${publishedEntryIds}`);
        } catch (error: any) {
            this.logger.warn(`Error publishing entries:\n${error.toString()}\nQuery:\n${query}`);
        }
    }

    async unpublishEntries(entryMap: Record<string, string[]>): Promise<void> {
        const queryAst: any = { mutation: {} };
        for (const [pluralModelName, entryIds] of Object.entries(entryMap)) {
            const unpublishManyConnection = `unpublishMany${toLowerCaseFirst(pluralModelName)}Connection`;
            queryAst.mutation[unpublishManyConnection] = {
                __arguments: {
                    where: { id_in: entryIds },
                    from: wrapEnumValue('PUBLISHED')
                },
                edges: {
                    node: {
                        __typename: 1,
                        id: 1
                    }
                }
            };
        }

        let query = convertASTToQuery(queryAst);
        if (this.debugGraphQLQueries) {
            this.logger.debug(query);
        }
        query = removeNewLinesAndCollapseSpaces(query);
        try {
            this.logger.debug(
                `Unpublish entries ${Object.entries(entryMap)
                    .map(([pluralModelName, entryIds]) => `${pluralModelName}: [${entryIds.join(', ')}]`)
                    .join(', ')}: ${query}`
            );
            type ResponseType = Record<string, { edges: { node: { __typename: string; id: string } }[] }>;
            const result = await this.contentClient.request<ResponseType>(query);
            const unpublishedEntryIds = Object.values(result)
                .map(
                    (item) =>
                        `${item.edges[0]?.node.__typename}: [${item.edges.map((edge) => edge.node.id).join(', ')}]`
                )
                .join(', ');
            this.logger.debug(`Successfully unpublished entries ${unpublishedEntryIds}`);
        } catch (error: any) {
            this.logger.warn(`Error unpublishing entries:\n${error.toString()}\nQuery:\n${query}`);
        }
    }

    async getAssets(options: { maxPaginationSize?: number } = {}): Promise<HygraphAsset[]> {
        const maxPaginationSize = options.maxPaginationSize ?? 100;
        const result: HygraphAsset[] = [];
        let skip = 0;
        try {
            let hasNextPage;
            do {
                type ResponseType = {
                    assetsConnection: {
                        edges: { node: HygraphAsset }[];
                        pageInfo: Pick<PageInfo, 'hasNextPage' | 'pageSize'>;
                    };
                };
                const queryResult = await this.contentClient.request<ResponseType>(getAssets, {
                    first: options.maxPaginationSize ?? 100,
                    skip: skip
                });
                const hygraphAssets = queryResult.assetsConnection.edges.map((edge) => edge.node);
                result.push(...hygraphAssets);

                skip += queryResult.assetsConnection.pageInfo.pageSize ?? maxPaginationSize;
                hasNextPage = queryResult.assetsConnection.pageInfo.hasNextPage;
            } while (hasNextPage);

            return result;
        } catch (error: any) {
            this.logger.warn(`Error fetching assets:\n${error.toString()}`);
            return [];
        }
    }

    async getAssetById(assetId: string): Promise<HygraphAsset | undefined> {
        try {
            type ResponseType = { asset: HygraphAsset };
            const result = await this.contentClient.request<ResponseType>(getAssetById, { id: assetId });
            return result.asset;
        } catch (error: any) {
            this.logger.warn(`Error fetching asset:\n${error.toString()}`);
            return undefined;
        }
    }

    async publishAssets(assetIds: string[]): Promise<void> {
        try {
            this.logger.debug(`Publish assets with ids: [${assetIds.join(', ')}]`);
            type ResponseType = { publishManyAssetsConnection: { edges: { node: { id: string } }[] } };
            const result = await this.contentClient.request<ResponseType>(publishAssets, {
                assetIds: assetIds
            });
            const publishedAssetIds = result.publishManyAssetsConnection.edges.map((edge) => edge.node.id);
            this.logger.debug(`Successfully published assets with ids: [${publishedAssetIds.join(', ')}]`);
        } catch (error: any) {
            this.logger.warn(`Error publishing assets:\n${error.toString()}}`);
        }
    }

    async unpublishAssets(assetIds: string[]): Promise<void> {
        try {
            this.logger.debug(`Unpublish assets with ids: [${assetIds.join(', ')}]`);
            type ResponseType = { unpublishManyAssetsConnection: { edges: { node: { id: string } }[] } };
            const result = await this.contentClient.request<ResponseType>(unpublishAssets, {
                assetIds: assetIds
            });
            const unpublishedAssetIds = result.unpublishManyAssetsConnection.edges.map((edge) => edge.node.id);
            this.logger.debug(`Successfully unpublished assets with ids: [${unpublishedAssetIds.join(', ')}]`);
        } catch (error: any) {
            this.logger.warn(`Error unpublishing assets:\n${error.toString()}}`);
        }
    }

    async uploadAsset(options: HygraphAssetUploadOptions) {
        try {
            if (options.url) {
                this.logger.debug(`Create asset from URL: ${options.url}, fileName: ${options.fileName}`);
                const createAssetResponse = await this.createAssetWithURL({
                    fileName: options.fileName,
                    url: options.url
                });

                if (createAssetResponse.upload.error) {
                    this.logger.warn(`Error creating asset from URL:\n${createAssetResponse.upload.error.message}`);
                    return undefined;
                }

                this.logger.debug(
                    `Successfully created asset from URL, id ${createAssetResponse.id}, status: ${createAssetResponse.upload.status}`
                );
                return createAssetResponse.id;
            } else {
                this.logger.debug(`Create asset with post data, fileName: ${options.fileName}`);
                const createAssetResponse = await this.createAssetWithPostData({
                    fileName: options.fileName
                });

                const { requestPostData, error } = createAssetResponse.upload;

                if (error) {
                    this.logger.warn(`Error creating asset with post data:\n${error.message}`);
                    return undefined;
                }

                this.logger.debug(
                    `Created asset with post data, id ${createAssetResponse.id}, status: ${createAssetResponse.upload.status}`
                );
                this.logger.debug(`Uploading asset for asset id: ${createAssetResponse.id}`);
                const formData = new FormData();

                formData.append('X-Amz-Date', requestPostData.date);
                formData.append('key', requestPostData.key);
                formData.append('X-Amz-Signature', requestPostData.signature);
                formData.append('X-Amz-Algorithm', requestPostData.algorithm);
                formData.append('policy', requestPostData.policy);
                formData.append('X-Amz-Credential', requestPostData.credential);
                formData.append('X-Amz-Security-Token', requestPostData.securityToken);

                const buffer = Buffer.from(options.base64!, 'base64');
                formData.append('file', new Blob([buffer], { type: options.mimeType }), options.fileName);

                const response = await fetch(requestPostData.url, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    this.logger.warn(`Error uploading asset: ${response.statusText}`);
                    return undefined;
                }
                this.logger.debug(`Uploaded asset for asset id: ${createAssetResponse.id}`);
                return createAssetResponse.id;
            }
        } catch (err: any) {
            this.logger.warn(`Error uploading asset:\n${err.toString()}`);
            return undefined;
        }
    }

    private async createAssetWithURL(options: {
        fileName: string;
        url: string;
    }): Promise<HygraphCreateAssetWithURLResponse> {
        try {
            type ResponseType = { createAsset: HygraphCreateAssetWithURLResponse };
            const response = await this.contentClient.request<ResponseType>(createAssetWithURL, {
                fileName: options.fileName,
                uploadUrl: options.url
            });
            return response.createAsset;
        } catch (error: any) {
            this.logger.warn(`Error creating asset:\n${error.toString()}`);
            throw new Error(`Error creating asset: ${error.message}`);
        }
    }

    private async createAssetWithPostData(options: {
        fileName: string;
    }): Promise<HygraphCreateAssetWithPostDataResponse> {
        try {
            type ResponseType = { createAsset: HygraphCreateAssetWithPostDataResponse };
            const response = await this.contentClient.request<ResponseType>(createAssetWithPostData, {
                fileName: options.fileName
            });
            return response.createAsset;
        } catch (error: any) {
            this.logger.warn(`Error creating asset:\n${error.toString()}`);
            throw new Error(`Error creating asset: ${error.message}`);
        }
    }
}

export function wrapEnumValue(value: string) {
    return { __enum: value };
}

function defaultDocumentQueryFields(options: {
    model: ModelWithContext;
    getModelByName: (modelName: string) => ModelWithContext | undefined;
    logger: StackbitTypes.Logger;
}) {
    return {
        __typename: 1,
        id: 1,
        createdAt: 1,
        createdBy: { id: 1, name: 1, kind: 1 },
        updatedAt: 1,
        updatedBy: { id: 1, name: 1, kind: 1 },
        publishedAt: 1,
        publishedBy: { id: 1, name: 1, kind: 1 },
        stage: 1,
        documentInStages: {
            __arguments: { stages: wrapEnumValue('PUBLISHED') },
            stage: 1,
            updatedAt: 1
        },
        ...convertFieldsToQueryAST(options)
    };
}

function convertFieldsToQueryAST({
    model,
    getModelByName,
    visitedModelsCount = {},
    logger
}: {
    model: ModelWithContext;
    getModelByName: (modelName: string) => ModelWithContext | undefined;
    visitedModelsCount?: Record<string, number>;
    logger: StackbitTypes.Logger;
}): Record<string, any> {
    const fieldAst: Record<string, any> = {};
    for (const field of model.fields ?? []) {
        const fieldOrListItem = field.type === 'list' ? field.items : field;
        switch (fieldOrListItem.type) {
            case 'richText': {
                fieldAst[field.name] = {
                    __typename: 1,
                    markdown: 1,
                    text: 1
                };
                break;
            }
            case 'color': {
                fieldAst[field.name] = {
                    __typename: 1,
                    rgba: { r: 1, g: 1, b: 1, a: 1 }
                };
                break;
            }
            case 'image': {
                fieldAst[field.name] = {
                    __typename: 1,
                    id: 1
                };
                break;
            }
            case 'model': {
                // TODO: fix issue with cyclic nesting
                const fieldInfo = model.context!.fieldInfoMap[field.name]!;
                const multiModelField = fieldInfo.isMultiModel;
                if (multiModelField) {
                    fieldAst[field.name] = {
                        __typename: 1,
                        __on: {
                            ...fieldOrListItem.models.reduce((accum: any, modelName) => {
                                const visitedCount = visitedModelsCount[modelName];
                                if (typeof visitedCount !== 'undefined' && visitedCount > 5) {
                                    return accum;
                                }
                                const model = getModelByName(modelName);
                                if (!model) {
                                    return accum;
                                }
                                const modelFields = convertFieldsToQueryAST({
                                    model,
                                    getModelByName,
                                    visitedModelsCount: {
                                        ...visitedModelsCount,
                                        [modelName]: (visitedModelsCount[modelName] ?? 0) + 1
                                    },
                                    logger
                                });
                                // alias all model fields to prevent graphql field type conflicts
                                const aliasedModelFields = _.mapValues(modelFields, (fieldValue, fieldName) => {
                                    if (fieldValue === 1) {
                                        // For primitive fields, the value of the field in AST is the alias name
                                        return aliasForFieldName(fieldName, modelName);
                                    } else {
                                        // For nested fields, the alias name is stored under the "__alias" property
                                        return {
                                            __alias: aliasForFieldName(fieldName, modelName),
                                            ...fieldValue
                                        };
                                    }
                                });
                                accum[modelName] = {
                                    id: 1,
                                    ...aliasedModelFields
                                };
                                return accum;
                            }, {})
                        }
                    };
                } else if (fieldOrListItem.models.length === 1 && !multiModelField) {
                    const modelName = fieldOrListItem.models[0]!;
                    const visitedCount = visitedModelsCount[modelName];
                    if (typeof visitedCount !== 'undefined' && visitedCount > 5) {
                        break;
                    }
                    const model = getModelByName(modelName);
                    if (model) {
                        fieldAst[field.name] = {
                            __typename: 1,
                            id: 1,
                            ...convertFieldsToQueryAST({
                                model,
                                getModelByName,
                                visitedModelsCount: {
                                    ...visitedModelsCount,
                                    [modelName]: (visitedModelsCount[modelName] ?? 0) + 1
                                },
                                logger
                            })
                        };
                    }
                }
                break;
            }
            case 'reference': {
                const fieldInfo = model.context!.fieldInfoMap[field.name]!;
                const multiModelField = fieldInfo.isMultiModel;
                if (multiModelField) {
                    fieldAst[field.name] = {
                        __typename: 1,
                        __on: {
                            ...fieldOrListItem.models.reduce((accum: any, modelName) => {
                                const model = getModelByName(modelName);
                                if (!model) {
                                    return accum;
                                }
                                accum[modelName] = {
                                    id: 1
                                };
                                return accum;
                            }, {})
                        }
                    };
                } else if (fieldOrListItem.models.length === 1 && !multiModelField) {
                    fieldAst[field.name] = {
                        __typename: 1,
                        id: 1
                    };
                }
                break;
            }
            default: {
                fieldAst[field.name] = 1;
            }
        }
    }
    return fieldAst;
}

function toLowerCaseFirst(value: string): string {
    return value.charAt(0).toLowerCase() + value.slice(1);
}

function convertASTToQuery(queryAST: Record<string, any>, level?: never | 0): string;
function convertASTToQuery(queryAST: Record<string, any>, level: number): string[];
function convertASTToQuery(queryAST: Record<string, any>, level = 0): string | string[] {
    const indention = ' '.repeat(2 * level);
    const query: string[] = [];
    for (let [key, value] of Object.entries(queryAST)) {
        if (key === '__on') {
            for (const [modelName, fields] of Object.entries(value as Record<string, any>)) {
                // open inline fragment
                query.push(`${indention}... on ${modelName} {`);
                // insert fragment fields
                query.push(...convertASTToQuery(fields, level + 1));
                // close inline fragment
                query.push(`${indention}}`);
            }
        } else if (_.isPlainObject(value)) {
            const { __alias, __arguments, ...rest } = value;
            if (__alias) {
                key = `${__alias}: ${key}`;
            }
            // open nested object
            if (__arguments) {
                const args = _.reduce(
                    __arguments,
                    (accum: string[], value: any, arg: string) => {
                        accum.push(`${arg}: ${serializeQueryArgValue(value)}`);
                        return accum;
                    },
                    []
                ).join(', ');
                query.push(`${indention}${key}(${args}) {`);
            } else {
                query.push(`${indention}${key} {`);
            }
            // insert object fields
            query.push(...convertASTToQuery(rest, level + 1));
            // close object
            query.push(`${indention}}`);
        } else if (typeof value === 'string') {
            // aliased field
            query.push(`${indention}${value}: ${key}`);
        } else {
            // primitive field, in this case the value is "1"
            query.push(`${indention}${key}`);
        }
    }
    return level === 0 ? query.join('\n') : query;
}

function serializeQueryArgValue(value: any) {
    if (_.isArray(value)) {
        value = `[${value.map(serializeQueryArgValue).join(', ')}]`;
    } else if (_.isPlainObject(value)) {
        if (value.__enum) {
            value = value.__enum;
        } else if (value.__raw) {
            value = value.__raw;
        } else {
            value = serializeQueryArgObject(value);
        }
    } else if (typeof value === 'string') {
        value = `"${value.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
    }
    return value;
}

function serializeQueryArgObject(object: Record<string, any>) {
    const serialized = _.reduce(
        object,
        (result, value, key) => {
            value = serializeQueryArgValue(value);
            return result + (result.length ? ', ' : '') + `${key}: ${value}`;
        },
        ''
    );
    return `{ ${serialized} }`;
}

function aliasForFieldName(fieldName: string, modelName: string): string {
    return `__${modelName}_alias__${fieldName}`;
}

function removeAliasFieldNames(entry?: HygraphEntry): HygraphEntry {
    return deepMap(
        entry,
        (value, keyPath) => {
            if (_.isPlainObject(value) && value.__typename) {
                const re = new RegExp(`^__${value.__typename}_alias__`);
                return _.mapKeys(value, (value, fieldName) => fieldName.replace(re, ''));
            }
            return value;
        },
        {
            iteratePrimitives: false,
            includeKeyPath: true
        }
    );
}

function removeSchemaAliases<Type extends HygraphTypes.IModel | HygraphTypes.Component>(entity: Type): Type {
    return {
        ...entity,
        fields: (entity.fields as AliasedHygraphField[]).map((field): HygraphField => {
            if ('type_simple' in field) {
                const { type_simple, validations, ...restField } = field;
                let convertedValidations: HygraphTypes.SimpleFieldValidations | undefined;
                if (validations && 'range_float' in validations) {
                    const { range_float, ...restValidations } = validations;
                    convertedValidations = {
                        ...restValidations,
                        range: range_float
                    };
                } else if (validations) {
                    convertedValidations = validations;
                }
                return {
                    type: type_simple,
                    ...restField,
                    ...(convertedValidations ? { validations: convertedValidations } : null)
                };
            } else if ('type_enum' in field) {
                const { type_enum, initialValue_enum, ...restField } = field;
                return {
                    type: type_enum,
                    ...restField,
                    ...(initialValue_enum ? { initialValue: initialValue_enum } : null)
                };
            } else if ('type_relation' in field) {
                const { type_relation, ...restField } = field;
                return { type: type_relation, ...restField };
            } else if ('type_union' in field) {
                const { type_union, ...restField } = field;
                return { type: type_union, ...restField };
            } else if ('type_remote' in field) {
                const { type_remote, ...restField } = field;
                return { type: type_remote, ...restField };
            } else if ('type_component' in field) {
                const { type_component, ...restField } = field;
                return { type: type_component, ...restField };
            } else if ('type_componentUnion' in field) {
                const { type_componentUnion, ...restField } = field;
                return { type: type_componentUnion, ...restField };
            }
            const _exhaustiveCheck: never = field;
            return _exhaustiveCheck;
        })
    };
}

function removeNewLinesAndCollapseSpaces(str: string): string {
    return str.replace(/\n/g, '').replace(/\s+/g, ' ');
}

import _ from 'lodash';
import type * as StackbitTypes from '@stackbit/types';
import { GraphQLClient } from 'graphql-request';
import type { Query, CreateWebhookPayload } from './gql-management-types';
import type { ModelWithContext } from './hygraph-schema-converter';
import schemaQuery from './gql-queries/schema';
import { createWebhookMutation, getWebhooksQuery } from './gql-queries/webhooks';

export type HygraphEntryConnectionResult = Record<
    string,
    {
        edges: { node: HygraphEntry }[];
        pageInfo: {
            hasNextPage: boolean;
            pageSize: number;
        };
    }
>;

export type HygraphEntry = {
    __typename: string;
    id: string;
    createdAt: string;
    createdBy: HygraphUser;
    updatedAt: string;
    updatedBy: HygraphUser;
    publishedAt: string | null;
    publishedBy: HygraphUser | null;
    stage: 'DRAFT' | 'PUBLISHED';
    documentInStages: {
        stage: 'PUBLISHED';
        updatedAt: string;
    }[];
    scheduledIn?: any[];
    history?: {
        id: string;
        createdAt: string;
        revision: number;
        stage: string;
    }[];
    [key: string]: any;
};

export type HygraphAssetConnectionResult = {
    assetsConnection: {
        edges: { node: HygraphAsset }[];
        pageInfo: {
            hasNextPage: boolean;
            pageSize: number;
        };
    };
};

export type HygraphAsset = {
    __typename: string;
    id: string;
    createdAt: string;
    createdBy: HygraphUser;
    updatedAt: string;
    updatedBy: HygraphUser;
    stage: 'DRAFT' | 'PUBLISHED';
    documentInStages: {
        stage: 'PUBLISHED';
        updatedAt: string;
    }[];
    scheduledIn?: any[];
    url: string;
    fileName: string;
    handle: string;
    mimeType: string;
    size: number;
    width: number;
    height: number;
    upload: {
        status: 'ASSET_CREATE_PENDING' | 'ASSET_UPLOAD_COMPLETE' | 'ASSET_UPDATE_PENDING' | 'ASSET_ERROR_UPLOAD';
    };
};

export type HygraphWebhook = {
    operation: 'create' | 'update' | 'publish' | 'unpublish' | 'delete';
    data: HygraphEntry | HygraphAsset;
};

export type HygraphUser = {
    id?: string;
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

    constructor(options: HygraphApiClientOptions) {
        this.projectId = options.projectId;
        this.environment = options.environment;
        this.logger = options.logger;
        this.contentClient = new GraphQLClient(options.contentApi);
        this.managementClient = new GraphQLClient(options.managementApi, {
            headers: {
                Authorization: `Bearer ${options.managementToken}`
            }
        });
    }

    async getSchema() {
        const result = await this.managementClient.request<Query>(schemaQuery, {
            projectId: this.projectId,
            environmentName: this.environment
        });

        const environment = result.viewer.project?.environment;
        return {
            models: environment?.contentModel.models ?? [],
            components: environment?.contentModel.components ?? [],
            enumerations: environment?.contentModel.enumerations ?? [],
            assetModelId: environment?.contentModel.assetModel.id ?? null,
            maxPaginationSize: result.viewer.project?.maxPaginationSize ?? 100
        };
    }

    async getWebhooks() {
        const result = await this.managementClient.request<Query>(getWebhooksQuery, {
            projectId: this.projectId,
            environmentName: this.environment
        });
        return {
            environmentId: result.viewer.project?.environment.id!,
            webhooks: result.viewer.project?.environment.webhooks ?? []
        };
    }

    async createWebhook({ url, environmentId }: { url: string; environmentId: string }) {
        const result = await this.managementClient.request<{ createWebhook: CreateWebhookPayload }>(
            createWebhookMutation,
            {
                environmentId: environmentId,
                url: url
            }
        );
        return result.createWebhook.createdWebhook;
    }

    async getEntries({
        models,
        maxPaginationSize
    }: {
        models: ModelWithContext[];
        maxPaginationSize?: number;
    }): Promise<HygraphEntry[]> {
        const queryAst: any = { query: {} };
        const dataModels = models.filter((model) => model.type === 'data');
        const modelsByName = _.keyBy(models, 'name');

        for (const model of dataModels) {
            const queryModelName = toLowerCaseFirst(model.context!.pluralId) + 'Connection';
            queryAst.query[queryModelName] = {
                __arguments: {
                    stage: { enum: 'DRAFT' },
                    first: maxPaginationSize ?? 100,
                    skip: 0
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
                const queryResult = await this.contentClient.request<HygraphEntryConnectionResult>(query);
                const typesWithNextPage: string[] = [];

                for (const [queryModelName, modelResult] of Object.entries(queryResult)) {
                    const hygraphEntries = modelResult.edges.map((edge) => edge.node);
                    result.push(...hygraphEntries);
                    if (modelResult.pageInfo.hasNextPage) {
                        typesWithNextPage.push(queryModelName);
                        queryAst.query[queryModelName].__arguments.skip += modelResult.pageInfo.pageSize;
                    }
                }

                queryAst.query = _.pick(queryAst.query, typesWithNextPage);
                hasNextPage = typesWithNextPage.length > 0;
            } while (hasNextPage);

            return result;
        } catch (error: any) {
            this.logger.warn(`Error fetching entries:\n${error.toString()}\nQuery:\n${removeNewLines(query)}`);
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
                        stage: { enum: 'DRAFT' },
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
        const query = convertASTToQuery(queryAst);
        try {
            const result = await this.contentClient.request<Record<string, HygraphEntry>>(query);
            return result[queryModelName];
        } catch (error: any) {
            this.logger.warn(`Error fetching entry by id:\n${error.toString()}\nQuery:\n${removeNewLines(query)}`);
            return undefined;
        }
    }

    async createEntry({ modelName, data }: { modelName: string; data: Record<string, any> }): Promise<{ id: string }> {
        // TODO: move data to query parameter
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
        const query = convertASTToQuery(queryAst);
        try {
            this.logger.debug(`Create entry: ${removeNewLines(query)}`);
            const result = await this.contentClient.request<Record<string, { id: string }>>(query);
            const entry = result[createModelName];
            if (!entry) {
                throw new Error(`Error creating an entry`);
            }
            return entry;
        } catch (error: any) {
            this.logger.warn(`Error creating entry:\n${error.toString()}\nQuery:\n${removeNewLines(query)}`);
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
        // TODO: move data to query parameter
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
        const query = convertASTToQuery(queryAst);
        try {
            this.logger.debug(`Updating entry ${entryId}: ${removeNewLines(query)}`);
            await this.contentClient.request(query);
        } catch (error: any) {
            this.logger.warn(`Error updating entry:\n${error.toString()}\nQuery:\n${removeNewLines(query)}`);
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
        const query = convertASTToQuery(queryAst);
        try {
            await this.contentClient.request(query);
        } catch (error: any) {
            this.logger.warn(`Error deleting entry:\n${error.toString()}\nQuery:\n${removeNewLines(query)}`);
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
                        to: { enum: 'PUBLISHED' }
                    },
                    id: 1
                }
            }
        };
        const query = convertASTToQuery(queryAst);
        try {
            await this.contentClient.request(query);
        } catch (error: any) {
            this.logger.warn(`Error publishing entry:\n${error.toString()}\nQuery:\n${removeNewLines(query)}`);
        }
    }

    async unpublishEntry({ entryId, modelName }: { entryId: string; modelName: string }): Promise<void> {
        const publishModelName = `unpublish${modelName}`;
        const queryAst: any = {
            mutation: {
                [publishModelName]: {
                    __arguments: {
                        where: { id: entryId },
                        from: { enum: 'PUBLISHED' }
                    },
                    id: 1
                }
            }
        };
        const query = convertASTToQuery(queryAst);
        try {
            await this.contentClient.request(query);
        } catch (error: any) {
            this.logger.warn(`Error unpublishing entry:\n${error.toString()}\nQuery:\n${removeNewLines(query)}`);
        }
    }

    async getAssets(options: { maxPaginationSize?: number } = {}): Promise<HygraphAsset[]> {
        const queryAst: any = {
            query: {
                assetsConnection: {
                    __arguments: {
                        stage: { enum: 'DRAFT' },
                        first: options.maxPaginationSize ?? 100,
                        skip: 0
                    },
                    edges: {
                        node: {
                            ...defaultAssetQueryFields()
                        }
                    },
                    pageInfo: {
                        hasNextPage: 1,
                        pageSize: 1
                    }
                }
            }
        };

        const result: HygraphAsset[] = [];
        let query;
        try {
            let hasNextPage;
            do {
                query = convertASTToQuery(queryAst);

                const queryResult = await this.contentClient.request<HygraphAssetConnectionResult>(query);
                const hygraphAssets = queryResult.assetsConnection.edges.map((edge) => edge.node);
                result.push(...hygraphAssets);

                queryAst.query.assetsConnection.__arguments.skip += queryResult.assetsConnection.pageInfo.pageSize;
                hasNextPage = queryResult.assetsConnection.pageInfo.hasNextPage;
            } while (hasNextPage);

            return result;
        } catch (error: any) {
            this.logger.warn(`Error fetching assets:\n${error.toString()}\nQuery:\n${removeNewLines(query)}`);
            return [];
        }
    }

    async getAssetById(assetId: string): Promise<HygraphAsset | undefined> {
        const queryAst: any = {
            query: {
                asset: {
                    __arguments: {
                        stage: { enum: 'DRAFT' },
                        where: { id: assetId }
                    },
                    ...defaultAssetQueryFields()
                }
            }
        };
        const query = convertASTToQuery(queryAst);
        try {
            const result = await this.contentClient.request<{ asset: HygraphAsset }>(query);
            return result.asset;
        } catch (error: any) {
            this.logger.warn(`Error fetching asset:\n${error.toString()}\nQuery:\n${removeNewLines(query)}`);
            return undefined;
        }
    }

    async uploadAsset(options: HygraphAssetUploadOptions) {
        try {
            if (options.url) {
                this.logger.debug(`Created asset from URL: ${options.url}`);
                const createAssetResponse = await this.createAssetWithURL({
                    fileName: options.fileName,
                    url: options.url
                });

                if (createAssetResponse.upload.error) {
                    this.logger.warn(`Error creating asset from URL:\n${createAssetResponse.upload.error.message}`);
                    return undefined;
                }

                this.logger.debug(
                    `Created asset from URL, id ${createAssetResponse.id}, status: ${createAssetResponse.upload.status}`
                );
                return createAssetResponse.id;
            } else {
                this.logger.debug(`Created asset with post data`);
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
                // TODO: check for status
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
        const gql = `mutation createAsset {
            createAsset(data: { fileName: "${options.fileName}", uploadUrl: "${options.url}" }) {
              id
              url
              upload {
                status
                error {
                  code
                  message
                }
              }
            }
          }`;

        try {
            const response = await this.contentClient.request<{ createAsset: HygraphCreateAssetWithURLResponse }>(gql);
            return response.createAsset;
        } catch (error: any) {
            this.logger.warn(`Error creating asset:\n${error.toString()}`);
            throw new Error(`Error creating asset: ${error.message}`);
        }
    }

    private async createAssetWithPostData(options: {
        fileName: string;
    }): Promise<HygraphCreateAssetWithPostDataResponse> {
        const gql = `mutation createAsset {
            createAsset(data: { fileName: "${options.fileName}" }) {
              id
              url
              upload {
                status
                expiresAt
                error {
                  code
                  message
                }
                requestPostData {
                  url
                  date
                  key
                  signature
                  algorithm
                  policy
                  credential
                  securityToken
                }
              }
            }
          }`;

        try {
            const response = await this.contentClient.request<{ createAsset: HygraphCreateAssetWithPostDataResponse }>(
                gql
            );
            return response.createAsset;
        } catch (error: any) {
            this.logger.warn(`Error creating asset:\n${error.toString()}`);
            throw new Error(`Error creating asset: ${error.message}`);
        }
    }
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
        createdBy: { id: 1 },
        updatedAt: 1,
        updatedBy: { id: 1 },
        publishedAt: 1,
        publishedBy: { id: 1 },
        stage: 1,
        documentInStages: {
            __arguments: { stages: { enum: 'PUBLISHED' } },
            stage: 1,
            updatedAt: 1
        },
        ...convertFieldsToQueryAST(options)
    };
}

function defaultAssetQueryFields() {
    return {
        __typename: 1,
        id: 1,
        createdAt: 1,
        createdBy: { id: 1 },
        updatedAt: 1,
        updatedBy: { id: 1 },
        stage: 1,
        documentInStages: {
            id: 1,
            stage: 1,
            publishedAt: 1,
            updatedAt: 1
        },
        url: 1,
        fileName: 1,
        handle: 1,
        mimeType: 1,
        size: 1,
        width: 1,
        height: 1,
        upload: {
            status: 1
        }
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
                    hex: 1
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
                // TODO: fix issue with cyclic nesting and conflicts between
                //  similar named fields between different components
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
                                accum[modelName] = {
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
        if (key === '__arguments') {
            continue;
        }
        if (key === '__alias') {
            continue;
        }
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
            if ('__alias' in value) {
                key = `${key}: ${value.__alias}`;
            }
            // open nested object
            if ('__arguments' in value) {
                const args = _.reduce(
                    value.__arguments,
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
            query.push(...convertASTToQuery(value, level + 1));
            // close object
            query.push(`${indention}}`);
        } else {
            query.push(`${indention}${key}`);
        }
    }
    return level === 0 ? query.join('\n') : query;
}

function serializeQueryArgValue(value: any) {
    if (_.isArray(value)) {
        value = `[${value.map(serializeQueryArgValue).join(', ')}]`;
    } else if (_.isPlainObject(value)) {
        if (value.enum) {
            value = value.enum;
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

function removeNewLines(str?: string) {
    return str?.replace(/\n/g, '');
}

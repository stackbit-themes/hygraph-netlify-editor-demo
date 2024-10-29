import _ from 'lodash';
import type * as StackbitTypes from '@stackbit/types';
import { GraphQLClient } from 'graphql-request';
import type { Query } from './gql-types';
import schemaQuery from './gql-queries/schema';
import type { ModelWithContext } from './hygraph-schema-converter';

const ITEMS_PER_REQUEST = 100;

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
    base64?: string;
    mimeType: string;
    url?: string;
}

export interface HygraphAssetUploadResponse {
    id: string;
    url: string;
    upload: {
        status: string;
        expiresAt: string;
        error: {
            code: string;
            message: string;
        }
        requestPostData: {
            url: string;
            date: string;
            key: string;
            signature: string;
            algorithm: string;
            policy: string;
            credential: string;
            securityToken: string;
        }
    }
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
            webhooks: environment?.webhooks ?? [],
            assetModelId: environment?.contentModel.assetModel.id ?? null,
        };
    }

    async getEntries(models: ModelWithContext[]): Promise<HygraphEntry[]> {
        const queryAst: any = { query: {} };
        const dataModels = models.filter((model) => model.type === 'data');
        const modelsByName = _.keyBy(models, 'name');

        const result: HygraphEntry[] = [];

        let query;

        for (const model of dataModels) {
            const queryModelName = toLowerCaseFirst(model.context!.pluralId);
            queryAst.query[queryModelName] = {
                __arguments: {
                    stage: 'DRAFT',
                    first: ITEMS_PER_REQUEST,
                    skip: 0,
                },
                ...defaultDocumentQueryFields({
                    model,
                    getModelByName: (modelName: string) => modelsByName[modelName],
                    logger: this.logger
                })
            };
        }

        try {
            let hasNextPage;
            do {
                query = convertASTToQuery(queryAst);
                const queryResult = (await this.contentClient.request(query)) as Record<string, HygraphEntry[]>;
                result.push(..._.flatMap(queryResult));

                const typesWithMoreData = Object.keys(queryResult).filter((key) => queryResult[key]!.length === ITEMS_PER_REQUEST);
                queryAst.query = _.pick(queryAst.query, typesWithMoreData);

                for (const type of typesWithMoreData) {
                    queryAst.query[type].__arguments.skip += ITEMS_PER_REQUEST;
                }

                hasNextPage = typesWithMoreData.length > 0;
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
                        stage: 'DRAFT',
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
            const result = (await this.contentClient.request(query)) as Record<string, HygraphEntry>;
            return result[queryModelName];
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
        const query = convertASTToQuery(queryAst);
        try {
            const result = (await this.contentClient.request(query)) as Record<string, { id: string }>;
            const entry = result[createModelName];
            if (!entry) {
                throw new Error(`Error creating an entry`);
            }
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
        const query = convertASTToQuery(queryAst);
        try {
            this.logger.debug(`Updating entry ${entryId}:\n${query}`);
            await this.contentClient.request(query);
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
        const query = convertASTToQuery(queryAst);
        try {
            await this.contentClient.request(query);
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
                        to: 'PUBLISHED'
                    },
                    id: 1
                }
            }
        };
        const query = convertASTToQuery(queryAst);
        try {
            await this.contentClient.request(query);
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
                        from: 'PUBLISHED'
                    },
                    id: 1
                }
            }
        };
        const query = convertASTToQuery(queryAst);
        try {
            await this.contentClient.request(query);
        } catch (error: any) {
            this.logger.warn(`Error unpublishing entry:\n${error.toString()}\nQuery:\n${query}`);
        }
    }

    async getAssets(): Promise<HygraphAsset[]> {
        const assets: HygraphAsset[] = [];

        let skip = 0;
        let query;

        const queryAst: any = {
            query: {
                assets: {
                    __arguments: {
                        stage: 'DRAFT',
                        first: ITEMS_PER_REQUEST,
                    },
                    ...defaultAssetQueryFields()
                }
            }
        };

        try {
            let hasNextPage;
            do {
                queryAst.query.assets.__arguments.skip = skip;

                query = convertASTToQuery(queryAst);

                const result = (await this.contentClient.request(query)) as { assets: HygraphAsset[] };
                assets.push(...result.assets);

                skip += ITEMS_PER_REQUEST;
                hasNextPage = result.assets.length === ITEMS_PER_REQUEST;
            } while (hasNextPage);

            return assets;
        } catch (error: any) {
            this.logger.warn(`Error fetching assets:\n${error.toString()}\nQuery:\n${query}`);
            return [];
        }
    }

    async getAssetById(assetId: string): Promise<HygraphAsset | undefined> {
        const queryAst: any = {
            query: {
                asset: {
                    __arguments: {
                        stage: 'DRAFT',
                        where: { id: assetId }
                    },
                    ...defaultAssetQueryFields()
                }
            }
        };
        const query = convertASTToQuery(queryAst);
        try {
            const result = (await this.contentClient.request(query)) as { asset: HygraphAsset };
            return result.asset;
        } catch (error: any) {
            this.logger.warn(`Error fetching asset:\n${error.toString()}\nQuery:\n${query}`);
            return undefined;
        }
    }

    async uploadAsset(options: HygraphAssetUploadOptions) {
        try {
            const createUploadResponse = await this.createUpload({ fileName: options.fileName });

            const { requestPostData, error } = createUploadResponse.upload;

            if (error) {
                this.logger.warn(`Error creating asset upload:\n${error.message}`);
                return undefined;
            }

            const formData = new FormData();

            formData.append('X-Amz-Date', requestPostData.date);
            formData.append('key', requestPostData.key);
            formData.append('X-Amz-Signature', requestPostData.signature);
            formData.append('X-Amz-Algorithm', requestPostData.algorithm);
            formData.append('policy', requestPostData.policy);
            formData.append('X-Amz-Credential', requestPostData.credential);
            formData.append('X-Amz-Security-Token', requestPostData.securityToken);

            formData.append('file', generateBlobData(options));

            const headers = new Headers();
            headers.append('Content-Disposition', `form-data; name="file"; filename="${options.fileName}"`);

            const response = await fetch(requestPostData.url, {
                method: 'POST',
                headers,
                body: formData,
            });

            if (!response.ok) {
                this.logger.warn(`Error uploading asset: ${response.statusText}`);
                return undefined;
            }

            return createUploadResponse.id;
        } catch (err: any) {
            this.logger.warn(`Error uploading asset:\n${err.toString()}`);
            return undefined;
        }
    }

    private async createUpload(options: { fileName: string; }): Promise<HygraphAssetUploadResponse> {
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
            return this.contentClient.request(gql).then((response) => { return response.createAsset; });
        } catch (error: any) {
            this.logger.warn(`Error creating asset upload:\n${error.toString()}`);
            throw new Error(`Error creating asset upload: ${error.message}`);
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
            __arguments: { stages: 'PUBLISHED' },
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
        height: 1
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
    for (const [key, value] of Object.entries(queryAST)) {
        if (key === '__arguments') {
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
            // open nested object
            if ('__arguments' in value) {
                const args = _.reduce(
                    value.__arguments,
                    (accum: string[], value: any, arg: string) => {
                        if (_.isPlainObject(value)) {
                            accum.push(`${arg}: ${serializeQueryArg(value)}`);
                        } else {
                            accum.push(`${arg}: ${value}`);
                        }
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

function serializeQueryArg(object: Record<string, any>) {
    const serialized = _.reduce(
        object,
        (result, value, key) => {
            if (_.isPlainObject(value)) {
                value = serializeQueryArg(value);
            } else if (typeof value === 'string') {
                value = `"${value}"`;
            }
            return result + (result.length ? ', ' : '') + `${key}: ${value}`;
        },
        ''
    );
    return `{ ${serialized} }`;
}

function base64toBlob(b64Data: string, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

async function generateBlobData({ base64, mimeType, url }: HygraphAssetUploadOptions) {
    try {
        if (base64) {
            return base64toBlob(base64, mimeType);
        } else if (url) {
            return await fetch(url).then((response) => response.blob());
        }
    } catch (err: any) {
        throw new Error(`Error generating blob data: ${err.message}`);
    }
}

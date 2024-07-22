import _ from 'lodash';
import type * as StackbitTypes from '@stackbit/types';
import type { HygraphDocument } from './hygraph-api-client';
import { omitByUndefined } from '@stackbit/utils';

export type DocumentWithContext = StackbitTypes.Document<DocumentContext>;
export type DocumentContext = {};

export const SystemDocumentFields = [
    '__typename',
    'id',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
    'publishedAt',
    'publishedBy',
    'stage',
    'documentInStages',
    'scheduledIn',
    'history'
];

export function convertDocuments({
    hygraphDocuments,
    manageUrl,
    getModelByName,
    logger
}: {
    hygraphDocuments: HygraphDocument[];
    manageUrl: (documentId: string) => string;
    getModelByName: (modelName: string) => StackbitTypes.Model | undefined;
    logger: StackbitTypes.Logger;
}): DocumentWithContext[] {
    return hygraphDocuments
        .map((hygraphDocument: HygraphDocument) =>
            convertDocument({
                hygraphDocument,
                manageUrl,
                getModelByName,
                logger
            })
        )
        .filter((document): document is DocumentWithContext => !!document);
}

export function convertDocument({
    hygraphDocument,
    manageUrl,
    getModelByName,
    logger
}: {
    hygraphDocument: HygraphDocument;
    manageUrl: (documentId: string) => string;
    getModelByName: (modelName: string) => StackbitTypes.Model | undefined;
    logger: StackbitTypes.Logger;
}): DocumentWithContext | undefined {
    const model = getModelByName(hygraphDocument.__typename);
    if (!model) {
        logger.error(`Model '${hygraphDocument.__typename}' for document ${hygraphDocument.id} not found`);
        return undefined;
    }

    const hygraphFields = _.omit(hygraphDocument, SystemDocumentFields);

    return omitByUndefined({
        type: 'document' as const,
        id: hygraphDocument.id,
        modelName: hygraphDocument.__typename,
        manageUrl: manageUrl(hygraphDocument.id),
        status: getDocumentStatus(hygraphDocument),
        createdAt: hygraphDocument.createdAt,
        createdBy: undefined, // TODO: fetch users and assign by IDs
        updatedAt: hygraphDocument.updatedAt,
        updatedBy: undefined, // TODO: fetch users and assign by IDs
        context: {},
        fields: convertFields({
            hygraphFields,
            model,
            getModelByName,
            logger
        })
    });
}

function convertFields({
    hygraphFields,
    model,
    getModelByName,
    logger
}: {
    hygraphFields: Record<string, any>;
    model: StackbitTypes.Model;
    getModelByName: (modelName: string) => StackbitTypes.Model | undefined;
    logger: StackbitTypes.Logger;
}): Record<string, StackbitTypes.DocumentField> {
    const fields: Record<string, StackbitTypes.DocumentField> = {};
    for (const [fieldName, fieldValue] of Object.entries(hygraphFields)) {
        if (fieldValue === null) {
            continue;
        }
        const modelField = model.fields?.find((field) => field.name === fieldName);
        if (!modelField) {
            continue;
        }
        const documentField = convertField({
            fieldValue,
            modelField,
            getModelByName,
            logger
        });
        if (documentField) {
            fields[fieldName] = documentField;
        }
    }
    return fields;
}

function convertField(options: {
    fieldValue: any;
    modelField: StackbitTypes.Field;
    getModelByName: (modelName: string) => StackbitTypes.Model | undefined;
    logger: StackbitTypes.Logger;
}): StackbitTypes.DocumentField | undefined;
function convertField(options: {
    fieldValue: any[];
    modelField: StackbitTypes.FieldListItems;
    getModelByName: (modelName: string) => StackbitTypes.Model | undefined;
    logger: StackbitTypes.Logger;
}): StackbitTypes.DocumentListFieldItems | undefined;
function convertField({
    fieldValue,
    modelField,
    getModelByName,
    logger
}: {
    fieldValue: any;
    modelField: StackbitTypes.FieldSpecificProps;
    getModelByName: (modelName: string) => StackbitTypes.Model | undefined;
    logger: StackbitTypes.Logger;
}): StackbitTypes.DocumentField | undefined {
    switch (modelField.type) {
        case 'string':
        case 'url':
        case 'slug':
        case 'text':
        case 'markdown':
        case 'html':
        case 'number':
        case 'boolean':
        case 'date':
        case 'datetime': {
            return {
                type: modelField.type,
                value: fieldValue
            };
        }
        case 'color': {
            return {
                type: modelField.type,
                value: fieldValue.hex
            };
        }
        case 'json': {
            return {
                type: modelField.type,
                value: fieldValue
            };
        }
        case 'richText': {
            return {
                type: modelField.type,
                value: fieldValue.markdown,
                hint: fieldValue.text.substring(0, 50)
            };
        }
        case 'file': {
            // No 'file' type fields in Hygraph
            logger.error(`Netlify 'file' field is not implemented in HygraphContentSource`);
            return undefined;
        }
        case 'enum': {
            return {
                type: modelField.type,
                value: fieldValue
            };
        }
        case 'image': {
            return {
                type: 'reference',
                refType: 'asset',
                refId: fieldValue.id
            };
        }
        case 'object': {
            logger.error(`Netlify 'object' field is not implemented in HygraphContentSource`);
            return undefined;
        }
        case 'model': {
            const model = getModelByName(fieldValue.__typename);
            if (!model) {
                logger.error(`Model '${fieldValue.__typename}' for field not found`);
                return undefined;
            }
            const hygraphFields = _.omit(fieldValue, ['__typename', 'id', 'stage']);
            return {
                type: modelField.type,
                modelName: fieldValue.__typename,
                fields: convertFields({
                    hygraphFields,
                    model,
                    getModelByName,
                    logger
                })
            };
        }
        case 'reference': {
            return {
                type: modelField.type,
                refType: 'document',
                refId: fieldValue.id
            };
        }
        case 'cross-reference': {
            logger.error(`Netlify 'cross-reference' field is not implemented in HygraphContentSource`);
            return undefined;
        }
        case 'list': {
            return {
                type: modelField.type,
                items: !Array.isArray(fieldValue)
                    ? []
                    : fieldValue
                          .map((itemValue) =>
                              convertField({
                                  fieldValue: itemValue,
                                  modelField: modelField.items,
                                  getModelByName,
                                  logger
                              })
                          )
                          .filter(
                              (documentField): documentField is StackbitTypes.DocumentListFieldItems => !!documentField
                          )
            };
        }
        case 'style': {
            logger.error(`Netlify 'style' field is not implemented in HygraphContentSource`);
            return undefined;
        }
        default: {
            const _exhaustiveCheck: never = modelField;
            return _exhaustiveCheck;
        }
    }
}

function getDocumentStatus(hygraphDocument: HygraphDocument): StackbitTypes.DocumentStatus {
    const publishedDoc = hygraphDocument.documentInStages.find((doc) => doc.stage === 'PUBLISHED');
    if (!publishedDoc) {
        return 'added';
    }
    if (publishedDoc.updatedAt === hygraphDocument.updatedAt) {
        return 'published';
    }
    return 'modified';
}

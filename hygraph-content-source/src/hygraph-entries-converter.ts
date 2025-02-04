import _ from 'lodash';
import type * as StackbitTypes from '@stackbit/types';
import { omitByUndefined } from '@stackbit/utils';
import type { HygraphEntry } from './hygraph-api-client';
import type { FieldInfo, ModelWithContext } from './hygraph-schema-converter';
import { colorToHex } from './utils';

export type DocumentWithContext = StackbitTypes.Document<DocumentContext>;
export type DocumentContext = {
    nestedModelsInfo: NestedModelsInfo;
};

export type NestedModelsInfo = Record<
    string,
    {
        id: string;
        modelName: string;
        isMultiModel: boolean;
    }
>;

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
] as const;

export function convertDocuments({
    hygraphEntries,
    getModelByName,
    baseManageUrl,
    logger
}: {
    hygraphEntries: HygraphEntry[];
    getModelByName: (modelName: string) => ModelWithContext | undefined;
    baseManageUrl: string;
    logger: StackbitTypes.Logger;
}): DocumentWithContext[] {
    return hygraphEntries
        .map((hygraphEntry: HygraphEntry) =>
            convertDocument({
                hygraphEntry,
                getModelByName,
                baseManageUrl,
                logger
            })
        )
        .filter((document): document is DocumentWithContext => !!document);
}

export function convertDocument({
    hygraphEntry,
    getModelByName,
    baseManageUrl,
    logger
}: {
    hygraphEntry: HygraphEntry;
    getModelByName: (modelName: string) => ModelWithContext | undefined;
    baseManageUrl: string;
    logger: StackbitTypes.Logger;
}): DocumentWithContext | undefined {
    const model = getModelByName(hygraphEntry.__typename);
    if (!model) {
        logger.error(`Model '${hygraphEntry.__typename}' for document ${hygraphEntry.id} not found`);
        return undefined;
    }

    // Omit all the system fields and get only the user defined fields
    const hygraphFields = _.omit(hygraphEntry, SystemDocumentFields);
    const nestedModelsInfo = {};
    const modelId = model?.context?.internalId;
    return omitByUndefined({
        type: 'document' as const,
        id: hygraphEntry.id,
        modelName: hygraphEntry.__typename,
        manageUrl: `${baseManageUrl}/content/${modelId}/entry/${hygraphEntry.id}`,
        status: getDocumentStatus(hygraphEntry),
        createdAt: hygraphEntry.createdAt,
        createdBy: hygraphEntry.createdBy?.name,
        updatedAt: hygraphEntry.updatedAt,
        updatedBy: hygraphEntry.updatedBy?.name ? [hygraphEntry.updatedBy.name] : undefined,
        context: {
            nestedModelsInfo
        },
        fields: convertFields({
            hygraphFields,
            model,
            nestedModelsInfo,
            getModelByName,
            fieldPath: [],
            logger
        })
    });
}

function convertFields({
    hygraphFields,
    model,
    nestedModelsInfo,
    getModelByName,
    fieldPath,
    logger
}: {
    hygraphFields: {
        localizations?: {
            locale: string;
            [key: string]: any;
        }[];
        [key: string]: any;
    };
    model: ModelWithContext;
    nestedModelsInfo: NestedModelsInfo;
    getModelByName: (modelName: string) => ModelWithContext | undefined;
    fieldPath: StackbitTypes.FieldPath;
    logger: StackbitTypes.Logger;
}): Record<string, StackbitTypes.DocumentField> {
    const fields: Record<string, StackbitTypes.DocumentField> = {};
    const { localizations = [], ...nonLocalizedFields } = hygraphFields;
    const localizedFields = localizations.reduce((accum: Record<string, Record<string, any>>, localizedFields) => {
        const { locale, ...fields } = localizedFields;
        for (const [fieldName, fieldValue] of Object.entries(fields)) {
            if (!(fieldName in accum)) {
                accum[fieldName] = {};
            }
            accum[fieldName]![locale] = fieldValue;
        }
        return accum;
    }, {});
    for (const [fieldName, fieldValue] of Object.entries({ ...nonLocalizedFields, ...localizedFields })) {
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
            isLocalizedField: !!modelField.localized,
            nestedModelsInfo,
            getModelByName,
            fieldInfo: model.context?.fieldInfoMap[fieldName],
            fieldPath: fieldPath.concat(modelField.name),
            logger
        });
        if (documentField) {
            fields[fieldName] = documentField;
        }
    }
    return fields;
}

type convertFieldOptions = {
    nestedModelsInfo: NestedModelsInfo;
    getModelByName: (modelName: string) => ModelWithContext | undefined;
    fieldInfo: FieldInfo | undefined;
    fieldPath: StackbitTypes.FieldPath;
    logger: StackbitTypes.Logger;
};

function convertField(
    options: {
        fieldValue: any;
        modelField: StackbitTypes.Field;
        isLocalizedField: boolean;
    } & convertFieldOptions
): StackbitTypes.DocumentField | undefined;
function convertField(
    options: {
        fieldValue: any[];
        modelField: StackbitTypes.FieldListItems;
        isLocalizedField: false;
    } & convertFieldOptions
): StackbitTypes.DocumentListFieldItems | undefined;
function convertField({
    fieldValue,
    modelField,
    isLocalizedField,
    nestedModelsInfo,
    getModelByName,
    fieldInfo,
    fieldPath,
    logger
}: {
    fieldValue: any;
    modelField: StackbitTypes.FieldSpecificProps;
    isLocalizedField: boolean;
} & convertFieldOptions): StackbitTypes.DocumentField | undefined {
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
                ...localizedIfNeeded(fieldValue, isLocalizedField, (value) => ({ value }))
            };
        }
        case 'color': {
            return {
                type: modelField.type,
                ...localizedIfNeeded(fieldValue, isLocalizedField, (value) => ({ value: colorToHex(value) }))
            };
        }
        case 'json': {
            return {
                type: modelField.type,
                ...localizedIfNeeded(fieldValue, isLocalizedField, (value) => ({ value }))
            };
        }
        case 'richText': {
            return {
                type: modelField.type,
                ...localizedIfNeeded(fieldValue, isLocalizedField, (value) => ({
                    value: value.markdown,
                    hint: value.text.substring(0, 50)
                }))
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
                ...localizedIfNeeded(fieldValue, isLocalizedField, (value) => ({ value }))
            };
        }
        case 'image': {
            nestedModelsInfo[fieldPath.join('.')] = {
                id: fieldValue.id,
                modelName: fieldValue.__typename,
                isMultiModel: false
            };
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
                logger.error(`Model '${fieldValue.__typename}' for field at path ${fieldPath.join('.')} not found`);
                return undefined;
            }
            const hygraphFields = _.omit(fieldValue, ['__typename', 'id', 'stage']);
            nestedModelsInfo[fieldPath.join('.')] = {
                id: fieldValue.id,
                modelName: model.name,
                isMultiModel: !!fieldInfo?.isMultiModel
            };
            return {
                type: modelField.type,
                modelName: model.name,
                fields: convertFields({
                    hygraphFields,
                    model,
                    nestedModelsInfo,
                    getModelByName,
                    fieldPath,
                    logger
                })
            };
        }
        case 'reference': {
            nestedModelsInfo[fieldPath.join('.')] = {
                id: fieldValue.id,
                modelName: fieldValue.__typename,
                isMultiModel: !!fieldInfo?.isMultiModel
            };
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
                ...localizedIfNeeded(fieldValue, isLocalizedField, (value) => ({
                    items: !Array.isArray(value)
                        ? []
                        : value
                              .map((itemValue, index) =>
                                  convertField({
                                      fieldValue: itemValue,
                                      modelField: modelField.items,
                                      isLocalizedField: false,
                                      nestedModelsInfo,
                                      getModelByName,
                                      fieldInfo,
                                      fieldPath: fieldPath.concat(index),
                                      logger
                                  })
                              )
                              .filter(
                                  (documentField): documentField is StackbitTypes.DocumentListFieldItems =>
                                      !!documentField
                              )
                }))
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

function getDocumentStatus(hygraphEntry: HygraphEntry): StackbitTypes.DocumentStatus {
    const publishedDoc = hygraphEntry.documentInStages?.find((doc) => doc.stage === 'PUBLISHED');
    if (!publishedDoc) {
        return 'added';
    }
    if (publishedDoc.updatedAt === hygraphEntry.updatedAt) {
        return 'published';
    }
    return 'modified';
}

function localizedIfNeeded<Type>(
    fieldValue: any,
    isLocalizedField: boolean,
    valueFn: (value: any) => Type
):
    | Type
    | {
          localized: true;
          locales: Record<
              string,
              {
                  locale: string;
              } & Type
          >;
      } {
    if (isLocalizedField) {
        return {
            localized: true,
            locales: _.mapValues(fieldValue, (value, locale) => {
                return {
                    locale,
                    ...valueFn(value)
                };
            })
        };
    } else {
        return valueFn(fieldValue);
    }
}

import _ from 'lodash';
import type * as StackbitTypes from '@stackbit/types';
import { omitByNil } from '@stackbit/utils';
import type * as HygraphTypes from './gql-types/gql-management-types';
import { SimpleFieldType, RelationalFieldType, VisibilityTypes } from './gql-types/gql-management-types';
import { HygraphField } from './hygraph-api-client';
import { colorToHex } from './utils';

type EnumOptionsById = Record<string, StackbitTypes.FieldEnumOptionObject[]>;

export type SchemaContext = {
    assetModelId: string | null;
    maxPaginationSize: number;
};

export type ModelWithContext = StackbitTypes.Model<ModelContext>;
export type ModelContext = {
    internalId: string;
    pluralId: string;
    isLocalized: boolean;
    fieldInfoMap: FieldInfoMap;
};

export type FieldInfoMap = Record<string, FieldInfo>;

export type FieldInfo = {
    type: string;
    hygraphType: string;
    isMultiModel: boolean;
};

export function convertModels({
    models,
    enumerations,
    components,
    logger
}: {
    models: HygraphTypes.Model[];
    enumerations: HygraphTypes.Enumeration[];
    components: HygraphTypes.Component[];
    logger: StackbitTypes.Logger;
}): ModelWithContext[] {
    const enumOptionsById = convertToEnumOptionsById(enumerations);
    return [...models, ...components].map((model) => {
        return convertModel({
            model,
            enumOptionsById,
            logger
        });
    });
}

function convertModel({
    model,
    enumOptionsById,
    logger
}: {
    model: HygraphTypes.Model | HygraphTypes.Component;
    enumOptionsById: EnumOptionsById;
    logger: StackbitTypes.Logger;
}): ModelWithContext {
    const fieldInfoMap: FieldInfoMap = {};
    return {
        type: model.__typename === 'Component' ? 'object' : 'data',
        name: model.apiId,
        label: model.displayName ?? _.startCase(model.apiId),
        description: model.description ?? undefined,
        labelField: getLabelField(model),
        fields: convertFields({
            fields: model.fields,
            enumOptionsById,
            fieldInfoMap,
            logger,
            debugContext: { modelName: model.apiId, modelType: model.__typename }
        }),
        context: {
            internalId: model.id,
            pluralId: model.apiIdPlural,
            isLocalized: model.isLocalized,
            fieldInfoMap
        }
    };
}

function getLabelField(model: HygraphTypes.Model | HygraphTypes.Component): string | undefined {
    if (!model.titleFields.length) {
        return;
    }
    return model.titleFields[0]!.apiId;
}

type DebugContext = {
    modelName: string;
    modelType?: 'Model' | 'Component';
};

function convertFields({
    fields,
    enumOptionsById,
    fieldInfoMap,
    debugContext,
    logger
}: {
    fields: HygraphTypes.IField[];
    enumOptionsById: EnumOptionsById;
    fieldInfoMap: FieldInfoMap;
    logger: StackbitTypes.Logger;
    debugContext: DebugContext;
}): StackbitTypes.Field[] {
    return fields
        .filter((fields) => !fields.isSystem)
        .sort((fieldA, fieldB) => fieldA.position - fieldB.position)
        .map((field) => {
            return convertField({
                field: field as HygraphField,
                enumOptionsById,
                fieldInfoMap,
                logger,
                debugContext
            });
        })
        .filter((field): field is NonNullable<StackbitTypes.Field> => !!field);
}

function convertField({
    field,
    enumOptionsById,
    fieldInfoMap,
    logger,
    debugContext
}: {
    field: HygraphField;
    enumOptionsById: EnumOptionsById;
    fieldInfoMap: FieldInfoMap;
    logger: StackbitTypes.Logger;
    debugContext: DebugContext;
}): StackbitTypes.Field | null {
    if (!field.__typename) {
        logger.warn(
            `Cannot convert field '${field.apiId}' of ${debugContext.modelType} '${debugContext.modelName}'. The field doesn't have the __typename property.`
        );
        return null;
    }
    const warningMessage = (reason: string) => {
        return `Cannot convert '${field.apiId}' field of type '${field.__typename}' in ${debugContext.modelType} '${debugContext.modelName}'. ${reason}`;
    };
    switch (field.__typename) {
        case 'SimpleField': {
            switch (field.type) {
                case SimpleFieldType.String: {
                    const rendered = field.formConfig?.renderer;
                    switch (rendered) {
                        case 'GCMS_MULTI_LINE':
                            return toFieldOrListField(field, {
                                type: 'text',
                                ...convertStringValidations(field)
                            });
                        case 'GCMS_SLUG':
                            return toFieldOrListField(field, {
                                type: 'slug',
                                ...convertStringValidations(field)
                            });
                        case 'GCMS_MARKDOWN':
                            return toFieldOrListField(field, {
                                type: 'markdown',
                                ...convertStringValidations(field)
                            });
                        case 'GCMS_SINGLE_LINE':
                        default:
                            return toFieldOrListField(field, {
                                type: 'string',
                                ...convertStringValidations(field)
                            });
                    }
                }
                case SimpleFieldType.Boolean: {
                    return toFieldOrListField(field, {
                        type: 'boolean'
                    });
                }
                case SimpleFieldType.Color: {
                    return toFieldOrListField(field, {
                        type: 'color'
                    });
                }
                case SimpleFieldType.Date: {
                    return toFieldOrListField(field, {
                        type: 'date'
                    });
                }
                case SimpleFieldType.Datetime: {
                    return toFieldOrListField(field, {
                        type: 'datetime'
                    });
                }
                case SimpleFieldType.Int: {
                    return toFieldOrListField(field, {
                        type: 'number',
                        subtype: 'int',
                        ...convertNumberValidations(field)
                    });
                }
                case SimpleFieldType.Float: {
                    return toFieldOrListField(field, {
                        type: 'number',
                        subtype: 'float',
                        ...convertNumberValidations(field)
                    });
                }
                case SimpleFieldType.Id: {
                    // ID is a system field, we filtered all isSystem fields in the previous step.
                    // We have this case to ensure we exhaust all possible field.type values so
                    // the default case with _exhaustiveCheck won't raise TypeScript error.
                    logger.warn(warningMessage('The field is a system ID field.'));
                    return null;
                }
                case SimpleFieldType.Json: {
                    return toFieldOrListField(field, {
                        type: 'json'
                    });
                }
                case SimpleFieldType.Location: {
                    // Netlify Visual-Editor doesn't support location fields yet.
                    // Leave it as json field, json fields are not shown in the visual editor.
                    return null;
                }
                case SimpleFieldType.Richtext: {
                    return toFieldOrListField(field, {
                        type: 'richText'
                    });
                }
                default: {
                    const _exhaustiveCheck: never = field;
                    return _exhaustiveCheck;
                }
            }
        }
        case 'EnumerableField': {
            const enumOptions = enumOptionsById[field.enumeration.id];
            if (!enumOptions) {
                logger.warn(warningMessage('No enumeration found.'));
                return null;
            }
            return toFieldOrListField(field, {
                type: 'enum',
                options: enumOptions,
                ...convertEnumValidations(field)
            });
        }
        case 'ComponentField': {
            fieldInfoMap[field.apiId] = {
                type: 'model',
                hygraphType: 'ComponentField',
                isMultiModel: false
            };
            return toFieldOrListField(field, {
                type: 'model',
                models: [field.component.apiId]
            });
        }
        case 'ComponentUnionField': {
            fieldInfoMap[field.apiId] = {
                type: 'model',
                hygraphType: 'ComponentUnionField',
                isMultiModel: true
            };
            return toFieldOrListField(field, {
                type: 'model',
                models: field.components.map((component) => component.apiId)
            });
        }
        case 'UniDirectionalRelationalField': {
            // Single model, one-way reference
            if (field.type !== RelationalFieldType.Relation) {
                logger.warn(
                    warningMessage("UniDirectionalRelationalField of non type other than 'relation' is not supported.")
                );
                return null;
            }
            fieldInfoMap[field.apiId] = {
                type: 'reference',
                hygraphType: 'UniDirectionalRelationalField',
                isMultiModel: false
            };
            return toFieldOrListField(field, {
                type: 'reference',
                models: [field.relatedModel.apiId]
            });
        }
        case 'RelationalField': {
            // Single model, two-way references. The back-reference is also RelationalField.
            if (field.type === RelationalFieldType.Relation) {
                fieldInfoMap[field.apiId] = {
                    type: 'reference',
                    hygraphType: 'RelationalField',
                    isMultiModel: false
                };
                return toFieldOrListField(field, {
                    type: 'reference',
                    models: [field.relatedModel.apiId]
                });
            } else {
                // Asset field
                return toFieldOrListField(field, {
                    type: 'image'
                });
            }
        }
        case 'UnionField': {
            // Multi-model, always two-way references, the model with original forward-reference has "isMemberType: false".
            // The model with te back-reference is also UnionField but with "isMemberType: true".
            fieldInfoMap[field.apiId] = {
                type: 'reference',
                hygraphType: 'UnionField',
                isMultiModel: !field.isMemberType
            };
            return toFieldOrListField(field, {
                type: 'reference',
                models: field.isMemberType
                    ? [field.union.field.parent.apiId]
                    : field.union.memberTypes.map((member) => member.parent.apiId)
            });
        }
        case 'RemoteField': {
            logger.warn(warningMessage('RemoteField is not implemented.'));
            return null;
        }
        default: {
            logger.warn(warningMessage(`Unsupported field type: ${field.__typename}.`));
            return null;
        }
    }
}
function toFieldOrListField(
    hgField: HygraphField,
    fieldSpecificProps: StackbitTypes.FieldListItems
): StackbitTypes.Field {
    return hgField.isList
        ? {
              type: 'list',
              ...convertFieldCommonProps(hgField),
              ...convertListValidations(hgField),
              items: {
                  ...fieldSpecificProps
              }
          }
        : {
              ...fieldSpecificProps,
              ...convertFieldCommonProps(hgField)
          };
}

function convertFieldCommonProps(field: HygraphField): StackbitTypes.FieldCommonProps {
    return omitByNil({
        name: field.apiId,
        label: field.displayName,
        description: field.description ?? undefined,
        required: ('isRequired' in field && field.isRequired) || undefined,
        localized: ('isLocalized' in field && field.isLocalized) || undefined,
        default: parseDefaultValue(field),
        hidden: field.visibility === VisibilityTypes.Hidden || undefined,
        readOnly: field.visibility === VisibilityTypes.ReadOnly || undefined
    });
}

function parseDefaultValue(field: HygraphField): any {
    if ('initialValue' in field) {
        if (field.__typename === 'EnumerableField') {
            if (field.isList) {
                return field.initialValueList?.map((item) => item.apiId);
            } else {
                return field.initialValue?.apiId;
            }
        }
        if (typeof field.initialValue === 'string') {
            try {
                const value = JSON.parse(field.initialValue);
                if (field.type === SimpleFieldType.Color) {
                    // Color field has "rgba" value, but visual editor uses hex.
                    // { rgba: { r: 255, g: 255, b: 255, a: 1 } } => #FFFFFFFF
                    return colorToHex(value);
                }
                return value;
            } catch (error) {
                return undefined;
            }
        }
    }
    return undefined;
}

function convertStringValidations(field: HygraphTypes.SimpleField) {
    let validations:
        | (StackbitTypes.FieldValidationsUnique &
              StackbitTypes.FieldValidationsStringLength &
              StackbitTypes.FieldValidationsRegExp)
        | undefined = {
        errors: {}
    };
    if (field.isUnique) {
        validations.unique = true;
    }
    if (field.validations) {
        if ('characters' in field.validations && field.validations.characters) {
            validations.min = field.validations.characters.min ?? undefined;
            validations.max = field.validations.characters.max ?? undefined;
            if (field.validations.characters.errorMessage) {
                validations.errors!.min = field.validations.characters.errorMessage;
                validations.errors!.max = field.validations.characters.errorMessage;
            }
        }
        if ('matches' in field.validations && field.validations.matches) {
            validations.regexp = field.validations.matches.regex ?? undefined;
            if (field.validations.matches.errorMessage) {
                validations.errors!.regexp = field.validations.matches.errorMessage;
            }
        }
        if ('notMatches' in field.validations && field.validations.notMatches) {
            validations.regexpNot = field.validations.notMatches.regex ?? undefined;
            if (field.validations.notMatches.errorMessage) {
                validations.errors!.regexpNot = field.validations.notMatches.errorMessage;
            }
        }
    }
    return sanitizeValidations(validations);
}

function convertNumberValidations(field: HygraphTypes.SimpleField) {
    let validations: (StackbitTypes.FieldValidationsUnique & StackbitTypes.FieldValidationsNumberRange) | undefined = {
        errors: {}
    };
    if (field.isUnique) {
        validations.unique = true;
    }
    if (field.validations && 'range' in field.validations && field.validations.range) {
        validations.min = field.validations.range.min ?? undefined;
        validations.max = field.validations.range.max ?? undefined;
        if (field.validations.range.errorMessage) {
            validations.errors!.min = field.validations.range.errorMessage;
            validations.errors!.max = field.validations.range.errorMessage;
        }
    }
    return sanitizeValidations(validations);
}

function convertEnumValidations(field: HygraphTypes.EnumerableField) {
    let validations: StackbitTypes.FieldValidationsUnique | undefined = { errors: {} };
    if (field.isUnique) {
        validations.unique = true;
    }
    return sanitizeValidations(validations);
}

function convertListValidations(field: HygraphField) {
    let validations: StackbitTypes.FieldValidationsListLength | undefined = { errors: {} };
    if (
        'validations' in field &&
        field.validations &&
        'listItemCount' in field.validations &&
        field.validations.listItemCount
    ) {
        validations.min = field.validations.listItemCount.min ?? undefined;
        validations.max = field.validations.listItemCount.max ?? undefined;
        if (field.validations.listItemCount.errorMessage) {
            validations.errors!.min = field.validations.listItemCount.errorMessage;
            validations.errors!.max = field.validations.listItemCount.errorMessage;
        }
    }
    return sanitizeValidations(validations);
}

function sanitizeValidations<
    Type extends StackbitTypes.FieldValidationsUnique &
        StackbitTypes.FieldValidationsStringLength &
        StackbitTypes.FieldValidationsRegExp &
        StackbitTypes.FieldValidationsNumberRange &
        StackbitTypes.FieldValidationsListLength
>(validations: Type): { validations: Type } | undefined {
    if (_.isEmpty(validations.errors)) {
        delete validations.errors;
    }
    if (_.isEmpty(validations)) {
        return undefined;
    }
    return { validations };
}

function convertToEnumOptionsById(enumerations: HygraphTypes.Enumeration[]): EnumOptionsById {
    return enumerations.reduce((enumsById: EnumOptionsById, enumeration) => {
        enumsById[enumeration.id] = enumeration.values.map((hgEnumValue: HygraphTypes.EnumerationValue) => ({
            label: hgEnumValue.displayName,
            value: hgEnumValue.apiId
        }));
        return enumsById;
    }, {});
}

import _ from 'lodash';
import type * as StackbitTypes from '@stackbit/types';
import type * as HygraphTypes from './gql-management-types';
import { SimpleFieldType, RelationalFieldType, VisibilityTypes } from './gql-management-types';
import { omitByNil } from '@stackbit/utils';

// The generated graphql types in the "gql-management-types.ts" file include the original field names.
// However, some fields in the "schema.ts" query were aliased due to conflicts between types.
// Remap some of the field names matching aliases in the query.
type HygraphField =
    | (Omit<HygraphTypes.SimpleField, 'type' | 'validations'> & {
          fieldType: HygraphTypes.SimpleField['type'];
          validations?:
              | Exclude<HygraphTypes.SimpleFieldValidations, HygraphTypes.FloatFieldValidations>
              | (Omit<HygraphTypes.FloatFieldValidations, 'range'> & {
                    floatRange?: HygraphTypes.FloatFieldValidations['range'];
                });
      })
    | (Omit<HygraphTypes.EnumerableField, 'type' | 'initialValue'> & {
          enumType: HygraphTypes.EnumerableFieldType;
          defaultEnumerationValue?: HygraphTypes.EnumerableField['initialValue'];
      })
    | (Omit<HygraphTypes.ComponentField, 'type'> & {
          componentType: HygraphTypes.ComponentField['type'];
      })
    | (Omit<HygraphTypes.ComponentUnionField, 'type'> & {
          componentUnionType: HygraphTypes.ComponentUnionField['type'];
      })
    | (Omit<HygraphTypes.RelationalField, 'type'> & {
          relationType: HygraphTypes.RelationalFieldType;
      })
    | (Omit<HygraphTypes.UniDirectionalRelationalField, 'type'> & {
          relationType: HygraphTypes.RelationalFieldType;
      })
    | (Omit<HygraphTypes.UnionField, 'type'> & {
          unionType: HygraphTypes.UnionField['type'];
      })
    | (Omit<HygraphTypes.RemoteField, 'type'> & {
          remoteType: HygraphTypes.RemoteField['type'];
      });

type EnumOptionsById = Record<string, StackbitTypes.FieldEnumOptionObject[]>;

export type SchemaContext = {
    assetModelId: string | null;
    maxPaginationSize: number;
};

// Remap model.context to be required for easier typing.
export type ModelWithContext = StackbitTypes.Model<ModelContext>;
export type ModelContext = {
    internalId: string;
    pluralId: string;
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
            switch (field.fieldType) {
                case SimpleFieldType.String: {
                    const rendered = field.formConfig?.renderer;
                    switch (rendered) {
                        case 'GCMS_MULTI_LINE':
                            return toFieldOrListField(field, {
                                type: 'text'
                            });
                        case 'GCMS_SLUG':
                            return toFieldOrListField(field, {
                                type: 'slug'
                            });
                        case 'GCMS_MARKDOWN':
                            return toFieldOrListField(field, {
                                type: 'markdown'
                            });
                        case 'GCMS_SINGLE_LINE':
                        default:
                            return toFieldOrListField(field, {
                                type: 'string'
                            });
                    }
                }
                case SimpleFieldType.Boolean: {
                    return toFieldOrListField(field, {
                        type: 'boolean'
                    });
                }
                case SimpleFieldType.Color: {
                    // TODO: convert default color value to hex string
                    // { rgba: { r: 255, g: 255, b: 255, a: 1 } } => #FFFFFFFF
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
                        subtype: 'int'
                    });
                }
                case SimpleFieldType.Float: {
                    return toFieldOrListField(field, {
                        type: 'number',
                        subtype: 'float'
                    });
                }
                case SimpleFieldType.Id: {
                    // ID is a system field, we filtered all isSystem fields in the previous step.
                    logger.warn(warningMessage('The field is a system ID field.'));
                    return null;
                }
                case SimpleFieldType.Json: {
                    return toFieldOrListField(field, {
                        type: 'json'
                    });
                }
                case SimpleFieldType.Location: {
                    // Netlify create doesn't support location fields yet.
                    // Leave it as json field, json fields are not shown in the visual editor.
                    return null;
                }
                case SimpleFieldType.Richtext: {
                    return toFieldOrListField(field, {
                        type: 'richText'
                    });
                }
                default: {
                    const _exhaustiveCheck: never = field.fieldType;
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
                options: enumOptions
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
            if (field.relationType !== RelationalFieldType.Relation) {
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
            if (field.relationType === RelationalFieldType.Relation) {
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
            // TODO: implement remote field
            logger.warn(warningMessage('RemoteField is not yet implemented.'));
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
        // TODO: implement validations
        // validations: ...
    });
}

function parseDefaultValue(field: HygraphField): any {
    if ('initialValue' in field) {
        if (typeof field.initialValue === 'string') {
            try {
                return JSON.parse(field.initialValue);
            } catch (error) {
                return undefined;
            }
        }
    } else if ('defaultEnumerationValue' in field) {
        return field.defaultEnumerationValue?.apiId;
    }
    return undefined;
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

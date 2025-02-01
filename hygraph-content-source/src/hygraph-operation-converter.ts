import _ from 'lodash';
import type * as StackbitTypes from '@stackbit/types';
import { getDocumentFieldAtFieldPath } from '@stackbit/utils';
import type { DocumentWithContext } from './hygraph-entries-converter';
import type { ModelWithContext } from './hygraph-schema-converter';

/**
 * Converts a map of {@link StackbitTypes.UpdateOperationFields} into the "data"
 * parameter expected by the Hygraph's GraphQL create<MODEL> mutation.
 *
 * ```js
 * const data = convertUpdateOperationFields({
 *   updateOperationFields,  // Map between field names and {@link StackbitTypes.UpdateOperationField}
 *   model,                  // The model for the new document
 *   getModelByName,
 *   getModelNameForDocumentId
 * });
 *
 * const query = gql`
 * mutation createDocument($data: ModelXCreateInput!) {
 *   createModelX(
 *     data: $data
 *   ) {
 *     ...ModelXFields
 *   }
 * }`
 *
 * client.request(query, { data });
 * ```
 *
 * @param updateOperationFields
 * @param model
 * @param getModelByName
 * @param getModelNameForDocumentId
 */
export function convertUpdateOperationFields({
    updateOperationFields,
    model,
    getModelByName,
    getModelNameForDocumentId
}: {
    updateOperationFields: Record<string, StackbitTypes.UpdateOperationField>;
    model: ModelWithContext;
    getModelByName: (name: string) => ModelWithContext | undefined;
    getModelNameForDocumentId: (id: string) => string | undefined;
}): Record<string, any> {
    const data: Record<string, any> = {};
    for (const [fieldName, updateOperationField] of Object.entries(updateOperationFields)) {
        const value = convertUpdateOperationFieldToValue({
            updateOperationField,
            fieldName,
            model,
            getModelByName,
            getModelNameForDocumentId
        });
        if (typeof value !== 'undefined') {
            data[fieldName] = value;
        }
    }
    return data;
}

/**
 * Converts an array of {@link StackbitTypes.UpdateOperation} into the "data"
 * parameter expected by the Hygraph's GraphQL update<MODEL> mutation for a given
 * document.
 *
 * @param operations
 * @param document
 * @param getModelByName
 * @param getModelNameForDocumentId
 */
export function convertOperations({
    operations,
    document,
    getModelByName,
    getModelNameForDocumentId
}: {
    operations: StackbitTypes.UpdateOperation[];
    document: DocumentWithContext;
    getModelByName: (name: string) => ModelWithContext | undefined;
    getModelNameForDocumentId: (id: string) => string | undefined;
}): Record<string, any> {
    const result: Record<string, any> = {};
    for (const operation of operations) {
        switch (operation.opType) {
            case 'set': {
                const data = createUpdateObjectFromFieldPath({
                    fieldPath: operation.fieldPath,
                    document,
                    getModelByName,
                    value: (fieldName, model, isListItem) => {
                        const value = convertUpdateOperationFieldToValue({
                            updateOperationField: operation.field,
                            fieldName,
                            model,
                            getModelByName,
                            getModelNameForDocumentId
                        });
                        if (isListItem && isSimpleFieldType(operation.modelField.type)) {
                            const documentField = getDocumentFieldAtFieldPath({
                                document,
                                fieldPath: _.dropRight(operation.fieldPath)
                            });
                            if (documentField.type !== 'list') {
                                throw new Error(`Error updating document, cannot reorder non list field`);
                            }
                            let newList = (documentField.items as SimpleDocumentListFieldItems[]).map(
                                (item) => item.value
                            );
                            if (operation.modelField.type === 'enum') {
                                newList = newList.map((value) => ({ enum: value }));
                            }
                            const itemIndex = _.last(operation.fieldPath) as number;
                            newList.splice(itemIndex, 1, value);
                            return newList;
                        } else {
                            return value;
                        }
                    }
                });
                _.merge(result, data);
                break;
            }
            case 'unset': {
                const data = createUpdateObjectFromFieldPath({
                    fieldPath: operation.fieldPath,
                    document,
                    getModelByName,
                    value: () => {
                        const modelField = operation.modelField;
                        if (modelField.type === 'model') {
                            return { delete: true };
                        } else if (modelField.type === 'image' || modelField.type === 'reference') {
                            return { disconnect: true };
                        } else {
                            return null;
                        }
                    }
                });
                _.merge(result, data);
                break;
            }
            case 'insert': {
                let customizer: undefined | ((objValue: any, srcValue: any, key: any) => any);
                const data = createUpdateObjectFromFieldPath({
                    fieldPath: operation.fieldPath,
                    document,
                    getModelByName,
                    value: (fieldName, model) => {
                        let insertBeforeId: string | undefined;
                        if (typeof operation.index !== 'undefined') {
                            const fieldPathStr = operation.fieldPath.concat(operation.index).join('.');
                            insertBeforeId = document.context.nestedModelsInfo[fieldPathStr]?.id;
                        }
                        let value = convertUpdateOperationFieldToValue({
                            updateOperationField: operation.item,
                            fieldName,
                            model,
                            getModelByName,
                            getModelNameForDocumentId,
                            isListItem: true,
                            insertBeforeId
                        });
                        // For scalar list items, the convertUpdateOperationFieldToValue returns single item,
                        // but the updated value should be the whole list.
                        if (!isSimpleFieldType(operation.modelField.items.type)) {
                            const action = operation.modelField.items.type === 'model' ? 'create' : 'connect';
                            // when user inserts multiple referenced objects, there will be several successive operations,
                            // the customizer in _.merge(result, data, customizer), ensures that the values in list will be concatenated
                            customizer = function customizer(objValue, srcValue) {
                                if (_.isArray(objValue)) {
                                    return objValue.concat(srcValue);
                                }
                            }
                            return { [action]: [value] };
                        } else {
                            const documentField = getDocumentFieldAtFieldPath({
                                document,
                                fieldPath: operation.fieldPath
                            });
                            if (documentField.type !== 'list') {
                                throw new Error(`Error updating document, cannot reorder non list field`);
                            }
                            let newList = (documentField.items as SimpleDocumentListFieldItems[]).map(
                                (item) => item.value
                            );
                            if (operation.modelField.items.type === 'enum') {
                                newList = newList.map((value) => ({ enum: value }));
                            }
                            // When adding new string/text items to lists from visual-editor, the value may be undefined,
                            // this breaks GraphQL. Set the value to empty string to fix this behavior.
                            if (typeof value === 'undefined' && ['string', 'text'].includes(operation.item.type)) {
                                value = '';
                            }
                            if (typeof operation.index !== 'undefined') {
                                newList.splice(operation.index, 0, value);
                            } else {
                                newList.push(value);
                            }
                            return newList;
                        }
                    }
                });
                if (customizer) {
                    _.mergeWith(result, data, customizer);
                } else {
                    _.merge(result, data);
                }
                break;
            }
            case 'remove': {
                const modelField = operation.modelField;
                const fieldPath = operation.fieldPath.concat(operation.index);
                const data = createUpdateObjectFromFieldPath({
                    fieldPath: fieldPath,
                    document,
                    getModelByName,
                    value: () => {
                        if (isSimpleFieldType(modelField.items.type)) {
                            const documentField = getDocumentFieldAtFieldPath({
                                document,
                                fieldPath: operation.fieldPath
                            });
                            if (documentField.type !== 'list') {
                                throw new Error(`Error updating document, cannot reorder non list field`);
                            }
                            let newList = (documentField.items as SimpleDocumentListFieldItems[]).map(
                              (item) => item.value
                            );
                            if (operation.modelField.items.type === 'enum') {
                                newList = newList.map((value) => ({ enum: value }));
                            }
                            newList.splice(operation.index, 1);
                            return newList;
                        } else {
                            const fieldPathStr = fieldPath.join('.');
                            const nestedModelInfo = document.context.nestedModelsInfo[fieldPathStr];
                            if (!nestedModelInfo) {
                                throw new Error(
                                  `Error updating document, component ID at path ${fieldPathStr} not found`
                                );
                            }
                            const deleteObject = { id: nestedModelInfo.id };
                            const action = modelField.items.type === 'model' ? 'delete' : 'disconnect';
                            return {
                                [action]: nestedModelInfo.isMultiModel
                                  ? {
                                      [nestedModelInfo.modelName]: deleteObject
                                  }
                                  : deleteObject
                            };
                        }
                    }
                });
                _.merge(result, data);
                break;
            }
            case 'reorder': {
                const documentField = getDocumentFieldAtFieldPath({ document, fieldPath: operation.fieldPath });
                const modelField = operation.modelField;
                if (documentField.type !== 'list' || modelField.type !== 'list') {
                    throw new Error(`Error updating document, cannot reorder non list field`);
                }

                let newList: unknown[] = [];
                if (
                    modelField.items.type === 'model' ||
                    modelField.items.type === 'image' ||
                    modelField.items.type === 'reference'
                ) {
                    // For list with "model" or "reference" item types create a list with new item positions
                    // List of single components:
                    // [fieldName]: {
                    //   update: [
                    //     { where: { id: "cm6ih66dp0x2t0ek0q3f88ux4" }, position: { start: true } },
                    //     { where: { id: "cm6ih66di0x2r0ek08dzzzqr7" }, position: { after: "cm6ih66dp0x2t0ek0q3f88ux4" } },
                    //     { where: { id: "cm6ih66cw0x2p0ek0d77p1xdi" }, position: { after: "cm6ih66di0x2r0ek08dzzzqr7" } }
                    //   ]
                    // },
                    // List of multiple components:
                    // [fieldName]:: {
                    //   update: [
                    //     { ComponentModel1: { where: { id: "cm6ih66dp0x2t0ek0q3f88ux4" }, position: { start: true } } },
                    //     { ComponentModel1: { where: { id: "cm6ih66di0x2r0ek08dzzzqr7" }, position: { after: "cm6ih66dp0x2t0ek0q3f88ux4" } } },
                    //     { ComponentModel2: { where: { id: "cm6ih66cw0x2p0ek0d77p1xdi" }, position: { after: "cm6ih66di0x2r0ek08dzzzqr7"  } } }
                    //   ]
                    // },
                    // For list of single and multiple references or images, the "update" is replaced with "connect"
                    let previousItemId: null | string = null;
                    for (let index = 0; index < operation.order.length; index++) {
                        const originalIndex = operation.order[index]!;
                        const fieldPathStr = operation.fieldPath.concat(originalIndex).join('.');
                        const nestedModelInfo = document.context.nestedModelsInfo[fieldPathStr];
                        if (!nestedModelInfo) {
                            throw new Error(`Error updating document, component ID at path ${fieldPathStr} not found`);
                        }
                        if (originalIndex !== index) {
                            const update = {
                                where: { id: nestedModelInfo.id },
                                position: index === 0 ? { start: true } : { after: previousItemId }
                            };
                            newList.push(
                                nestedModelInfo.isMultiModel ? { [nestedModelInfo.modelName]: update } : update
                            );
                        }
                        previousItemId = nestedModelInfo.id;
                    }
                } else if (modelField.items.type === 'cross-reference') {
                    throw new Error(`Reordering cross-reference is not supported yet.`);
                } else {
                    // For all other field types, reorder the items and generate new list
                    newList = operation.order.map(
                        (newIndex) => (documentField.items as SimpleDocumentListFieldItems[])[newIndex]!.value
                    );
                    if (operation.modelField.items.type === 'enum') {
                        newList = newList.map((value) => ({ enum: value }));
                    }
                }

                const data = createUpdateObjectFromFieldPath({
                    fieldPath: operation.fieldPath,
                    document,
                    getModelByName,
                    value: (fieldName, model) => {
                        if (modelField.items.type === 'model') {
                            return { update: newList };
                        } else if (modelField.items.type === 'image' || modelField.items.type === 'reference') {
                            return { connect: newList };
                        } else {
                            return newList;
                        }
                    }
                });

                _.merge(result, data);
                break;
            }
        }
    }
    return result;
}

/**
 * Constructs the "data" parameter for a specific field for GraphQL update<MODEL> mutation.
 *
 * ```js
 * const data = createUpdateObjectFromFieldPath({
 *   document,       // The document of ModelX to update
 *   fieldPath,      // The path of the field to update
 *   getModelByName,
 *   value           // The callback function that computes the new value
 * });
 *
 * const query = gql`
 * mutation updateDocument($data: ModelXUpdateInput!) {
 *   updateModelX(
 *     where: { id: "OBJECT_ID" }
 *     data: $data
 *   ) {
 *      ...ModelXFields
 *   }
 * }`
 *
 * client.request(query, { data });
 * ```
 *
 * This function is responsible to construct the "data" object up to the updated
 * field. Then it delegates the computation of the updated value using the
 * provided "value" callback. Finally, it returns the full "data" parameter.
 *
 * For example, to create "data" parameter for a GraphQL query to update a
 * "title" field of a document:
 * ```js
 * createUpdateObjectFromFieldPath({
 *   document,
 *   fieldPath: ["title"],
 *   getModelByName,
 *   value: (fieldName, model) => {
 *     return "hello world"
 *   }
 * })
 * =>
 * {
 *   "title": "hello world"
 * }
 * ```
 *
 * In a more complex scenario, the updated field may be deeply nested inside
 * nested components and arrays:
 * ```js
 * createUpdateObjectFromFieldPath({
 *   document,
 *   fieldPath: ["sections", 2, "button", "title"],
 *   getModelByName,
 *   value: (fieldName, model) => {
 *     return "hello world"
 *   }
 * })
 * =>
 * {
 *   sections: {
 *     update: {
 *       HeroSection: {
 *         where: { id: "HERO_COMPONENT_ID" },
 *         data: {
 *           button: {
 *             update: {
 *               where: { id: "BUTTON_COMPONENT_ID" }
 *               data: {
 *                 title: "hello world"
 *               }
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * If the updated field is a reference, component, or a list, the "value"
 * callback should return the appropriate data:
 * ```js
 * createUpdateObjectFromFieldPath({
 *   document,
 *   fieldPath: ["author"],
 *   getModelByName,
 *   value: (fieldName, model) => {
 *     return { connect: { id: "REFERENCE_ID" } }
 *   }
 * })
 * =>
 * {
 *   "title": "hello world"
 * }
 * ```
 *
 * @param fieldPath The path to the updated field in the updated document
 * @param document The updated document
 * @param getModelByName A function that returns model by name
 * @param value A function that computes the value for the updated field
 */
function createUpdateObjectFromFieldPath({
    fieldPath,
    document,
    getModelByName,
    value
}: {
    fieldPath: StackbitTypes.FieldPath;
    document: DocumentWithContext;
    getModelByName: (name: string) => ModelWithContext | undefined;
    value: (fieldName: string, model: ModelWithContext, isListItem: boolean) => any;
}) {
    const data: Record<string, any> = {};
    let nextValue: any;
    let currValue: Record<string, any> = data;
    let model: ModelWithContext | undefined = getModelByName(document.modelName)!;
    let lastStringFieldName: string;
    let isListItem = false;
    if (!model) {
        throw new Error(`Model '${document.modelName}' not found`);
    }
    for (let idx = 0; idx < fieldPath.length; idx++) {
        const targetField = idx === fieldPath.length - 1;
        const fieldName = fieldPath[idx]!;
        // If fieldName is not a string, then it must be a number, meaning it is an index of a list item.
        if (typeof fieldName === 'string') {
            isListItem = false;
            lastStringFieldName = fieldName;
            const modelField = (model.fields ?? []).find((field) => field.name === fieldName);
            if (!modelField) {
                throw new Error(`Model field '${fieldName}' in model ${model.name} not found`);
            }
            if (modelField.type === 'list' && !targetField) {
                isListItem = true;
                continue;
            }
        }
        const fieldPathStr = fieldPath.slice(0, idx + 1).join('.');
        if (targetField) {
            currValue[lastStringFieldName!] = value(lastStringFieldName!, model, isListItem);
        } else {
            // If it is not a target field, then it must be a nested model (Hygraph Component)
            const nestedModelInfo = document.context.nestedModelsInfo[fieldPathStr];
            if (!nestedModelInfo) {
                throw new Error(`Error updating document, component ID at path ${fieldPathStr} not found`);
            }
            nextValue = {};
            model = getModelByName(nestedModelInfo.modelName);
            if (!model) {
                throw new Error(`Model '${document.modelName}' not found`);
            }
            const update = {
                where: { id: nestedModelInfo.id },
                data: nextValue
            };
            currValue[lastStringFieldName!] = {
                update: nestedModelInfo.isMultiModel
                    ? {
                          [nestedModelInfo.modelName]: update
                      }
                    : update
            };
        }
        currValue = nextValue;
    }
    return data;
}

function convertUpdateOperationFieldToValue({
    updateOperationField,
    fieldName,
    model,
    getModelByName,
    getModelNameForDocumentId,
    isListItem = false,
    insertBeforeId
}: {
    updateOperationField: StackbitTypes.UpdateOperationField;
    fieldName: string;
    model: ModelWithContext;
    getModelByName: (modelName: string) => ModelWithContext | undefined;
    getModelNameForDocumentId: (id: string) => string | undefined;
    isListItem?: boolean;
    insertBeforeId?: string;
}): any {
    if (updateOperationField.type === 'object') {
        throw new Error(`Fields of type 'object' not supported in Hygraph.`);
    } else if (updateOperationField.type === 'model') {
        const childModel = getModelByName(updateOperationField.modelName);
        if (!childModel) {
            throw new Error(`Model '${updateOperationField.modelName}' not found`);
        }
        let createData = _.reduce(
            updateOperationField.fields,
            (accum: Record<string, any>, updateOperationField, fieldName) => {
                accum[fieldName] = convertUpdateOperationFieldToValue({
                    fieldName,
                    updateOperationField,
                    model: childModel,
                    getModelByName,
                    getModelNameForDocumentId
                });
                return accum;
            },
            {}
        );
        const modelInfo = model.context?.fieldInfoMap[fieldName];
        if (isListItem) {
            if (insertBeforeId) {
                createData = {
                    position: { before: insertBeforeId },
                    data: createData
                };
            } else {
                createData = { data: createData };
            }
            return modelInfo?.isMultiModel ? { [updateOperationField.modelName]: createData } : createData;
        } else {
            return {
                create: modelInfo?.isMultiModel ? { [updateOperationField.modelName]: createData } : createData
            };
        }
    } else if (updateOperationField.type === 'reference') {
        let connectData: any = { id: updateOperationField.refId };
        const modelInfo = model.context?.fieldInfoMap[fieldName];
        const modelName = getModelNameForDocumentId(updateOperationField.refId)!;
        if (isListItem) {
            if (insertBeforeId) {
                connectData = {
                    where: connectData,
                    position: { before: insertBeforeId }
                };
            } else {
                connectData = { where: connectData };
            }
            return modelInfo?.isMultiModel ? { [modelName]: connectData } : connectData;
        } else {
            return { connect: modelInfo?.isMultiModel ? { [modelName]: connectData } : connectData };
        }
    } else if (updateOperationField.type === 'cross-reference') {
        throw new Error(`Setting cross-reference is not supported yet.`);
    } else if (updateOperationField.type === 'list') {
        const modelField = (model.fields ?? []).find((field) => field.name === fieldName);
        if (!modelField) {
            throw new Error(`Model field '${fieldName}' in model '${model.name}' not found`);
        }
        if (modelField.type !== 'list') {
            throw new Error(
                `Model field '${fieldName}' in model '${model.name}' is of type '${modelField.type}' and doesn't match update operation field of type 'list'`
            );
        }
        const firstItem = updateOperationField.items[0];
        if (!firstItem) {
            throw new Error(`UpdateOperationField of type 'list' must contain at least one item`);
        }
        const values = updateOperationField.items.map((updateOperationListFieldItem) => {
            return convertUpdateOperationFieldToValue({
                fieldName,
                updateOperationField: updateOperationListFieldItem,
                model,
                getModelByName,
                getModelNameForDocumentId,
                isListItem: true
            });
        });
        if (firstItem.type === 'model') {
            return { create: values };
        } else if (firstItem.type === 'reference') {
            return { connect: values };
        } else if (firstItem.type === 'cross-reference') {
            throw new Error(`Setting cross-reference is not supported yet.`);
        } else {
            return values;
        }
    } else if (updateOperationField.type === 'enum') {
        // serializeQueryArgValue expects enum values to be wrapped in an object with 'enum' property
        return {
            enum: updateOperationField.value
        };
    } else {
        return updateOperationField.value;
    }
}

type SimpleFieldType = Exclude<
    StackbitTypes.FieldType,
    | StackbitTypes.FieldImage['type']
    | StackbitTypes.FieldObject['type']
    | StackbitTypes.FieldModel['type']
    | StackbitTypes.FieldReference['type']
    | StackbitTypes.FieldCrossReference['type']
    | StackbitTypes.FieldList['type']
>;

export type DocumentListFieldItemsForType<Type extends StackbitTypes.FieldType> = StackbitTypes.ExtractByType<
    StackbitTypes.DocumentListFieldItems,
    Type
>;
type SimpleDocumentListFieldItems = DocumentListFieldItemsForType<SimpleFieldType>;

function isSimpleFieldType(fieldType: StackbitTypes.FieldType): fieldType is SimpleFieldType {
    return !['image', 'object', 'model', 'reference', 'cross-reference', 'list'].includes(fieldType);
}

import _, { before } from 'lodash';
import type * as StackbitTypes from '@stackbit/types';
import { DocumentWithContext, NestedModelsInfo } from './hygraph-entries-converter';
import { ModelWithContext } from './hygraph-schema-converter';

export function convertUpdateOperationFields({
    updateOperationFields,
    model,
    getModelByName
}: {
    updateOperationFields: Record<string, StackbitTypes.UpdateOperationField>;
    model: ModelWithContext;
    getModelByName: (name: string) => ModelWithContext | undefined;
}): Record<string, any> {
    const data: Record<string, any> = {};
    for (const [fieldName, updateOperationField] of Object.entries(updateOperationFields)) {
        const value = convertUpdateOperationFieldToValue({
            updateOperationField,
            fieldName,
            model,
            getModelByName
        });
        if (typeof value !== 'undefined') {
            data[fieldName] = value;
        }
    }
    return data;
}

export function convertOperations({
    operations,
    document,
    getModelByName
}: {
    operations: StackbitTypes.UpdateOperation[];
    document: DocumentWithContext;
    getModelByName: (name: string) => ModelWithContext | undefined;
}): Record<string, any> {
    const result: Record<string, any> = {};
    for (const operation of operations) {
        switch (operation.opType) {
            case 'set': {
                const data = createUpdateObjectFromFieldPath({
                    fieldPath: operation.fieldPath,
                    document,
                    getModelByName,
                    value: (fieldName, model) =>
                        convertUpdateOperationFieldToValue({
                            updateOperationField: operation.field,
                            fieldName,
                            model,
                            getModelByName
                        })
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
                        if (operation.modelField.type === 'model') {
                            return { delete: true };
                        } else if (operation.modelField.type === 'image' || operation.modelField.type === 'reference') {
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

                        return convertUpdateOperationFieldToValue({
                            updateOperationField: operation.item,
                            fieldName,
                            model,
                            getModelByName,
                            isListItem: true,
                            insertBeforeId
                        });
                    }
                });
                _.merge(result, data);
                break;
            }
            case 'remove': {
                const fieldPath = operation.fieldPath.concat(operation.index);
                const data = createUpdateObjectFromFieldPath({
                    fieldPath: fieldPath,
                    document,
                    getModelByName,
                    value: () => {
                        if (operation.modelField.items.type === 'model') {
                            const fieldPathStr = fieldPath.join('.');
                            const nestedModelInfo = document.context.nestedModelsInfo[fieldPathStr];

                            if (!nestedModelInfo) {
                                throw new Error(
                                    `Error updating document, component ID at path ${fieldPathStr} not found`
                                );
                            }
                            const deleteObject = { id: nestedModelInfo.id };
                            return {
                                delete: nestedModelInfo.isMultiModel
                                    ? {
                                        [nestedModelInfo.modelName]: deleteObject
                                    }
                                    : deleteObject
                            };
                        } else {
                            return null;
                        }
                    }
                });
                _.merge(result, data);
                break;
            }
            case 'reorder': {
                const orderData = getReorderData(operation.order);

                const fieldPath = operation.fieldPath;

                const fieldPathStr = fieldPath.join('.');
                const nestedModelInfo = document.context.nestedModelsInfo[fieldPathStr] || getModelByName(document.modelName)?.context?.fieldInfoMap[fieldPathStr];
                const isMultiModel = nestedModelInfo?.isMultiModel;

                const itemPath = `${operation.fieldPath.join('.')}.${orderData.itemIndex}`;
                const modelName = document.context.nestedModelsInfo[itemPath]!.modelName

                const positionObject = generatePositionObject(orderData, document.context.nestedModelsInfo, fieldPath);

                const reorderObject = {
                    where: {
                        id: document.context.nestedModelsInfo[itemPath]!.id,
                    },
                    position: positionObject
                };
                            
                const data = createUpdateObjectFromFieldPath({
                    fieldPath: fieldPath,
                    document,
                    getModelByName,
                    value: () => ({
                        update: isMultiModel
                        ? {
                            [modelName]: reorderObject
                        }
                        : reorderObject
                    })
                });

                _.merge(result, data);
                break;
            }
        }
    }
    return result;
}

function generatePositionObject(orderData: { newPosition: number; itemIndex: number}, nestedModelInfo: NestedModelsInfo, fieldPath: (String | number)[]) {
    if (orderData.newPosition === 0) {
        return {
            start: true
        };
    }

    const fieldPathStr = fieldPath.join('.');
    const itemsCount = Object.keys(nestedModelInfo).filter((key) => new RegExp(`^${fieldPathStr}\.(\\d)+$`).test(key)).length;

    if (itemsCount === orderData.newPosition + 1) {
        return {
            end: true
        };
    }
    
    const itemPath = `${fieldPath.join('.')}.${orderData.newPosition}`;
    const id = nestedModelInfo[itemPath]!.id;

    return {
        before: id
    }
}

function getReorderData(arr: any[]) {
    return arr.reduce((acc, curr, idx, arr) => {
        if (acc) {
            return acc;
        }

        if (idx === 0 && curr > arr[idx + 1]) {
            return {
                newPosition: idx,
                itemIndex: curr,
            };
        }

        if (curr < arr[idx - 1] && idx < arr.length - 1) {
            return {
                newPosition: idx - 1,
                itemIndex: arr[idx - 1],
            };
        }

        if (idx === arr.length - 1) {
            return {
                newPosition: idx ,
                itemIndex: curr,
            };
        }
    }, null);
}

function createUpdateObjectFromFieldPath({
    fieldPath,
    document,
    getModelByName,
    value
}: {
    fieldPath: StackbitTypes.FieldPath;
    document: DocumentWithContext;
    getModelByName: (name: string) => ModelWithContext | undefined;
    value: (fieldName: string, model: ModelWithContext) => any;
}) {
    const data: Record<string, any> = {};
    let nextValue: any;
    let currValue: Record<string, any> = data;
    let model: ModelWithContext | undefined = getModelByName(document.modelName)!;
    let lastFieldName: string;
    if (!model) {
        throw new Error(`Model '${document.modelName}' not found`);
    }
    for (let idx = 0; idx < fieldPath.length; idx++) {
        const targetField = idx === fieldPath.length - 1;
        const fieldName = fieldPath[idx]!;
        if (typeof fieldName === 'string') {
            lastFieldName = fieldName;
            const modelField = (model.fields ?? []).find((field) => field.name === fieldName);
            if (!modelField) {
                throw new Error(`Model field '${fieldName}' in model ${model.name} not found`);
            }
            if (modelField.type === 'list' && !targetField) {
                continue;
            }
        }
        const fieldPathStr = fieldPath.slice(0, idx + 1).join('.');
        if (targetField) {
            currValue[lastFieldName!] = value(lastFieldName!, model);
        } else {
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
            currValue[lastFieldName!] = {
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
    isListItem = false,
    insertBeforeId
}: {
    updateOperationField: StackbitTypes.UpdateOperationField;
    fieldName: string;
    model: ModelWithContext;
    getModelByName: (modelName: string) => ModelWithContext | undefined;
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
        let data = _.reduce(
            updateOperationField.fields,
            (accum: Record<string, any>, updateOperationField, fieldName) => {
                accum[fieldName] = convertUpdateOperationFieldToValue({
                    fieldName,
                    updateOperationField,
                    model: childModel,
                    getModelByName
                });
                return accum;
            },
            {}
        );
        const modelInfo = model.context?.fieldInfoMap[fieldName];

        if (isListItem) {
            if (insertBeforeId) {
                data = {
                    position: {
                        before: insertBeforeId
                    },
                    data
                };
            } else {
                data = { data };
            }
        }
        return {
            create: modelInfo?.isMultiModel
                ? {
                    [updateOperationField.modelName]: data
                }
                : data
        };
    } else if (updateOperationField.type === 'reference') {
        return { connect: { id: updateOperationField.refId } };
    } else if (updateOperationField.type === 'cross-reference') {
        throw new Error(`Setting cross-reference is not supported yet.`);
    } else if (updateOperationField.type === 'list') {
        const listData = updateOperationField.items.map((item) => convertUpdateOperationFieldToValue({
            updateOperationField: item,
            fieldName,
            model,
            getModelByName
        })).map((item) => item.create ?? item);

        return {
            create: listData,
        };
    } else {
        return updateOperationField.value;
    }
}

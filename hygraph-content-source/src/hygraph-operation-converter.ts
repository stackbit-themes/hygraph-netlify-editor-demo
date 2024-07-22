import type * as StackbitTypes from '@stackbit/types';

export function convertOperations(options: { operations: StackbitTypes.UpdateOperation[] }): Record<string, any> {
    const data: Record<string, any> = {};
    for (const operation of options.operations) {
        // TODO: implement nested field updates
        if (operation.fieldPath.length > 1) {
            throw new Error(`Update of nested fields is not supported yet.`);
        }
        const fieldName = operation.fieldPath[0]!;
        switch (operation.opType) {
            case "set":
                // TODO: implement updates of relations field updates
                if (!('value' in operation.field)) {
                    throw new Error(`Update of non scalar fields is not supported yet.`);
                }
                data[fieldName] = operation.field.value;
                break;
            case "unset":
                data[fieldName] = null;
                break;
            case "insert":
                throw new Error(`Updating lists is not supported yet.`);
            case "remove":
                throw new Error(`Updating lists is not supported yet.`);
            case "reorder":
                throw new Error(`Updating lists is not supported yet.`);

        }
    }
    return data;
}

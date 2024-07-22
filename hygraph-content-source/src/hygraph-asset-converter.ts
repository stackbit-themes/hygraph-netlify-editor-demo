import type * as StackbitTypes from '@stackbit/types';
import type { HygraphAsset } from './hygraph-api-client';
import { omitByUndefined } from '@stackbit/utils';

export type AssetWithContext = StackbitTypes.Asset<AssetContext>;
export type AssetContext = {};

export function convertAssets({
    hygraphAssets,
    manageUrl
}: {
    hygraphAssets: HygraphAsset[];
    manageUrl: (assetId: string) => string;
}): AssetWithContext[] {
    return hygraphAssets.map((hygraphAsset: HygraphAsset) =>
        convertAsset({
            hygraphAsset,
            manageUrl
        })
    );
}

export function convertAsset({
    hygraphAsset,
    manageUrl
}: {
    hygraphAsset: HygraphAsset;
    manageUrl: (assetId: string) => string;
}): AssetWithContext {
    return omitByUndefined({
        type: 'asset' as const,
        id: hygraphAsset.id,
        manageUrl: manageUrl(hygraphAsset.id),
        status: getAssetStatus(hygraphAsset),
        createdAt: hygraphAsset.createdAt,
        createdBy: undefined, // TODO: fetch users and assign by IDs
        updatedAt: hygraphAsset.updatedAt,
        updatedBy: undefined, // TODO: fetch users and assign by IDs
        context: {},
        fields: {
            title: {
                type: 'string' as const,
                value: hygraphAsset.fileName
            },
            file: {
                type: 'assetFile' as const,
                url: hygraphAsset.url,
                fileName: hygraphAsset.fileName,
                contentType: hygraphAsset.mimeType,
                size: hygraphAsset.size,
                dimensions: {
                    width: hygraphAsset.width,
                    height: hygraphAsset.height
                }
            }
        }
    });
}

export function getAssetStatus(hygraphAsset: HygraphAsset): StackbitTypes.DocumentStatus {
    const publishedDoc = hygraphAsset.documentInStages.find((doc) => doc.stage === 'PUBLISHED');
    if (!publishedDoc) {
        return 'added';
    }
    if (publishedDoc.updatedAt === hygraphAsset.updatedAt) {
        return 'published';
    }
    return 'modified';
}

import type * as StackbitTypes from '@stackbit/types';
import type { HygraphAsset } from './hygraph-api-client';
import { omitByUndefined } from '@stackbit/utils';

export type AssetWithContext = StackbitTypes.Asset<AssetContext>;
export type AssetContext = {};

export function convertAssets({
    hygraphAssets,
    assetModelId,
    baseManageUrl
}: {
    hygraphAssets: HygraphAsset[];
    assetModelId: string | null;
    baseManageUrl: string;
}): AssetWithContext[] {
    return hygraphAssets.map((hygraphAsset: HygraphAsset) =>
        convertAsset({
            hygraphAsset,
            assetModelId,
            baseManageUrl
        })
    );
}

export function convertAsset({
    hygraphAsset,
    assetModelId,
    baseManageUrl
}: {
    hygraphAsset: HygraphAsset;
    assetModelId: string | null;
    baseManageUrl: string;
}): AssetWithContext {
    return omitByUndefined({
        type: 'asset' as const,
        id: hygraphAsset.id,
        manageUrl: `${baseManageUrl}/assets/${assetModelId}/entry/${hygraphAsset.id}`,
        status: getAssetStatus(hygraphAsset),
        createdAt: hygraphAsset.createdAt,
        createdBy: hygraphAsset.createdBy?.name,
        updatedAt: hygraphAsset.updatedAt,
        updatedBy: hygraphAsset.updatedBy?.name ? [hygraphAsset.updatedBy.name] : undefined,
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
                contentType: hygraphAsset.mimeType ?? undefined,
                size: hygraphAsset.size ?? undefined,
                dimensions: {
                    width: hygraphAsset.width ?? undefined,
                    height: hygraphAsset.height ?? undefined
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

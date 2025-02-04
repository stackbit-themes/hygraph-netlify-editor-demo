import { gql } from 'graphql-request';

const assetFragment = gql`
    fragment AssetFragment on Asset {
        __typename
        id
        createdAt
        createdBy {
            id
            name
            kind
        }
        updatedAt
        updatedBy {
            id
            name
            kind
        }
        stage
        documentInStages {
            id
            stage
            publishedAt
            updatedAt
        }
        url
        fileName
        handle
        mimeType
        size
        width
        height
        upload {
            status
        }
    }
`;

export const getAssets = gql`
    query getAssets($first: Int = 100, $skip: Int = 0) {
        assetsConnection(stage: DRAFT, first: $first, skip: $skip) {
            edges {
                node {
                    ...AssetFragment
                }
            }
            pageInfo {
                hasNextPage
                pageSize
            }
        }
    }

    ${assetFragment}
`;

export const getAssetById = gql`
    query getAssetById($id: ID!) {
        asset(stage: DRAFT, where: { id: $id }) {
            ...AssetFragment
        }
    }

    ${assetFragment}
`;

export const publishAssets = gql`
    mutation publishAssets($assetIds: [ID!]!) {
        publishManyAssetsConnection(to: PUBLISHED, where: { id_in: $assetIds }) {
            edges {
                node {
                    id
                }
            }
        }
    }
`;

export const unpublishAssets = gql`
    mutation unpublishAssets($assetIds: [ID!]!) {
        unpublishManyAssetsConnection(from: PUBLISHED, where: { id_in: $assetIds }) {
            edges {
                node {
                    id
                }
            }
        }
    }
`;

export const createAssetWithURL = gql`
    mutation createAssetWithURL($fileName: String!, $uploadUrl: String!) {
        createAsset(data: { fileName: $fileName, uploadUrl: $uploadUrl }) {
            id
            url
            upload {
                status
                error {
                    code
                    message
                }
            }
        }
    }
`;

export const createAssetWithPostData = gql`
    mutation createAssetWithPostData($fileName: String!) {
        createAsset(data: { fileName: $fileName }) {
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
    }
`;

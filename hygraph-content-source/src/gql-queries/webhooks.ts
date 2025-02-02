import crypto from 'crypto';
import { gql } from 'graphql-request';

const webhookFragment = gql`
    fragment WebhookFragment on Webhook {
        __typename
        id
        name
        url
        isActive
    }
`;

export const getWebhooks = gql`
    query getWebhooks($projectId: ID!, $environmentName: String!) {
        viewer {
            project(id: $projectId) {
                environment(name: $environmentName) {
                    id
                    webhooks {
                        ...WebhookFragment
                    }
                }
            }
        }
    }

    ${webhookFragment}
`;

export const createWebhook = gql`
    mutation createWebhook($environmentId: ID!, $url: String!) {
        createWebhook(
            data: {
                environmentId: $environmentId,
                url: $url,
                method: POST,
                name: "Local Visual Editor (${crypto.randomUUID().substring(0, 8)})",
                description: "A webhook for local Visual Editor.",
                isActive: true,
                includePayload: false,
                models: [],
                stages: [],
                triggerType: CONTENT_MODEL,
                triggerActions: [],
                triggerSources: []
            }
        ) {
            createdWebhook {
                ...WebhookFragment
            }
        }
    }
    
    ${webhookFragment}
`;

export const updateWebhook = gql`
    mutation updateWebhook($webhookId: ID!) {
        updateWebhook(
            data: {
                webhookId: $webhookId,
                method: POST,
                name: "Local Visual Editor (${crypto.randomUUID().substring(0, 8)})",
                description: "A webhook for local Visual Editor.",
                isActive: true,
                includePayload: false,
                models: [],
                stages: [],
                triggerType: CONTENT_MODEL,
                triggerActions: [],
                triggerSources: []
            }
        ) {
            updatedWebhook {
                ...WebhookFragment
            }
        }
    }

    ${webhookFragment}
`;

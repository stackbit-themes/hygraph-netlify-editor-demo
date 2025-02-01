import crypto from 'crypto';
import { gql } from 'graphql-request';

export const getWebhooksQuery = gql`
    query getWebhooks($projectId: ID!, $environmentName: String!) {
        viewer {
            project(id: $projectId) {
                environment(name: $environmentName) {
                    id
                    webhooks {
                        __typename
                        id
                        name
                        url
                    }
                }
            }
        }
    }
`;

export const createWebhookMutation = gql`
    mutation createWebhook($environmentId: ID!, $url: String!) {
        createWebhook(
            data: {
                environmentId: $environmentId,
                url: $url,
                method: POST,
                name: "Local Visual Editor (${crypto.randomUUID().substring(0, 8)})",
                description: "A webhook for local Visual Editor.",
                isActive: true,
                includePayload: true,
                models: [],
                stages: [],
                triggerType: CONTENT_MODEL,
                triggerActions: [],
                triggerSources: []
            }
        ) {
            createdWebhook {
                __typename
                id
                name
                url
            }
        }
    }
`;

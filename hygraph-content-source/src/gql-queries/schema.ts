import { gql } from 'graphql-request';

export default gql`
    query schemaQuery($projectId: ID!, $environmentName: String!) {
        viewer {
            __typename
            id
            project(id: $projectId) {
                __typename
                id
                name
                environment(name: $environmentName) {
                    __typename
                    id
                    displayName
                    name
                    contentModel {
                        __typename
                        models {
                            ...ModelFragment
                        }
                        components {
                            ...ComponentFragment
                        }
                        enumerations {
                            ...EnumerationFragment
                        }
                    }
                    webhooks {
                        ...WebhookFragment
                    }
                }
            }
        }
    }

    fragment WebhookFragment on Webhook {
        __typename
        id
        name
        url
    }

    fragment ModelFragment on IModel {
        __typename
        id
        apiId
        apiIdPlural
        displayName
        createdAt
        updatedAt
        description
        isSystem
        isLocalized
        hasLocalizedComponents
        isVersioned
        titleFields {
            id
            apiId
        }
        fields(includeHiddenFields: true, includeApiOnlyFields: true) {
            ...FieldFragment
        }
    }

    fragment ComponentFragment on Component {
        __typename
        id
        apiId
        apiIdPlural
        displayName
        createdAt
        updatedAt
        description
        isSystem
        isLocalized
        titleFields {
            id
            apiId
        }
        fields(includeHiddenFields: true, includeApiOnlyFields: true) {
            ...FieldFragment
        }
    }

    fragment FieldFragment on IField {
        __typename
        id
        apiId
        displayName
        description
        isList
        isSystem
        visibility
        position
        ... on IRequireableField {
            isRequired
        }
        ... on IUniqueableField {
            isUnique
        }
        ... on ILocalizableField {
            isLocalized
        }
        ... on SimpleField {
            fieldType: type
            initialValue
            embedsEnabled
            embeddableModels {
                __typename
                id
                apiId
            }
        }
        ...ValidationsFragment
        ... on EnumerableField {
            enumType: type
            defaultEnumerationValue: initialValue {
                __typename
                ...EnumerationValuesFragment
            }
            enumeration {
                __typename
                id
                apiId
            }
        }
        ... on RelationalField {
            relationType: type
            relatedModel {
                __typename
                id
                apiId
            }
        }
        ... on UniDirectionalRelationalField {
            relationType: type
            relatedModel {
                __typename
                id
                apiId
            }
        }
        ... on UnionField {
            unionType: type
            isMemberType
            union {
                __typename
                id
                apiId
                memberTypes {
                    __typename
                    id
                    apiId
                    parent {
                        __typename
                        id
                        apiId
                    }
                }
                field {
                    __typename
                    id
                    apiId
                    parent {
                        __typename
                        id
                        apiId
                    }
                }
            }
        }
        ... on RemoteField {
            remoteType: type
            ...FieldRemoteFragment
        }
        ... on ComponentField {
            componentType: type
            component {
                __typename
                id
                apiId
            }
        }
        ... on ComponentUnionField {
            componentUnionType: type
            components {
                __typename
                id
                apiId
            }
        }
    }

    fragment ValidationsFragment on IField {
        ... on SimpleField {
            validations {
                __typename
                ... on StringFieldValidations {
                    characters {
                        __typename
                        min
                        max
                        errorMessage
                    }
                    matches {
                        __typename
                        regex
                        flags
                        errorMessage
                    }
                    notMatches {
                        __typename
                        regex
                        flags
                        errorMessage
                    }
                    listItemCount {
                        __typename
                        min
                        max
                        errorMessage
                    }
                }
                ... on IntFieldValidations {
                    range {
                        __typename
                        min
                        max
                        errorMessage
                    }
                    listItemCount {
                        __typename
                        min
                        max
                        errorMessage
                    }
                }
                ... on FloatFieldValidations {
                    floatRange: range {
                        __typename
                        min
                        max
                        errorMessage
                    }
                    listItemCount {
                        __typename
                        min
                        max
                        errorMessage
                    }
                }
            }
        }
    }

    fragment EnumerationFragment on Enumeration {
        __typename
        id
        apiId
        displayName
        description
        isSystem
        values {
            __typename
            ...EnumerationValuesFragment
        }
    }

    fragment EnumerationValuesFragment on EnumerationValue {
        __typename
        id
        apiId
        displayName
    }

    fragment FieldRemoteFragment on RemoteField {
        __typename
        remoteConfig {
            __typename
            remoteSource {
                __typename
                id
            }
            method
            headers
            forwardClientHeaders
            cacheTTLSeconds
            returnType {
                ...FieldRemoteTypeFragment
            }
            ... on GraphQLRemoteFieldConfig {
                query
                operationName
            }
            ... on RestRemoteFieldConfig {
                path
            }
        }
        inputArgs {
            __typename
            id
            apiId
            isRequired
            isList
            remoteType {
                ...FieldRemoteTypeFragment
            }
        }
    }

    fragment FieldRemoteTypeFragment on RemoteTypeDefinition {
        __typename
        id
        createdAt
        updatedAt
        apiId
        sdl
        graphqlType
        isSystem
    }
`;

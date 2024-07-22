export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type App = IApp & {
  __typename?: 'App';
  apiId: Scalars['String']['output'];
  author: Scalars['ID']['output'];
  avatarUrl: Scalars['String']['output'];
  configurationUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  elements?: Maybe<Array<IAppElement>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions: AppPermissions;
  publicationStatus: AppPublicationStatus;
  setupUrl: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  webhookUrl?: Maybe<Scalars['String']['output']>;
};

export enum AppContentPermission {
  None = 'NONE',
  Read = 'READ',
  ReadWrite = 'READ_WRITE'
}

export enum AppElementType {
  Field = 'field',
  FormSidebar = 'formSidebar',
  Page = 'page'
}

export type AppInstallation = {
  __typename?: 'AppInstallation';
  app: App;
  authToken: Scalars['String']['output'];
  config: Scalars['JSON']['output'];
  createdAt: Scalars['DateTime']['output'];
  environment: Environment;
  fields: Array<IField>;
  id: Scalars['ID']['output'];
  sidebarElements: Array<AppSidebarElement>;
  status: AppInstallationStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export enum AppInstallationStatus {
  Completed = 'COMPLETED',
  Disabled = 'DISABLED',
  Pending = 'PENDING'
}

export type AppPermissions = {
  __typename?: 'AppPermissions';
  CONTENT: AppContentPermission;
  SCHEMA: AppSchemaPermission;
  USER: AppUserPermission;
  WEBHOOKS: AppWebhooksPermission;
};

export type AppPermissionsInput = {
  CONTENT?: InputMaybe<AppContentPermission>;
  SCHEMA?: InputMaybe<AppSchemaPermission>;
  USER?: InputMaybe<AppUserPermission>;
  WEBHOOKS?: InputMaybe<AppWebhooksPermission>;
};

export enum AppPublicationStatus {
  Pending = 'PENDING',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export enum AppSchemaPermission {
  None = 'NONE',
  Read = 'READ',
  ReadWrite = 'READ_WRITE'
}

export type AppSidebarElement = ISidebarElement & {
  __typename?: 'AppSidebarElement';
  appElement: FormSidebarAppElement;
  appInstallation: AppInstallation;
  config?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  model: IModel;
  position: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AppToken = {
  __typename?: 'AppToken';
  app: App;
  id: Scalars['ID']['output'];
};

export type AppTokenViewer = IViewer & {
  __typename?: 'AppTokenViewer';
  availableExtensionPermissions: Array<AvailableExtensionPermission>;
  availableExtensionSrcTypes: Array<ExtensionSrcType>;
  availableIntegrations: Array<Integration_Provider>;
  id: Scalars['ID']['output'];
  plans: Array<Plan>;
  project?: Maybe<Project>;
  regions: Array<Region>;
  templates: Array<ITemplate>;
  user: UserForApp;
};


export type AppTokenViewerProjectArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type AppTokenViewerUserArgs = {
  id: Scalars['ID']['input'];
};

export enum AppUserPermission {
  None = 'NONE',
  Read = 'READ'
}

export enum AppWebhooksPermission {
  None = 'NONE',
  ReadWrite = 'READ_WRITE'
}

export type AppWithSecrets = IApp & {
  __typename?: 'AppWithSecrets';
  apiId: Scalars['String']['output'];
  author: Scalars['ID']['output'];
  avatarUrl: Scalars['String']['output'];
  clientId?: Maybe<Scalars['String']['output']>;
  clientSecret?: Maybe<Scalars['String']['output']>;
  configurationUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  elements?: Maybe<Array<IAppElement>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions: AppPermissions;
  publicationStatus: AppPublicationStatus;
  setupUrl: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  webhookUrl?: Maybe<Scalars['String']['output']>;
};

export type AssetModel = IFieldParent & IModel & {
  __typename?: 'AssetModel';
  apiId: Scalars['String']['output'];
  apiIdPlural: Scalars['String']['output'];
  contentViews: Array<ContentView>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  defaultContentView: ContentView;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  environment: Environment;
  field: IField;
  fields: Array<IField>;
  fieldsConnection: FieldsConnection;
  /** Model has at least one document */
  hasContent: Scalars['Boolean']['output'];
  hasLocalizedComponents: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isLocalized: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  isVersioned: Scalars['Boolean']['output'];
  sidebarElements: Array<ISidebarElement>;
  titleFields: Array<IField>;
  updatedAt: Scalars['DateTime']['output'];
  viewerPermission: ModelViewerPermission;
};


export type AssetModelContentViewsArgs = {
  filter?: InputMaybe<ContentViewFilterInput>;
  includeSystemContentViews?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetModelFieldArgs = {
  id: Scalars['ID']['input'];
};


export type AssetModelFieldsArgs = {
  includeApiOnlyFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeHiddenFields?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetModelFieldsConnectionArgs = {
  first?: Scalars['Int']['input'];
  includeApiOnlyFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeHiddenFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeSystemFields?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: Scalars['Int']['input'];
};

export type AssetSystem = IAssetConfig & {
  __typename?: 'AssetSystem';
  apiKey: Scalars['String']['output'];
};

export type AsyncOperationPayload = {
  __typename?: 'AsyncOperationPayload';
  migration: Migration;
};

export type AuditLog = {
  __typename?: 'AuditLog';
  action: AuditLogAction;
  entityId?: Maybe<Scalars['String']['output']>;
  environmentName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  payload?: Maybe<Scalars['JSON']['output']>;
  resource: AuditLogResource;
  timestamp: Scalars['DateTime']['output'];
  triggerType: AuditLogTriggerType;
  triggeredBy?: Maybe<AuditLogTriggeredBy>;
};

export enum AuditLogAction {
  Accept = 'ACCEPT',
  Create = 'CREATE',
  Delete = 'DELETE',
  Publish = 'PUBLISH',
  Unpublish = 'UNPUBLISH',
  Update = 'UPDATE'
}

export enum AuditLogOrderByInput {
  TimestampAsc = 'timestamp_ASC',
  TimestampDesc = 'timestamp_DESC'
}

export enum AuditLogResource {
  Component = 'COMPONENT',
  Content = 'CONTENT',
  Contentview = 'CONTENTVIEW',
  Enumeration = 'ENUMERATION',
  EnumerationValue = 'ENUMERATION_VALUE',
  Environment = 'ENVIRONMENT',
  Extension = 'EXTENSION',
  Field = 'FIELD',
  Invite = 'INVITE',
  Locale = 'LOCALE',
  Member = 'MEMBER',
  Model = 'MODEL',
  Pat = 'PAT',
  Project = 'PROJECT',
  Role = 'ROLE',
  Stage = 'STAGE',
  Viewgroup = 'VIEWGROUP',
  Webhook = 'WEBHOOK'
}

export enum AuditLogTriggerType {
  AppToken = 'APP_TOKEN',
  Open = 'OPEN',
  Pat = 'PAT',
  ThirdParty = 'THIRD_PARTY',
  User = 'USER'
}

export type AuditLogTriggeredBy = Member | PermanentAuthToken;

export type AuditLogWhereInput = {
  action?: InputMaybe<AuditLogAction>;
  entityId?: InputMaybe<Scalars['String']['input']>;
  environmentName?: InputMaybe<Scalars['String']['input']>;
  resource?: InputMaybe<AuditLogResource>;
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  triggerType?: InputMaybe<AuditLogTriggerType>;
  triggeredBy?: InputMaybe<Scalars['String']['input']>;
};

export type AuditLogsPayload = {
  __typename?: 'AuditLogsPayload';
  logs: Array<AuditLog>;
  total: Scalars['Float']['output'];
};

export type AvailableExtensionPermission = {
  __typename?: 'AvailableExtensionPermission';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: AvailableExtensionPermissionAction;
  updatedAt: Scalars['DateTime']['output'];
};

export enum AvailableExtensionPermissionAction {
  Api = 'API',
  Form = 'FORM',
  Input = 'INPUT'
}

export enum AvailableExtensionSrcType {
  Inline = 'INLINE',
  Sdk = 'SDK'
}

export type BatchMigrationChangeInput = {
  createComponent?: InputMaybe<BatchMigrationCreateComponentInput>;
  createComponentField?: InputMaybe<BatchMigrationCreateComponentFieldInput>;
  createComponentUnionField?: InputMaybe<BatchMigrationCreateComponentUnionFieldInput>;
  createCustomSidebarElement?: InputMaybe<BatchMigrationCreateCustomSidebarElementInput>;
  createEnumerableField?: InputMaybe<BatchMigrationCreateEnumerableFieldInput>;
  createEnumeration?: InputMaybe<BatchMigrationCreateEnumerationInput>;
  createGraphQLRemoteSource?: InputMaybe<BatchMigrationCreateGraphQlRemoteSourceInput>;
  createLocale?: InputMaybe<BatchMigrationCreateLocaleInput>;
  /** creates a new model */
  createModel?: InputMaybe<BatchMigrationCreateModelInput>;
  createRESTRemoteSource?: InputMaybe<BatchMigrationCreateRestRemoteSourceInput>;
  createRelationalField?: InputMaybe<BatchMigrationCreateRelationalFieldInput>;
  createRemoteField?: InputMaybe<BatchMigrationCreateRemoteFieldInput>;
  createSimpleField?: InputMaybe<BatchMigrationCreateSimpleFieldInput>;
  createStage?: InputMaybe<BatchMigrationCreateStageInput>;
  createUnionField?: InputMaybe<BatchMigrationCreateUnionFieldInput>;
  /** creates a webhook */
  createWebhook?: InputMaybe<BatchMigrationCreateWebhookInput>;
  deleteComponent?: InputMaybe<BatchMigrationDeleteComponentInput>;
  deleteCustomSidebarElement?: InputMaybe<BatchMigrationDeleteCustomSidebarElementInput>;
  deleteEnumeration?: InputMaybe<BatchMigrationDeleteEnumerationInput>;
  deleteField?: InputMaybe<BatchMigrationDeleteFieldInput>;
  deleteLocale?: InputMaybe<BatchMigrationDeleteLocaleInput>;
  deleteModel?: InputMaybe<BatchMigrationDeleteModelInput>;
  deleteRemoteSource?: InputMaybe<BatchMigrationDeleteRemoteSourceInput>;
  deleteStage?: InputMaybe<BatchMigrationDeleteStageInput>;
  /** deletes a webhook */
  deleteWebhook?: InputMaybe<BatchMigrationDeleteWebhookInput>;
  refreshGraphQLRemoteSourceSchema?: InputMaybe<BatchMigrationRefreshGraphQlRemoteSourceSchemaInput>;
  /** updates config and status for an AppInstallation, only valid for App Token bearer */
  updateAppInstallation?: InputMaybe<BatchMigrationUpdateAppInstallationInput>;
  updateComponent?: InputMaybe<BatchMigrationUpdateComponentInput>;
  updateComponentField?: InputMaybe<BatchMigrationUpdateComponentFieldInput>;
  updateComponentUnionField?: InputMaybe<BatchMigrationUpdateComponentUnionFieldInput>;
  updateEnumerableField?: InputMaybe<BatchMigrationUpdateEnumerableFieldInput>;
  updateEnumeration?: InputMaybe<BatchMigrationUpdateEnumerationInput>;
  updateGraphQLRemoteSource?: InputMaybe<BatchMigrationUpdateGraphQlRemoteSourceInput>;
  updateLocale?: InputMaybe<BatchMigrationUpdateLocaleInput>;
  updateModel?: InputMaybe<BatchMigrationUpdateModelInput>;
  updateRESTRemoteSource?: InputMaybe<BatchMigrationUpdateRestRemoteSourceInput>;
  updateRelationalField?: InputMaybe<BatchMigrationUpdateRelationalFieldInput>;
  updateRemoteField?: InputMaybe<BatchMigrationUpdateRemoteFieldInput>;
  updateSimpleField?: InputMaybe<BatchMigrationUpdateSimpleFieldInput>;
  updateStage?: InputMaybe<BatchMigrationUpdateStageInput>;
  updateUnionField?: InputMaybe<BatchMigrationUpdateUnionFieldInput>;
  /** updates a webhook */
  updateWebhook?: InputMaybe<BatchMigrationUpdateWebhookInput>;
};

/** Creating a component field */
export type BatchMigrationCreateComponentFieldInput = {
  apiId: Scalars['String']['input'];
  componentApiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  formExtension?: InputMaybe<Scalars['String']['input']>;
  formRenderer?: InputMaybe<Scalars['String']['input']>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  parentApiId: Scalars['String']['input'];
  position?: InputMaybe<Scalars['Int']['input']>;
  tableExtension?: InputMaybe<Scalars['String']['input']>;
  tableRenderer?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<VisibilityTypes>;
};

/** Creating a component. */
export type BatchMigrationCreateComponentInput = {
  apiId: Scalars['String']['input'];
  apiIdPlural: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
};

/** Creating a component-union field */
export type BatchMigrationCreateComponentUnionFieldInput = {
  apiId: Scalars['String']['input'];
  componentApiIds: Array<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  formExtension?: InputMaybe<Scalars['String']['input']>;
  formRenderer?: InputMaybe<Scalars['String']['input']>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  parentApiId: Scalars['String']['input'];
  tableExtension?: InputMaybe<Scalars['String']['input']>;
  tableRenderer?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<VisibilityTypes>;
};

/** Creating a custom input type definition */
export type BatchMigrationCreateCustomInputTypeDefinitionInput = {
  /** GraphQL type input definition in SDL format */
  sdl: Scalars['String']['input'];
};

/** Creating a custom sidebar element with app element */
export type BatchMigrationCreateCustomSidebarElementInput = {
  /** Api Id of the App */
  appApiId: Scalars['String']['input'];
  /** Api Id of the App element to create custom sidebar element with */
  appElementApiId: Scalars['String']['input'];
  /** Json metadata associated with the sidebar element */
  config?: InputMaybe<Scalars['JSON']['input']>;
  /** Description name for the sidebar element */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Display name for the sidebar element */
  displayName: Scalars['String']['input'];
  /** Api Id of the model associated with the custom sidebar element */
  modelApiId: Scalars['String']['input'];
};

/** Creating a custom type definition */
export type BatchMigrationCreateCustomTypeDefinitionInput = {
  /**
   * GraphQL type definition in SDL format
   * Can be enum or object type
   */
  sdl: Scalars['String']['input'];
};

/** Creating an enumerable field. */
export type BatchMigrationCreateEnumerableFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  enumerationApiId: Scalars['String']['input'];
  formExtension?: InputMaybe<Scalars['String']['input']>;
  formRenderer?: InputMaybe<Scalars['String']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  isLocalized?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  isTitle?: InputMaybe<Scalars['Boolean']['input']>;
  isUnique?: InputMaybe<Scalars['Boolean']['input']>;
  migrationValue?: InputMaybe<Scalars['String']['input']>;
  modelApiId?: InputMaybe<Scalars['String']['input']>;
  parentApiId?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  tableExtension?: InputMaybe<Scalars['String']['input']>;
  tableRenderer?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<VisibilityTypes>;
};

/** Creating enumeration */
export type BatchMigrationCreateEnumerationInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  values: Array<BatchMigrationCreateEnumerationValueInput>;
};

/** enumeration value */
export type BatchMigrationCreateEnumerationValueInput = {
  apiId: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
};

export type BatchMigrationCreateGraphQlRemoteSourceInput = {
  debugEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  headers?: InputMaybe<Scalars['JSON']['input']>;
  /** HTTP headers that will be used for introspection */
  introspectionHeaders?: InputMaybe<Scalars['JSON']['input']>;
  /** HTTP method that will be used for introspection */
  introspectionMethod: GraphQlRemoteSourceIntrospectionMethod;
  /**
   * Specific URL that will be used for introspection if the introspection is available on another url than the regular url.
   * Can be ignored if the introspection url is the same as the url of the remote source.
   */
  introspectionUrl?: InputMaybe<Scalars['String']['input']>;
  kind: RemoteSourceKind;
  /** Oauth input that can be used to get access token for the remote source */
  oAuth?: InputMaybe<RemoteSourceOAuthInput>;
  /** Unique prefix that will be prepended to all of the remote types. This value cannot be changed! */
  prefix: Scalars['String']['input'];
  /** Custom GraphQL input types that can be used as arguments in remote fields that belong to this remoteSource */
  remoteTypeDefinitions?: InputMaybe<BatchMigrationCreateRemoteTypeDefinitionInput>;
  url: Scalars['String']['input'];
};

/** Creating locale */
export type BatchMigrationCreateLocaleInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
};

/** Creating a model. */
export type BatchMigrationCreateModelInput = {
  /** The model apiId */
  apiId: Scalars['String']['input'];
  /** The models plural apiId. This is used for lists */
  apiIdPlural: Scalars['String']['input'];
  /** Optional description of the model */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Display name that is used to render the model in the webapp */
  displayName: Scalars['String']['input'];
  /** Only AppTokens should provide this flag */
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BatchMigrationCreateRestRemoteSourceInput = {
  debugEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  headers?: InputMaybe<Scalars['JSON']['input']>;
  kind: RemoteSourceKind;
  /** Oauth input that can be used to get access token for the remote source */
  oAuth?: InputMaybe<RemoteSourceOAuthInput>;
  /** Unique prefix that will be prepended to all of the remote types. This value cannot be changed! */
  prefix: Scalars['String']['input'];
  /** Remote type definitions that the remote source supports or input types that can be used by any remote field of this remote source */
  remoteTypeDefinitions?: InputMaybe<BatchMigrationCreateRemoteTypeDefinitionInput>;
  url: Scalars['String']['input'];
};

/** Creating a relational field */
export type BatchMigrationCreateRelationalFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  formExtension?: InputMaybe<Scalars['String']['input']>;
  formRenderer?: InputMaybe<Scalars['String']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Marks the field as required.
   * Note: This is only supported for RelationFieldType ASSET!
   */
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  modelApiId?: InputMaybe<Scalars['String']['input']>;
  parentApiId?: InputMaybe<Scalars['String']['input']>;
  reverseField: BatchMigrationCreateReverseRelationalFieldInput;
  tableExtension?: InputMaybe<Scalars['String']['input']>;
  tableRenderer?: InputMaybe<Scalars['String']['input']>;
  type: RelationalFieldType;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type BatchMigrationCreateRemoteFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  formConfig?: InputMaybe<Scalars['JSON']['input']>;
  formExtension?: InputMaybe<Scalars['String']['input']>;
  formRenderer?: InputMaybe<Scalars['String']['input']>;
  inputArgs?: InputMaybe<Array<BatchMigrationRemoteFieldInputArgInput>>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  parentApiId: Scalars['String']['input'];
  position?: InputMaybe<Scalars['Int']['input']>;
  remoteConfig: BatchMigrationRemoteFieldConfigInput;
  tableConfig?: InputMaybe<Scalars['JSON']['input']>;
  tableExtension?: InputMaybe<Scalars['String']['input']>;
  tableRenderer?: InputMaybe<Scalars['String']['input']>;
  type: RemoteFieldType;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type BatchMigrationCreateRemoteTypeDefinitionInput = {
  sdl: Scalars['String']['input'];
};

/** reverse field args */
export type BatchMigrationCreateReverseRelationalFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  isUnidirectional?: InputMaybe<Scalars['Boolean']['input']>;
  modelApiId: Scalars['String']['input'];
  visibility?: InputMaybe<VisibilityTypes>;
};

/** reverse field args */
export type BatchMigrationCreateReverseUnionFieldInput = {
  apiId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  modelApiIds: Array<Scalars['String']['input']>;
  visibility?: InputMaybe<VisibilityTypes>;
};

/** Creating a simple field. */
export type BatchMigrationCreateSimpleFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  embeddableModels?: InputMaybe<Array<Scalars['String']['input']>>;
  embedsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  formConfig?: InputMaybe<Scalars['JSON']['input']>;
  formExtension?: InputMaybe<Scalars['String']['input']>;
  formRenderer?: InputMaybe<Scalars['String']['input']>;
  initialValue?: InputMaybe<Scalars['String']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  isLocalized?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  isTitle?: InputMaybe<Scalars['Boolean']['input']>;
  isUnique?: InputMaybe<Scalars['Boolean']['input']>;
  migrationValue?: InputMaybe<Scalars['String']['input']>;
  modelApiId?: InputMaybe<Scalars['String']['input']>;
  parentApiId?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  tableConfig?: InputMaybe<Scalars['JSON']['input']>;
  tableExtension?: InputMaybe<Scalars['String']['input']>;
  tableRenderer?: InputMaybe<Scalars['String']['input']>;
  type: SimpleFieldType;
  validations?: InputMaybe<SimpleFieldValidationsInput>;
  visibility?: InputMaybe<VisibilityTypes>;
};

/** Creating a stage. */
export type BatchMigrationCreateStageInput = {
  apiId: Scalars['String']['input'];
  color: ColorPalette;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  position?: InputMaybe<Scalars['Int']['input']>;
};

/** Creating a union field */
export type BatchMigrationCreateUnionFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  formExtension?: InputMaybe<Scalars['String']['input']>;
  formRenderer?: InputMaybe<Scalars['String']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  modelApiId?: InputMaybe<Scalars['String']['input']>;
  parentApiId?: InputMaybe<Scalars['String']['input']>;
  reverseField: BatchMigrationCreateReverseUnionFieldInput;
  tableExtension?: InputMaybe<Scalars['String']['input']>;
  tableRenderer?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type BatchMigrationCreateWebhookInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  headers?: InputMaybe<Scalars['JSON']['input']>;
  includePayload: Scalars['Boolean']['input'];
  isActive: Scalars['Boolean']['input'];
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  method?: InputMaybe<WebhookMethod>;
  /**
   * Pass an empty array for all existing models.
   * This will also setup the webhook for models
   * created in the future
   */
  models: Array<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  secretKey?: InputMaybe<Scalars['String']['input']>;
  /**
   * Pass an empty array for all existing stages.
   * This will also setup the webhook for stages
   * created in the future
   */
  stages: Array<Scalars['ID']['input']>;
  triggerActions: Array<WebhookTriggerAction>;
  triggerSources?: InputMaybe<Array<WebhookTriggerSource>>;
  triggerType: WebhookTriggerType;
  url: Scalars['String']['input'];
};

/** Deleting a component. */
export type BatchMigrationDeleteComponentInput = {
  apiId: Scalars['String']['input'];
};

/** Delete an existing custom input type definition */
export type BatchMigrationDeleteCustomInputTypeDefinitionInput = {
  apiId: Scalars['String']['input'];
};

/** Deleting a custom sidebar element created by app element */
export type BatchMigrationDeleteCustomSidebarElementInput = {
  /** Api Id of the App */
  appApiId: Scalars['String']['input'];
  /** Api Id of the App element associated with the custom sidebar element */
  appElementApiId: Scalars['String']['input'];
  /** Api Id of the model associated with the custom sidebar element */
  modelApiId: Scalars['String']['input'];
};

/** Deleting enumarable field */
export type BatchMigrationDeleteEnumerationInput = {
  apiId: Scalars['String']['input'];
};

/** Deleting a field. */
export type BatchMigrationDeleteFieldInput = {
  apiId: Scalars['String']['input'];
  modelApiId?: InputMaybe<Scalars['String']['input']>;
  parentApiId?: InputMaybe<Scalars['String']['input']>;
};

/** Deleting locale */
export type BatchMigrationDeleteLocaleInput = {
  apiId: Scalars['String']['input'];
  force?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Deleting a model. */
export type BatchMigrationDeleteModelInput = {
  apiId: Scalars['String']['input'];
};

export type BatchMigrationDeleteRemoteSourceInput = {
  prefix: Scalars['String']['input'];
};

/** Delete an existing custom type definition */
export type BatchMigrationDeleteRemoteTypeDefinitionInput = {
  apiId: Scalars['String']['input'];
};

/** Deleting a stage. */
export type BatchMigrationDeleteStageInput = {
  apiId: Scalars['String']['input'];
};

export type BatchMigrationDeleteWebhookInput = {
  webhookId: Scalars['ID']['input'];
};

/** Creating a simple field. */
export type BatchMigrationEmbeddableModelsInput = {
  modelsToAdd?: InputMaybe<Array<Scalars['String']['input']>>;
  modelsToRemove?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type BatchMigrationInput = {
  changes: Array<BatchMigrationChangeInput>;
  environmentId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type BatchMigrationRefreshGraphQlRemoteSourceSchemaInput = {
  prefix: Scalars['String']['input'];
};

export type BatchMigrationRemoteFieldConfigInput = {
  cacheTTLSeconds?: InputMaybe<Scalars['Int']['input']>;
  /** If true, headers that are sent by the client will be forwarded to the remote source */
  forwardClientHeaders?: InputMaybe<Scalars['Boolean']['input']>;
  /** In case of apiType GraphQL graphqlQuery contains the GraphQL query that will be sent to the remote source */
  graphQLQuery?: InputMaybe<Scalars['String']['input']>;
  headers?: InputMaybe<Scalars['JSON']['input']>;
  method: RemoteFieldApiMethod;
  remoteSourcePrefix: Scalars['String']['input'];
  /** In case of apiType REST restPath contains the path that will be appended to the API base url */
  restPath?: InputMaybe<Scalars['String']['input']>;
  returnTypeApiId: Scalars['String']['input'];
};

export type BatchMigrationRemoteFieldInputArgInput = {
  apiId: Scalars['String']['input'];
  isList: Scalars['Boolean']['input'];
  isRequired: Scalars['Boolean']['input'];
  remoteTypeApiId: Scalars['String']['input'];
};

export type BatchMigrationUpdateAppInstallationInput = {
  /** App Installation config, the object passed will be merged with the existing config */
  config?: InputMaybe<Scalars['JSON']['input']>;
  /** App Installation status */
  status?: InputMaybe<AppInstallationStatus>;
};

/** Updating component field */
export type BatchMigrationUpdateComponentFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  newApiId?: InputMaybe<Scalars['String']['input']>;
  parentApiId: Scalars['String']['input'];
  visibility?: InputMaybe<VisibilityTypes>;
};

/** Updating a component. */
export type BatchMigrationUpdateComponentInput = {
  apiId: Scalars['String']['input'];
  apiIdPlural?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  newApiId?: InputMaybe<Scalars['String']['input']>;
};

/** updating a component-union field */
export type BatchMigrationUpdateComponentUnionFieldInput = {
  apiId: Scalars['String']['input'];
  componentApiIds?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  newApiId?: InputMaybe<Scalars['String']['input']>;
  parentApiId: Scalars['String']['input'];
};

/** Updating enumerable field */
export type BatchMigrationUpdateEnumerableFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  initialValue?: InputMaybe<Scalars['String']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  isLocalized?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  isTitle?: InputMaybe<Scalars['Boolean']['input']>;
  isUnique?: InputMaybe<Scalars['Boolean']['input']>;
  migrationValue?: InputMaybe<Scalars['String']['input']>;
  modelApiId?: InputMaybe<Scalars['String']['input']>;
  newApiId?: InputMaybe<Scalars['String']['input']>;
  parentApiId?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  visibility?: InputMaybe<VisibilityTypes>;
};

/** Updating enumeration */
export type BatchMigrationUpdateEnumerationInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  newApiId?: InputMaybe<Scalars['String']['input']>;
  valuesToCreate?: InputMaybe<Array<BatchMigrationCreateEnumerationValueInput>>;
  valuesToDelete?: InputMaybe<Array<Scalars['String']['input']>>;
  valuesToUpdate?: InputMaybe<Array<BatchMigrationUpdateEnumerationValueInput>>;
};

/** update enumeration value */
export type BatchMigrationUpdateEnumerationValueInput = {
  apiId: Scalars['String']['input'];
  displayName?: InputMaybe<Scalars['String']['input']>;
  newApiId?: InputMaybe<Scalars['String']['input']>;
};

export type BatchMigrationUpdateGraphQlRemoteSourceInput = {
  debugEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  headers?: InputMaybe<Scalars['JSON']['input']>;
  introspectionHeaders?: InputMaybe<Scalars['JSON']['input']>;
  introspectionMethod?: InputMaybe<GraphQlRemoteSourceIntrospectionMethod>;
  introspectionUrl?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<RemoteSourceKind>;
  /** Oauth input that can be used to get access token for the remote source */
  oAuth?: InputMaybe<RemoteSourceOAuthInput>;
  prefix: Scalars['String']['input'];
  remoteTypeDefinitionsToUpsert?: InputMaybe<BatchMigrationUpsertRemoteTypeDefinitionsInput>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** Updating locale */
export type BatchMigrationUpdateLocaleInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  newApiId?: InputMaybe<Scalars['String']['input']>;
};

/** Updating a model. */
export type BatchMigrationUpdateModelInput = {
  apiId: Scalars['String']['input'];
  apiIdPlural?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  newApiId?: InputMaybe<Scalars['String']['input']>;
};

export type BatchMigrationUpdateRestRemoteSourceInput = {
  debugEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  headers?: InputMaybe<Scalars['JSON']['input']>;
  kind?: InputMaybe<RemoteSourceKind>;
  /** Oauth input that can be used to get access token for the remote source */
  oAuth?: InputMaybe<RemoteSourceOAuthInput>;
  prefix: Scalars['String']['input'];
  remoteTypeDefinitionsToUpsert?: InputMaybe<BatchMigrationUpsertRemoteTypeDefinitionsInput>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** Updating relational field */
export type BatchMigrationUpdateRelationalFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Marks the field as required.
   * Note: This is only supported for RelationFieldType ASSET!
   */
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  isUnidirectional?: InputMaybe<Scalars['Boolean']['input']>;
  modelApiId?: InputMaybe<Scalars['String']['input']>;
  newApiId?: InputMaybe<Scalars['String']['input']>;
  parentApiId?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type BatchMigrationUpdateRemoteFieldConfigInput = {
  cacheTTLSeconds?: InputMaybe<Scalars['Int']['input']>;
  /** If true, headers that are sent by the client will be forwarded to the remote source */
  forwardClientHeaders?: InputMaybe<Scalars['Boolean']['input']>;
  /** In case of apiType GraphQL graphqlQuery contains the GraphQL query that will be sent to the remote source */
  graphQLQuery?: InputMaybe<Scalars['String']['input']>;
  headers?: InputMaybe<Scalars['JSON']['input']>;
  method?: InputMaybe<RemoteFieldApiMethod>;
  remoteSourcePrefix?: InputMaybe<Scalars['String']['input']>;
  /** In case of apiType REST restPath contains the path that will be appended to the API base url */
  restPath?: InputMaybe<Scalars['String']['input']>;
  returnTypeApiId?: InputMaybe<Scalars['String']['input']>;
};

export type BatchMigrationUpdateRemoteFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  inputArgs?: InputMaybe<BatchMigrationUpsertFieldInputArgInput>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  newApiId?: InputMaybe<Scalars['String']['input']>;
  parentApiId: Scalars['String']['input'];
  remoteConfig?: InputMaybe<BatchMigrationUpdateRemoteFieldConfigInput>;
  tableConfig?: InputMaybe<FieldConfigInput>;
  visibility?: InputMaybe<VisibilityTypes>;
};

/** reverse field args */
export type BatchMigrationUpdateReverseUnionFieldInput = {
  modelApiIds: Array<Scalars['String']['input']>;
};

/** Updating simple field */
export type BatchMigrationUpdateSimpleFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  embeddableModels?: InputMaybe<BatchMigrationEmbeddableModelsInput>;
  embedsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  formConfig?: InputMaybe<Scalars['JSON']['input']>;
  formExtension?: InputMaybe<Scalars['String']['input']>;
  formRenderer?: InputMaybe<Scalars['String']['input']>;
  initialValue?: InputMaybe<Scalars['String']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  isLocalized?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  isTitle?: InputMaybe<Scalars['Boolean']['input']>;
  isUnique?: InputMaybe<Scalars['Boolean']['input']>;
  migrationValue?: InputMaybe<Scalars['String']['input']>;
  modelApiId?: InputMaybe<Scalars['String']['input']>;
  newApiId?: InputMaybe<Scalars['String']['input']>;
  parentApiId?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  tableConfig?: InputMaybe<Scalars['JSON']['input']>;
  tableExtension?: InputMaybe<Scalars['String']['input']>;
  tableRenderer?: InputMaybe<Scalars['String']['input']>;
  validations?: InputMaybe<SimpleFieldValidationsInput>;
  visibility?: InputMaybe<VisibilityTypes>;
};

/** Updating a stage */
export type BatchMigrationUpdateStageInput = {
  apiId: Scalars['String']['input'];
  color?: InputMaybe<ColorPalette>;
  description?: InputMaybe<Scalars['String']['input']>;
  display?: InputMaybe<Scalars['String']['input']>;
  newApiId?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
};

/** updating a union field */
export type BatchMigrationUpdateUnionFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  modelApiId?: InputMaybe<Scalars['String']['input']>;
  newApiId?: InputMaybe<Scalars['String']['input']>;
  parentApiId?: InputMaybe<Scalars['String']['input']>;
  reverseField?: InputMaybe<BatchMigrationUpdateReverseUnionFieldInput>;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type BatchMigrationUpdateWebhookInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  headers?: InputMaybe<Scalars['JSON']['input']>;
  includePayload?: InputMaybe<Scalars['Boolean']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  method?: InputMaybe<WebhookMethod>;
  models?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  secretKey?: InputMaybe<Scalars['String']['input']>;
  stages?: InputMaybe<Array<Scalars['ID']['input']>>;
  triggerActions?: InputMaybe<Array<WebhookTriggerAction>>;
  triggerSources?: InputMaybe<Array<WebhookTriggerSource>>;
  triggerType?: InputMaybe<WebhookTriggerType>;
  url?: InputMaybe<Scalars['String']['input']>;
  webhookId: Scalars['ID']['input'];
};

export type BatchMigrationUpsertFieldInputArgInput = {
  fieldInputArgsToCreate?: InputMaybe<Array<BatchMigrationUpsertFieldInputArgInputToCreateInput>>;
  fieldInputArgsToDelete?: InputMaybe<Array<BatchMigrationUpsertFieldInputArgInputToDeleteInput>>;
  fieldInputArgsToUpdate?: InputMaybe<Array<BatchMigrationUpsertFieldInputArgInputToUpdateInput>>;
};

export type BatchMigrationUpsertFieldInputArgInputToCreateInput = {
  apiId: Scalars['String']['input'];
  isList: Scalars['Boolean']['input'];
  isRequired: Scalars['Boolean']['input'];
  remoteTypeApiId: Scalars['String']['input'];
};

export type BatchMigrationUpsertFieldInputArgInputToDeleteInput = {
  argApiId: Scalars['String']['input'];
};

export type BatchMigrationUpsertFieldInputArgInputToUpdateInput = {
  apiId?: InputMaybe<Scalars['String']['input']>;
  argApiId: Scalars['String']['input'];
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  remoteTypeApiId?: InputMaybe<Scalars['String']['input']>;
};

export type BatchMigrationUpsertRemoteTypeDefinitionToCreateInput = {
  sdl: Scalars['String']['input'];
};

export type BatchMigrationUpsertRemoteTypeDefinitionToDeleteInput = {
  apiId: Scalars['String']['input'];
};

export type BatchMigrationUpsertRemoteTypeDefinitionToUpdateInput = {
  apiId: Scalars['String']['input'];
  sdl?: InputMaybe<Scalars['String']['input']>;
};

export type BatchMigrationUpsertRemoteTypeDefinitionsInput = {
  remoteTypeDefinitionsToCreate?: InputMaybe<Array<BatchMigrationUpsertRemoteTypeDefinitionToCreateInput>>;
  remoteTypeDefinitionsToDelete?: InputMaybe<Array<BatchMigrationUpsertRemoteTypeDefinitionToDeleteInput>>;
  remoteTypeDefinitionsToUpdate?: InputMaybe<Array<BatchMigrationUpsertRemoteTypeDefinitionToUpdateInput>>;
};

export type BillingPeriod = {
  __typename?: 'BillingPeriod';
  from: Scalars['DateTime']['output'];
  to: Scalars['DateTime']['output'];
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CloneProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  region: Scalars['String']['input'];
  /** required to clone from a template or a project you are an owner of */
  template: CloneProjectTemplateInput;
};

/** clone project from a template */
export type CloneProjectTemplateInput = {
  /** Set to false to not include content */
  content?: Scalars['Boolean']['input'];
  /** id of template (if it's marked as template) or id of a project you are an owner of */
  templateId: Scalars['ID']['input'];
  /** Set to true to include webhooks. If webhooks are included, they will be disabled initially in the cloned project. */
  webhooks?: Scalars['Boolean']['input'];
};

export type CloningFrom = Project | StarterTemplate | Template;

export type CloningProject = IPendingProject & {
  __typename?: 'CloningProject';
  cloningFrom: CloningFrom;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
};

export enum ColorPalette {
  Brown = 'BROWN',
  Green = 'GREEN',
  Orange = 'ORANGE',
  Pink = 'PINK',
  Purple = 'PURPLE',
  Red = 'RED',
  Teal = 'TEAL',
  Yellow = 'YELLOW'
}

export enum ColumnOrderByDir {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type CommentingConfig = {
  __typename?: 'CommentingConfig';
  token: Scalars['String']['output'];
  url: Scalars['String']['output'];
  userKey: Scalars['String']['output'];
};

export type CommentingInfoInput = {
  gcms?: InputMaybe<Scalars['String']['input']>;
};

export type CommentingInfoPayload = {
  __typename?: 'CommentingInfoPayload';
  gcms?: Maybe<Scalars['String']['output']>;
};

export type CommonFilestack = {
  __typename?: 'CommonFilestack';
  apiKey: Scalars['String']['output'];
  path: Scalars['String']['output'];
  security: CommonFilestackSecurityOptions;
};

export type CommonFilestackSecurityOptions = {
  __typename?: 'CommonFilestackSecurityOptions';
  auth?: Maybe<FilestackSecurityAuthOptions>;
  enabled: Scalars['Boolean']['output'];
};

export type Component = IFieldParent & IRecentSchemaChange & {
  __typename?: 'Component';
  apiId: Scalars['String']['output'];
  apiIdPlural: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  environment: Environment;
  field: IField;
  fields: Array<IField>;
  fieldsConnection: FieldsConnection;
  /** Component has at least one instance in any of its usages */
  hasContent: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** Is true when at least one field is marked as localized */
  isLocalized: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  titleFields: Array<IField>;
  updatedAt: Scalars['DateTime']['output'];
};


export type ComponentFieldArgs = {
  id: Scalars['ID']['input'];
};


export type ComponentFieldsArgs = {
  includeApiOnlyFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeHiddenFields?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ComponentFieldsConnectionArgs = {
  first?: Scalars['Int']['input'];
  includeApiOnlyFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeHiddenFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeSystemFields?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: Scalars['Int']['input'];
};

export type ComponentField = IField & IRequireableField & {
  __typename?: 'ComponentField';
  apiId: Scalars['String']['output'];
  component: Component;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  extensions?: Maybe<Scalars['JSON']['output']>;
  formConfig: FieldConfig;
  hasEmptyValues: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** @deprecated Use visibility instead */
  isHidden: Scalars['Boolean']['output'];
  isList: Scalars['Boolean']['output'];
  isRequired: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  /**
   * This will throw a runtime error for fields that are on a component instead of model!
   * @deprecated Use parent instead
   */
  model: IModel;
  parent: IFieldParent;
  position: Scalars['Int']['output'];
  tableConfig: FieldConfig;
  type: ComponentFieldType;
  updatedAt: Scalars['DateTime']['output'];
  visibility: VisibilityTypes;
};

export enum ComponentFieldType {
  Component = 'COMPONENT'
}

export type ComponentUnionField = IField & IRequireableField & {
  __typename?: 'ComponentUnionField';
  apiId: Scalars['String']['output'];
  components: Array<Component>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  extensions?: Maybe<Scalars['JSON']['output']>;
  formConfig: FieldConfig;
  id: Scalars['ID']['output'];
  /** @deprecated Use visibility instead */
  isHidden: Scalars['Boolean']['output'];
  isList: Scalars['Boolean']['output'];
  isRequired: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  /**
   * This will throw a runtime error for fields that are on a component instead of model!
   * @deprecated Use parent instead
   */
  model: IModel;
  parent: IFieldParent;
  position: Scalars['Int']['output'];
  tableConfig: FieldConfig;
  type: ComponentUnionFieldType;
  updatedAt: Scalars['DateTime']['output'];
  visibility: VisibilityTypes;
};

export enum ComponentUnionFieldType {
  ComponentUnion = 'COMPONENT_UNION'
}

export type ContentModel = {
  __typename?: 'ContentModel';
  assetModel: IModel;
  component: Component;
  components: Array<Component>;
  enumeration: Enumeration;
  enumerations: Array<Enumeration>;
  field: IField;
  locales: Array<Locale>;
  model: IModel;
  models: Array<IModel>;
  stages: Array<Stage>;
  unions: Array<Maybe<Union>>;
};


export type ContentModelComponentArgs = {
  apiId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type ContentModelComponentsArgs = {
  includeSystemComponents?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ContentModelEnumerationArgs = {
  apiId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type ContentModelEnumerationsArgs = {
  includeSystemEnumerations?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ContentModelFieldArgs = {
  id: Scalars['ID']['input'];
};


export type ContentModelModelArgs = {
  apiId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type ContentModelModelsArgs = {
  includeSystemModels?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentPermissionAppTokenTarget = {
  __typename?: 'ContentPermissionAppTokenTarget';
  appInstallation?: Maybe<AppInstallation>;
};

export type ContentPermissionPermanentAuthTokenTarget = {
  __typename?: 'ContentPermissionPermanentAuthTokenTarget';
  permanentAuthToken: PermanentAuthToken;
};

export type ContentPermissionPublicTarget = {
  __typename?: 'ContentPermissionPublicTarget';
  environment: Environment;
};

export type ContentPermissionRoleTarget = {
  __typename?: 'ContentPermissionRoleTarget';
  environment: Environment;
  role: Role;
};

export type ContentPermissionTarget = ContentPermissionAppTokenTarget | ContentPermissionPermanentAuthTokenTarget | ContentPermissionPublicTarget | ContentPermissionRoleTarget;

export enum ContentPermissionTargetKind {
  Pat = 'PAT',
  Public = 'PUBLIC',
  Role = 'ROLE'
}

export type ContentView = {
  __typename?: 'ContentView';
  allColumns: Array<IContentViewColumn>;
  /** @deprecated Use allColumns instead */
  columns: Array<ContentViewColumn>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  filters: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  isSystem: Scalars['Boolean']['output'];
  model: IModel;
  name: Scalars['String']['output'];
  orderBy?: Maybe<OrderBy>;
  position?: Maybe<Scalars['Int']['output']>;
  type: ContentViewType;
  updatedAt: Scalars['DateTime']['output'];
  viewGroup: ViewGroup;
};

export type ContentViewColumn = {
  __typename?: 'ContentViewColumn';
  field: IField;
  id: Scalars['ID']['output'];
  isVisible: Scalars['Boolean']['output'];
  position: Scalars['Int']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type ContentViewColumnInput = {
  fieldId?: InputMaybe<Scalars['ID']['input']>;
  isVisible: Scalars['Boolean']['input'];
  type?: InputMaybe<ContentViewColumnType>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export enum ContentViewColumnType {
  Field = 'FIELD',
  Stages = 'STAGES'
}

export type ContentViewFieldColumn = IContentViewColumn & {
  __typename?: 'ContentViewFieldColumn';
  field: IField;
  id: Scalars['ID']['output'];
  isVisible: Scalars['Boolean']['output'];
  position: Scalars['Int']['output'];
  type: ContentViewColumnType;
  width?: Maybe<Scalars['Int']['output']>;
};

export type ContentViewFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Only include content views when the current viewer has access to the content of the connected model
   * Conditional access is treated as having access. This does only work on UseViewer (PATs are not supported).
   * This filter checks for READ access on the DRAFT stage only.
   */
  viewerHasContentPermissions?: Scalars['Boolean']['input'];
};

export type ContentViewSystemColumn = IContentViewColumn & {
  __typename?: 'ContentViewSystemColumn';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isVisible: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  type: ContentViewColumnType;
  width?: Maybe<Scalars['Int']['output']>;
};

export enum ContentViewType {
  BuiltIn = 'BUILT_IN',
  Public = 'PUBLIC'
}

export type CreateAppExchangeTokenInput = {
  appApiId: Scalars['String']['input'];
  environment: Scalars['ID']['input'];
};

export type CreateAppExchangeTokenPayload = {
  __typename?: 'CreateAppExchangeTokenPayload';
  createdAppExchangeToken: Scalars['String']['output'];
};

export type CreateAppInstallationInput = {
  appApiId: Scalars['String']['input'];
  config: Scalars['JSON']['input'];
  environment: Scalars['ID']['input'];
  status?: InputMaybe<AppInstallationStatus>;
};

export type CreateAppInstallationPayload = {
  __typename?: 'CreateAppInstallationPayload';
  createdAppInstallation: AppInstallation;
};

export type CreateComponentFieldInput = {
  apiId: Scalars['String']['input'];
  component: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  isList: Scalars['Boolean']['input'];
  isRequired: Scalars['Boolean']['input'];
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  /** This can be a model or component id */
  parentId: Scalars['ID']['input'];
  position?: InputMaybe<Scalars['Int']['input']>;
  tableConfig?: InputMaybe<FieldConfigInput>;
  visibility?: VisibilityTypes;
};

export type CreateComponentInput = {
  apiId: Scalars['String']['input'];
  apiIdPlural: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  environmentId: Scalars['ID']['input'];
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateComponentUnionFieldInput = {
  apiId: Scalars['String']['input'];
  components: Array<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  isList: Scalars['Boolean']['input'];
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  /** This can be a model or component id */
  parentId: Scalars['ID']['input'];
  position?: InputMaybe<Scalars['Int']['input']>;
  tableConfig?: InputMaybe<FieldConfigInput>;
  visibility?: VisibilityTypes;
};

export type CreateContentPermission = IContentPermission & {
  __typename?: 'CreateContentPermission';
  condition?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  locales?: Maybe<Array<Locale>>;
  model?: Maybe<IModel>;
  target: ContentPermissionTarget;
  updatedAt: Scalars['DateTime']['output'];
};

/**
 * CreateContentPermissionTargetInput describes the target of a Create<Action>ContentPermissionInput
 * Depending on the kind you need to pass different ids:
 * - ROLE: roleId & environmentId
 * - PAT: patId
 * - PUBLIC: environmentId
 */
export type CreateContentPermissionTargetInput = {
  environmentId?: InputMaybe<Scalars['ID']['input']>;
  kind: ContentPermissionTargetKind;
  patId?: InputMaybe<Scalars['ID']['input']>;
  roleId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateContentViewInput = {
  columns: Array<ContentViewColumnInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<Scalars['JSON']['input']>;
  modelId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  orderBy?: InputMaybe<OrderByInput>;
  viewGroupId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateContentViewPayload = {
  __typename?: 'CreateContentViewPayload';
  createdContentView: ContentView;
};

export type CreateCreateContentPermissionInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Scalars['ID']['input']>>;
  model?: InputMaybe<CreateCreateContentPermissionModelInput>;
  target: CreateContentPermissionTargetInput;
};

export type CreateCreateContentPermissionModelInput = {
  condition?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type CreateCreateContentPermissionPayload = {
  __typename?: 'CreateCreateContentPermissionPayload';
  permission: CreateContentPermission;
};

export type CreateCustomSidebarElementInput = {
  appElementId?: InputMaybe<Scalars['ID']['input']>;
  appInstallationId?: InputMaybe<Scalars['ID']['input']>;
  config?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  extensionId?: InputMaybe<Scalars['ID']['input']>;
  modelId: Scalars['ID']['input'];
};

export type CreateDeleteContentPermissionInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Scalars['ID']['input']>>;
  model?: InputMaybe<CreateDeleteContentPermissionModelInput>;
  target: CreateContentPermissionTargetInput;
};

export type CreateDeleteContentPermissionModelInput = {
  condition?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type CreateDeleteContentPermissionPayload = {
  __typename?: 'CreateDeleteContentPermissionPayload';
  permission: DeleteContentPermission;
};

export type CreateEnumerableFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  enumerationId: Scalars['ID']['input'];
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  initialValue?: InputMaybe<Scalars['String']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList: Scalars['Boolean']['input'];
  isLocalized?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired: Scalars['Boolean']['input'];
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  isTitle?: InputMaybe<Scalars['Boolean']['input']>;
  isUnique: Scalars['Boolean']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
  migrationValue?: InputMaybe<Scalars['String']['input']>;
  modelId?: InputMaybe<Scalars['ID']['input']>;
  /**
   * This can be a model or component id, modelId must be empty when parentId is used
   * either modelId or parentId needs to be set and is required via validation, it will be made required.
   */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  tableConfig?: InputMaybe<FieldConfigInput>;
  type: EnumerableFieldType;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type CreateEnumerationInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  environmentId: Scalars['ID']['input'];
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  values: Array<EnumerationValueCreateInput>;
};

export type CreateEnvironmentInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  /**
   * Specify which environment to use
   * as origin
   */
  fromEnvironment: Scalars['ID']['input'];
  /**
   * This will be used in your
   * API endpoint and has to be
   * an all-lowercase alphanumeric
   * string between 1 and 16 characters
   */
  name: Scalars['String']['input'];
  /**
   * Setting this to false allows the environment to be created without the assets
   * of the origin environment.
   * This option is true by default.
   */
  withAssets?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Allows to create environment
   * with content of origin environment
   */
  withContent?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Allows to create environment
   * with webhooks of the origin environment.
   * By default cloned environments will get the same webhooks that will be initially deactivated.
   */
  withWebhooks?: Scalars['Boolean']['input'];
};

export type CreateEnvironmentPayload = {
  __typename?: 'CreateEnvironmentPayload';
  createdEnvironment: Environment;
};

export type CreateFieldExtensionInput = {
  apiId: Scalars['String']['input'];
  config: Scalars['JSON']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  environmentId: Scalars['ID']['input'];
  fieldType: ExtensionFieldType;
  hasFormRenderer: Scalars['Boolean']['input'];
  hasListRenderer: Scalars['Boolean']['input'];
  hasTableRenderer: Scalars['Boolean']['input'];
  isActive: Scalars['Boolean']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  neededPermissions?: InputMaybe<Array<Scalars['ID']['input']>>;
  src: Scalars['String']['input'];
  srcTypeId: Scalars['ID']['input'];
};

export type CreateFieldExtensionPayload = {
  __typename?: 'CreateFieldExtensionPayload';
  createdExtension: FieldExtension;
};

export type CreateFieldInputArgInput = {
  apiId: Scalars['String']['input'];
  isList: Scalars['Boolean']['input'];
  isRequired: Scalars['Boolean']['input'];
  remoteTypeId: Scalars['ID']['input'];
};

export type CreateGatsbyCloudIntegrationInput = {
  /** URL to trigger a Deploy Build. */
  buildWebhookURL: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  environmentId: Scalars['ID']['input'];
  /** URL to trigger a CMS Preview build. */
  previewWebhookURL: Scalars['String']['input'];
  /**
   * Prefix of your site
   * Only lower case alphabetical characters, numbers and underscores are allowed.
   */
  sitePrefix: Scalars['String']['input'];
};

export type CreateGatsbyCloudIntegrationPayload = {
  __typename?: 'CreateGatsbyCloudIntegrationPayload';
  createdGatsbyCloudIntegration: GatsbyCloudIntegration;
};

export type CreateGraphQlRemoteSourceInput = {
  debugEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  environmentId: Scalars['ID']['input'];
  headers?: InputMaybe<Scalars['JSON']['input']>;
  /** HTTP headers that will be used for introspection */
  introspectionHeaders?: InputMaybe<Scalars['JSON']['input']>;
  /** HTTP method that will be used for introspection */
  introspectionMethod: GraphQlRemoteSourceIntrospectionMethod;
  /**
   * Specific URL that will be used for introspection if the introspection is available on another url than the regular url.
   * Can be ignored if the introspection url is the same as the url of the remote source.
   */
  introspectionUrl?: InputMaybe<Scalars['String']['input']>;
  kind: RemoteSourceKind;
  /** Oauth input that can be used to get access token for the remote source */
  oAuth?: InputMaybe<RemoteSourceOAuthInput>;
  /** Unique prefix that will be prepended to all of the remote types. This value cannot be changed! */
  prefix: Scalars['String']['input'];
  /** Custom GraphQL input types that can be used as arguments in remote fields that belong to this remoteSource */
  remoteTypeDefinitions?: InputMaybe<Array<CreateRemoteTypeDefinitionInput>>;
  url: Scalars['String']['input'];
};

export type CreateLocaleInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  environmentId: Scalars['ID']['input'];
};

export type CreateMemberFieldInput = {
  apiId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  /** ID of member model to add */
  modelId: Scalars['ID']['input'];
  tableConfig?: InputMaybe<FieldConfigInput>;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type CreateModelInput = {
  apiId: Scalars['String']['input'];
  apiIdPlural: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  environmentId: Scalars['ID']['input'];
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateNetlifyIntegrationInput = {
  /**
   * This token is used to create the needed BuildHook and BuildNotifications in Netlify.
   * This token is only used once and won't be stored anywhere
   */
  accessToken: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  environmentId: Scalars['ID']['input'];
  /**
   * A selection of models where the integration should be displayed in the frontend.
   * If the integration should be displayed on every model, pass null or an empty array here.
   */
  models?: InputMaybe<Array<Scalars['ID']['input']>>;
  sites: Array<NetlifySiteInput>;
};

export type CreateNetlifyIntegrationPayload = {
  __typename?: 'CreateNetlifyIntegrationPayload';
  createdNetlifyIntegration: NetlifyIntegration;
};

export type CreatePermanentAuthTokenInput = {
  defaults?: InputMaybe<PermanentAuthTokenDefaultsInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  environmentId: Scalars['ID']['input'];
  managementPermissionIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name: Scalars['String']['input'];
};

export type CreatePermanentAuthTokenPayload = {
  __typename?: 'CreatePermanentAuthTokenPayload';
  createdPermanentAuthToken: PermanentAuthToken;
};

/** create project from a template */
export type CreateProjectTemplateInput = {
  /** Set to false to not include content */
  content?: Scalars['Boolean']['input'];
  /** id of template (if it's marked as template) or id of a project you are an owner of */
  templateId: Scalars['ID']['input'];
  /** Set to true to include webhooks. If webhooks are included, they will be disabled initially in the created project. */
  webhooks?: Scalars['Boolean']['input'];
};

export type CreatePublishContentPermissionInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  fromStages?: InputMaybe<Array<Scalars['ID']['input']>>;
  locales?: InputMaybe<Array<Scalars['ID']['input']>>;
  model?: InputMaybe<CreatePublishContentPermissionModelInput>;
  target: CreateContentPermissionTargetInput;
  toStages?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type CreatePublishContentPermissionModelInput = {
  condition?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type CreatePublishContentPermissionPayload = {
  __typename?: 'CreatePublishContentPermissionPayload';
  permission: PublishContentPermission;
};

export type CreateRestRemoteSourceInput = {
  debugEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  environmentId: Scalars['ID']['input'];
  headers?: InputMaybe<Scalars['JSON']['input']>;
  kind: RemoteSourceKind;
  /** Oauth input that can be used to get access token for the remote source */
  oAuth?: InputMaybe<RemoteSourceOAuthInput>;
  /** Unique prefix that will be prepended to all of the remote types. This value cannot be changed! */
  prefix: Scalars['String']['input'];
  /** Remote type definitions that the remote source supports or input types that can be used by any remote field of this remote source */
  remoteTypeDefinitions?: InputMaybe<Array<CreateRemoteTypeDefinitionInput>>;
  url: Scalars['String']['input'];
};

export type CreateReadContentPermissionInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Scalars['ID']['input']>>;
  model?: InputMaybe<CreateReadContentPermissionModelInput>;
  stages?: InputMaybe<Array<Scalars['ID']['input']>>;
  target: CreateContentPermissionTargetInput;
};

export type CreateReadContentPermissionModelInput = {
  condition?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type CreateReadContentPermissionPayload = {
  __typename?: 'CreateReadContentPermissionPayload';
  permission: ReadContentPermission;
};

export type CreateReadVersionContentPermissionInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  modelId?: InputMaybe<Scalars['ID']['input']>;
  target: CreateContentPermissionTargetInput;
};

export type CreateReadVersionContentPermissionPayload = {
  __typename?: 'CreateReadVersionContentPermissionPayload';
  permission: ReadVersionContentPermission;
};

export type CreateRelationalFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList: Scalars['Boolean']['input'];
  /**
   * Marks the field as required.
   * Note: This is only supported for RelationFieldType ASSET!
   */
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  modelId?: InputMaybe<Scalars['ID']['input']>;
  /**
   * This can be a model or component id, modelId must be empty when parentId is used
   * either modelId or parentId needs to be set and is required via validation, it will be made required.
   */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  relationApiId?: InputMaybe<Scalars['String']['input']>;
  reverseSide: CreateReverseRelationSide;
  tableConfig?: InputMaybe<FieldConfigInput>;
  type: RelationalFieldType;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type CreateRemoteFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  inputArgs?: InputMaybe<Array<CreateFieldInputArgInput>>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList: Scalars['Boolean']['input'];
  isRequired: Scalars['Boolean']['input'];
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  modelId?: InputMaybe<Scalars['ID']['input']>;
  /**
   * This can be a model or component id, modelId must be empty when parentId is used
   * either modelId or parentId needs to be set and is required via validation, it will be made required.
   */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  remoteConfig: RemoteFieldConfigInput;
  tableConfig?: InputMaybe<FieldConfigInput>;
  type: RemoteFieldType;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type CreateRemoteTypeDefinitionInput = {
  sdl: Scalars['String']['input'];
};

export type CreateReverseField = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList: Scalars['Boolean']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
  tableConfig?: InputMaybe<FieldConfigInput>;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type CreateReverseRelationSide = {
  field?: InputMaybe<CreateReverseField>;
  modelId: Scalars['ID']['input'];
};

export type CreateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  managementPermissionIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name: Scalars['String']['input'];
  projectId: Scalars['ID']['input'];
};

export type CreateSidebarElementPayload = {
  __typename?: 'CreateSidebarElementPayload';
  createdSidebarElement?: Maybe<ISidebarElement>;
};

export type CreateSidebarExtensionInput = {
  apiId: Scalars['String']['input'];
  config: Scalars['JSON']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  environmentId: Scalars['ID']['input'];
  isActive: Scalars['Boolean']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  neededPermissions?: InputMaybe<Array<Scalars['ID']['input']>>;
  src: Scalars['String']['input'];
  srcTypeId: Scalars['ID']['input'];
};

export type CreateSidebarExtensionPayload = {
  __typename?: 'CreateSidebarExtensionPayload';
  createdExtension: SidebarExtension;
};

export type CreateSimpleFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  embeddableModels?: InputMaybe<Array<Scalars['ID']['input']>>;
  embedsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  initialValue?: InputMaybe<Scalars['String']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList: Scalars['Boolean']['input'];
  isLocalized: Scalars['Boolean']['input'];
  isRequired: Scalars['Boolean']['input'];
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  isTitle?: InputMaybe<Scalars['Boolean']['input']>;
  isUnique: Scalars['Boolean']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
  migrationValue?: InputMaybe<Scalars['String']['input']>;
  modelId?: InputMaybe<Scalars['ID']['input']>;
  /**
   * This can be a model or component id, modelId must be empty when parentId is used
   * either modelId or parentId needs to be set and is required via validation, it will be made required.
   */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  tableConfig?: InputMaybe<FieldConfigInput>;
  type: SimpleFieldType;
  validations?: InputMaybe<SimpleFieldValidationsInput>;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type CreateStageInput = {
  /**
   * Identifier to be used in
   * Content API Schema
   */
  apiId: Scalars['String']['input'];
  /** Color that will be used in the webapp */
  colorPaletteId: ColorPalette;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  environmentId: Scalars['ID']['input'];
  position?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateSystemSidebarElementInput = {
  config?: InputMaybe<Scalars['JSON']['input']>;
  modelId: Scalars['ID']['input'];
  type: SystemSidebarElementType;
};

export type CreateUnionFieldInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList: Scalars['Boolean']['input'];
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  modelId?: InputMaybe<Scalars['ID']['input']>;
  /**
   * This can be a model or component id, modelId must be empty when parentId is used
   * either modelId or parentId needs to be set and is required via validation, it will be made required.
   */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  reverseSide?: InputMaybe<CreateReverseField>;
  tableConfig?: InputMaybe<FieldConfigInput>;
  type: UnionFieldType;
  union: CreateUnionInput;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type CreateUnionInput = {
  apiId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  /** IDs of models to add to union */
  modelIds: Array<Scalars['ID']['input']>;
};

export type CreateUnpublishContentPermissionInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Scalars['ID']['input']>>;
  model?: InputMaybe<CreateUnpublishContentPermissionModelInput>;
  stages?: InputMaybe<Array<Scalars['ID']['input']>>;
  target: CreateContentPermissionTargetInput;
};

export type CreateUnpublishContentPermissionModelInput = {
  condition?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type CreateUnpublishContentPermissionPayload = {
  __typename?: 'CreateUnpublishContentPermissionPayload';
  permission: UnpublishContentPermission;
};

export type CreateUpdateContentPermissionInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Scalars['ID']['input']>>;
  model?: InputMaybe<CreateUpdateContentPermissionModelInput>;
  target: CreateContentPermissionTargetInput;
};

export type CreateUpdateContentPermissionModelInput = {
  condition?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type CreateUpdateContentPermissionPayload = {
  __typename?: 'CreateUpdateContentPermissionPayload';
  permission: UpdateContentPermission;
};

export type CreateUserInput = {
  gcms?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  gcms?: Maybe<Scalars['String']['output']>;
};

export type CreateViewGroupInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  environmentId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type?: InputMaybe<ViewGroupContentType>;
};

export type CreateViewGroupPayload = {
  __typename?: 'CreateViewGroupPayload';
  createdViewGroup: ViewGroup;
};

export type CreateWebhookInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  environmentId: Scalars['ID']['input'];
  headers?: InputMaybe<Scalars['JSON']['input']>;
  includePayload: Scalars['Boolean']['input'];
  isActive: Scalars['Boolean']['input'];
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  method?: InputMaybe<WebhookMethod>;
  /**
   * Pass an empty array for all existing models.
   * This will also setup the webhook for models
   * created in the future
   */
  models: Array<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  secretKey?: InputMaybe<Scalars['String']['input']>;
  /**
   * Pass an empty array for all existing stages.
   * This will also setup the webhook for stages
   * created in the future
   */
  stages: Array<Scalars['ID']['input']>;
  triggerActions: Array<WebhookTriggerAction>;
  triggerSources?: InputMaybe<Array<WebhookTriggerSource>>;
  triggerType: WebhookTriggerType;
  url: Scalars['String']['input'];
};

export type CreateWebhookPayload = {
  __typename?: 'CreateWebhookPayload';
  createdWebhook: Webhook;
};

export type CreatedBy = AppToken | Member | PermanentAuthToken;

export type CustomSidebarElement = ISidebarElement & {
  __typename?: 'CustomSidebarElement';
  config?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  extension: SidebarExtension;
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  model: IModel;
  position: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DeleteAppInstallationInput = {
  appInstallationId: Scalars['ID']['input'];
};

export type DeleteAppInstallationPayload = {
  __typename?: 'DeleteAppInstallationPayload';
  deletedAppInstallationId: Scalars['ID']['output'];
};

export type DeleteComponentInput = {
  id: Scalars['ID']['input'];
};

export type DeleteContentPermission = IContentPermission & {
  __typename?: 'DeleteContentPermission';
  condition?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  locales?: Maybe<Array<Locale>>;
  model?: Maybe<IModel>;
  target: ContentPermissionTarget;
  updatedAt: Scalars['DateTime']['output'];
};

export type DeleteContentPermissionInput = {
  permissionId: Scalars['ID']['input'];
};

export type DeleteContentPermissionPayload = {
  __typename?: 'DeleteContentPermissionPayload';
  deletedPermissionId: Scalars['ID']['output'];
};

export type DeleteContentViewInput = {
  id: Scalars['ID']['input'];
};

export type DeleteContentViewPayload = {
  __typename?: 'DeleteContentViewPayload';
  deletedContentViewId: Scalars['ID']['output'];
};

export type DeleteEnumerationInput = {
  id: Scalars['ID']['input'];
};

export type DeleteEnvironmentInput = {
  id: Scalars['ID']['input'];
};

export type DeleteEnvironmentPayload = {
  __typename?: 'DeleteEnvironmentPayload';
  deletedEnvironmentId: Scalars['ID']['output'];
};

export type DeleteExtensionInput = {
  extensionId: Scalars['ID']['input'];
};

export type DeleteExtensionPayload = {
  __typename?: 'DeleteExtensionPayload';
  deletedExtensionId: Scalars['ID']['output'];
};

export type DeleteFieldInput = {
  id: Scalars['ID']['input'];
};

export type DeleteGatsbyCloudIntegrationInput = {
  id: Scalars['ID']['input'];
};

export type DeleteGatsbyCloudIntegrationPayload = {
  __typename?: 'DeleteGatsbyCloudIntegrationPayload';
  deletedGatsbyCloudIntegrationId: Scalars['ID']['output'];
};

export type DeleteLocaleInput = {
  /**
   * Delete all localizations for this locale.
   * This will prevent an exception from
   * being raised if documents were previously
   * localized in this locale
   */
  force?: InputMaybe<Scalars['Boolean']['input']>;
  /** ID of Locale to delete */
  id: Scalars['ID']['input'];
};

export type DeleteModelInput = {
  id: Scalars['ID']['input'];
};

export type DeleteNetlifyIntegrationInput = {
  /**
   * This token is used to cleanup the resources in Netlify that where used by this integration .
   * This token is only used once and won't be stored anywhere
   */
  accessToken: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type DeleteNetlifyIntegrationPayload = {
  __typename?: 'DeleteNetlifyIntegrationPayload';
  deletedNetlifyIntegrationId: Scalars['ID']['output'];
};

export type DeletePermanentAuthTokenInput = {
  id: Scalars['ID']['input'];
};

export type DeletePermanentAuthTokenPayload = {
  __typename?: 'DeletePermanentAuthTokenPayload';
  deletedPermanentAuthTokenId: Scalars['ID']['output'];
};

export type DeleteProjectInput = {
  id: Scalars['ID']['input'];
};

export type DeleteProjectPayload = {
  __typename?: 'DeleteProjectPayload';
  deletedProjectId: Scalars['ID']['output'];
};

export type DeleteRemoteSourceInput = {
  id: Scalars['ID']['input'];
};

export type DeleteRoleInput = {
  id: Scalars['ID']['input'];
};

export type DeleteRolePayload = {
  __typename?: 'DeleteRolePayload';
  deletedId: Scalars['ID']['output'];
};

export type DeleteSidebarElementInput = {
  sidebarElementId: Scalars['ID']['input'];
};

export type DeleteSidebarElementPayload = {
  __typename?: 'DeleteSidebarElementPayload';
  deletedSidebarElementId: Scalars['ID']['output'];
};

export type DeleteStageInput = {
  /**
   * Delete all documents in stage.
   * This will prevent an exception from
   * being raised if documents were previously
   * published to this stage
   */
  force?: InputMaybe<Scalars['Boolean']['input']>;
  /** ID of Stage to delete */
  id: Scalars['ID']['input'];
};

export type DeleteViewGroupInput = {
  id: Scalars['ID']['input'];
};

export type DeleteViewGroupPayload = {
  __typename?: 'DeleteViewGroupPayload';
  deletedViewGroupId: Scalars['ID']['output'];
};

export type DeleteWebhookInput = {
  webhookId: Scalars['ID']['input'];
};

export type DeleteWebhookPayload = {
  __typename?: 'DeleteWebhookPayload';
  deletedWebhookId: Scalars['ID']['output'];
};

export type DiffEnvironmentPayload = {
  __typename?: 'DiffEnvironmentPayload';
  changes: Array<Scalars['JSON']['output']>;
};

export type DuplicateComponentInput = {
  apiId: Scalars['String']['input'];
  apiIdPlural: Scalars['String']['input'];
  componentId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
};

export type DuplicateModelInput = {
  apiId: Scalars['String']['input'];
  apiIdPlural: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  modelId: Scalars['ID']['input'];
};

export type EmbeddableModelsInput = {
  modelsToAdd?: InputMaybe<Array<Scalars['ID']['input']>>;
  modelsToRemove?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type EnumerableField = IField & ILocalizableField & IRequireableField & ITitleableField & IUniqueableField & {
  __typename?: 'EnumerableField';
  apiId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  enumeration: Enumeration;
  extensions?: Maybe<Scalars['JSON']['output']>;
  formConfig: FieldConfig;
  id: Scalars['ID']['output'];
  initialValue?: Maybe<EnumerationValue>;
  /** @deprecated Use visibility instead */
  isHidden: Scalars['Boolean']['output'];
  isList: Scalars['Boolean']['output'];
  isLocalized: Scalars['Boolean']['output'];
  isRequired: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  isTitle: Scalars['Boolean']['output'];
  isUnique: Scalars['Boolean']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  /**
   * This will throw a runtime error for fields that are on a component instead of model!
   * @deprecated Use parent instead
   */
  model: IModel;
  parent: IFieldParent;
  position: Scalars['Int']['output'];
  tableConfig: FieldConfig;
  type: EnumerableFieldType;
  updatedAt: Scalars['DateTime']['output'];
  visibility: VisibilityTypes;
};

export enum EnumerableFieldType {
  Enumeration = 'ENUMERATION'
}

export type Enumeration = IRecentSchemaChange & {
  __typename?: 'Enumeration';
  apiId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  environment: Environment;
  id: Scalars['ID']['output'];
  isSystem: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  values: Array<EnumerationValue>;
};

export type EnumerationValue = {
  __typename?: 'EnumerationValue';
  apiId: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type EnumerationValueCreateInput = {
  apiId: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
};

export type EnumerationValueUpdateInput = {
  /** Update enumeration value API identifier */
  apiId?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type Environment = {
  __typename?: 'Environment';
  appInstallation: AppInstallation;
  appInstallations: Array<AppInstallation>;
  assetConfig: IAssetConfig;
  authToken: Scalars['String']['output'];
  commentingConfig?: Maybe<CommentingConfig>;
  contentModel: ContentModel;
  contentView: ContentView;
  contentViews: Array<ContentView>;
  createdAt: Scalars['DateTime']['output'];
  deliveryUrl?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  diff: DiffEnvironmentPayload;
  displayName: Scalars['String']['output'];
  endpoint: Scalars['String']['output'];
  extension: IExtension;
  extensions: Array<IExtension>;
  id: Scalars['ID']['output'];
  integration: IIntegration;
  integrations: Array<IIntegration>;
  isCloning?: Maybe<Scalars['Boolean']['output']>;
  metrics: Metrics;
  migration: Migration;
  migrations: Array<Migration>;
  name: Scalars['String']['output'];
  newDeliveryUrl: Scalars['String']['output'];
  permanentAuthTokens: Array<PermanentAuthToken>;
  publicContentAPI: PublicContentApi;
  quotas: EnvironmentLevelQuota;
  recentSchemaChanges: Array<IRecentSchemaChange>;
  remoteSource: IRemoteSource;
  remoteSources: Array<IRemoteSource>;
  /** @deprecated Revisions are no longer maintained */
  revisionCount: Scalars['Int']['output'];
  runningMigration?: Maybe<Migration>;
  updatedAt: Scalars['DateTime']['output'];
  viewGroups: Array<ViewGroup>;
  webhook: Webhook;
  webhooks: Array<Webhook>;
};


export type EnvironmentAppInstallationArgs = {
  appApiId: Scalars['String']['input'];
};


export type EnvironmentAppInstallationsArgs = {
  status?: InputMaybe<AppInstallationStatus>;
};


export type EnvironmentContentViewArgs = {
  id: Scalars['ID']['input'];
};


export type EnvironmentContentViewsArgs = {
  filter?: InputMaybe<ContentViewFilterInput>;
  includeSystemModels?: InputMaybe<Scalars['Boolean']['input']>;
};


export type EnvironmentDiffArgs = {
  environmentName: Scalars['String']['input'];
};


export type EnvironmentExtensionArgs = {
  id: Scalars['ID']['input'];
};


export type EnvironmentIntegrationArgs = {
  id: Scalars['ID']['input'];
};


export type EnvironmentMigrationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type EnvironmentRecentSchemaChangesArgs = {
  limit?: Scalars['Int']['input'];
};


export type EnvironmentRemoteSourceArgs = {
  prefix: Scalars['String']['input'];
};


export type EnvironmentWebhookArgs = {
  id: Scalars['ID']['input'];
};

export type EnvironmentBackup = {
  __typename?: 'EnvironmentBackup';
  backupEnvironment?: Maybe<Environment>;
  createdAt: Scalars['DateTime']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  originEnvironment?: Maybe<Environment>;
  restoredAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type EnvironmentBackupConfig = {
  __typename?: 'EnvironmentBackupConfig';
  backupTtlInSec?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  cronSchedule?: Maybe<Scalars['String']['output']>;
  environment: Environment;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EnvironmentCreatedPayload = {
  __typename?: 'EnvironmentCreatedPayload';
  environment: Environment;
};

export type EnvironmentLevelQuota = {
  __typename?: 'EnvironmentLevelQuota';
  components: Progress;
  contentPermissions: Progress;
  locales: Progress;
  models: Progress;
  remoteSources: Progress;
  stages: Progress;
  webhooks: Progress;
};

export type EnvironmentPermissions = {
  __typename?: 'EnvironmentPermissions';
  /** True if mutations on this stage are allowed */
  allowMutations: Scalars['Boolean']['output'];
};

/** Permissions of an environment */
export type EnvironmentPermissionsInput = {
  /** True if mutations on this environment are allowed */
  allowMutations: Scalars['Boolean']['input'];
};

export type EnvironmentPromotedPayload = {
  __typename?: 'EnvironmentPromotedPayload';
  previousMasterEnvironment: Environment;
  promotedEnvironment: Environment;
  promotedEnvironmentPreviousDisplayName: Scalars['String']['output'];
};

export enum ExtensionFieldType {
  Asset = 'ASSET',
  Boolean = 'BOOLEAN',
  Color = 'COLOR',
  Date = 'DATE',
  Datetime = 'DATETIME',
  Enumeration = 'ENUMERATION',
  Float = 'FLOAT',
  Graphql = 'GRAPHQL',
  Id = 'ID',
  Int = 'INT',
  Json = 'JSON',
  Location = 'LOCATION',
  Relation = 'RELATION',
  Rest = 'REST',
  Richtext = 'RICHTEXT',
  String = 'STRING',
  Union = 'UNION'
}

export type ExtensionSidebarElement = ISidebarElement & {
  __typename?: 'ExtensionSidebarElement';
  config?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  extension: SidebarExtension;
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  model: IModel;
  position: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ExtensionSrcType = {
  __typename?: 'ExtensionSrcType';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: AvailableExtensionSrcType;
  updatedAt: Scalars['DateTime']['output'];
};

export type Feedback = {
  __typename?: 'Feedback';
  /** Allow contacting the user */
  allowContact?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** Name of the feature */
  featureName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** Feedback Message */
  message?: Maybe<Scalars['String']['output']>;
  /** Rating of the feature */
  rating?: Maybe<Scalars['Int']['output']>;
  /** Reason for deleting project */
  reasons?: Maybe<Array<Scalars['String']['output']>>;
  /** Type of feedback */
  type: FeedbackType;
};

/** Type of feedback */
export enum FeedbackType {
  /** Used when deleting an account */
  DeleteAccount = 'DELETE_ACCOUNT',
  /** Used when deleting a project */
  DeleteProject = 'DELETE_PROJECT',
  /** Used when downgrading a plan on a project */
  DowngradePlan = 'DOWNGRADE_PLAN',
  /** Used when sending a feedback from a new feature on the webapp */
  FeatureFeedback = 'FEATURE_FEEDBACK',
  /** Used when sending a feedback from the feedback form on the webapp */
  GeneralFeedback = 'GENERAL_FEEDBACK',
  /** Used when leaving a project */
  LeaveProject = 'LEAVE_PROJECT'
}

export type FieldAppElement = IAppElement & {
  __typename?: 'FieldAppElement';
  apiId: Scalars['String']['output'];
  app: App;
  config?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  features: Array<FieldAppElementFeature>;
  fieldType: SimpleFieldType;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  src: Scalars['String']['output'];
  type: AppElementType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum FieldAppElementFeature {
  FieldRenderer = 'FieldRenderer',
  ListRenderer = 'ListRenderer',
  TableRenderer = 'TableRenderer'
}

export type FieldConfig = {
  __typename?: 'FieldConfig';
  appElement?: Maybe<FieldAppElement>;
  appInstallation?: Maybe<AppInstallation>;
  config: Scalars['JSON']['output'];
  extension?: Maybe<FieldExtension>;
  id: Scalars['String']['output'];
  renderer: Scalars['String']['output'];
};

export type FieldConfigInput = {
  appElementId?: InputMaybe<Scalars['ID']['input']>;
  appInstallationId?: InputMaybe<Scalars['ID']['input']>;
  config: Scalars['JSON']['input'];
  extensionId?: InputMaybe<Scalars['ID']['input']>;
  renderer: Scalars['String']['input'];
};

export type FieldConfigUpdateInput = {
  config?: InputMaybe<Scalars['JSON']['input']>;
  extensionId?: InputMaybe<Scalars['ID']['input']>;
  renderer?: InputMaybe<Scalars['String']['input']>;
};

export type FieldEdge = {
  __typename?: 'FieldEdge';
  node: IField;
};

export type FieldExtension = IExtension & {
  __typename?: 'FieldExtension';
  apiId: Scalars['String']['output'];
  config: Scalars['JSON']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Member>;
  description?: Maybe<Scalars['String']['output']>;
  environment: Environment;
  fieldType: ExtensionFieldType;
  fields: Array<IField>;
  hasFormRenderer: Scalars['Boolean']['output'];
  hasListRenderer: Scalars['Boolean']['output'];
  hasTableRenderer: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  neededPermissions: Array<AvailableExtensionPermission>;
  /** Location for the source if the source type is an external one */
  src: Scalars['String']['output'];
  /** The type indicating where the source for the extension will be obtained from */
  srcType: ExtensionSrcType;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy?: Maybe<Member>;
};

export type FieldInputArg = {
  __typename?: 'FieldInputArg';
  apiId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isList: Scalars['Boolean']['output'];
  isRequired: Scalars['Boolean']['output'];
  remoteType: RemoteTypeDefinition;
};

export type FieldValidationFloatRange = {
  __typename?: 'FieldValidationFloatRange';
  errorMessage?: Maybe<Scalars['String']['output']>;
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
};

export type FieldValidationFloatRangeInput = {
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
};

export type FieldValidationIntRange = {
  __typename?: 'FieldValidationIntRange';
  errorMessage?: Maybe<Scalars['String']['output']>;
  max?: Maybe<Scalars['Int']['output']>;
  min?: Maybe<Scalars['Int']['output']>;
};

export type FieldValidationIntRangeInput = {
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
};

export type FieldValidationRange = {
  __typename?: 'FieldValidationRange';
  errorMessage?: Maybe<Scalars['String']['output']>;
  max?: Maybe<Scalars['Int']['output']>;
  min?: Maybe<Scalars['Int']['output']>;
};

export type FieldValidationRegEx = {
  __typename?: 'FieldValidationRegEx';
  errorMessage?: Maybe<Scalars['String']['output']>;
  flags?: Maybe<Array<Scalars['String']['output']>>;
  regex?: Maybe<Scalars['String']['output']>;
};

export type FieldValidationRegExInput = {
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  flags?: InputMaybe<Array<Scalars['String']['input']>>;
  regex?: InputMaybe<Scalars['String']['input']>;
};

export type FieldsAggregate = {
  __typename?: 'FieldsAggregate';
  count: Scalars['Int']['output'];
};

export type FieldsConnection = {
  __typename?: 'FieldsConnection';
  aggregate: FieldsAggregate;
  edges: Array<FieldEdge>;
  pageInfo: PageInfo;
};

export type Filestack = IAssetConfig & {
  __typename?: 'Filestack';
  apiKey: Scalars['String']['output'];
  bucket: Scalars['String']['output'];
  isManagedBucket: Scalars['Boolean']['output'];
  path: Scalars['String']['output'];
  security: FilestackSecurityOptions;
};

export type FilestackSecurityAuthOptions = {
  __typename?: 'FilestackSecurityAuthOptions';
  policy: Scalars['String']['output'];
  signature: Scalars['String']['output'];
};

export type FilestackSecurityOptions = {
  __typename?: 'FilestackSecurityOptions';
  auth?: Maybe<FilestackSecurityAuthOptions>;
  enabled: Scalars['Boolean']['output'];
  globalExpires: Scalars['String']['output'];
  stageOverrides: Array<StageFilestackSecurityOptions>;
};

export type FloatFieldValidations = {
  __typename?: 'FloatFieldValidations';
  listItemCount?: Maybe<FieldValidationRange>;
  range?: Maybe<FieldValidationFloatRange>;
};

export type FloatFieldValidationsInput = {
  listItemCount?: InputMaybe<FieldValidationIntRangeInput>;
  range?: InputMaybe<FieldValidationFloatRangeInput>;
};

export type FormSidebarAppElement = IAppElement & {
  __typename?: 'FormSidebarAppElement';
  apiId: Scalars['String']['output'];
  app: App;
  config?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  src: Scalars['String']['output'];
  type: AppElementType;
  updatedAt: Scalars['DateTime']['output'];
};

export type GatsbyCloudIntegration = IIntegration & {
  __typename?: 'GatsbyCloudIntegration';
  /** URL to trigger a Deploy Build. This webhook will be triggered when publishing and unpublishing entries. */
  buildWebhookURL: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** Integration description on GCMS */
  description?: Maybe<Scalars['String']['output']>;
  /** Integration display name on GCMS */
  displayName?: Maybe<Scalars['String']['output']>;
  /** Integration ID */
  id: Scalars['ID']['output'];
  /** URL to the preview of your site */
  previewURL: Scalars['String']['output'];
  /** URL to trigger a CMS Preview build */
  previewWebhookURL: Scalars['String']['output'];
  /** URL to the production deployment of your site */
  productionURL: Scalars['String']['output'];
  /** Prefix of your site */
  sitePrefix: Scalars['String']['output'];
  /** URL to your site */
  siteURL: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GraphQlRemoteFieldConfig = IRemoteFieldConfig & {
  __typename?: 'GraphQLRemoteFieldConfig';
  cacheTTLSeconds?: Maybe<Scalars['Int']['output']>;
  forwardClientHeaders: Scalars['Boolean']['output'];
  headers?: Maybe<Scalars['JSON']['output']>;
  method: RemoteFieldApiMethod;
  operationName?: Maybe<Scalars['String']['output']>;
  /** In case of apiType GraphQL graphqlQuery contains the GraphQL query that will be sent to the remote source */
  query?: Maybe<Scalars['String']['output']>;
  remoteSource: GraphQlRemoteSource;
  returnType: RemoteTypeDefinition;
};

export type GraphQlRemoteSource = IRecentSchemaChange & IRemoteSource & {
  __typename?: 'GraphQLRemoteSource';
  createdAt: Scalars['DateTime']['output'];
  debugEnabled: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  headers?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  /** HTTP Headers that will be used when sending the introspection only */
  introspectionHeaders?: Maybe<Scalars['JSON']['output']>;
  /** HTTP method that will be used for introspection */
  introspectionMethod: GraphQlRemoteSourceIntrospectionMethod;
  /**
   * Specific URL that will be used for introspection if the introspection is available on another url than the regular url.
   * Can be ignored if the introspection url is the same as the url of the remote source.
   */
  introspectionUrl?: Maybe<Scalars['String']['output']>;
  kind?: Maybe<RemoteSourceKind>;
  oAuth?: Maybe<Scalars['JSON']['output']>;
  prefix: Scalars['String']['output'];
  remoteTypeDefinitionsConnection: RemoteTypeDefinitionsConnection;
  schema: Scalars['String']['output'];
  type: RemoteSourceType;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};


export type GraphQlRemoteSourceRemoteTypeDefinitionsConnectionArgs = {
  first?: Scalars['Int']['input'];
  isUserDefined?: InputMaybe<Scalars['Boolean']['input']>;
  remoteGraphQLTypes?: InputMaybe<Array<Remote_Graphql_Type>>;
  skip?: Scalars['Int']['input'];
};

export enum GraphQlRemoteSourceIntrospectionMethod {
  Get = 'GET',
  Post = 'POST'
}

export type IApp = {
  apiId: Scalars['String']['output'];
  author: Scalars['ID']['output'];
  avatarUrl: Scalars['String']['output'];
  configurationUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  elements?: Maybe<Array<IAppElement>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions: AppPermissions;
  publicationStatus: AppPublicationStatus;
  setupUrl: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  webhookUrl?: Maybe<Scalars['String']['output']>;
};

export type IAppElement = {
  apiId: Scalars['String']['output'];
  app: App;
  config?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  src: Scalars['String']['output'];
  type: AppElementType;
  updatedAt: Scalars['DateTime']['output'];
};

export type IAssetConfig = {
  apiKey: Scalars['String']['output'];
};

export type IContentPermission = {
  createdAt: Scalars['DateTime']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  model?: Maybe<IModel>;
  target: ContentPermissionTarget;
  updatedAt: Scalars['DateTime']['output'];
};

export type IContentViewColumn = {
  id: Scalars['ID']['output'];
  isVisible: Scalars['Boolean']['output'];
  position: Scalars['Int']['output'];
  type: ContentViewColumnType;
  width?: Maybe<Scalars['Int']['output']>;
};

export type IExtension = {
  apiId: Scalars['String']['output'];
  config: Scalars['JSON']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Member>;
  description?: Maybe<Scalars['String']['output']>;
  environment: Environment;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  neededPermissions: Array<AvailableExtensionPermission>;
  /** Location for the source if the source type is an external one */
  src: Scalars['String']['output'];
  /** The type indicating where the source for the extension will be obtained from */
  srcType: ExtensionSrcType;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy?: Maybe<Member>;
};

export type IField = {
  apiId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  extensions?: Maybe<Scalars['JSON']['output']>;
  formConfig: FieldConfig;
  id: Scalars['ID']['output'];
  /** @deprecated Use visibility instead */
  isHidden: Scalars['Boolean']['output'];
  isList: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  /**
   * This will throw a runtime error for fields that are on a component instead of model!
   * @deprecated Use parent instead
   */
  model: IModel;
  parent: IFieldParent;
  position: Scalars['Int']['output'];
  tableConfig: FieldConfig;
  updatedAt: Scalars['DateTime']['output'];
  visibility: VisibilityTypes;
};

export type IFieldParent = {
  apiId: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type IIntegration = {
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ILocalizableField = {
  isLocalized: Scalars['Boolean']['output'];
};

export type IModel = {
  apiId: Scalars['String']['output'];
  apiIdPlural: Scalars['String']['output'];
  contentViews: Array<ContentView>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  environment: Environment;
  field: IField;
  fields: Array<IField>;
  fieldsConnection: FieldsConnection;
  /** Model has at least one document */
  hasContent: Scalars['Boolean']['output'];
  hasLocalizedComponents: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isLocalized: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  isVersioned: Scalars['Boolean']['output'];
  sidebarElements: Array<ISidebarElement>;
  titleFields: Array<IField>;
  updatedAt: Scalars['DateTime']['output'];
  viewerPermission: ModelViewerPermission;
};


export type IModelContentViewsArgs = {
  filter?: InputMaybe<ContentViewFilterInput>;
  includeSystemContentViews?: InputMaybe<Scalars['Boolean']['input']>;
};


export type IModelFieldArgs = {
  id: Scalars['ID']['input'];
};


export type IModelFieldsArgs = {
  includeApiOnlyFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeHiddenFields?: InputMaybe<Scalars['Boolean']['input']>;
};


export type IModelFieldsConnectionArgs = {
  first?: Scalars['Int']['input'];
  includeApiOnlyFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeHiddenFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeSystemFields?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: Scalars['Int']['input'];
};

export enum Integration_Provider {
  GatsbyCloud = 'GATSBY_CLOUD',
  Netlify = 'NETLIFY'
}

export type IPendingProject = {
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
};

export type IRecentSchemaChange = {
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type IRemoteFieldConfig = {
  cacheTTLSeconds?: Maybe<Scalars['Int']['output']>;
  forwardClientHeaders: Scalars['Boolean']['output'];
  /** Headers that will be sent to the remote source. Those headers will override the headers defined on the remote source if setup */
  headers?: Maybe<Scalars['JSON']['output']>;
  method: RemoteFieldApiMethod;
  remoteSource: IRemoteSource;
  returnType: RemoteTypeDefinition;
};

export type IRemoteSource = {
  createdAt: Scalars['DateTime']['output'];
  debugEnabled: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  /**
   * Optional headers that will be sent to the remote source on every remote field. In case the remote field is using the same
   * Header Keys, the values will be overridden
   */
  headers?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  kind?: Maybe<RemoteSourceKind>;
  oAuth?: Maybe<Scalars['JSON']['output']>;
  prefix: Scalars['String']['output'];
  remoteTypeDefinitionsConnection: RemoteTypeDefinitionsConnection;
  type: RemoteSourceType;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};


export type IRemoteSourceRemoteTypeDefinitionsConnectionArgs = {
  first?: Scalars['Int']['input'];
  isUserDefined?: InputMaybe<Scalars['Boolean']['input']>;
  remoteGraphQLTypes?: InputMaybe<Array<Remote_Graphql_Type>>;
  skip?: Scalars['Int']['input'];
};

export type IRequireableField = {
  isRequired: Scalars['Boolean']['output'];
};

export type ISchemaMigrationPayload = {
  migration: Migration;
};

export type ISidebarElement = {
  config?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  model: IModel;
  position: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ITemplate = {
  coverPicture?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  resources: Array<TemplateResource>;
};

export type ITitleableField = {
  isTitle: Scalars['Boolean']['output'];
};

export type IUnionField = {
  /** True if this field is the reverse side of the initally created union field */
  isMemberType: Scalars['Boolean']['output'];
  union: Union;
};

export type IUniqueableField = {
  isUnique: Scalars['Boolean']['output'];
};

export type IUser = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  preferences?: Maybe<Scalars['JSON']['output']>;
  profile: Profile;
  updatedAt: Scalars['DateTime']['output'];
};

export type IViewer = {
  availableExtensionPermissions: Array<AvailableExtensionPermission>;
  availableExtensionSrcTypes: Array<ExtensionSrcType>;
  availableIntegrations: Array<Integration_Provider>;
  id: Scalars['ID']['output'];
  plans: Array<Plan>;
  project?: Maybe<Project>;
  regions: Array<Region>;
  templates: Array<ITemplate>;
};


export type IViewerProjectArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFieldValidations = {
  __typename?: 'IntFieldValidations';
  listItemCount?: Maybe<FieldValidationRange>;
  range?: Maybe<FieldValidationRange>;
};

export type IntFieldValidationsInput = {
  listItemCount?: InputMaybe<FieldValidationIntRangeInput>;
  range?: InputMaybe<FieldValidationIntRangeInput>;
};

export type Invite = {
  __typename?: 'Invite';
  acceptedAt?: Maybe<Scalars['DateTime']['output']>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  expirationDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  issuer?: Maybe<Member>;
  origin?: Maybe<Scalars['String']['output']>;
  project: Project;
  roles: Array<Role>;
};

export type LeaveProjectInput = {
  id: Scalars['ID']['input'];
};

export type LeaveProjectPayload = {
  __typename?: 'LeaveProjectPayload';
  leftProjectId: Scalars['ID']['output'];
};

export type LeaveTrialInput = {
  projectId: Scalars['ID']['input'];
};

export type LeaveTrialPayload = {
  __typename?: 'LeaveTrialPayload';
  project: Project;
};

export type LegacyProject = {
  __typename?: 'LegacyProject';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isMigrated: Scalars['Boolean']['output'];
  isOwner: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type Lifecycle = {
  __typename?: 'Lifecycle';
  progress: Scalars['Float']['output'];
  steps?: Maybe<Array<LifecycleStep>>;
};

export type LifecycleStep = {
  __typename?: 'LifecycleStep';
  description?: Maybe<Scalars['String']['output']>;
  done: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  type: LifecycleStepType;
};

export enum LifecycleStepType {
  ApiPermissionsSet = 'API_PERMISSIONS_SET',
  ContentAdded = 'CONTENT_ADDED',
  ExploreContentApi = 'EXPLORE_CONTENT_API',
  ExternalTraffic = 'EXTERNAL_TRAFFIC',
  SchemaSetup = 'SCHEMA_SETUP'
}

export type Limit = {
  __typename?: 'Limit';
  addOnCode?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  plan: Plan;
  type: LimitType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum LimitType {
  ApiOperations = 'API_OPERATIONS',
  AssetTraffic = 'ASSET_TRAFFIC',
  AuditLogsRetentionPeriod = 'AUDIT_LOGS_RETENTION_PERIOD',
  ContentModels = 'CONTENT_MODELS',
  ContentPermissions = 'CONTENT_PERMISSIONS',
  ContentStages = 'CONTENT_STAGES',
  Environments = 'ENVIRONMENTS',
  EnvironmentsAutomaticBackups = 'ENVIRONMENTS_AUTOMATIC_BACKUPS',
  Integrations = 'INTEGRATIONS',
  Locales = 'LOCALES',
  Models = 'MODELS',
  PermanentAuthTokens = 'PERMANENT_AUTH_TOKENS',
  RateLimitPerSecond = 'RATE_LIMIT_PER_SECOND',
  Records = 'RECORDS',
  RemoteFields = 'REMOTE_FIELDS',
  RemoteFieldsHttpWorkers = 'REMOTE_FIELDS_HTTP_WORKERS',
  RemoteFieldsMaxExecutionTime = 'REMOTE_FIELDS_MAX_EXECUTION_TIME',
  RemoteFieldsMaxResponseSize = 'REMOTE_FIELDS_MAX_RESPONSE_SIZE',
  RemoteSources = 'REMOTE_SOURCES',
  Roles = 'ROLES',
  SchedulingOperationsInRelease = 'SCHEDULING_OPERATIONS_IN_RELEASE',
  SchedulingPendingOperations = 'SCHEDULING_PENDING_OPERATIONS',
  SchedulingPendingReleases = 'SCHEDULING_PENDING_RELEASES',
  Seats = 'SEATS',
  Versions = 'VERSIONS',
  VersionRetentionPeriod = 'VERSION_RETENTION_PERIOD',
  Webhooks = 'WEBHOOKS',
  WorkflowSteps = 'WORKFLOW_STEPS'
}

export type Locale = {
  __typename?: 'Locale';
  /**
   * Determines how the locale is
   * exposed in the Content API
   */
  apiId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /**
   * Specifies if the locale is used as the
   * default locale which impacts the Content API
   */
  isDefault: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ManagementPermission = {
  __typename?: 'ManagementPermission';
  action: PermissionAction;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MaxComplexityInput = {
  gcms?: InputMaybe<Scalars['String']['input']>;
};

export type MaxComplexityPayload = {
  __typename?: 'MaxComplexityPayload';
  gcms?: Maybe<Scalars['String']['output']>;
};

export type Member = IUser & {
  __typename?: 'Member';
  createdAt: Scalars['DateTime']['output'];
  hasPermissions: MemberHasPermissionsPayload;
  id: Scalars['ID']['output'];
  isOwner: Scalars['Boolean']['output'];
  preferences?: Maybe<Scalars['JSON']['output']>;
  profile: Profile;
  roles: Array<Role>;
  updatedAt: Scalars['DateTime']['output'];
  userSelection: UserSelection;
};


export type MemberHasPermissionsArgs = {
  actions: Array<PermissionAction>;
};

export type MemberEdge = {
  __typename?: 'MemberEdge';
  node: Member;
};

export type MemberHasPermissionsPayload = {
  __typename?: 'MemberHasPermissionsPayload';
  notAllowedActions: Array<PermissionAction>;
};

export type MembersAggregate = {
  __typename?: 'MembersAggregate';
  count: Scalars['Int']['output'];
};

export type MembersConnection = {
  __typename?: 'MembersConnection';
  aggregate: MembersAggregate;
  edges: Array<MemberEdge>;
  pageInfo: PageInfo;
};

export type MetaInfo = {
  __typename?: 'MetaInfo';
  serverVersion: Scalars['String']['output'];
};

export type Metrics = {
  __typename?: 'Metrics';
  apiOperations: Array<Stats>;
  assetTraffic: Array<Stats>;
  assetTransformations: Array<Stats>;
};


export type MetricsApiOperationsArgs = {
  end: Scalars['DateTime']['input'];
  resolution: Scalars['Int']['input'];
  start: Scalars['DateTime']['input'];
};


export type MetricsAssetTrafficArgs = {
  end: Scalars['DateTime']['input'];
  start: Scalars['DateTime']['input'];
};


export type MetricsAssetTransformationsArgs = {
  end: Scalars['DateTime']['input'];
  start: Scalars['DateTime']['input'];
};

export type Migration = {
  __typename?: 'Migration';
  createdAt: Scalars['DateTime']['output'];
  errors?: Maybe<Scalars['String']['output']>;
  finishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  /** Name of the migration in case if was triggered via a named batch migration */
  name?: Maybe<Scalars['String']['output']>;
  /** @deprecated No longer supported */
  operationType: MigrationOperationType;
  /** @deprecated No longer supported */
  resourceId?: Maybe<Scalars['ID']['output']>;
  status: MigrationStatus;
  /** @deprecated This will be replaced by a union of Member | PermanentAuthToken */
  triggeredBy?: Maybe<Member>;
};

export enum MigrationOperationType {
  Batch = 'BATCH',
  CreateEnumerableField = 'CREATE_ENUMERABLE_FIELD',
  CreateEnumeration = 'CREATE_ENUMERATION',
  CreateEnvironment = 'CREATE_ENVIRONMENT',
  CreateLocale = 'CREATE_LOCALE',
  CreateModel = 'CREATE_MODEL',
  CreateProjectFromTemplate = 'CREATE_PROJECT_FROM_TEMPLATE',
  CreateRelationalField = 'CREATE_RELATIONAL_FIELD',
  CreateRemoteField = 'CREATE_REMOTE_FIELD',
  CreateRemoteTypeDefinition = 'CREATE_REMOTE_TYPE_DEFINITION',
  CreateSimpleField = 'CREATE_SIMPLE_FIELD',
  CreateStage = 'CREATE_STAGE',
  CreateUnionField = 'CREATE_UNION_FIELD',
  DeleteEnumeration = 'DELETE_ENUMERATION',
  DeleteField = 'DELETE_FIELD',
  DeleteLocale = 'DELETE_LOCALE',
  DeleteModel = 'DELETE_MODEL',
  DeleteRemoteTypeDefinition = 'DELETE_REMOTE_TYPE_DEFINITION',
  DeleteStage = 'DELETE_STAGE',
  UpdateEnumerableField = 'UPDATE_ENUMERABLE_FIELD',
  UpdateEnumeration = 'UPDATE_ENUMERATION',
  UpdateLocale = 'UPDATE_LOCALE',
  UpdateModel = 'UPDATE_MODEL',
  UpdateRelationalField = 'UPDATE_RELATIONAL_FIELD',
  UpdateRemoteTypeDefinition = 'UPDATE_REMOTE_TYPE_DEFINITION',
  UpdateSimpleField = 'UPDATE_SIMPLE_FIELD',
  UpdateStage = 'UPDATE_STAGE',
  UpdateUnionField = 'UPDATE_UNION_FIELD'
}

export enum MigrationStatus {
  Failed = 'FAILED',
  Queued = 'QUEUED',
  Running = 'RUNNING',
  Success = 'SUCCESS',
  Timeout = 'TIMEOUT'
}

export type Model = IFieldParent & IModel & IRecentSchemaChange & {
  __typename?: 'Model';
  apiId: Scalars['String']['output'];
  apiIdPlural: Scalars['String']['output'];
  contentViews: Array<ContentView>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  defaultContentView: ContentView;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  environment: Environment;
  field: IField;
  fields: Array<IField>;
  fieldsConnection: FieldsConnection;
  /** Model has at least one document */
  hasContent: Scalars['Boolean']['output'];
  hasLocalizedComponents: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** Is true when at least one field is marked as localized */
  isLocalized: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  isVersioned: Scalars['Boolean']['output'];
  sidebarElements: Array<ISidebarElement>;
  titleFields: Array<IField>;
  updatedAt: Scalars['DateTime']['output'];
  viewerPermission: ModelViewerPermission;
};


export type ModelContentViewsArgs = {
  filter?: InputMaybe<ContentViewFilterInput>;
  includeSystemContentViews?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ModelFieldArgs = {
  id: Scalars['ID']['input'];
};


export type ModelFieldsArgs = {
  includeApiOnlyFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeHiddenFields?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ModelFieldsConnectionArgs = {
  first?: Scalars['Int']['input'];
  includeApiOnlyFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeHiddenFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeSystemFields?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: Scalars['Int']['input'];
};

export type ModelViewerContentPermission = {
  __typename?: 'ModelViewerContentPermission';
  /** Lists all stages and the corresponding read permissions the user has on those stages. */
  readByStages: Array<ModelViewerReadContentPermissionByStage>;
  readVersion: Scalars['Boolean']['output'];
};

/** Simplified computed version of the permissions the current viewer has on this model */
export type ModelViewerPermission = {
  __typename?: 'ModelViewerPermission';
  content: ModelViewerContentPermission;
};

/**
 * This types holds a superset of the allowed read operations on a model.
 * This means even if this states access is allowed, it could still potentially be denied.
 */
export type ModelViewerReadContentPermission = {
  __typename?: 'ModelViewerReadContentPermission';
  allowedLocales: Array<Locale>;
  allowedWithCondition: Scalars['Boolean']['output'];
};

export type ModelViewerReadContentPermissionByStage = {
  __typename?: 'ModelViewerReadContentPermissionByStage';
  /**
   * If the current viewer is allowed to read this models content for the provided stage,
   * this field will return the potential limitations that must be met.
   * `null` means not allowed!
   */
  allowed?: Maybe<ModelViewerReadContentPermission>;
  stage: Stage;
};

export type MoveContentViewInput = {
  id: Scalars['ID']['input'];
  position: Scalars['Int']['input'];
  viewGroupId: Scalars['ID']['input'];
};

export type MoveContentViewPayload = {
  __typename?: 'MoveContentViewPayload';
  movedContentView: ContentView;
  updatedViewGroups: Array<ViewGroup>;
};

export type MoveFieldInput = {
  id: Scalars['ID']['input'];
  position: Scalars['Int']['input'];
};

export type MoveFieldPayload = {
  __typename?: 'MoveFieldPayload';
  movedFields: Array<IField>;
};

export type MoveSidebarElementInput = {
  id: Scalars['ID']['input'];
  position: Scalars['Int']['input'];
};

export type MoveSidebarElementPayload = {
  __typename?: 'MoveSidebarElementPayload';
  movedSidebarElements: Array<ISidebarElement>;
};

export type MoveViewGroupInput = {
  id: Scalars['ID']['input'];
  position: Scalars['Int']['input'];
};

export type MoveViewGroupPayload = {
  __typename?: 'MoveViewGroupPayload';
  movedViewGroups: Array<ViewGroup>;
};

export type Mutation = {
  __typename?: 'Mutation';
  cloneProject: Project;
  createAppExchangeToken: CreateAppExchangeTokenPayload;
  createAppInstallation: CreateAppInstallationPayload;
  createComponent: AsyncOperationPayload;
  createComponentField: AsyncOperationPayload;
  createComponentUnionField: AsyncOperationPayload;
  createContentView: CreateContentViewPayload;
  createCreateContentPermission: CreateCreateContentPermissionPayload;
  createCustomSidebarElement: CreateSidebarElementPayload;
  createDeleteContentPermission: CreateDeleteContentPermissionPayload;
  createEnumerableField: AsyncOperationPayload;
  createEnumeration: AsyncOperationPayload;
  createEnvironment: CreateEnvironmentPayload;
  createFieldExtension: CreateFieldExtensionPayload;
  createGatsbyCloudIntegration?: Maybe<CreateGatsbyCloudIntegrationPayload>;
  createGraphQLRemoteSource: AsyncOperationPayload;
  createLocale: AsyncOperationPayload;
  createModel: AsyncOperationPayload;
  createNetlifyIntegration?: Maybe<CreateNetlifyIntegrationPayload>;
  createPermanentAuthToken: CreatePermanentAuthTokenPayload;
  createPublishContentPermission: CreatePublishContentPermissionPayload;
  createRESTRemoteSource: AsyncOperationPayload;
  createReadContentPermission: CreateReadContentPermissionPayload;
  createReadVersionContentPermission: CreateReadVersionContentPermissionPayload;
  createRelationalField: AsyncOperationPayload;
  createRemoteField: AsyncOperationPayload;
  createRole: Role;
  createSidebarExtension: CreateSidebarExtensionPayload;
  createSimpleField: AsyncOperationPayload;
  createStage: AsyncOperationPayload;
  createSystemSidebarElement: CreateSidebarElementPayload;
  createUnionField: AsyncOperationPayload;
  createUnpublishContentPermission: CreateUnpublishContentPermissionPayload;
  createUpdateContentPermission: CreateUpdateContentPermissionPayload;
  createViewGroup: CreateViewGroupPayload;
  createWebhook: CreateWebhookPayload;
  deleteAppInstallation: DeleteAppInstallationPayload;
  deleteComponent: AsyncOperationPayload;
  deleteContentPermission: DeleteContentPermissionPayload;
  deleteContentView: DeleteContentViewPayload;
  deleteEnumeration: AsyncOperationPayload;
  deleteEnvironment: DeleteEnvironmentPayload;
  deleteExtension: DeleteExtensionPayload;
  deleteField: AsyncOperationPayload;
  deleteGatsbyCloudIntegration?: Maybe<DeleteGatsbyCloudIntegrationPayload>;
  deleteLocale: AsyncOperationPayload;
  deleteModel: AsyncOperationPayload;
  deleteNetlifyIntegration?: Maybe<DeleteNetlifyIntegrationPayload>;
  deletePermanentAuthToken: DeletePermanentAuthTokenPayload;
  deleteProject: DeleteProjectPayload;
  deleteRemoteSource: AsyncOperationPayload;
  deleteRole: DeleteRolePayload;
  deleteSidebarElement: DeleteSidebarElementPayload;
  deleteStage: AsyncOperationPayload;
  deleteViewGroup: DeleteViewGroupPayload;
  deleteWebhook: DeleteWebhookPayload;
  duplicateComponent: AsyncOperationPayload;
  duplicateModel: AsyncOperationPayload;
  leaveProject: LeaveProjectPayload;
  leaveTrial: LeaveTrialPayload;
  moveContentView: MoveContentViewPayload;
  moveField: MoveFieldPayload;
  moveSidebarElement: MoveSidebarElementPayload;
  moveViewGroup: MoveViewGroupPayload;
  promoteEnvironment: PromoteEnvironmentPayload;
  refreshGraphQLRemoteSourceSchema: AsyncOperationPayload;
  removeMember: RemoveMemberPayload;
  resetSidebarElements: ResetSidebarElementsPayload;
  restoreEnvironmentBackup: RestoreEnvironmentBackupPayload;
  retriggerWebhook: RetriggerWebhookPayload;
  revokeInvite: RevokeInvitePayload;
  sendFeedback: Feedback;
  sendInvite: SendInvitePayload;
  setUserAnalytics: UserAnalytics;
  setUserPreferences: UserPreferences;
  setUserSelection: UserSelection;
  startTrial: StartTrialPayload;
  submitBatchChanges: AsyncOperationPayload;
  switchPaymentSubscription: SwitchPaymentSubscriptionPayload;
  track: TrackPayload;
  triggerNetlifyIntegrationBuild?: Maybe<TriggerNetlifyIntegrationBuildPayload>;
  updateAppInstallation: UpdateAppInstallationPayload;
  updateComponent: AsyncOperationPayload;
  updateComponentField: AsyncOperationPayload;
  updateComponentUnionField: AsyncOperationPayload;
  updateContentPermissionEnabled: UpdateContentPermissionEnabledPayload;
  updateContentView: UpdateContentViewPayload;
  updateCreateContentPermission: UpdateCreateContentPermissionPayload;
  updateDeleteContentPermission: UpdateDeleteContentPermissionPayload;
  updateEnumerableField: AsyncOperationPayload;
  updateEnumeration: AsyncOperationPayload;
  updateEnvironment: UpdateEnvironmentPayload;
  updateFieldExtension: UpdateFieldExtensionPayload;
  updateFilestackSecurityOptions: UpdateFilestackSecurityOptionsPayload;
  updateGatsbyCloudIntegration?: Maybe<UpdateGatsbyCloudIntegrationPayload>;
  updateGraphQLRemoteSource: AsyncOperationPayload;
  updateLocale: AsyncOperationPayload;
  updateMemberRoles: Member;
  updateModel: AsyncOperationPayload;
  updateNetlifyIntegration?: Maybe<UpdateNetlifyIntegrationPayload>;
  updatePermanentAuthToken: UpdatePermanentAuthTokenPayload;
  updateProject: Project;
  updatePublicEndpoint?: Maybe<UpdatePublicPermissionsPayload>;
  updatePublishContentPermission: UpdatePublishContentPermissionPayload;
  updateRESTRemoteSource: AsyncOperationPayload;
  updateReadContentPermission: UpdateReadContentPermissionPayload;
  updateReadVersionContentPermission: UpdateReadVersionContentPermissionPayload;
  updateRelationalField: AsyncOperationPayload;
  updateRemoteField: AsyncOperationPayload;
  updateRole: Role;
  updateSidebarElement: UpdateSidebarElementPayload;
  updateSidebarExtension: UpdateSidebarExtensionPayload;
  updateSimpleField: AsyncOperationPayload;
  updateStage: AsyncOperationPayload;
  updateUnionField: AsyncOperationPayload;
  updateUnpublishContentPermission: UpdateUnpublishContentPermissionPayload;
  updateUpdateContentPermission: UpdateUpdateContentPermissionPayload;
  updateViewGroup: UpdateViewGroupPayload;
  updateWebhook: UpdateWebhookPayload;
  upgradeEnvironmentAssets: UpgradeEnvironmentAssetPayload;
};


export type MutationCloneProjectArgs = {
  data: CloneProjectInput;
};


export type MutationCreateAppExchangeTokenArgs = {
  data: CreateAppExchangeTokenInput;
};


export type MutationCreateAppInstallationArgs = {
  data: CreateAppInstallationInput;
};


export type MutationCreateComponentArgs = {
  data: CreateComponentInput;
};


export type MutationCreateComponentFieldArgs = {
  data: CreateComponentFieldInput;
};


export type MutationCreateComponentUnionFieldArgs = {
  data: CreateComponentUnionFieldInput;
};


export type MutationCreateContentViewArgs = {
  data: CreateContentViewInput;
};


export type MutationCreateCreateContentPermissionArgs = {
  data: CreateCreateContentPermissionInput;
};


export type MutationCreateCustomSidebarElementArgs = {
  data: CreateCustomSidebarElementInput;
};


export type MutationCreateDeleteContentPermissionArgs = {
  data: CreateDeleteContentPermissionInput;
};


export type MutationCreateEnumerableFieldArgs = {
  data: CreateEnumerableFieldInput;
};


export type MutationCreateEnumerationArgs = {
  data: CreateEnumerationInput;
};


export type MutationCreateEnvironmentArgs = {
  data: CreateEnvironmentInput;
};


export type MutationCreateFieldExtensionArgs = {
  data: CreateFieldExtensionInput;
};


export type MutationCreateGatsbyCloudIntegrationArgs = {
  data: CreateGatsbyCloudIntegrationInput;
};


export type MutationCreateGraphQlRemoteSourceArgs = {
  data: CreateGraphQlRemoteSourceInput;
};


export type MutationCreateLocaleArgs = {
  data: CreateLocaleInput;
};


export type MutationCreateModelArgs = {
  data: CreateModelInput;
};


export type MutationCreateNetlifyIntegrationArgs = {
  data: CreateNetlifyIntegrationInput;
};


export type MutationCreatePermanentAuthTokenArgs = {
  data: CreatePermanentAuthTokenInput;
};


export type MutationCreatePublishContentPermissionArgs = {
  data: CreatePublishContentPermissionInput;
};


export type MutationCreateRestRemoteSourceArgs = {
  data: CreateRestRemoteSourceInput;
};


export type MutationCreateReadContentPermissionArgs = {
  data: CreateReadContentPermissionInput;
};


export type MutationCreateReadVersionContentPermissionArgs = {
  data: CreateReadVersionContentPermissionInput;
};


export type MutationCreateRelationalFieldArgs = {
  data: CreateRelationalFieldInput;
};


export type MutationCreateRemoteFieldArgs = {
  data: CreateRemoteFieldInput;
};


export type MutationCreateRoleArgs = {
  data: CreateRoleInput;
};


export type MutationCreateSidebarExtensionArgs = {
  data: CreateSidebarExtensionInput;
};


export type MutationCreateSimpleFieldArgs = {
  data: CreateSimpleFieldInput;
};


export type MutationCreateStageArgs = {
  data: CreateStageInput;
};


export type MutationCreateSystemSidebarElementArgs = {
  data: CreateSystemSidebarElementInput;
};


export type MutationCreateUnionFieldArgs = {
  data: CreateUnionFieldInput;
};


export type MutationCreateUnpublishContentPermissionArgs = {
  data: CreateUnpublishContentPermissionInput;
};


export type MutationCreateUpdateContentPermissionArgs = {
  data: CreateUpdateContentPermissionInput;
};


export type MutationCreateViewGroupArgs = {
  data: CreateViewGroupInput;
};


export type MutationCreateWebhookArgs = {
  data: CreateWebhookInput;
};


export type MutationDeleteAppInstallationArgs = {
  data: DeleteAppInstallationInput;
};


export type MutationDeleteComponentArgs = {
  data: DeleteComponentInput;
};


export type MutationDeleteContentPermissionArgs = {
  data: DeleteContentPermissionInput;
};


export type MutationDeleteContentViewArgs = {
  data: DeleteContentViewInput;
};


export type MutationDeleteEnumerationArgs = {
  data: DeleteEnumerationInput;
};


export type MutationDeleteEnvironmentArgs = {
  data: DeleteEnvironmentInput;
};


export type MutationDeleteExtensionArgs = {
  data: DeleteExtensionInput;
};


export type MutationDeleteFieldArgs = {
  data: DeleteFieldInput;
};


export type MutationDeleteGatsbyCloudIntegrationArgs = {
  data: DeleteGatsbyCloudIntegrationInput;
};


export type MutationDeleteLocaleArgs = {
  data: DeleteLocaleInput;
};


export type MutationDeleteModelArgs = {
  data: DeleteModelInput;
};


export type MutationDeleteNetlifyIntegrationArgs = {
  data: DeleteNetlifyIntegrationInput;
};


export type MutationDeletePermanentAuthTokenArgs = {
  data: DeletePermanentAuthTokenInput;
};


export type MutationDeleteProjectArgs = {
  data: DeleteProjectInput;
};


export type MutationDeleteRemoteSourceArgs = {
  data: DeleteRemoteSourceInput;
};


export type MutationDeleteRoleArgs = {
  data: DeleteRoleInput;
};


export type MutationDeleteSidebarElementArgs = {
  data: DeleteSidebarElementInput;
};


export type MutationDeleteStageArgs = {
  data: DeleteStageInput;
};


export type MutationDeleteViewGroupArgs = {
  data: DeleteViewGroupInput;
};


export type MutationDeleteWebhookArgs = {
  data: DeleteWebhookInput;
};


export type MutationDuplicateComponentArgs = {
  data: DuplicateComponentInput;
};


export type MutationDuplicateModelArgs = {
  data: DuplicateModelInput;
};


export type MutationLeaveProjectArgs = {
  data: LeaveProjectInput;
};


export type MutationLeaveTrialArgs = {
  data: LeaveTrialInput;
};


export type MutationMoveContentViewArgs = {
  data: MoveContentViewInput;
};


export type MutationMoveFieldArgs = {
  data: MoveFieldInput;
};


export type MutationMoveSidebarElementArgs = {
  data: MoveSidebarElementInput;
};


export type MutationMoveViewGroupArgs = {
  data: MoveViewGroupInput;
};


export type MutationPromoteEnvironmentArgs = {
  data: PromoteEnvironmentInput;
};


export type MutationRefreshGraphQlRemoteSourceSchemaArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveMemberArgs = {
  data: RemoveMemberInput;
};


export type MutationResetSidebarElementsArgs = {
  data: ResetSidebarElementsInput;
};


export type MutationRestoreEnvironmentBackupArgs = {
  data: RestoreEnvironmentBackupInput;
};


export type MutationRetriggerWebhookArgs = {
  data: RetriggerWebhookInput;
};


export type MutationRevokeInviteArgs = {
  data: RevokeInviteInput;
};


export type MutationSendFeedbackArgs = {
  data: SendFeedbackInput;
};


export type MutationSendInviteArgs = {
  data: SendInviteInput;
};


export type MutationSetUserAnalyticsArgs = {
  data: SetUserAnalyticsInput;
};


export type MutationSetUserPreferencesArgs = {
  data: SetUserPreferencesInput;
};


export type MutationSetUserSelectionArgs = {
  data: SetUserSelectionInput;
};


export type MutationStartTrialArgs = {
  data: StartTrialInput;
};


export type MutationSubmitBatchChangesArgs = {
  data: BatchMigrationInput;
};


export type MutationSwitchPaymentSubscriptionArgs = {
  data: SwitchPaymentSubscriptionInput;
};


export type MutationTrackArgs = {
  data: TrackInput;
};


export type MutationTriggerNetlifyIntegrationBuildArgs = {
  data: TriggerNetlifyIntegrationBuildInput;
};


export type MutationUpdateAppInstallationArgs = {
  data: UpdateAppInstallationInput;
};


export type MutationUpdateComponentArgs = {
  data: UpdateComponentInput;
};


export type MutationUpdateComponentFieldArgs = {
  data: UpdateComponentFieldInput;
};


export type MutationUpdateComponentUnionFieldArgs = {
  data: UpdateComponentUnionFieldInput;
};


export type MutationUpdateContentPermissionEnabledArgs = {
  data: UpdateContentPermissionEnabledInput;
};


export type MutationUpdateContentViewArgs = {
  data: UpdateContentViewInput;
};


export type MutationUpdateCreateContentPermissionArgs = {
  data: UpdateCreateContentPermissionInput;
};


export type MutationUpdateDeleteContentPermissionArgs = {
  data: UpdateDeleteContentPermissionInput;
};


export type MutationUpdateEnumerableFieldArgs = {
  data: UpdateEnumerableFieldInput;
};


export type MutationUpdateEnumerationArgs = {
  data: UpdateEnumerationInput;
};


export type MutationUpdateEnvironmentArgs = {
  data: UpdateEnvironmentInput;
};


export type MutationUpdateFieldExtensionArgs = {
  data: UpdateFieldExtensionInput;
};


export type MutationUpdateFilestackSecurityOptionsArgs = {
  data: UpdateFilestackSecurityOptionsInput;
};


export type MutationUpdateGatsbyCloudIntegrationArgs = {
  data: UpdateGatsbyCloudIntegrationInput;
};


export type MutationUpdateGraphQlRemoteSourceArgs = {
  data: UpdateGraphQlRemoteSourceInput;
};


export type MutationUpdateLocaleArgs = {
  data: UpdateLocaleInput;
};


export type MutationUpdateMemberRolesArgs = {
  data: UpdateMemberRolesInput;
};


export type MutationUpdateModelArgs = {
  data: UpdateModelInput;
};


export type MutationUpdateNetlifyIntegrationArgs = {
  data: UpdateNetlifyIntegrationInput;
};


export type MutationUpdatePermanentAuthTokenArgs = {
  data: UpdatePermanentAuthTokenInput;
};


export type MutationUpdateProjectArgs = {
  data: UpdateProjectInput;
};


export type MutationUpdatePublicEndpointArgs = {
  data: UpdatePublicEndpointInput;
};


export type MutationUpdatePublishContentPermissionArgs = {
  data: UpdatePublishContentPermissionInput;
};


export type MutationUpdateRestRemoteSourceArgs = {
  data: UpdateRestRemoteSourceInput;
};


export type MutationUpdateReadContentPermissionArgs = {
  data: UpdateReadContentPermissionInput;
};


export type MutationUpdateReadVersionContentPermissionArgs = {
  data: UpdateReadVersionContentPermissionInput;
};


export type MutationUpdateRelationalFieldArgs = {
  data: UpdateRelationalFieldInput;
};


export type MutationUpdateRemoteFieldArgs = {
  data: UpdateRemoteFieldInput;
};


export type MutationUpdateRoleArgs = {
  data: UpdateRoleInput;
};


export type MutationUpdateSidebarElementArgs = {
  data: UpdateSidebarElementInput;
};


export type MutationUpdateSidebarExtensionArgs = {
  data: UpdateSidebarExtensionInput;
};


export type MutationUpdateSimpleFieldArgs = {
  data: UpdateSimpleFieldInput;
};


export type MutationUpdateStageArgs = {
  data: UpdateStageInput;
};


export type MutationUpdateUnionFieldArgs = {
  data: UpdateUnionFieldInput;
};


export type MutationUpdateUnpublishContentPermissionArgs = {
  data: UpdateUnpublishContentPermissionInput;
};


export type MutationUpdateUpdateContentPermissionArgs = {
  data: UpdateUpdateContentPermissionInput;
};


export type MutationUpdateViewGroupArgs = {
  data: UpdateViewGroupInput;
};


export type MutationUpdateWebhookArgs = {
  data: UpdateWebhookInput;
};


export type MutationUpgradeEnvironmentAssetsArgs = {
  data: UpgradeEnvironmentAssetInput;
};

export enum NetlifyBuildState {
  Building = 'BUILDING',
  Failed = 'FAILED',
  Preparing = 'PREPARING',
  Ready = 'READY'
}

export type NetlifyIntegration = IIntegration & {
  __typename?: 'NetlifyIntegration';
  createdAt: Scalars['DateTime']['output'];
  /** Integration description on GCMS */
  description?: Maybe<Scalars['String']['output']>;
  /** Integration display name on GCMS */
  displayName?: Maybe<Scalars['String']['output']>;
  /** Integration ID */
  id: Scalars['ID']['output'];
  models: Array<IModel>;
  /** Configured sites for netlify integration */
  sites: Array<NetlifySite>;
  updatedAt: Scalars['DateTime']['output'];
};

export type NetlifyIntegrationCallbackPayload = {
  __typename?: 'NetlifyIntegrationCallbackPayload';
  error?: Maybe<Scalars['String']['output']>;
  integration: NetlifyIntegration;
  /** @deprecated use integration instead */
  integrationId: Scalars['ID']['output'];
  site: NetlifySite;
};

export type NetlifySite = {
  __typename?: 'NetlifySite';
  displayName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  /** Contains information of the last time the build state was changing. */
  lastState?: Maybe<NetlifyState>;
  url: Scalars['String']['output'];
};

export type NetlifySiteInput = {
  displayName: Scalars['String']['input'];
  id: Scalars['String']['input'];
};

export type NetlifyState = {
  __typename?: 'NetlifyState';
  /** Time when the build of the site was finished */
  buildFinishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Time when the build of the site was prepared */
  buildPreparedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Time when the build of the site was started */
  buildStartedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Current state the site is in */
  buildState: NetlifyBuildState;
  /** Member in the project who triggered a build. If the build was triggered externally this will be null. */
  triggeredBy?: Maybe<NetlifyStateTriggeredBy>;
};

export type NetlifyStateTriggeredBy = Member | PermanentAuthToken;

export enum OAuthGrantType {
  ClientCredentials = 'client_credentials'
}

export type OrderBy = {
  __typename?: 'OrderBy';
  orderByField: IField;
  orderDir: ColumnOrderByDir;
};

export type OrderByInput = {
  orderByField: Scalars['ID']['input'];
  orderDir: ColumnOrderByDir;
};

export type PageAppElement = IAppElement & {
  __typename?: 'PageAppElement';
  apiId: Scalars['String']['output'];
  app: App;
  config?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  src: Scalars['String']['output'];
  type: AppElementType;
  updatedAt: Scalars['DateTime']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  pageSize: Scalars['Int']['output'];
};

export type PaymentAccount = {
  __typename?: 'PaymentAccount';
  accountManagementUrl?: Maybe<Scalars['String']['output']>;
  accountName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  hostedBillingUrl?: Maybe<Scalars['String']['output']>;
  hostedPageUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isClosed: Scalars['Boolean']['output'];
  isMain: Scalars['Boolean']['output'];
  paymentSubscriptions: Array<PaymentSubscription>;
  updatedAt: Scalars['DateTime']['output'];
  user: IUser;
};


export type PaymentAccountHostedPageUrlArgs = {
  planName: Scalars['String']['input'];
  projectId: Scalars['ID']['input'];
};

export type PaymentSubscription = {
  __typename?: 'PaymentSubscription';
  billingPeriod: BillingPeriod;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  identifier?: Maybe<Scalars['String']['output']>;
  isCanceled: Scalars['Boolean']['output'];
  paymentAccount: PaymentAccount;
  plan: Plan;
  projects: Array<Project>;
  renewsAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type PermanentAuthToken = {
  __typename?: 'PermanentAuthToken';
  contentPermissions: Array<IContentPermission>;
  createdAt: Scalars['DateTime']['output'];
  defaults: PermanentAuthTokenDefaults;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  managementPermissions: Array<ManagementPermission>;
  name: Scalars['String']['output'];
  token: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum PermanentAuthTokenAudience {
  ContentApi = 'CONTENT_API',
  ManagementApi = 'MANAGEMENT_API'
}

export type PermanentAuthTokenDefaults = {
  __typename?: 'PermanentAuthTokenDefaults';
  stage: Stage;
};

export type PermanentAuthTokenDefaultsInput = {
  stage: Scalars['ID']['input'];
};

export enum PermissionAction {
  AppCreate = 'APP_CREATE',
  AppDelete = 'APP_DELETE',
  AppInstallationCreate = 'APP_INSTALLATION_CREATE',
  AppInstallationDelete = 'APP_INSTALLATION_DELETE',
  AppInstallationUpdate = 'APP_INSTALLATION_UPDATE',
  AppUpdate = 'APP_UPDATE',
  AuditLogsRead = 'AUDIT_LOGS_READ',
  ComponentCreate = 'COMPONENT_CREATE',
  ComponentDelete = 'COMPONENT_DELETE',
  ComponentRead = 'COMPONENT_READ',
  ComponentUpdate = 'COMPONENT_UPDATE',
  ContentviewCreate = 'CONTENTVIEW_CREATE',
  ContentviewDelete = 'CONTENTVIEW_DELETE',
  ContentviewRead = 'CONTENTVIEW_READ',
  ContentviewSystemUpdate = 'CONTENTVIEW_SYSTEM_UPDATE',
  ContentviewUpdate = 'CONTENTVIEW_UPDATE',
  ContentCreate = 'CONTENT_CREATE',
  ContentDelete = 'CONTENT_DELETE',
  ContentPermissionCreate = 'CONTENT_PERMISSION_CREATE',
  ContentPermissionDelete = 'CONTENT_PERMISSION_DELETE',
  ContentPermissionRead = 'CONTENT_PERMISSION_READ',
  ContentPermissionUpdate = 'CONTENT_PERMISSION_UPDATE',
  ContentPublish = 'CONTENT_PUBLISH',
  ContentRead = 'CONTENT_READ',
  ContentUpdate = 'CONTENT_UPDATE',
  ContentUpdatePublished = 'CONTENT_UPDATE_PUBLISHED',
  EnumerationCreate = 'ENUMERATION_CREATE',
  EnumerationDelete = 'ENUMERATION_DELETE',
  EnumerationRead = 'ENUMERATION_READ',
  EnumerationUpdate = 'ENUMERATION_UPDATE',
  EnvironmentBackupCreate = 'ENVIRONMENT_BACKUP_CREATE',
  EnvironmentBackupDelete = 'ENVIRONMENT_BACKUP_DELETE',
  EnvironmentBackupRead = 'ENVIRONMENT_BACKUP_READ',
  EnvironmentBackupRestore = 'ENVIRONMENT_BACKUP_RESTORE',
  EnvironmentBackupUpdate = 'ENVIRONMENT_BACKUP_UPDATE',
  EnvironmentCreate = 'ENVIRONMENT_CREATE',
  EnvironmentDelete = 'ENVIRONMENT_DELETE',
  EnvironmentPromote = 'ENVIRONMENT_PROMOTE',
  EnvironmentRead = 'ENVIRONMENT_READ',
  EnvironmentUpdate = 'ENVIRONMENT_UPDATE',
  ExtensionCreate = 'EXTENSION_CREATE',
  ExtensionDelete = 'EXTENSION_DELETE',
  ExtensionRead = 'EXTENSION_READ',
  ExtensionUpdate = 'EXTENSION_UPDATE',
  FieldCreate = 'FIELD_CREATE',
  FieldDelete = 'FIELD_DELETE',
  FieldRead = 'FIELD_READ',
  FieldUpdate = 'FIELD_UPDATE',
  IntegrationCreate = 'INTEGRATION_CREATE',
  IntegrationDelete = 'INTEGRATION_DELETE',
  IntegrationRead = 'INTEGRATION_READ',
  IntegrationUpdate = 'INTEGRATION_UPDATE',
  LocaleCreate = 'LOCALE_CREATE',
  LocaleDelete = 'LOCALE_DELETE',
  LocaleRead = 'LOCALE_READ',
  LocaleUpdate = 'LOCALE_UPDATE',
  ManagePayment = 'MANAGE_PAYMENT',
  ModelCreate = 'MODEL_CREATE',
  ModelDelete = 'MODEL_DELETE',
  ModelRead = 'MODEL_READ',
  ModelUpdate = 'MODEL_UPDATE',
  NetlifyTriggerBuild = 'NETLIFY_TRIGGER_BUILD',
  PatCreate = 'PAT_CREATE',
  PatDelete = 'PAT_DELETE',
  PatRead = 'PAT_READ',
  PatUpdate = 'PAT_UPDATE',
  PlaygroundUse = 'PLAYGROUND_USE',
  ProjectClone = 'PROJECT_CLONE',
  ProjectDelete = 'PROJECT_DELETE',
  ProjectUpdate = 'PROJECT_UPDATE',
  RemoteSourceCreate = 'REMOTE_SOURCE_CREATE',
  RemoteSourceDelete = 'REMOTE_SOURCE_DELETE',
  RemoteSourceRead = 'REMOTE_SOURCE_READ',
  RemoteSourceUpdate = 'REMOTE_SOURCE_UPDATE',
  RoleCreate = 'ROLE_CREATE',
  RoleDelete = 'ROLE_DELETE',
  RoleUpdate = 'ROLE_UPDATE',
  StageCreate = 'STAGE_CREATE',
  StageDelete = 'STAGE_DELETE',
  StageRead = 'STAGE_READ',
  StageUpdate = 'STAGE_UPDATE',
  StorageBucketCreate = 'STORAGE_BUCKET_CREATE',
  StorageBucketDelete = 'STORAGE_BUCKET_DELETE',
  StorageBucketRead = 'STORAGE_BUCKET_READ',
  StorageBucketUpdate = 'STORAGE_BUCKET_UPDATE',
  UserAssignrole = 'USER_ASSIGNROLE',
  UserInvite = 'USER_INVITE',
  UserRemove = 'USER_REMOVE',
  ViewGroupCreate = 'VIEW_GROUP_CREATE',
  ViewGroupDelete = 'VIEW_GROUP_DELETE',
  ViewGroupRead = 'VIEW_GROUP_READ',
  ViewGroupUpdate = 'VIEW_GROUP_UPDATE',
  ViewRolePermissionSettings = 'VIEW_ROLE_PERMISSION_SETTINGS',
  ViewSchema = 'VIEW_SCHEMA',
  ViewTeamMemberSettings = 'VIEW_TEAM_MEMBER_SETTINGS',
  WebhookCreate = 'WEBHOOK_CREATE',
  WebhookDelete = 'WEBHOOK_DELETE',
  WebhookRead = 'WEBHOOK_READ',
  WebhookUpdate = 'WEBHOOK_UPDATE'
}

export type Plan = {
  __typename?: 'Plan';
  billingPeriodMonths: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isEnterprise: Scalars['Boolean']['output'];
  isFree: Scalars['Boolean']['output'];
  isSwitchable?: Maybe<Scalars['Boolean']['output']>;
  limits: Array<Limit>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type PlanIsSwitchableArgs = {
  projectId: Scalars['ID']['input'];
};

export type Profile = {
  __typename?: 'Profile';
  companyName?: Maybe<Scalars['String']['output']>;
  companySize?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  purpose?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

export type Progress = {
  __typename?: 'Progress';
  current: Scalars['Float']['output'];
  estimate?: Maybe<Scalars['Float']['output']>;
  max?: Maybe<Scalars['Float']['output']>;
  percent?: Maybe<Scalars['Float']['output']>;
};

export type Project = {
  __typename?: 'Project';
  auditLogs: AuditLogsPayload;
  availableManagementPermissions: Array<ManagementPermission>;
  cloningProjects: Array<CloningProject>;
  createdAt: Scalars['DateTime']['output'];
  defaultPaginationSize?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  environment: Environment;
  environmentBackupConfig?: Maybe<EnvironmentBackupConfig>;
  environments: Array<Environment>;
  environmentsBackups: Array<EnvironmentBackup>;
  existingRole: Role;
  existingRoles: Array<Role>;
  id: Scalars['ID']['output'];
  inTrial?: Maybe<Scalars['Boolean']['output']>;
  invites: Array<Invite>;
  isCloning?: Maybe<Scalars['Boolean']['output']>;
  lifecycle: Lifecycle;
  maxPaginationSize?: Maybe<Scalars['Int']['output']>;
  members: Array<Member>;
  membersConnection: MembersConnection;
  meta: Scalars['JSON']['output'];
  name: Scalars['String']['output'];
  opensInClassic?: Maybe<Scalars['Boolean']['output']>;
  owner: Member;
  picture?: Maybe<Scalars['String']['output']>;
  /** if this is `null` it means the project is not publicly clone-able */
  publicCloneAccess?: Maybe<PublicCloneAccess>;
  quotas: Quota;
  region: Region;
  subscription: PaymentSubscription;
  trialExpiresIn?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  viewerAsMember?: Maybe<Member>;
};


export type ProjectAuditLogsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AuditLogOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AuditLogWhereInput>;
};


export type ProjectEnvironmentArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectEnvironmentBackupConfigArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectExistingRoleArgs = {
  id: Scalars['ID']['input'];
};


export type ProjectMembersConnectionArgs = {
  first?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
};

export type ProjectChangeCompletedCloning = {
  __typename?: 'ProjectChangeCompletedCloning';
  clonedProject: Project;
};

export type ProjectChangedPayload = ProjectChangeCompletedCloning;

export type ProjectCreatedPayload = {
  __typename?: 'ProjectCreatedPayload';
  id: Scalars['ID']['output'];
};

export type PromoteEnvironmentInput = {
  environmentId: Scalars['ID']['input'];
  renameCurrentMasterApiIdTo: Scalars['String']['input'];
  renameCurrentMasterDisplayNameTo: Scalars['String']['input'];
};

export type PromoteEnvironmentPayload = {
  __typename?: 'PromoteEnvironmentPayload';
  previousMasterEnvironment: Environment;
  promotedEnvironment: Environment;
};

export type PublicCloneAccess = {
  __typename?: 'PublicCloneAccess';
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  includeContent: Scalars['Boolean']['output'];
  includeWebhooks: Scalars['Boolean']['output'];
};

export type PublicContentApi = {
  __typename?: 'PublicContentAPI';
  contentPermissions: Array<IContentPermission>;
  defaults: PublicContentApiDefauts;
};

export type PublicContentApiDefauts = {
  __typename?: 'PublicContentAPIDefauts';
  stage: Stage;
};

export type PublishContentPermission = IContentPermission & {
  __typename?: 'PublishContentPermission';
  condition?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  enabled: Scalars['Boolean']['output'];
  fromStages?: Maybe<Array<Stage>>;
  id: Scalars['ID']['output'];
  locales?: Maybe<Array<Locale>>;
  model?: Maybe<IModel>;
  target: ContentPermissionTarget;
  toStages?: Maybe<Array<Stage>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** @deprecated Use viewer instead */
  _viewer: IViewer;
  metaInfo: MetaInfo;
  viewer: IViewer;
};

export type QueryModel = IFieldParent & IModel & {
  __typename?: 'QueryModel';
  apiId: Scalars['String']['output'];
  apiIdPlural: Scalars['String']['output'];
  contentViews: Array<ContentView>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  environment: Environment;
  field: IField;
  fields: Array<IField>;
  fieldsConnection: FieldsConnection;
  /** Model has at least one document */
  hasContent: Scalars['Boolean']['output'];
  hasLocalizedComponents: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isLocalized: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  isVersioned: Scalars['Boolean']['output'];
  sidebarElements: Array<ISidebarElement>;
  titleFields: Array<IField>;
  updatedAt: Scalars['DateTime']['output'];
  viewerPermission: ModelViewerPermission;
};


export type QueryModelContentViewsArgs = {
  filter?: InputMaybe<ContentViewFilterInput>;
  includeSystemContentViews?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryModelFieldArgs = {
  id: Scalars['ID']['input'];
};


export type QueryModelFieldsArgs = {
  includeApiOnlyFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeHiddenFields?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryModelFieldsConnectionArgs = {
  first?: Scalars['Int']['input'];
  includeApiOnlyFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeHiddenFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeSystemFields?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: Scalars['Int']['input'];
};

export type Quota = {
  __typename?: 'Quota';
  apiOperations: Progress;
  assetTraffic: Progress;
  environments: Progress;
  records: Progress;
  roles: Progress;
  seats: Progress;
};

export enum Remote_Graphql_Type {
  Enum = 'ENUM',
  InputObject = 'INPUT_OBJECT',
  Interface = 'INTERFACE',
  Object = 'OBJECT',
  Scalar = 'SCALAR',
  Union = 'UNION'
}

export type RestRemoteSource = IRecentSchemaChange & IRemoteSource & {
  __typename?: 'RESTRemoteSource';
  createdAt: Scalars['DateTime']['output'];
  debugEnabled: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  headers?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  kind?: Maybe<RemoteSourceKind>;
  oAuth?: Maybe<Scalars['JSON']['output']>;
  prefix: Scalars['String']['output'];
  remoteTypeDefinitionsConnection: RemoteTypeDefinitionsConnection;
  type: RemoteSourceType;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};


export type RestRemoteSourceRemoteTypeDefinitionsConnectionArgs = {
  first?: Scalars['Int']['input'];
  isUserDefined?: InputMaybe<Scalars['Boolean']['input']>;
  remoteGraphQLTypes?: InputMaybe<Array<Remote_Graphql_Type>>;
  skip?: Scalars['Int']['input'];
};

export type ReadContentPermission = IContentPermission & {
  __typename?: 'ReadContentPermission';
  condition?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  locales?: Maybe<Array<Locale>>;
  model?: Maybe<IModel>;
  stages?: Maybe<Array<Stage>>;
  target: ContentPermissionTarget;
  updatedAt: Scalars['DateTime']['output'];
};

export type ReadVersionContentPermission = IContentPermission & {
  __typename?: 'ReadVersionContentPermission';
  createdAt: Scalars['DateTime']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  model?: Maybe<IModel>;
  target: ContentPermissionTarget;
  updatedAt: Scalars['DateTime']['output'];
};

export type Region = {
  __typename?: 'Region';
  id: Scalars['String']['output'];
  isBeta: Scalars['Boolean']['output'];
  isReadOnly: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  pingUrl?: Maybe<Scalars['String']['output']>;
};

export type RelationalField = IField & IRequireableField & {
  __typename?: 'RelationalField';
  apiId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  extensions?: Maybe<Scalars['JSON']['output']>;
  formConfig: FieldConfig;
  id: Scalars['ID']['output'];
  /** @deprecated Use visibility instead */
  isHidden: Scalars['Boolean']['output'];
  isList: Scalars['Boolean']['output'];
  isRequired: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  /**
   * This will throw a runtime error for fields that are on a component instead of model!
   * @deprecated Use parent instead
   */
  model: IModel;
  parent: IFieldParent;
  position: Scalars['Int']['output'];
  relatedField: RelationalField;
  relatedModel: IModel;
  tableConfig: FieldConfig;
  type: RelationalFieldType;
  updatedAt: Scalars['DateTime']['output'];
  visibility: VisibilityTypes;
};

export enum RelationalFieldType {
  Asset = 'ASSET',
  Relation = 'RELATION'
}

export type RemoteField = IField & {
  __typename?: 'RemoteField';
  apiId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  extensions?: Maybe<Scalars['JSON']['output']>;
  formConfig: FieldConfig;
  id: Scalars['ID']['output'];
  inputArgs?: Maybe<Array<FieldInputArg>>;
  /** @deprecated Use visibility instead */
  isHidden: Scalars['Boolean']['output'];
  isList: Scalars['Boolean']['output'];
  isRequired: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  /**
   * This will throw a runtime error for fields that are on a component instead of model!
   * @deprecated Use parent instead
   */
  model: IModel;
  parent: IFieldParent;
  position: Scalars['Int']['output'];
  remoteConfig: IRemoteFieldConfig;
  tableConfig: FieldConfig;
  type: RemoteFieldType;
  updatedAt: Scalars['DateTime']['output'];
  visibility: VisibilityTypes;
};

export enum RemoteFieldApiMethod {
  Get = 'GET',
  Post = 'POST'
}

export type RemoteFieldConfigInput = {
  cacheTTLSeconds?: InputMaybe<Scalars['Int']['input']>;
  /** If true, headers that are sent by the client will be forwarded to the remote source */
  forwardClientHeaders?: InputMaybe<Scalars['Boolean']['input']>;
  /** In case of apiType GraphQL graphqlQuery contains the GraphQL query that will be sent to the remote source */
  graphQLQuery?: InputMaybe<Scalars['String']['input']>;
  headers?: InputMaybe<Scalars['JSON']['input']>;
  method: RemoteFieldApiMethod;
  remoteSourceId: Scalars['ID']['input'];
  /** In case of apiType REST restPath contains the path that will be appended to the API base url */
  restPath?: InputMaybe<Scalars['String']['input']>;
  /** Remote Type definitions apiId of the type the remote field should return. */
  returnTypeApiId: Scalars['String']['input'];
};

export enum RemoteFieldType {
  Graphql = 'GRAPHQL',
  Rest = 'REST'
}

export enum RemoteSourceKind {
  CommerceLayer = 'CommerceLayer',
  CommerceTools = 'CommerceTools',
  Custom = 'Custom'
}

export type RemoteSourceOAuthInput = {
  authorizationGrantType: OAuthGrantType;
  authorizationUrl: Scalars['String']['input'];
  clientId: Scalars['String']['input'];
  clientSecret?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum RemoteSourceType {
  Graphql = 'GRAPHQL',
  Rest = 'REST'
}

export type RemoteTypeDefinition = {
  __typename?: 'RemoteTypeDefinition';
  apiId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  graphqlType: Remote_Graphql_Type;
  id: Scalars['ID']['output'];
  isSystem: Scalars['Boolean']['output'];
  sdl: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RemoteTypeDefinitionEdge = {
  __typename?: 'RemoteTypeDefinitionEdge';
  node: RemoteTypeDefinition;
};

export type RemoteTypeDefinitionsAggregate = {
  __typename?: 'RemoteTypeDefinitionsAggregate';
  count: Scalars['Int']['output'];
};

export type RemoteTypeDefinitionsConnection = {
  __typename?: 'RemoteTypeDefinitionsConnection';
  aggregate: RemoteTypeDefinitionsAggregate;
  edges: Array<RemoteTypeDefinitionEdge>;
  pageInfo: PageInfo;
};

export type RemoveMemberInput = {
  memberId: Scalars['ID']['input'];
};

export type RemoveMemberPayload = {
  __typename?: 'RemoveMemberPayload';
  removedMemberId: Scalars['ID']['output'];
};

export type ResetSidebarElementsInput = {
  modelId: Scalars['ID']['input'];
};

export type ResetSidebarElementsPayload = {
  __typename?: 'ResetSidebarElementsPayload';
  model?: Maybe<IModel>;
};

export type RestRemoteFieldConfig = IRemoteFieldConfig & {
  __typename?: 'RestRemoteFieldConfig';
  cacheTTLSeconds?: Maybe<Scalars['Int']['output']>;
  forwardClientHeaders: Scalars['Boolean']['output'];
  headers?: Maybe<Scalars['JSON']['output']>;
  method: RemoteFieldApiMethod;
  path?: Maybe<Scalars['String']['output']>;
  remoteSource: RestRemoteSource;
  returnType: RemoteTypeDefinition;
};

export type RestoreEnvironmentBackupInput = {
  environmentBackupId: Scalars['ID']['input'];
};

export type RestoreEnvironmentBackupPayload = {
  __typename?: 'RestoreEnvironmentBackupPayload';
  environmentBackup: EnvironmentBackup;
};

export type RetriggerWebhookInput = {
  logId: Scalars['String']['input'];
  webhookId: Scalars['ID']['input'];
};

export type RetriggerWebhookPayload = {
  __typename?: 'RetriggerWebhookPayload';
  logId: Scalars['String']['output'];
};

export type RevokeInviteInput = {
  id: Scalars['ID']['input'];
};

export type RevokeInvitePayload = {
  __typename?: 'RevokeInvitePayload';
  revokedInviteId: Scalars['ID']['output'];
};

export type Role = {
  __typename?: 'Role';
  /**
   * Returns contentPermissions for a role.
   * Optionally filtered by environment.
   */
  contentPermissions: Array<IContentPermission>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  managementPermissions: Array<ManagementPermission>;
  members: Array<Member>;
  membersConnection: MembersConnection;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type RoleContentPermissionsArgs = {
  environmentId?: InputMaybe<Scalars['ID']['input']>;
};


export type RoleMembersConnectionArgs = {
  first?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
};

export type SchedulingModel = IFieldParent & IModel & {
  __typename?: 'SchedulingModel';
  apiId: Scalars['String']['output'];
  apiIdPlural: Scalars['String']['output'];
  contentViews: Array<ContentView>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  environment: Environment;
  field: IField;
  fields: Array<IField>;
  fieldsConnection: FieldsConnection;
  /** Model has at least one document */
  hasContent: Scalars['Boolean']['output'];
  hasLocalizedComponents: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isLocalized: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  isVersioned: Scalars['Boolean']['output'];
  sidebarElements: Array<ISidebarElement>;
  titleFields: Array<IField>;
  updatedAt: Scalars['DateTime']['output'];
  viewerPermission: ModelViewerPermission;
};


export type SchedulingModelContentViewsArgs = {
  filter?: InputMaybe<ContentViewFilterInput>;
  includeSystemContentViews?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SchedulingModelFieldArgs = {
  id: Scalars['ID']['input'];
};


export type SchedulingModelFieldsArgs = {
  includeApiOnlyFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeHiddenFields?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SchedulingModelFieldsConnectionArgs = {
  first?: Scalars['Int']['input'];
  includeApiOnlyFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeHiddenFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeSystemFields?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: Scalars['Int']['input'];
};

export type SchemaMigrationFailedSubscriptionPayload = ISchemaMigrationPayload & {
  __typename?: 'SchemaMigrationFailedSubscriptionPayload';
  environment?: Maybe<Environment>;
  migration: Migration;
  project?: Maybe<Project>;
};

export type SchemaMigrationSubscriptionPayload = ISchemaMigrationPayload & {
  __typename?: 'SchemaMigrationSubscriptionPayload';
  migration: Migration;
};

export type SchemaMigrationSucceededSubscriptionPayload = ISchemaMigrationPayload & {
  __typename?: 'SchemaMigrationSucceededSubscriptionPayload';
  /** @deprecated No longer supported */
  affectedResourceId: Scalars['ID']['output'];
  /** @deprecated No longer supported */
  affectedResourceType: MigrationOperationType;
  environment: Environment;
  migration: Migration;
  project: Project;
};

export type SendFeedbackInput = {
  allowContact?: InputMaybe<Scalars['Boolean']['input']>;
  featureName?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['ID']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  reasons?: InputMaybe<Array<Scalars['String']['input']>>;
  type: FeedbackType;
};

export type SendInviteInput = {
  email: Scalars['String']['input'];
  origin?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['ID']['input'];
  roleIds: Array<Scalars['ID']['input']>;
};

export type SendInvitePayload = {
  __typename?: 'SendInvitePayload';
  invite: Invite;
};

export type SetUserAnalyticsInput = {
  conversionPage?: InputMaybe<Scalars['String']['input']>;
  gclid?: InputMaybe<Scalars['String']['input']>;
  hubspotutk?: InputMaybe<Scalars['String']['input']>;
  landingPage?: InputMaybe<Scalars['String']['input']>;
  referrer?: InputMaybe<Scalars['String']['input']>;
  utmCampaign?: InputMaybe<Scalars['String']['input']>;
  utmContent?: InputMaybe<Scalars['String']['input']>;
  utmMedium?: InputMaybe<Scalars['String']['input']>;
  utmSource?: InputMaybe<Scalars['String']['input']>;
  utmTerm?: InputMaybe<Scalars['String']['input']>;
};

export type SetUserPreferencesInput = {
  /**
   * If preferences are null, then all the user preferences will be deleted.
   * You don't need to pass the whole preferences object, just the keys you want to update or add.
   */
  preferences?: InputMaybe<Scalars['JSON']['input']>;
};

export type SetUserSelectionInput = {
  /** The id of the project you want associate the selection to. */
  projectId: Scalars['ID']['input'];
  /**
   * The value of the selection you want to update or add.
   *
   * You don't need to pass the whole object, just the keys you want to update or add.
   *
   * If selection value is null, then value will be deleted.
   */
  selection?: InputMaybe<Scalars['JSON']['input']>;
};

export type SidebarElements = AppSidebarElement | CustomSidebarElement | ExtensionSidebarElement | SystemSidebarElement;

export type SidebarExtension = IExtension & {
  __typename?: 'SidebarExtension';
  apiId: Scalars['String']['output'];
  config: Scalars['JSON']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Member>;
  description?: Maybe<Scalars['String']['output']>;
  environment: Environment;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  neededPermissions: Array<AvailableExtensionPermission>;
  sidebarElements: Array<ISidebarElement>;
  /** Location for the source if the source type is an external one */
  src: Scalars['String']['output'];
  /** The type indicating where the source for the extension will be obtained from */
  srcType: ExtensionSrcType;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy?: Maybe<Member>;
};

export type SimpleField = IField & ILocalizableField & IRequireableField & ITitleableField & IUniqueableField & {
  __typename?: 'SimpleField';
  apiId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  embeddableModels?: Maybe<Array<IModel>>;
  embedsEnabled?: Maybe<Scalars['Boolean']['output']>;
  extensions?: Maybe<Scalars['JSON']['output']>;
  formConfig: FieldConfig;
  id: Scalars['ID']['output'];
  initialValue?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use visibility instead */
  isHidden: Scalars['Boolean']['output'];
  isList: Scalars['Boolean']['output'];
  isLocalized: Scalars['Boolean']['output'];
  isRequired: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  isTitle: Scalars['Boolean']['output'];
  isUnique: Scalars['Boolean']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  /**
   * This will throw a runtime error for fields that are on a component instead of model!
   * @deprecated Use parent instead
   */
  model: IModel;
  parent: IFieldParent;
  position: Scalars['Int']['output'];
  tableConfig: FieldConfig;
  type: SimpleFieldType;
  updatedAt: Scalars['DateTime']['output'];
  validations?: Maybe<SimpleFieldValidations>;
  visibility: VisibilityTypes;
};

/** Field types */
export enum SimpleFieldType {
  Boolean = 'BOOLEAN',
  Color = 'COLOR',
  Date = 'DATE',
  Datetime = 'DATETIME',
  Float = 'FLOAT',
  Id = 'ID',
  Int = 'INT',
  Json = 'JSON',
  Location = 'LOCATION',
  Richtext = 'RICHTEXT',
  String = 'STRING'
}

export type SimpleFieldValidations = FloatFieldValidations | IntFieldValidations | StringFieldValidations;

export type SimpleFieldValidationsInput = {
  Float?: InputMaybe<FloatFieldValidationsInput>;
  Int?: InputMaybe<IntFieldValidationsInput>;
  String?: InputMaybe<StringFieldValidationsInput>;
};

export type Stage = {
  __typename?: 'Stage';
  apiId: Scalars['String']['output'];
  backgroundColor: Scalars['String']['output'];
  color: Scalars['String']['output'];
  colorPaletteId: ColorPalette;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isSystem: Scalars['Boolean']['output'];
  position: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type StageFilestackSecurityOptions = {
  __typename?: 'StageFilestackSecurityOptions';
  expires: Scalars['String']['output'];
  stage: Stage;
};

export type StartTrialInput = {
  planId: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
};

export type StartTrialPayload = {
  __typename?: 'StartTrialPayload';
  project: Project;
};

export type StarterTemplate = ITemplate & {
  __typename?: 'StarterTemplate';
  coverPicture?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  resources: Array<TemplateResource>;
  stack: Array<TechnologyStack>;
};

export type Stats = {
  __typename?: 'Stats';
  time: Scalars['DateTime']['output'];
  value: Scalars['Float']['output'];
};

export type StringFieldValidations = {
  __typename?: 'StringFieldValidations';
  characters?: Maybe<FieldValidationRange>;
  listItemCount?: Maybe<FieldValidationRange>;
  matches?: Maybe<FieldValidationRegEx>;
  notMatches?: Maybe<FieldValidationRegEx>;
};

export type StringFieldValidationsInput = {
  characters?: InputMaybe<FieldValidationIntRangeInput>;
  listItemCount?: InputMaybe<FieldValidationIntRangeInput>;
  matches?: InputMaybe<FieldValidationRegExInput>;
  notMatches?: InputMaybe<FieldValidationRegExInput>;
};

export type Subscription = {
  __typename?: 'Subscription';
  environmentCreated: EnvironmentCreatedPayload;
  environmentPromoted: EnvironmentPromotedPayload;
  netlifyBuildNotification: NetlifyIntegrationCallbackPayload;
  projectChanged: ProjectChangedPayload;
  projectCreated: ProjectCreatedPayload;
  schemaMigration: ISchemaMigrationPayload;
};


export type SubscriptionEnvironmentCreatedArgs = {
  projectId: Scalars['ID']['input'];
};


export type SubscriptionEnvironmentPromotedArgs = {
  projectId: Scalars['ID']['input'];
};


export type SubscriptionNetlifyBuildNotificationArgs = {
  integrationId: Scalars['ID']['input'];
};


export type SubscriptionSchemaMigrationArgs = {
  environmentId: Scalars['ID']['input'];
};

export type SwitchPaymentSubscriptionInput = {
  planName: Scalars['String']['input'];
  subscriptionId: Scalars['ID']['input'];
};

export type SwitchPaymentSubscriptionPayload = {
  __typename?: 'SwitchPaymentSubscriptionPayload';
  project: Project;
  subscription: PaymentSubscription;
};

export type SystemSidebarElement = ISidebarElement & {
  __typename?: 'SystemSidebarElement';
  config?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  model: IModel;
  position: Scalars['Int']['output'];
  type: SystemSidebarElementType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum SystemSidebarElementType {
  Information = 'INFORMATION',
  Localizations = 'LOCALIZATIONS',
  PreviewUrls = 'PREVIEW_URLS',
  Releases = 'RELEASES',
  Stages = 'STAGES',
  Versions = 'VERSIONS'
}

export type TechnologyStack = {
  __typename?: 'TechnologyStack';
  image: Scalars['String']['output'];
  title: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type TechnologyStackInput = {
  image: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

export type Template = ITemplate & {
  __typename?: 'Template';
  coverPicture?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  resources: Array<TemplateResource>;
};

export type TemplateResource = {
  __typename?: 'TemplateResource';
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type TemplateResourceInput = {
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type TokenViewer = IViewer & {
  __typename?: 'TokenViewer';
  availableExtensionPermissions: Array<AvailableExtensionPermission>;
  availableExtensionSrcTypes: Array<ExtensionSrcType>;
  availableIntegrations: Array<Integration_Provider>;
  id: Scalars['ID']['output'];
  plans: Array<Plan>;
  project?: Maybe<Project>;
  regions: Array<Region>;
  templates: Array<ITemplate>;
};


export type TokenViewerProjectArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export enum TrackEvent {
  CheckedQuickstart = 'CHECKED_QUICKSTART',
  CreatedContent = 'CREATED_CONTENT',
  UsedPlayground = 'USED_PLAYGROUND'
}

export type TrackInput = {
  event: TrackEvent;
  meta?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['ID']['input'];
};

export type TrackPayload = {
  __typename?: 'TrackPayload';
  success: Scalars['Boolean']['output'];
};

export type TriggerNetlifyIntegrationBuildInput = {
  integrationId: Scalars['ID']['input'];
  siteId: Scalars['String']['input'];
};

export type TriggerNetlifyIntegrationBuildPayload = {
  __typename?: 'TriggerNetlifyIntegrationBuildPayload';
  integration: NetlifyIntegration;
};

export type UniDirectionalRelationalField = IField & IRequireableField & {
  __typename?: 'UniDirectionalRelationalField';
  apiId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  extensions?: Maybe<Scalars['JSON']['output']>;
  formConfig: FieldConfig;
  id: Scalars['ID']['output'];
  /** @deprecated Use visibility instead */
  isHidden: Scalars['Boolean']['output'];
  isList: Scalars['Boolean']['output'];
  isRequired: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  /**
   * This will throw a runtime error for fields that are on a component instead of model!
   * @deprecated Use parent instead
   */
  model: IModel;
  parent: IFieldParent;
  position: Scalars['Int']['output'];
  relatedModel: IModel;
  tableConfig: FieldConfig;
  type: RelationalFieldType;
  updatedAt: Scalars['DateTime']['output'];
  visibility: VisibilityTypes;
};

export type Union = {
  __typename?: 'Union';
  apiId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  field: UnionField;
  id: Scalars['ID']['output'];
  memberTypes: Array<UnionField>;
};

export type UnionField = IField & IUnionField & {
  __typename?: 'UnionField';
  apiId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  extensions?: Maybe<Scalars['JSON']['output']>;
  formConfig: FieldConfig;
  id: Scalars['ID']['output'];
  /** @deprecated Use visibility instead */
  isHidden: Scalars['Boolean']['output'];
  isList: Scalars['Boolean']['output'];
  /** True if this field is the reverse side of the initally created union field */
  isMemberType: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  /**
   * This will throw a runtime error for fields that are on a component instead of model!
   * @deprecated Use parent instead
   */
  model: IModel;
  parent: IFieldParent;
  position: Scalars['Int']['output'];
  tableConfig: FieldConfig;
  type: UnionFieldType;
  union: Union;
  updatedAt: Scalars['DateTime']['output'];
  visibility: VisibilityTypes;
};

export enum UnionFieldType {
  Union = 'UNION'
}

export type UnpublishContentPermission = IContentPermission & {
  __typename?: 'UnpublishContentPermission';
  condition?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  locales?: Maybe<Array<Locale>>;
  model?: Maybe<IModel>;
  stages?: Maybe<Array<Stage>>;
  target: ContentPermissionTarget;
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateAppInstallationInput = {
  appInstallationId: Scalars['ID']['input'];
  config: Scalars['JSON']['input'];
  status?: InputMaybe<AppInstallationStatus>;
};

export type UpdateAppInstallationPayload = {
  __typename?: 'UpdateAppInstallationPayload';
  updatedAppInstallation: AppInstallation;
};

export type UpdateComponentFieldInput = {
  apiId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  id: Scalars['ID']['input'];
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  tableConfig?: InputMaybe<FieldConfigInput>;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type UpdateComponentInput = {
  /**
   * Rename singular API ID to
   * specified value
   */
  apiId?: InputMaybe<Scalars['String']['input']>;
  /**
   * Rename plural API ID to
   * specified value
   */
  apiIdPlural?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateComponentUnionFieldInput = {
  apiId?: InputMaybe<Scalars['String']['input']>;
  components?: InputMaybe<Array<Scalars['ID']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  id: Scalars['ID']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
  tableConfig?: InputMaybe<FieldConfigInput>;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type UpdateContentPermission = IContentPermission & {
  __typename?: 'UpdateContentPermission';
  condition?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  locales?: Maybe<Array<Locale>>;
  model?: Maybe<IModel>;
  target: ContentPermissionTarget;
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateContentPermissionEnabledInput = {
  enabled: Scalars['Boolean']['input'];
  permissionId: Scalars['ID']['input'];
};

export type UpdateContentPermissionEnabledPayload = {
  __typename?: 'UpdateContentPermissionEnabledPayload';
  permission: IContentPermission;
};

export type UpdateContentViewInput = {
  columns: Array<ContentViewColumnInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<OrderByInput>;
  viewGroupId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateContentViewPayload = {
  __typename?: 'UpdateContentViewPayload';
  updatedContentView: ContentView;
};

export type UpdateCreateContentPermissionInput = {
  locales?: InputMaybe<Array<Scalars['ID']['input']>>;
  model?: InputMaybe<CreateCreateContentPermissionModelInput>;
  permissionId: Scalars['ID']['input'];
};

export type UpdateCreateContentPermissionPayload = {
  __typename?: 'UpdateCreateContentPermissionPayload';
  permission: CreateContentPermission;
};

export type UpdateDeleteContentPermissionInput = {
  locales?: InputMaybe<Array<Scalars['ID']['input']>>;
  model?: InputMaybe<CreateUpdateContentPermissionModelInput>;
  permissionId: Scalars['ID']['input'];
};

export type UpdateDeleteContentPermissionPayload = {
  __typename?: 'UpdateDeleteContentPermissionPayload';
  permission: DeleteContentPermission;
};

export type UpdateEnumerableFieldInput = {
  apiId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  id: Scalars['ID']['input'];
  initialValue?: InputMaybe<Scalars['String']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  isLocalized?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  isTitle?: InputMaybe<Scalars['Boolean']['input']>;
  isUnique?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  migrationValue?: InputMaybe<Scalars['String']['input']>;
  tableConfig?: InputMaybe<FieldConfigInput>;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type UpdateEnumerationInput = {
  /**
   * New Api identifier to use,
   * will impact Content API
   */
  apiId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  /** List of values to create */
  valuesToCreate?: InputMaybe<Array<EnumerationValueCreateInput>>;
  /** List of value IDs to delete */
  valuesToDelete?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** List of existing values to update */
  valuesToUpdate?: InputMaybe<Array<EnumerationValueUpdateInput>>;
};

export type UpdateEnvironmentInput = {
  /** Update the environment description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Update the environment display name */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** ID of environment to update */
  id: Scalars['ID']['input'];
};

export type UpdateEnvironmentPayload = {
  __typename?: 'UpdateEnvironmentPayload';
  updatedEnvironment: Environment;
};

export type UpdateFieldExtensionInput = {
  apiId: Scalars['String']['input'];
  config?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  extensionId: Scalars['ID']['input'];
  fieldType?: InputMaybe<ExtensionFieldType>;
  hasFormRenderer?: InputMaybe<Scalars['Boolean']['input']>;
  hasListRenderer?: InputMaybe<Scalars['Boolean']['input']>;
  hasTableRenderer?: InputMaybe<Scalars['Boolean']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  neededPermissions?: InputMaybe<Array<AvailableExtensionPermissionAction>>;
  src?: InputMaybe<Scalars['String']['input']>;
  srcTypeId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateFieldExtensionPayload = {
  __typename?: 'UpdateFieldExtensionPayload';
  updatedExtension: FieldExtension;
};

export type UpdateFilestackSecurityOptionsInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  environmentId: Scalars['ID']['input'];
  globalExpires?: InputMaybe<Scalars['String']['input']>;
  stageOverrides?: InputMaybe<Array<UpdateStageFilestackSecurityOptionsInput>>;
};

export type UpdateFilestackSecurityOptionsPayload = {
  __typename?: 'UpdateFilestackSecurityOptionsPayload';
  updatedEnvironment: Environment;
  updatedFilestack: Filestack;
};

export type UpdateGatsbyCloudIntegrationInput = {
  /** URL to trigger a Deploy Build. This webhook will be triggered when publishing and unpublishing entries. */
  buildWebhookURL?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  integrationId: Scalars['ID']['input'];
  previewWebhookURL?: InputMaybe<Scalars['String']['input']>;
  /**
   * Prefix of your site
   * Only lower case alphabetical characters, numbers and underscores are allowed.
   */
  sitePrefix?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGatsbyCloudIntegrationPayload = {
  __typename?: 'UpdateGatsbyCloudIntegrationPayload';
  updatedGatsbyCloudIntegration: GatsbyCloudIntegration;
};

export type UpdateGraphQlRemoteSourceInput = {
  debugEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  headers?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['ID']['input'];
  introspectionHeaders?: InputMaybe<Scalars['JSON']['input']>;
  introspectionMethod?: InputMaybe<GraphQlRemoteSourceIntrospectionMethod>;
  introspectionUrl?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<RemoteSourceKind>;
  /** Oauth input that can be used to get access token for the remote source */
  oAuth?: InputMaybe<RemoteSourceOAuthInput>;
  remoteTypeDefinitionsToUpsert?: InputMaybe<UpsertRemoteTypeDefinitionsInput>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLocaleInput = {
  /**
   * Rename Locale apiId,
   * will impact the Content API
   */
  apiId?: InputMaybe<Scalars['String']['input']>;
  /** Update locale description */
  description?: InputMaybe<Scalars['String']['input']>;
  /**
   * Update the Locale's
   * display name
   */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** ID of locale to update */
  id: Scalars['ID']['input'];
  /**
   * Mark locale as default,
   * will impact the Content API
   */
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateMemberRolesInput = {
  memberId: Scalars['ID']['input'];
  roleIds: Array<Scalars['ID']['input']>;
};

export type UpdateModelInput = {
  /**
   * Rename singular API ID to
   * specified value
   */
  apiId?: InputMaybe<Scalars['String']['input']>;
  /**
   * Rename plural API ID to
   * specified value
   */
  apiIdPlural?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateNetlifyIntegrationInput = {
  /**
   * This token is used to create the needed BuildHook and BuildNotifications in Netlify.
   * This token is only used once and won't be stored anywhere
   */
  accessToken: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  integrationId: Scalars['ID']['input'];
  models?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Overrides the currently setup netlify sites. Omit if you don't want to update the existing sites. */
  sites?: InputMaybe<Array<NetlifySiteInput>>;
};

export type UpdateNetlifyIntegrationPayload = {
  __typename?: 'UpdateNetlifyIntegrationPayload';
  updatedNetlifyIntegration: NetlifyIntegration;
};

export type UpdatePermanentAuthTokenInput = {
  defaults?: InputMaybe<PermanentAuthTokenDefaultsInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  managementPermissionIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePermanentAuthTokenPayload = {
  __typename?: 'UpdatePermanentAuthTokenPayload';
  updatedPermanentAuthToken: PermanentAuthToken;
};

export type UpdateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  opensInClassic?: InputMaybe<Scalars['Boolean']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  publicCloneAccess?: InputMaybe<UpdatePublicCloneAccessInput>;
};

export type UpdatePublicCloneAccessInput = {
  enabled: Scalars['Boolean']['input'];
  includeContent: Scalars['Boolean']['input'];
  includeWebhooks: Scalars['Boolean']['input'];
};

export type UpdatePublicEndpointDefaultsInput = {
  stage: Scalars['ID']['input'];
};

export type UpdatePublicEndpointInput = {
  defaults?: InputMaybe<UpdatePublicEndpointDefaultsInput>;
  environmentId: Scalars['ID']['input'];
};

export type UpdatePublicPermissionInput = {
  allowMutations: Scalars['Boolean']['input'];
  allowQueriesOnStages: Array<Scalars['ID']['input']>;
};

export type UpdatePublicPermissionsPayload = {
  __typename?: 'UpdatePublicPermissionsPayload';
  environment: Environment;
};

export type UpdatePublishContentPermissionInput = {
  fromStages?: InputMaybe<Array<Scalars['ID']['input']>>;
  locales?: InputMaybe<Array<Scalars['ID']['input']>>;
  model?: InputMaybe<CreatePublishContentPermissionModelInput>;
  permissionId: Scalars['ID']['input'];
  toStages?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdatePublishContentPermissionModelInput = {
  condition?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdatePublishContentPermissionPayload = {
  __typename?: 'UpdatePublishContentPermissionPayload';
  permission: PublishContentPermission;
};

export type UpdateRestRemoteSourceInput = {
  debugEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  headers?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['ID']['input'];
  kind?: InputMaybe<RemoteSourceKind>;
  /** Oauth input that can be used to get access token for the remote source */
  oAuth?: InputMaybe<RemoteSourceOAuthInput>;
  remoteTypeDefinitionsToUpsert?: InputMaybe<UpsertRemoteTypeDefinitionsInput>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReadContentPermissionInput = {
  locales?: InputMaybe<Array<Scalars['ID']['input']>>;
  model?: InputMaybe<CreateReadContentPermissionModelInput>;
  permissionId: Scalars['ID']['input'];
  stages?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateReadContentPermissionPayload = {
  __typename?: 'UpdateReadContentPermissionPayload';
  permission: ReadContentPermission;
};

export type UpdateReadVersionContentPermissionInput = {
  modelId?: InputMaybe<Scalars['ID']['input']>;
  permissionId: Scalars['ID']['input'];
};

export type UpdateReadVersionContentPermissionPayload = {
  __typename?: 'UpdateReadVersionContentPermissionPayload';
  permission: ReadVersionContentPermission;
};

export type UpdateRelationalFieldInput = {
  apiId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  id: Scalars['ID']['input'];
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Marks the field as required.
   * Note: This is only supported for RelationFieldType ASSET!
   */
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  isUnidirectional?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  tableConfig?: InputMaybe<FieldConfigInput>;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type UpdateRemoteFieldConfigInput = {
  cacheTTLSeconds?: InputMaybe<Scalars['Int']['input']>;
  forwardClientHeaders?: InputMaybe<Scalars['Boolean']['input']>;
  /** In case of apiType GraphQL graphqlQuery contains the GraphQL query that will be sent to the remote source */
  graphQLQuery?: InputMaybe<Scalars['String']['input']>;
  headers?: InputMaybe<Scalars['JSON']['input']>;
  method?: InputMaybe<RemoteFieldApiMethod>;
  remoteSourceId?: InputMaybe<Scalars['ID']['input']>;
  /** In case of apiType REST restPath contains the path that will be appended to the base url of the api */
  restPath?: InputMaybe<Scalars['String']['input']>;
  /** Remote Type definitions apiId of the type the remote field should return. */
  returnTypeApiId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRemoteFieldInput = {
  apiId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  id: Scalars['ID']['input'];
  inputArgs?: InputMaybe<UpsertFieldInputArgInput>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  remoteConfig?: InputMaybe<UpdateRemoteFieldConfigInput>;
  tableConfig?: InputMaybe<FieldConfigInput>;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  managementPermissionIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSidebarElementInput = {
  config?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateSidebarElementPayload = {
  __typename?: 'UpdateSidebarElementPayload';
  updatedSidebarElement: ISidebarElement;
};

export type UpdateSidebarExtensionInput = {
  apiId: Scalars['String']['input'];
  config?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  extensionId: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  neededPermissions?: InputMaybe<Array<AvailableExtensionPermissionAction>>;
  src?: InputMaybe<Scalars['String']['input']>;
  srcTypeId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateSidebarExtensionPayload = {
  __typename?: 'UpdateSidebarExtensionPayload';
  updatedExtension: SidebarExtension;
};

export type UpdateSimpleFieldInput = {
  apiId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  embeddableModels?: InputMaybe<EmbeddableModelsInput>;
  embedsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  id: Scalars['ID']['input'];
  initialValue?: InputMaybe<Scalars['String']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  isLocalized?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  isTitle?: InputMaybe<Scalars['Boolean']['input']>;
  isUnique?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  migrationValue?: InputMaybe<Scalars['String']['input']>;
  tableConfig?: InputMaybe<FieldConfigInput>;
  validations?: InputMaybe<SimpleFieldValidationsInput>;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type UpdateStageFilestackSecurityOptionsInput = {
  expires: Scalars['String']['input'];
  stageId: Scalars['ID']['input'];
};

export type UpdateStageInput = {
  /**
   * Rename Stage apiId,
   * will impact the Content API
   */
  apiId?: InputMaybe<Scalars['String']['input']>;
  /** Color that will be used in the webapp */
  colorPaletteId?: InputMaybe<ColorPalette>;
  /** Update stage description */
  description?: InputMaybe<Scalars['String']['input']>;
  /**
   * Update the Stage
   * display name
   */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** ID of stage to update */
  id: Scalars['ID']['input'];
  position?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUnionFieldInput = {
  apiId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  extensions?: InputMaybe<Scalars['JSON']['input']>;
  formConfig?: InputMaybe<FieldConfigInput>;
  id: Scalars['ID']['input'];
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  tableConfig?: InputMaybe<FieldConfigInput>;
  union?: InputMaybe<UpdateUnionInput>;
  visibility?: InputMaybe<VisibilityTypes>;
};

export type UpdateUnionInput = {
  apiId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** Models and member fields to add */
  membersToAdd?: InputMaybe<Array<CreateMemberFieldInput>>;
  /** Models to remove from union (accepts Model ID) */
  membersToRemove?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateUnpublishContentPermissionInput = {
  locales?: InputMaybe<Array<Scalars['ID']['input']>>;
  model?: InputMaybe<UpdateUnpublishContentPermissionModelInput>;
  permissionId: Scalars['ID']['input'];
  stages?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateUnpublishContentPermissionModelInput = {
  condition?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateUnpublishContentPermissionPayload = {
  __typename?: 'UpdateUnpublishContentPermissionPayload';
  permission: UnpublishContentPermission;
};

export type UpdateUpdateContentPermissionInput = {
  locales?: InputMaybe<Array<Scalars['ID']['input']>>;
  model?: InputMaybe<CreateUpdateContentPermissionModelInput>;
  permissionId: Scalars['ID']['input'];
};

export type UpdateUpdateContentPermissionPayload = {
  __typename?: 'UpdateUpdateContentPermissionPayload';
  permission: UpdateContentPermission;
};

export type UpdateViewGroupInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateViewGroupPayload = {
  __typename?: 'UpdateViewGroupPayload';
  updatedViewGroup: ViewGroup;
};

export type UpdateWebhookInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  headers?: InputMaybe<Scalars['JSON']['input']>;
  includePayload?: InputMaybe<Scalars['Boolean']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isSystem?: InputMaybe<Scalars['Boolean']['input']>;
  method?: InputMaybe<WebhookMethod>;
  models?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  secretKey?: InputMaybe<Scalars['String']['input']>;
  stages?: InputMaybe<Array<Scalars['ID']['input']>>;
  triggerActions?: InputMaybe<Array<WebhookTriggerAction>>;
  triggerSources?: InputMaybe<Array<WebhookTriggerSource>>;
  triggerType?: InputMaybe<WebhookTriggerType>;
  url?: InputMaybe<Scalars['String']['input']>;
  webhookId: Scalars['ID']['input'];
};

export type UpdateWebhookPayload = {
  __typename?: 'UpdateWebhookPayload';
  updatedWebhook: Webhook;
};

export type UpgradeEnvironmentAssetInput = {
  environmentId: Scalars['ID']['input'];
};

export type UpgradeEnvironmentAssetPayload = {
  __typename?: 'UpgradeEnvironmentAssetPayload';
  environmentId: Scalars['ID']['output'];
  lastStep: Scalars['Int']['output'];
  status: Scalars['String']['output'];
};

export type UpsertFieldInputArgInput = {
  fieldInputArgsToCreate?: InputMaybe<Array<UpsertFieldInputArgInputToCreateInput>>;
  fieldInputArgsToDelete?: InputMaybe<Array<UpsertFieldInputArgInputToDeleteInput>>;
  fieldInputArgsToUpdate?: InputMaybe<Array<UpsertFieldInputArgInputToUpdateInput>>;
};

export type UpsertFieldInputArgInputToCreateInput = {
  apiId: Scalars['String']['input'];
  isList: Scalars['Boolean']['input'];
  isRequired: Scalars['Boolean']['input'];
  remoteTypeId: Scalars['ID']['input'];
};

export type UpsertFieldInputArgInputToDeleteInput = {
  inputArgId: Scalars['ID']['input'];
};

export type UpsertFieldInputArgInputToUpdateInput = {
  apiId?: InputMaybe<Scalars['String']['input']>;
  inputArgId: Scalars['ID']['input'];
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  remoteTypeId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpsertRemoteTypeDefinitionToCreateInput = {
  sdl: Scalars['String']['input'];
};

export type UpsertRemoteTypeDefinitionToDeleteInput = {
  id: Scalars['ID']['input'];
};

export type UpsertRemoteTypeDefinitionToUpdateInput = {
  id: Scalars['ID']['input'];
  sdl?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertRemoteTypeDefinitionsInput = {
  remoteTypeDefinitionsToCreate?: InputMaybe<Array<UpsertRemoteTypeDefinitionToCreateInput>>;
  remoteTypeDefinitionsToDelete?: InputMaybe<Array<UpsertRemoteTypeDefinitionToDeleteInput>>;
  remoteTypeDefinitionsToUpdate?: InputMaybe<Array<UpsertRemoteTypeDefinitionToUpdateInput>>;
};

export type UpsertTemplateInput = {
  gcms?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertTemplatePayload = {
  __typename?: 'UpsertTemplatePayload';
  gcms?: Maybe<Scalars['String']['output']>;
};

export type User = IUser & {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  preferences?: Maybe<Scalars['JSON']['output']>;
  profile: Profile;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserAnalytics = {
  __typename?: 'UserAnalytics';
  conversionPage?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  gclid?: Maybe<Scalars['String']['output']>;
  hubspotutk?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  landingPage?: Maybe<Scalars['String']['output']>;
  referrer?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  utmCampaign?: Maybe<Scalars['String']['output']>;
  utmContent?: Maybe<Scalars['String']['output']>;
  utmMedium?: Maybe<Scalars['String']['output']>;
  utmSource?: Maybe<Scalars['String']['output']>;
  utmTerm?: Maybe<Scalars['String']['output']>;
};

export type UserForApp = {
  __typename?: 'UserForApp';
  id: Scalars['ID']['output'];
  permissions: Array<Scalars['String']['output']>;
  roles: Array<Maybe<UserForAppRole>>;
};

export type UserForAppRole = {
  __typename?: 'UserForAppRole';
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type UserModel = IFieldParent & IModel & {
  __typename?: 'UserModel';
  apiId: Scalars['String']['output'];
  apiIdPlural: Scalars['String']['output'];
  contentViews: Array<ContentView>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  environment: Environment;
  field: IField;
  fields: Array<IField>;
  fieldsConnection: FieldsConnection;
  /** Model has at least one document */
  hasContent: Scalars['Boolean']['output'];
  hasLocalizedComponents: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isLocalized: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  isVersioned: Scalars['Boolean']['output'];
  sidebarElements: Array<ISidebarElement>;
  titleFields: Array<IField>;
  updatedAt: Scalars['DateTime']['output'];
  viewerPermission: ModelViewerPermission;
};


export type UserModelContentViewsArgs = {
  filter?: InputMaybe<ContentViewFilterInput>;
  includeSystemContentViews?: InputMaybe<Scalars['Boolean']['input']>;
};


export type UserModelFieldArgs = {
  id: Scalars['ID']['input'];
};


export type UserModelFieldsArgs = {
  includeApiOnlyFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeHiddenFields?: InputMaybe<Scalars['Boolean']['input']>;
};


export type UserModelFieldsConnectionArgs = {
  first?: Scalars['Int']['input'];
  includeApiOnlyFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeHiddenFields?: InputMaybe<Scalars['Boolean']['input']>;
  includeSystemFields?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: Scalars['Int']['input'];
};

export type UserPreferences = {
  __typename?: 'UserPreferences';
  preferences?: Maybe<Scalars['JSON']['output']>;
};

export type UserSelection = {
  __typename?: 'UserSelection';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  selection: Scalars['JSON']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserViewer = IViewer & {
  __typename?: 'UserViewer';
  app: App;
  availableExtensionPermissions: Array<AvailableExtensionPermission>;
  availableExtensionSrcTypes: Array<ExtensionSrcType>;
  availableIntegrations: Array<Integration_Provider>;
  commonAssetConfig: CommonFilestack;
  id: Scalars['ID']['output'];
  paymentAccount: PaymentAccount;
  paymentAccounts: Array<PaymentAccount>;
  pendingInvite?: Maybe<Invite>;
  pendingInvites: Array<Invite>;
  pendingProject?: Maybe<IPendingProject>;
  pendingProjects: Array<IPendingProject>;
  plans: Array<Plan>;
  project?: Maybe<Project>;
  projects: Array<Project>;
  regions: Array<Region>;
  templates: Array<ITemplate>;
  user: User;
};


export type UserViewerAppArgs = {
  apiId: Scalars['String']['input'];
};


export type UserViewerPaymentAccountArgs = {
  id: Scalars['ID']['input'];
};


export type UserViewerPendingInviteArgs = {
  code: Scalars['String']['input'];
};


export type UserViewerPendingProjectArgs = {
  id: Scalars['ID']['input'];
};


export type UserViewerProjectArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ViewGroup = {
  __typename?: 'ViewGroup';
  contentType: ViewGroupContentType;
  contentViews: Array<ContentView>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Member>;
  description?: Maybe<Scalars['String']['output']>;
  environment: Environment;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  type: ViewGroupType;
  updatedAt: Scalars['DateTime']['output'];
};


export type ViewGroupContentViewsArgs = {
  filter?: InputMaybe<ContentViewFilterInput>;
};

export enum ViewGroupContentType {
  Asset = 'ASSET',
  Default = 'DEFAULT'
}

export enum ViewGroupType {
  Custom = 'CUSTOM',
  System = 'SYSTEM',
  UserCreated = 'USER_CREATED'
}

export type Viewer = IUser & {
  __typename?: 'Viewer';
  availableExtensionPermissions: Array<AvailableExtensionPermission>;
  availableExtensionSrcTypes: Array<ExtensionSrcType>;
  availableIntegrations: Array<Integration_Provider>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  paymentAccount: PaymentAccount;
  paymentAccounts: Array<PaymentAccount>;
  pendingInvite?: Maybe<Invite>;
  pendingInvites: Array<Invite>;
  plans: Array<Plan>;
  preferences?: Maybe<Scalars['JSON']['output']>;
  profile: Profile;
  project?: Maybe<Project>;
  projects: Array<Project>;
  regions: Array<Region>;
  templates: Array<ITemplate>;
  updatedAt: Scalars['DateTime']['output'];
};


export type ViewerPaymentAccountArgs = {
  id: Scalars['ID']['input'];
};


export type ViewerPendingInviteArgs = {
  code: Scalars['String']['input'];
};


export type ViewerProjectArgs = {
  id: Scalars['ID']['input'];
};

export enum VisibilityTypes {
  /** Field is not shown, and can only be read or edited through the API */
  ApiOnly = 'API_ONLY',
  /** Field is not shown, but can be used by other fields such as slugs or UI Extensions */
  Hidden = 'HIDDEN',
  /** Field is shown but can't be edited in the UI, only through the API */
  ReadOnly = 'READ_ONLY',
  /** Field can be read and edited */
  ReadWrite = 'READ_WRITE'
}

export type Webhook = {
  __typename?: 'Webhook';
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<CreatedBy>;
  description?: Maybe<Scalars['String']['output']>;
  environment: Environment;
  hasSecretKey?: Maybe<Scalars['Boolean']['output']>;
  headers: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  /**
   * Defines wether the data of the changed data will be sent
   * in the webhook payload or not
   */
  includePayload: Scalars['Boolean']['output'];
  isActive: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  log?: Maybe<WebhookLog>;
  logs: WebhookLogsPayload;
  method: WebhookMethod;
  /**
   * List of models on which the webhook will be triggered.
   * In case of any model, this array will be empty.
   */
  models: Array<IModel>;
  name: Scalars['String']['output'];
  /**
   * List of stages on which the webhook will be triggered.
   * In case of any stage, this array will be empty.
   */
  stages: Array<Stage>;
  /** When one of the actions happen, the webhook will be triggered */
  triggerActions: Array<WebhookTriggerAction>;
  triggerSources?: Maybe<Array<WebhookTriggerSource>>;
  /** The type of trigger the webhook is registered */
  triggerType: WebhookTriggerType;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};


export type WebhookLogArgs = {
  id: Scalars['String']['input'];
};


export type WebhookLogsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WebhookLogOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WebhookLogsWhereInput>;
};

export type WebhookLog = {
  __typename?: 'WebhookLog';
  attempts: Scalars['Int']['output'];
  calledAt: Scalars['DateTime']['output'];
  duration: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  model?: Maybe<IModel>;
  requestPayload?: Maybe<Scalars['JSON']['output']>;
  responsePayload?: Maybe<Scalars['String']['output']>;
  responsePayloadSize?: Maybe<Scalars['Int']['output']>;
  statusCode: Scalars['Int']['output'];
  triggerAction: WebhookTriggerAction;
};

export enum WebhookLogOrderByInput {
  CalledAtAsc = 'calledAt_ASC',
  CalledAtDesc = 'calledAt_DESC'
}

export type WebhookLogsPayload = {
  __typename?: 'WebhookLogsPayload';
  entries: Array<WebhookLog>;
  total: Scalars['Int']['output'];
};

export type WebhookLogsWhereInput = {
  action_eq?: InputMaybe<WebhookTriggerAction>;
  modelId_eq?: InputMaybe<Scalars['ID']['input']>;
  status_eq?: InputMaybe<Scalars['Int']['input']>;
  status_gt?: InputMaybe<Scalars['Int']['input']>;
  status_gte?: InputMaybe<Scalars['Int']['input']>;
  status_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  status_lt?: InputMaybe<Scalars['Int']['input']>;
  status_lte?: InputMaybe<Scalars['Int']['input']>;
};

export enum WebhookMethod {
  Delete = 'DELETE',
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT'
}

/**
 * Defines which operation will trigger the webhook.
 * Some operations rely on the type of stage. E.g. on a
 * publishing stage, the webhook will only be triggered for
 * PUBLISH and UNPUBLISH events. On other stages, only
 * CREATE, UPDATE and DELETE are triggering the webhook.
 */
export enum WebhookTriggerAction {
  Create = 'CREATE',
  Delete = 'DELETE',
  Publish = 'PUBLISH',
  Unpublish = 'UNPUBLISH',
  Update = 'UPDATE'
}

export enum WebhookTriggerSource {
  Member = 'MEMBER',
  Pat = 'PAT',
  Public = 'PUBLIC'
}

/** Defines the type of the trigger */
export enum WebhookTriggerType {
  ContentModel = 'CONTENT_MODEL'
}

export type _AddMemberInput = {
  gcms?: InputMaybe<Scalars['String']['input']>;
};

export type _AddMemberPayload = {
  __typename?: '_AddMemberPayload';
  member: Member;
};

export type _AddStageToContentViewsInput = {
  gcms?: InputMaybe<Scalars['String']['input']>;
};

export type _AddStageToContentViewsPayload = {
  __typename?: '_AddStageToContentViewsPayload';
  gcms?: Maybe<Scalars['String']['output']>;
};

export type _BookOverLimitAddonUsage = {
  __typename?: '_BookOverLimitAddonUsage';
  gcms?: Maybe<Scalars['String']['output']>;
};

export type _BookOverLimitInput = {
  gcms?: InputMaybe<Scalars['String']['input']>;
};

export type _BookOverLimitPayload = {
  __typename?: '_BookOverLimitPayload';
  gcms?: Maybe<Scalars['String']['output']>;
};

export type _CloneProjectOptionsInput = {
  gcms?: InputMaybe<Scalars['String']['input']>;
};

export enum _CloneProjectOptionsInputEstimatedDuration {
  Long = 'LONG',
  Short = 'SHORT'
}

export type _DeleteProjectInput = {
  gcms?: InputMaybe<Scalars['String']['input']>;
};

export type _DeleteProjectPayload = {
  __typename?: '_DeleteProjectPayload';
  gcms?: Maybe<Scalars['String']['output']>;
};

export type _FixEnvironmentsWithInvalidFilestackConfigPayload = {
  __typename?: '_FixEnvironmentsWithInvalidFilestackConfigPayload';
  gcms?: Maybe<Scalars['String']['output']>;
};

export type _GetUserPayload = {
  __typename?: '_GetUserPayload';
  gcms?: Maybe<Scalars['String']['output']>;
};

export type _HideNonRequiredFieldsInDefaultContentViewInput = {
  gcms?: InputMaybe<Scalars['String']['input']>;
};

export type _HideNonRequiredFieldsInDefaultContentViewPayload = {
  __typename?: '_HideNonRequiredFieldsInDefaultContentViewPayload';
  gcms?: Maybe<Scalars['String']['output']>;
};

export type _OverLimitProject = {
  __typename?: '_OverLimitProject';
  gcms?: Maybe<Scalars['String']['output']>;
};

export type _OverLimitProjectAddons = {
  __typename?: '_OverLimitProjectAddons';
  gcms?: Maybe<Scalars['String']['output']>;
};

export type _OverLimitProjectAddonsValues = {
  __typename?: '_OverLimitProjectAddonsValues';
  gcms?: Maybe<Scalars['String']['output']>;
};

export type _OverLimitProjectUsage = {
  __typename?: '_OverLimitProjectUsage';
  gcms?: Maybe<Scalars['String']['output']>;
};

export type _ResetContentConfigInput = {
  gcms?: InputMaybe<Scalars['String']['input']>;
};

export type _ResetContentConfigPayload = {
  __typename?: '_ResetContentConfigPayload';
  gcms?: Maybe<Scalars['String']['output']>;
};

export type _UpdatePlanTrialInput = {
  gcms?: InputMaybe<Scalars['String']['input']>;
};

export type _UpdatePlanTrialPayload = {
  __typename?: '_UpdatePlanTrialPayload';
  gcms?: Maybe<Scalars['String']['output']>;
};

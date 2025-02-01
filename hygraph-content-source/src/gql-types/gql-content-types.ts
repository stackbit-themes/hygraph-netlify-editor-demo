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
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Hex: { input: any; output: any; }
  Json: { input: any; output: any; }
  Long: { input: any; output: any; }
  RGBAHue: { input: any; output: any; }
  RGBATransparency: { input: any; output: any; }
  RichTextAST: { input: any; output: any; }
};

export type Aggregate = {
  __typename?: 'Aggregate';
  count: Scalars['Int']['output'];
};

/** Asset system model */
export type Asset = Entity & Node & {
  __typename?: 'Asset';
  assetFieldModel1: Array<Model1>;
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Asset>;
  /** The file name */
  fileName: Scalars['String']['output'];
  /** The file handle */
  handle: Scalars['String']['output'];
  /** The height of the file */
  height?: Maybe<Scalars['Float']['output']>;
  /** List of Asset versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  listOfAssetsModel3: Array<Model3>;
  /** System Locale field */
  locale: Locale;
  /** Get the other localizations for this document */
  localizations: Array<Asset>;
  /** The mime type of the file */
  mimeType?: Maybe<Scalars['String']['output']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** The file size */
  size?: Maybe<Scalars['Float']['output']>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  /** Returns information you need to upload the asset. The type of upload is dependant on what you pass into asset creations as upload type. */
  upload?: Maybe<AssetUpload>;
  /** Get the url for the asset with provided transformations applied. */
  url: Scalars['String']['output'];
  /** The file width */
  width?: Maybe<Scalars['Float']['output']>;
};


/** Asset system model */
export type AssetAssetFieldModel1Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<Model1OrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Model1WhereInput>;
};


/** Asset system model */
export type AssetCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Asset system model */
export type AssetDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


/** Asset system model */
export type AssetHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


/** Asset system model */
export type AssetListOfAssetsModel3Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<Model3OrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Model3WhereInput>;
};


/** Asset system model */
export type AssetLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  locales?: Array<Locale>;
};


/** Asset system model */
export type AssetPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Asset system model */
export type AssetScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Asset system model */
export type AssetUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Asset system model */
export type AssetUrlArgs = {
  transformation?: InputMaybe<AssetTransformationInput>;
};

export type AssetConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: AssetWhereUniqueInput;
};

/** A connection to a list of items. */
export type AssetConnection = {
  __typename?: 'AssetConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<AssetEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type AssetCreateInput = {
  assetFieldModel1?: InputMaybe<Model1CreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  listOfAssetsModel3?: InputMaybe<Model3CreateManyInlineInput>;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: InputMaybe<AssetCreateLocalizationsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: InputMaybe<Scalars['String']['input']>;
};

export type AssetCreateLocalizationDataInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: InputMaybe<Scalars['String']['input']>;
};

export type AssetCreateLocalizationInput = {
  /** Localization input */
  data: AssetCreateLocalizationDataInput;
  locale: Locale;
};

export type AssetCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: InputMaybe<Array<AssetCreateLocalizationInput>>;
};

export type AssetCreateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  connect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Create and connect multiple existing Asset documents */
  create?: InputMaybe<Array<AssetCreateInput>>;
};

export type AssetCreateOneInlineInput = {
  /** Connect one existing Asset document */
  connect?: InputMaybe<AssetWhereUniqueInput>;
  /** Create and connect one Asset document */
  create?: InputMaybe<AssetCreateInput>;
};

/** An edge in a connection. */
export type AssetEdge = {
  __typename?: 'AssetEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Asset;
};

/** Identifies documents */
export type AssetManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  assetFieldModel1_every?: InputMaybe<Model1WhereInput>;
  assetFieldModel1_none?: InputMaybe<Model1WhereInput>;
  assetFieldModel1_some?: InputMaybe<Model1WhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  documentInStages_some?: InputMaybe<AssetWhereStageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  listOfAssetsModel3_every?: InputMaybe<Model3WhereInput>;
  listOfAssetsModel3_none?: InputMaybe<Model3WhereInput>;
  listOfAssetsModel3_some?: InputMaybe<Model3WhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  upload?: InputMaybe<AssetUploadWhereInput>;
};

export enum AssetOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  MimeTypeAsc = 'mimeType_ASC',
  MimeTypeDesc = 'mimeType_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** Identifies documents */
export type AssetSingleRelationWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetSingleRelationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetSingleRelationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetSingleRelationWhereInput>>;
  upload?: InputMaybe<AssetUploadWhereInput>;
};

/** Transformations for Assets */
export type AssetTransformationInput = {
  document?: InputMaybe<DocumentTransformationInput>;
  image?: InputMaybe<ImageTransformationInput>;
  /** Pass true if you want to validate the passed transformation parameters */
  validateOptions?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssetUpdateInput = {
  assetFieldModel1?: InputMaybe<Model1UpdateManyInlineInput>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  listOfAssetsModel3?: InputMaybe<Model3UpdateManyInlineInput>;
  /** Manage document localizations */
  localizations?: InputMaybe<AssetUpdateLocalizationsInput>;
  /** Use this to define if its a reupload for the asset */
  reUpload?: InputMaybe<Scalars['Boolean']['input']>;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: InputMaybe<Scalars['String']['input']>;
};

export type AssetUpdateLocalizationDataInput = {
  fileName?: InputMaybe<Scalars['String']['input']>;
  /** Use this to define if its a reupload for the asset */
  reUpload?: InputMaybe<Scalars['Boolean']['input']>;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: InputMaybe<Scalars['String']['input']>;
};

export type AssetUpdateLocalizationInput = {
  data: AssetUpdateLocalizationDataInput;
  locale: Locale;
};

export type AssetUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: InputMaybe<Array<AssetCreateLocalizationInput>>;
  /** Localizations to delete */
  delete?: InputMaybe<Array<Locale>>;
  /** Localizations to update */
  update?: InputMaybe<Array<AssetUpdateLocalizationInput>>;
  upsert?: InputMaybe<Array<AssetUpsertLocalizationInput>>;
};

export type AssetUpdateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  connect?: InputMaybe<Array<AssetConnectInput>>;
  /** Create and connect multiple Asset documents */
  create?: InputMaybe<Array<AssetCreateInput>>;
  /** Delete multiple Asset documents */
  delete?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Disconnect multiple Asset documents */
  disconnect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Asset documents */
  set?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Update multiple Asset documents */
  update?: InputMaybe<Array<AssetUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Asset documents */
  upsert?: InputMaybe<Array<AssetUpsertWithNestedWhereUniqueInput>>;
};

export type AssetUpdateManyInput = {
  /** No fields in updateMany data input */
  _?: InputMaybe<Scalars['String']['input']>;
};

export type AssetUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: AssetUpdateManyInput;
  /** Document search */
  where: AssetWhereInput;
};

export type AssetUpdateOneInlineInput = {
  /** Connect existing Asset document */
  connect?: InputMaybe<AssetWhereUniqueInput>;
  /** Create and connect one Asset document */
  create?: InputMaybe<AssetCreateInput>;
  /** Delete currently connected Asset document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Asset document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Asset document */
  update?: InputMaybe<AssetUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Asset document */
  upsert?: InputMaybe<AssetUpsertWithNestedWhereUniqueInput>;
};

export type AssetUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: AssetUpdateInput;
  /** Unique document search */
  where: AssetWhereUniqueInput;
};

/** Asset Upload */
export type AssetUpload = {
  __typename?: 'AssetUpload';
  /** Asset Upload Error */
  error?: Maybe<AssetUploadError>;
  /** Expiry Timestamp */
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  /** Asset Request Data for upload */
  requestPostData?: Maybe<AssetUploadRequestPostData>;
  /** Asset Request Data for upload */
  status?: Maybe<AssetUploadStatus>;
};

/** Represents asset upload error */
export type AssetUploadError = {
  __typename?: 'AssetUploadError';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

/** Asset Upload Request Post Data */
export type AssetUploadRequestPostData = {
  __typename?: 'AssetUploadRequestPostData';
  /** The algorithm to use in the form field. This value should be passed in the `X-Amz-Algorithm` form field. */
  algorithm: Scalars['String']['output'];
  /** The credential to use in the form field. This value should be passed in the `X-Amz-Credential` form field. */
  credential: Scalars['String']['output'];
  /** The date the request was signed, formatted as YYYYMMDDTHHMMSSZ. This value should be passed in the `X-Amz-Date` header. */
  date: Scalars['String']['output'];
  /** The key to use in the form field. This value should be passed in the `Key` form field. */
  key: Scalars['String']['output'];
  /** The policy to use in the form field. This value should be passed in the `Policy` form field. */
  policy: Scalars['String']['output'];
  /** The security token to use in the form field. This field is optional only pass it if its not null. This value should be passed in the `X-Amz-Security-Token` form field if not null. */
  securityToken?: Maybe<Scalars['String']['output']>;
  /** The signature to use in the form field. This value should be passed in the `X-Amz-Signature` form field. */
  signature: Scalars['String']['output'];
  /** The URL to which the file should be uploaded with a POST request. */
  url: Scalars['String']['output'];
};

/** System Asset Upload Status */
export enum AssetUploadStatus {
  AssetCreatePending = 'ASSET_CREATE_PENDING',
  AssetErrorUpload = 'ASSET_ERROR_UPLOAD',
  AssetUpdatePending = 'ASSET_UPDATE_PENDING',
  AssetUploadComplete = 'ASSET_UPLOAD_COMPLETE'
}

/** Identifies documents */
export type AssetUploadWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetUploadWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetUploadWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetUploadWhereInput>>;
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  expiresAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  expiresAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  expiresAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  expiresAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  expiresAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  expiresAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  expiresAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  status?: InputMaybe<AssetUploadStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<AssetUploadStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<AssetUploadStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<AssetUploadStatus>>>;
};

/** Identifies documents */
export type AssetUploadWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetUploadWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetUploadWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetUploadWhereInput>>;
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  expiresAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  expiresAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  expiresAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  expiresAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  expiresAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  expiresAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  expiresAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  status?: InputMaybe<AssetUploadStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<AssetUploadStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<AssetUploadStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<AssetUploadStatus>>>;
};

export type AssetUpsertInput = {
  /** Create document if it didn't exist */
  create: AssetCreateInput;
  /** Update document if it exists */
  update: AssetUpdateInput;
};

export type AssetUpsertLocalizationInput = {
  create: AssetCreateLocalizationDataInput;
  locale: Locale;
  update: AssetUpdateLocalizationDataInput;
};

export type AssetUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: AssetUpsertInput;
  /** Unique document search */
  where: AssetWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type AssetWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type AssetWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  assetFieldModel1_every?: InputMaybe<Model1WhereInput>;
  assetFieldModel1_none?: InputMaybe<Model1WhereInput>;
  assetFieldModel1_some?: InputMaybe<Model1WhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  documentInStages_some?: InputMaybe<AssetWhereStageInput>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  fileName_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  fileName_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  fileName_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  fileName_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  fileName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  fileName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  fileName_starts_with?: InputMaybe<Scalars['String']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  handle_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  handle_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  handle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  handle_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  handle_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  handle_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  handle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  handle_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  handle_starts_with?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  /** All values greater than the given value. */
  height_gt?: InputMaybe<Scalars['Float']['input']>;
  /** All values greater than or equal the given value. */
  height_gte?: InputMaybe<Scalars['Float']['input']>;
  /** All values that are contained in given list. */
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  /** All values less than the given value. */
  height_lt?: InputMaybe<Scalars['Float']['input']>;
  /** All values less than or equal the given value. */
  height_lte?: InputMaybe<Scalars['Float']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  height_not?: InputMaybe<Scalars['Float']['input']>;
  /** All values that are not contained in given list. */
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  listOfAssetsModel3_every?: InputMaybe<Model3WhereInput>;
  listOfAssetsModel3_none?: InputMaybe<Model3WhereInput>;
  listOfAssetsModel3_some?: InputMaybe<Model3WhereInput>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  mimeType_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  mimeType_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  mimeType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  mimeType_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  mimeType_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  mimeType_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  mimeType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  mimeType_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  mimeType_starts_with?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  size?: InputMaybe<Scalars['Float']['input']>;
  /** All values greater than the given value. */
  size_gt?: InputMaybe<Scalars['Float']['input']>;
  /** All values greater than or equal the given value. */
  size_gte?: InputMaybe<Scalars['Float']['input']>;
  /** All values that are contained in given list. */
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  /** All values less than the given value. */
  size_lt?: InputMaybe<Scalars['Float']['input']>;
  /** All values less than or equal the given value. */
  size_lte?: InputMaybe<Scalars['Float']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  size_not?: InputMaybe<Scalars['Float']['input']>;
  /** All values that are not contained in given list. */
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  upload?: InputMaybe<AssetUploadWhereInput>;
  width?: InputMaybe<Scalars['Float']['input']>;
  /** All values greater than the given value. */
  width_gt?: InputMaybe<Scalars['Float']['input']>;
  /** All values greater than or equal the given value. */
  width_gte?: InputMaybe<Scalars['Float']['input']>;
  /** All values that are contained in given list. */
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  /** All values less than the given value. */
  width_lt?: InputMaybe<Scalars['Float']['input']>;
  /** All values less than or equal the given value. */
  width_lte?: InputMaybe<Scalars['Float']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  width_not?: InputMaybe<Scalars['Float']['input']>;
  /** All values that are not contained in given list. */
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type AssetWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<AssetWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Asset record uniquely */
export type AssetWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  /** The number of nodes that have been affected by the Batch operation. */
  count: Scalars['Long']['output'];
};

/** Representing a color value comprising of HEX, RGBA and css color values */
export type Color = {
  __typename?: 'Color';
  css: Scalars['String']['output'];
  hex: Scalars['Hex']['output'];
  rgba: Rgba;
};

/** Accepts either HEX or RGBA color value. At least one of hex or rgba value should be passed. If both are passed RGBA is used. */
export type ColorInput = {
  hex?: InputMaybe<Scalars['Hex']['input']>;
  rgba?: InputMaybe<RgbaInput>;
};

export type ComponentModel1 = Entity & {
  __typename?: 'ComponentModel1';
  /** The unique identifier */
  id: Scalars['ID']['output'];
  multiComponentField?: Maybe<ComponentModel1multiComponentFieldUnion>;
  requiredString: Scalars['String']['output'];
  singleComponentField?: Maybe<ComponentModel1>;
  singleToOneReference?: Maybe<Model2>;
  /** System stage field */
  stage: Stage;
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentModel1MultiComponentFieldArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type ComponentModel1SingleComponentFieldArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type ComponentModel1SingleToOneReferenceArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ComponentModel1ConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ComponentModel1WhereUniqueInput;
};

/** A connection to a list of items. */
export type ComponentModel1Connection = {
  __typename?: 'ComponentModel1Connection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ComponentModel1Edge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ComponentModel1CreateInput = {
  multiComponentField?: InputMaybe<ComponentModel1multiComponentFieldUnionCreateOneInlineInput>;
  requiredString: Scalars['String']['input'];
  singleComponentField?: InputMaybe<ComponentModel1CreateOneInlineInput>;
  singleToOneReference?: InputMaybe<Model2CreateOneInlineInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentModel1CreateManyInlineInput = {
  /** Create and connect multiple existing ComponentModel1 documents */
  create?: InputMaybe<Array<ComponentModel1CreateInput>>;
};

export type ComponentModel1CreateOneInlineInput = {
  /** Create and connect one ComponentModel1 document */
  create?: InputMaybe<ComponentModel1CreateInput>;
};

export type ComponentModel1CreateWithPositionInput = {
  /** Document to create */
  data: ComponentModel1CreateInput;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
};

/** An edge in a connection. */
export type ComponentModel1Edge = {
  __typename?: 'ComponentModel1Edge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ComponentModel1;
};

/** Identifies documents */
export type ComponentModel1ManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ComponentModel1WhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ComponentModel1WhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ComponentModel1WhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values in which the modular component is connected to the given models */
  multiComponentField?: InputMaybe<ComponentModel1multiComponentFieldUnionWhereInput>;
  /** All values in which the union is empty. */
  multiComponentField_empty?: InputMaybe<Scalars['Boolean']['input']>;
  requiredString?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  requiredString_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  requiredString_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  requiredString_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  requiredString_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  requiredString_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  requiredString_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  requiredString_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  requiredString_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  requiredString_starts_with?: InputMaybe<Scalars['String']['input']>;
  singleComponentField?: InputMaybe<ComponentModel1WhereInput>;
  singleToOneReference?: InputMaybe<Model2WhereInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export enum ComponentModel1OrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  RequiredStringAsc = 'requiredString_ASC',
  RequiredStringDesc = 'requiredString_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type ComponentModel1Parent = ComponentModel1 | Model2 | Model3;

export type ComponentModel1ParentConnectInput = {
  ComponentModel1?: InputMaybe<ComponentModel1ConnectInput>;
  Model2?: InputMaybe<Model2ConnectInput>;
  Model3?: InputMaybe<Model3ConnectInput>;
};

export type ComponentModel1ParentCreateInput = {
  ComponentModel1?: InputMaybe<ComponentModel1CreateInput>;
  Model2?: InputMaybe<Model2CreateInput>;
  Model3?: InputMaybe<Model3CreateInput>;
};

export type ComponentModel1ParentCreateManyInlineInput = {
  /** Connect multiple existing ComponentModel1Parent documents */
  connect?: InputMaybe<Array<ComponentModel1ParentWhereUniqueInput>>;
  /** Create and connect multiple existing ComponentModel1Parent documents */
  create?: InputMaybe<Array<ComponentModel1ParentCreateInput>>;
};

export type ComponentModel1ParentCreateOneInlineInput = {
  /** Connect one existing ComponentModel1Parent document */
  connect?: InputMaybe<ComponentModel1ParentWhereUniqueInput>;
  /** Create and connect one ComponentModel1Parent document */
  create?: InputMaybe<ComponentModel1ParentCreateInput>;
};

export type ComponentModel1ParentUpdateInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateInput>;
  Model2?: InputMaybe<Model2UpdateInput>;
  Model3?: InputMaybe<Model3UpdateInput>;
};

export type ComponentModel1ParentUpdateManyInlineInput = {
  /** Connect multiple existing ComponentModel1Parent documents */
  connect?: InputMaybe<Array<ComponentModel1ParentConnectInput>>;
  /** Create and connect multiple ComponentModel1Parent documents */
  create?: InputMaybe<Array<ComponentModel1ParentCreateInput>>;
  /** Delete multiple ComponentModel1Parent documents */
  delete?: InputMaybe<Array<ComponentModel1ParentWhereUniqueInput>>;
  /** Disconnect multiple ComponentModel1Parent documents */
  disconnect?: InputMaybe<Array<ComponentModel1ParentWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ComponentModel1Parent documents */
  set?: InputMaybe<Array<ComponentModel1ParentWhereUniqueInput>>;
  /** Update multiple ComponentModel1Parent documents */
  update?: InputMaybe<Array<ComponentModel1ParentUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple ComponentModel1Parent documents */
  upsert?: InputMaybe<Array<ComponentModel1ParentUpsertWithNestedWhereUniqueInput>>;
};

export type ComponentModel1ParentUpdateManyWithNestedWhereInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateManyWithNestedWhereInput>;
  Model2?: InputMaybe<Model2UpdateManyWithNestedWhereInput>;
  Model3?: InputMaybe<Model3UpdateManyWithNestedWhereInput>;
};

export type ComponentModel1ParentUpdateOneInlineInput = {
  /** Connect existing ComponentModel1Parent document */
  connect?: InputMaybe<ComponentModel1ParentWhereUniqueInput>;
  /** Create and connect one ComponentModel1Parent document */
  create?: InputMaybe<ComponentModel1ParentCreateInput>;
  /** Delete currently connected ComponentModel1Parent document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected ComponentModel1Parent document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single ComponentModel1Parent document */
  update?: InputMaybe<ComponentModel1ParentUpdateWithNestedWhereUniqueInput>;
  /** Upsert single ComponentModel1Parent document */
  upsert?: InputMaybe<ComponentModel1ParentUpsertWithNestedWhereUniqueInput>;
};

export type ComponentModel1ParentUpdateWithNestedWhereUniqueInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateWithNestedWhereUniqueInput>;
  Model2?: InputMaybe<Model2UpdateWithNestedWhereUniqueInput>;
  Model3?: InputMaybe<Model3UpdateWithNestedWhereUniqueInput>;
};

export type ComponentModel1ParentUpsertWithNestedWhereUniqueInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpsertWithNestedWhereUniqueInput>;
  Model2?: InputMaybe<Model2UpsertWithNestedWhereUniqueInput>;
  Model3?: InputMaybe<Model3UpsertWithNestedWhereUniqueInput>;
};

export type ComponentModel1ParentWhereInput = {
  ComponentModel1?: InputMaybe<ComponentModel1WhereInput>;
  Model2?: InputMaybe<Model2WhereInput>;
  Model3?: InputMaybe<Model3WhereInput>;
};

export type ComponentModel1ParentWhereUniqueInput = {
  ComponentModel1?: InputMaybe<ComponentModel1WhereUniqueInput>;
  Model2?: InputMaybe<Model2WhereUniqueInput>;
  Model3?: InputMaybe<Model3WhereUniqueInput>;
};

export type ComponentModel1UpdateInput = {
  multiComponentField?: InputMaybe<ComponentModel1multiComponentFieldUnionUpdateOneInlineInput>;
  requiredString?: InputMaybe<Scalars['String']['input']>;
  singleComponentField?: InputMaybe<ComponentModel1UpdateOneInlineInput>;
  singleToOneReference?: InputMaybe<Model2UpdateOneInlineInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentModel1UpdateManyInlineInput = {
  /** Create and connect multiple ComponentModel1 component instances */
  create?: InputMaybe<Array<ComponentModel1CreateWithPositionInput>>;
  /** Delete multiple ComponentModel1 documents */
  delete?: InputMaybe<Array<ComponentModel1WhereUniqueInput>>;
  /** Update multiple ComponentModel1 component instances */
  update?: InputMaybe<Array<ComponentModel1UpdateWithNestedWhereUniqueAndPositionInput>>;
  /** Upsert multiple ComponentModel1 component instances */
  upsert?: InputMaybe<Array<ComponentModel1UpsertWithNestedWhereUniqueAndPositionInput>>;
};

export type ComponentModel1UpdateManyInput = {
  requiredString?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentModel1UpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ComponentModel1UpdateManyInput;
  /** Document search */
  where: ComponentModel1WhereInput;
};

export type ComponentModel1UpdateOneInlineInput = {
  /** Create and connect one ComponentModel1 document */
  create?: InputMaybe<ComponentModel1CreateInput>;
  /** Delete currently connected ComponentModel1 document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single ComponentModel1 document */
  update?: InputMaybe<ComponentModel1UpdateWithNestedWhereUniqueInput>;
  /** Upsert single ComponentModel1 document */
  upsert?: InputMaybe<ComponentModel1UpsertWithNestedWhereUniqueInput>;
};

export type ComponentModel1UpdateWithNestedWhereUniqueAndPositionInput = {
  /** Document to update */
  data?: InputMaybe<ComponentModel1UpdateInput>;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Unique component instance search */
  where: ComponentModel1WhereUniqueInput;
};

export type ComponentModel1UpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ComponentModel1UpdateInput;
  /** Unique document search */
  where: ComponentModel1WhereUniqueInput;
};

export type ComponentModel1UpsertInput = {
  /** Create document if it didn't exist */
  create: ComponentModel1CreateInput;
  /** Update document if it exists */
  update: ComponentModel1UpdateInput;
};

export type ComponentModel1UpsertWithNestedWhereUniqueAndPositionInput = {
  /** Document to upsert */
  data?: InputMaybe<ComponentModel1UpsertInput>;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Unique component instance search */
  where: ComponentModel1WhereUniqueInput;
};

export type ComponentModel1UpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ComponentModel1UpsertInput;
  /** Unique document search */
  where: ComponentModel1WhereUniqueInput;
};

/** Identifies documents */
export type ComponentModel1WhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ComponentModel1WhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ComponentModel1WhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ComponentModel1WhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values in which the modular component is connected to the given models */
  multiComponentField?: InputMaybe<ComponentModel1multiComponentFieldUnionWhereInput>;
  /** All values in which the union is empty. */
  multiComponentField_empty?: InputMaybe<Scalars['Boolean']['input']>;
  requiredString?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  requiredString_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  requiredString_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  requiredString_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  requiredString_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  requiredString_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  requiredString_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  requiredString_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  requiredString_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  requiredString_starts_with?: InputMaybe<Scalars['String']['input']>;
  singleComponentField?: InputMaybe<ComponentModel1WhereInput>;
  singleToOneReference?: InputMaybe<Model2WhereInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
};

/** References ComponentModel1 record uniquely */
export type ComponentModel1WhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentModel1multiComponentFieldUnion = ComponentModel1 | ComponentModel2;

export type ComponentModel1multiComponentFieldUnionConnectInput = {
  ComponentModel1?: InputMaybe<ComponentModel1ConnectInput>;
  ComponentModel2?: InputMaybe<ComponentModel2ConnectInput>;
};

export type ComponentModel1multiComponentFieldUnionCreateInput = {
  ComponentModel1?: InputMaybe<ComponentModel1CreateInput>;
  ComponentModel2?: InputMaybe<ComponentModel2CreateInput>;
};

export type ComponentModel1multiComponentFieldUnionCreateManyInlineInput = {
  /** Create and connect multiple existing ComponentModel1multiComponentFieldUnion documents */
  create?: InputMaybe<Array<ComponentModel1multiComponentFieldUnionCreateInput>>;
};

export type ComponentModel1multiComponentFieldUnionCreateOneInlineInput = {
  /** Create and connect one ComponentModel1multiComponentFieldUnion document */
  create?: InputMaybe<ComponentModel1multiComponentFieldUnionCreateInput>;
};

export type ComponentModel1multiComponentFieldUnionCreateWithPositionInput = {
  ComponentModel1?: InputMaybe<ComponentModel1CreateWithPositionInput>;
  ComponentModel2?: InputMaybe<ComponentModel2CreateWithPositionInput>;
};

export type ComponentModel1multiComponentFieldUnionUpdateInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpdateInput>;
};

export type ComponentModel1multiComponentFieldUnionUpdateManyInlineInput = {
  /** Create and connect multiple ComponentModel1multiComponentFieldUnion component instances */
  create?: InputMaybe<Array<ComponentModel1multiComponentFieldUnionCreateWithPositionInput>>;
  /** Delete multiple ComponentModel1multiComponentFieldUnion documents */
  delete?: InputMaybe<Array<ComponentModel1multiComponentFieldUnionWhereUniqueInput>>;
  /** Update multiple ComponentModel1multiComponentFieldUnion component instances */
  update?: InputMaybe<Array<ComponentModel1multiComponentFieldUnionUpdateWithNestedWhereUniqueAndPositionInput>>;
  /** Upsert multiple ComponentModel1multiComponentFieldUnion component instances */
  upsert?: InputMaybe<Array<ComponentModel1multiComponentFieldUnionUpsertWithNestedWhereUniqueAndPositionInput>>;
};

export type ComponentModel1multiComponentFieldUnionUpdateManyWithNestedWhereInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateManyWithNestedWhereInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpdateManyWithNestedWhereInput>;
};

export type ComponentModel1multiComponentFieldUnionUpdateOneInlineInput = {
  /** Create and connect one ComponentModel1multiComponentFieldUnion document */
  create?: InputMaybe<ComponentModel1multiComponentFieldUnionCreateInput>;
  /** Delete currently connected ComponentModel1multiComponentFieldUnion document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single ComponentModel1multiComponentFieldUnion document */
  update?: InputMaybe<ComponentModel1multiComponentFieldUnionUpdateWithNestedWhereUniqueInput>;
  /** Upsert single ComponentModel1multiComponentFieldUnion document */
  upsert?: InputMaybe<ComponentModel1multiComponentFieldUnionUpsertWithNestedWhereUniqueInput>;
};

export type ComponentModel1multiComponentFieldUnionUpdateWithNestedWhereUniqueAndPositionInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateWithNestedWhereUniqueAndPositionInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpdateWithNestedWhereUniqueAndPositionInput>;
};

export type ComponentModel1multiComponentFieldUnionUpdateWithNestedWhereUniqueInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateWithNestedWhereUniqueInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpdateWithNestedWhereUniqueInput>;
};

export type ComponentModel1multiComponentFieldUnionUpsertWithNestedWhereUniqueAndPositionInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpsertWithNestedWhereUniqueAndPositionInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpsertWithNestedWhereUniqueAndPositionInput>;
};

export type ComponentModel1multiComponentFieldUnionUpsertWithNestedWhereUniqueInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpsertWithNestedWhereUniqueInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpsertWithNestedWhereUniqueInput>;
};

export type ComponentModel1multiComponentFieldUnionWhereInput = {
  ComponentModel1?: InputMaybe<ComponentModel1WhereInput>;
  ComponentModel2?: InputMaybe<ComponentModel2WhereInput>;
};

export type ComponentModel1multiComponentFieldUnionWhereUniqueInput = {
  ComponentModel1?: InputMaybe<ComponentModel1WhereUniqueInput>;
  ComponentModel2?: InputMaybe<ComponentModel2WhereUniqueInput>;
};

export type ComponentModel2 = Entity & {
  __typename?: 'ComponentModel2';
  /** The unique identifier */
  id: Scalars['ID']['output'];
  /** System stage field */
  stage: Stage;
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentModel2ConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ComponentModel2WhereUniqueInput;
};

/** A connection to a list of items. */
export type ComponentModel2Connection = {
  __typename?: 'ComponentModel2Connection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ComponentModel2Edge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ComponentModel2CreateInput = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentModel2CreateManyInlineInput = {
  /** Create and connect multiple existing ComponentModel2 documents */
  create?: InputMaybe<Array<ComponentModel2CreateInput>>;
};

export type ComponentModel2CreateOneInlineInput = {
  /** Create and connect one ComponentModel2 document */
  create?: InputMaybe<ComponentModel2CreateInput>;
};

export type ComponentModel2CreateWithPositionInput = {
  /** Document to create */
  data: ComponentModel2CreateInput;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
};

/** An edge in a connection. */
export type ComponentModel2Edge = {
  __typename?: 'ComponentModel2Edge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ComponentModel2;
};

/** Identifies documents */
export type ComponentModel2ManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ComponentModel2WhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ComponentModel2WhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ComponentModel2WhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export enum ComponentModel2OrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type ComponentModel2Parent = ComponentModel1 | Model2 | Model3;

export type ComponentModel2ParentConnectInput = {
  ComponentModel1?: InputMaybe<ComponentModel1ConnectInput>;
  Model2?: InputMaybe<Model2ConnectInput>;
  Model3?: InputMaybe<Model3ConnectInput>;
};

export type ComponentModel2ParentCreateInput = {
  ComponentModel1?: InputMaybe<ComponentModel1CreateInput>;
  Model2?: InputMaybe<Model2CreateInput>;
  Model3?: InputMaybe<Model3CreateInput>;
};

export type ComponentModel2ParentCreateManyInlineInput = {
  /** Connect multiple existing ComponentModel2Parent documents */
  connect?: InputMaybe<Array<ComponentModel2ParentWhereUniqueInput>>;
  /** Create and connect multiple existing ComponentModel2Parent documents */
  create?: InputMaybe<Array<ComponentModel2ParentCreateInput>>;
};

export type ComponentModel2ParentCreateOneInlineInput = {
  /** Connect one existing ComponentModel2Parent document */
  connect?: InputMaybe<ComponentModel2ParentWhereUniqueInput>;
  /** Create and connect one ComponentModel2Parent document */
  create?: InputMaybe<ComponentModel2ParentCreateInput>;
};

export type ComponentModel2ParentUpdateInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateInput>;
  Model2?: InputMaybe<Model2UpdateInput>;
  Model3?: InputMaybe<Model3UpdateInput>;
};

export type ComponentModel2ParentUpdateManyInlineInput = {
  /** Connect multiple existing ComponentModel2Parent documents */
  connect?: InputMaybe<Array<ComponentModel2ParentConnectInput>>;
  /** Create and connect multiple ComponentModel2Parent documents */
  create?: InputMaybe<Array<ComponentModel2ParentCreateInput>>;
  /** Delete multiple ComponentModel2Parent documents */
  delete?: InputMaybe<Array<ComponentModel2ParentWhereUniqueInput>>;
  /** Disconnect multiple ComponentModel2Parent documents */
  disconnect?: InputMaybe<Array<ComponentModel2ParentWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ComponentModel2Parent documents */
  set?: InputMaybe<Array<ComponentModel2ParentWhereUniqueInput>>;
  /** Update multiple ComponentModel2Parent documents */
  update?: InputMaybe<Array<ComponentModel2ParentUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple ComponentModel2Parent documents */
  upsert?: InputMaybe<Array<ComponentModel2ParentUpsertWithNestedWhereUniqueInput>>;
};

export type ComponentModel2ParentUpdateManyWithNestedWhereInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateManyWithNestedWhereInput>;
  Model2?: InputMaybe<Model2UpdateManyWithNestedWhereInput>;
  Model3?: InputMaybe<Model3UpdateManyWithNestedWhereInput>;
};

export type ComponentModel2ParentUpdateOneInlineInput = {
  /** Connect existing ComponentModel2Parent document */
  connect?: InputMaybe<ComponentModel2ParentWhereUniqueInput>;
  /** Create and connect one ComponentModel2Parent document */
  create?: InputMaybe<ComponentModel2ParentCreateInput>;
  /** Delete currently connected ComponentModel2Parent document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected ComponentModel2Parent document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single ComponentModel2Parent document */
  update?: InputMaybe<ComponentModel2ParentUpdateWithNestedWhereUniqueInput>;
  /** Upsert single ComponentModel2Parent document */
  upsert?: InputMaybe<ComponentModel2ParentUpsertWithNestedWhereUniqueInput>;
};

export type ComponentModel2ParentUpdateWithNestedWhereUniqueInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateWithNestedWhereUniqueInput>;
  Model2?: InputMaybe<Model2UpdateWithNestedWhereUniqueInput>;
  Model3?: InputMaybe<Model3UpdateWithNestedWhereUniqueInput>;
};

export type ComponentModel2ParentUpsertWithNestedWhereUniqueInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpsertWithNestedWhereUniqueInput>;
  Model2?: InputMaybe<Model2UpsertWithNestedWhereUniqueInput>;
  Model3?: InputMaybe<Model3UpsertWithNestedWhereUniqueInput>;
};

export type ComponentModel2ParentWhereInput = {
  ComponentModel1?: InputMaybe<ComponentModel1WhereInput>;
  Model2?: InputMaybe<Model2WhereInput>;
  Model3?: InputMaybe<Model3WhereInput>;
};

export type ComponentModel2ParentWhereUniqueInput = {
  ComponentModel1?: InputMaybe<ComponentModel1WhereUniqueInput>;
  Model2?: InputMaybe<Model2WhereUniqueInput>;
  Model3?: InputMaybe<Model3WhereUniqueInput>;
};

export type ComponentModel2UpdateInput = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentModel2UpdateManyInlineInput = {
  /** Create and connect multiple ComponentModel2 component instances */
  create?: InputMaybe<Array<ComponentModel2CreateWithPositionInput>>;
  /** Delete multiple ComponentModel2 documents */
  delete?: InputMaybe<Array<ComponentModel2WhereUniqueInput>>;
  /** Update multiple ComponentModel2 component instances */
  update?: InputMaybe<Array<ComponentModel2UpdateWithNestedWhereUniqueAndPositionInput>>;
  /** Upsert multiple ComponentModel2 component instances */
  upsert?: InputMaybe<Array<ComponentModel2UpsertWithNestedWhereUniqueAndPositionInput>>;
};

export type ComponentModel2UpdateManyInput = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentModel2UpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ComponentModel2UpdateManyInput;
  /** Document search */
  where: ComponentModel2WhereInput;
};

export type ComponentModel2UpdateOneInlineInput = {
  /** Create and connect one ComponentModel2 document */
  create?: InputMaybe<ComponentModel2CreateInput>;
  /** Delete currently connected ComponentModel2 document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single ComponentModel2 document */
  update?: InputMaybe<ComponentModel2UpdateWithNestedWhereUniqueInput>;
  /** Upsert single ComponentModel2 document */
  upsert?: InputMaybe<ComponentModel2UpsertWithNestedWhereUniqueInput>;
};

export type ComponentModel2UpdateWithNestedWhereUniqueAndPositionInput = {
  /** Document to update */
  data?: InputMaybe<ComponentModel2UpdateInput>;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Unique component instance search */
  where: ComponentModel2WhereUniqueInput;
};

export type ComponentModel2UpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ComponentModel2UpdateInput;
  /** Unique document search */
  where: ComponentModel2WhereUniqueInput;
};

export type ComponentModel2UpsertInput = {
  /** Create document if it didn't exist */
  create: ComponentModel2CreateInput;
  /** Update document if it exists */
  update: ComponentModel2UpdateInput;
};

export type ComponentModel2UpsertWithNestedWhereUniqueAndPositionInput = {
  /** Document to upsert */
  data?: InputMaybe<ComponentModel2UpsertInput>;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Unique component instance search */
  where: ComponentModel2WhereUniqueInput;
};

export type ComponentModel2UpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ComponentModel2UpsertInput;
  /** Unique document search */
  where: ComponentModel2WhereUniqueInput;
};

/** Identifies documents */
export type ComponentModel2WhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ComponentModel2WhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ComponentModel2WhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ComponentModel2WhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
};

/** References ComponentModel2 record uniquely */
export type ComponentModel2WhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ConnectPositionInput = {
  /** Connect document after specified document */
  after?: InputMaybe<Scalars['ID']['input']>;
  /** Connect document before specified document */
  before?: InputMaybe<Scalars['ID']['input']>;
  /** Connect document at last position */
  end?: InputMaybe<Scalars['Boolean']['input']>;
  /** Connect document at first position */
  start?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum CustomEnumeration {
  Bar = 'bar',
  Baz = 'baz',
  Foo = 'foo'
}

export enum DocumentFileTypes {
  /** Automatically selects the best format for the image based on the browser's capabilities. */
  AutoImage = 'autoImage',
  Avif = 'avif',
  Bmp = 'bmp',
  Gif = 'gif',
  Heic = 'heic',
  Jpg = 'jpg',
  Png = 'png',
  Svg = 'svg',
  Tiff = 'tiff',
  Webp = 'webp'
}

export type DocumentOutputInput = {
  /**
   * Transforms a document into a desired file type.
   * See this matrix for format support:
   *
   * JPG:	autoImage, bmp, gif, jpg, png, webp, tiff
   * PNG:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * SVG:	autoImage, bmp, gif, jpg, png, webp, tiff
   * WEBP:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * GIF:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * TIFF:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * AVIF:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * PDF: 	autoImage, gif, jpg, png, webp, tiff
   *
   */
  format?: InputMaybe<DocumentFileTypes>;
};

/** Transformations for Documents */
export type DocumentTransformationInput = {
  /** Changes the output for the file. */
  output?: InputMaybe<DocumentOutputInput>;
};

export type DocumentVersion = {
  __typename?: 'DocumentVersion';
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['Json']['output']>;
  id: Scalars['ID']['output'];
  revision: Scalars['Int']['output'];
  stage: Stage;
};

/** An object with an ID */
export type Entity = {
  /** The id of the object. */
  id: Scalars['ID']['output'];
  /** The Stage of an object */
  stage: Stage;
};

/** This enumeration holds all typenames that implement the Entity interface. Components and models implement the Entity interface. */
export enum EntityTypeName {
  /** Asset system model */
  Asset = 'Asset',
  ComponentModel1 = 'ComponentModel1',
  ComponentModel2 = 'ComponentModel2',
  /** Model with different fields */
  Model1 = 'Model1',
  /** Model with component and reference fields */
  Model2 = 'Model2',
  /** Model with list fields */
  Model3 = 'Model3',
  /** Scheduled Operation system model */
  ScheduledOperation = 'ScheduledOperation',
  /** Scheduled Release system model */
  ScheduledRelease = 'ScheduledRelease',
  /** User system model */
  User = 'User'
}

/** Allows to specify input to query models and components directly */
export type EntityWhereInput = {
  /** The ID of an object */
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Locale>;
  stage: Stage;
  /** The Type name of an object */
  typename: EntityTypeName;
};

export type ImageBlurInput = {
  /** The amount of blurring to apply to the image. The value must be an integer from 1 to 20. */
  amount: Scalars['Int']['input'];
};

/** Adds a border to the image. */
export type ImageBorderInput = {
  /** The background color of the border. The value must be a valid hex color code. Or one of the supported color names. */
  background: Scalars['String']['input'];
  /** The color of the border. The value must be a valid hex color code. Or one of the supported color names. */
  color: Scalars['String']['input'];
  /** The width of the border in pixels. The value must be an integer from 1 to 1000. */
  width: Scalars['Int']['input'];
};

export type ImageCompressInput = {
  /** Preserves the metadata of the image. */
  metadata: Scalars['Boolean']['input'];
};

/**
 * Crops the image to the specified dimensions.
 * The starting points for X and Y coordinates are [0,0], aligning with the top-left corner of the image.
 * The width and height parameters determine the size in pixels of the cropping rectangle.
 * The output will include only the portion of the image within the designated crop area.
 */
export type ImageCropInput = {
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height: Scalars['Int']['input'];
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width: Scalars['Int']['input'];
  /** The x coordinate of the image. The value must be an integer from 0 to 10000. */
  x: Scalars['Int']['input'];
  /** The y coordinate of the image. The value must be an integer from 0 to 10000. */
  y: Scalars['Int']['input'];
};

export enum ImageFit {
  /** Resizes the image to fit within the specified parameters without distorting, cropping, or changing the aspect ratio. */
  Clip = 'clip',
  /** Resizes the image to fit the specified parameters exactly by removing any parts of the image that don't fit within the boundaries. */
  Crop = 'crop',
  /** Resizes the image to fit within the parameters, but as opposed to 'fit:clip' will not scale the image if the image is smaller than the output size. */
  Max = 'max',
  /** Resizes the image to fit the specified parameters exactly by scaling the image to the desired size. The aspect ratio of the image is not respected and the image can be distorted using this method. */
  Scale = 'scale'
}

export type ImageQualityInput = {
  /** The quality of the image. The value must be an integer from 1 to 100. */
  value: Scalars['Int']['input'];
};

export type ImageResizeInput = {
  /** The default value for the fit parameter is fit:clip. */
  fit?: InputMaybe<ImageFit>;
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height?: InputMaybe<Scalars['Int']['input']>;
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type ImageSharpenInput = {
  /** The amount of sharpening to apply to the image. The value must be an integer from 1 to 20. */
  amount: Scalars['Int']['input'];
};

/** Transformations for Images */
export type ImageTransformationInput = {
  /** Blurs the image. */
  blur?: InputMaybe<ImageBlurInput>;
  /** Adds a border to the image. */
  border?: InputMaybe<ImageBorderInput>;
  /** Compresses the image. */
  compress?: InputMaybe<ImageCompressInput>;
  /** Crops the image to the specified dimensions. */
  crop?: InputMaybe<ImageCropInput>;
  /**
   * Changes the quality of the image. The value must be an integer from 1 to 100.
   * Only supported for the following formats jpeg, jpg, webp, gif, heif, tiff, avif.
   */
  quality?: InputMaybe<ImageQualityInput>;
  /** Resizes the image */
  resize?: InputMaybe<ImageResizeInput>;
  /** Sharpens the image. */
  sharpen?: InputMaybe<ImageSharpenInput>;
};

/** Locale system enumeration */
export enum Locale {
  /** System locale */
  En = 'en'
}

/** Representing a geolocation point with latitude and longitude */
export type Location = {
  __typename?: 'Location';
  distance: Scalars['Float']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};


/** Representing a geolocation point with latitude and longitude */
export type LocationDistanceArgs = {
  from: LocationInput;
};

/** Input for a geolocation point with latitude and longitude */
export type LocationInput = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

/** Model with different fields */
export type Model1 = Entity & Node & {
  __typename?: 'Model1';
  assetField?: Maybe<Asset>;
  booleanField?: Maybe<Scalars['Boolean']['output']>;
  colorField?: Maybe<Color>;
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  dateField?: Maybe<Scalars['Date']['output']>;
  datetimeField?: Maybe<Scalars['DateTime']['output']>;
  /** Get the document in other stages */
  documentInStages: Array<Model1>;
  enumerationField?: Maybe<CustomEnumeration>;
  floatField?: Maybe<Scalars['Float']['output']>;
  /** List of Model1 versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  integerField?: Maybe<Scalars['Int']['output']>;
  jsonField?: Maybe<Scalars['Json']['output']>;
  locationField?: Maybe<Location>;
  markdownField?: Maybe<Scalars['String']['output']>;
  multilineField?: Maybe<Scalars['String']['output']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  richTextField?: Maybe<RichText>;
  scheduledIn: Array<ScheduledOperation>;
  singleToManyReference: Array<Model2>;
  singleToManyReference2: Array<Model2>;
  /** This is a back reference field. The current reference is one-to-one, not a list. */
  singleToOneBackReference?: Maybe<Model2>;
  slug: Scalars['String']['output'];
  /** System stage field */
  stage: Stage;
  /** Title field */
  title: Scalars['String']['output'];
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


/** Model with different fields */
export type Model1AssetFieldArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  where?: InputMaybe<AssetSingleRelationWhereInput>;
};


/** Model with different fields */
export type Model1CreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Model with different fields */
export type Model1DocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


/** Model with different fields */
export type Model1HistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


/** Model with different fields */
export type Model1PublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Model with different fields */
export type Model1ScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Model with different fields */
export type Model1SingleToManyReferenceArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Model2WhereInput>;
};


/** Model with different fields */
export type Model1SingleToManyReference2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Model2WhereInput>;
};


/** Model with different fields */
export type Model1SingleToOneBackReferenceArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Model with different fields */
export type Model1UpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type Model1ConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: Model1WhereUniqueInput;
};

/** A connection to a list of items. */
export type Model1Connection = {
  __typename?: 'Model1Connection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<Model1Edge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type Model1CreateInput = {
  assetField?: InputMaybe<AssetCreateOneInlineInput>;
  booleanField?: InputMaybe<Scalars['Boolean']['input']>;
  colorField?: InputMaybe<ColorInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dateField?: InputMaybe<Scalars['Date']['input']>;
  datetimeField?: InputMaybe<Scalars['DateTime']['input']>;
  enumerationField?: InputMaybe<CustomEnumeration>;
  floatField?: InputMaybe<Scalars['Float']['input']>;
  integerField?: InputMaybe<Scalars['Int']['input']>;
  jsonField?: InputMaybe<Scalars['Json']['input']>;
  locationField?: InputMaybe<LocationInput>;
  markdownField?: InputMaybe<Scalars['String']['input']>;
  multilineField?: InputMaybe<Scalars['String']['input']>;
  richTextField?: InputMaybe<Scalars['RichTextAST']['input']>;
  singleToManyReference?: InputMaybe<Model2CreateManyInlineInput>;
  singleToManyReference2?: InputMaybe<Model2CreateManyInlineInput>;
  singleToOneBackReference?: InputMaybe<Model2CreateOneInlineInput>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Model1CreateManyInlineInput = {
  /** Connect multiple existing Model1 documents */
  connect?: InputMaybe<Array<Model1WhereUniqueInput>>;
  /** Create and connect multiple existing Model1 documents */
  create?: InputMaybe<Array<Model1CreateInput>>;
};

export type Model1CreateOneInlineInput = {
  /** Connect one existing Model1 document */
  connect?: InputMaybe<Model1WhereUniqueInput>;
  /** Create and connect one Model1 document */
  create?: InputMaybe<Model1CreateInput>;
};

/** An edge in a connection. */
export type Model1Edge = {
  __typename?: 'Model1Edge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Model1;
};

/** Identifies documents */
export type Model1ManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<Model1WhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<Model1WhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<Model1WhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  assetField?: InputMaybe<AssetWhereInput>;
  booleanField?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  booleanField_not?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  dateField?: InputMaybe<Scalars['Date']['input']>;
  /** All values greater than the given value. */
  dateField_gt?: InputMaybe<Scalars['Date']['input']>;
  /** All values greater than or equal the given value. */
  dateField_gte?: InputMaybe<Scalars['Date']['input']>;
  /** All values that are contained in given list. */
  dateField_in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  /** All values less than the given value. */
  dateField_lt?: InputMaybe<Scalars['Date']['input']>;
  /** All values less than or equal the given value. */
  dateField_lte?: InputMaybe<Scalars['Date']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  dateField_not?: InputMaybe<Scalars['Date']['input']>;
  /** All values that are not contained in given list. */
  dateField_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  datetimeField?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  datetimeField_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  datetimeField_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  datetimeField_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  datetimeField_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  datetimeField_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  datetimeField_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  datetimeField_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  documentInStages_every?: InputMaybe<Model1WhereStageInput>;
  documentInStages_none?: InputMaybe<Model1WhereStageInput>;
  documentInStages_some?: InputMaybe<Model1WhereStageInput>;
  enumerationField?: InputMaybe<CustomEnumeration>;
  /** All values that are contained in given list. */
  enumerationField_in?: InputMaybe<Array<InputMaybe<CustomEnumeration>>>;
  /** Any other value that exists and is not equal to the given value. */
  enumerationField_not?: InputMaybe<CustomEnumeration>;
  /** All values that are not contained in given list. */
  enumerationField_not_in?: InputMaybe<Array<InputMaybe<CustomEnumeration>>>;
  floatField?: InputMaybe<Scalars['Float']['input']>;
  /** All values greater than the given value. */
  floatField_gt?: InputMaybe<Scalars['Float']['input']>;
  /** All values greater than or equal the given value. */
  floatField_gte?: InputMaybe<Scalars['Float']['input']>;
  /** All values that are contained in given list. */
  floatField_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  /** All values less than the given value. */
  floatField_lt?: InputMaybe<Scalars['Float']['input']>;
  /** All values less than or equal the given value. */
  floatField_lte?: InputMaybe<Scalars['Float']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  floatField_not?: InputMaybe<Scalars['Float']['input']>;
  /** All values that are not contained in given list. */
  floatField_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  integerField?: InputMaybe<Scalars['Int']['input']>;
  /** All values greater than the given value. */
  integerField_gt?: InputMaybe<Scalars['Int']['input']>;
  /** All values greater than or equal the given value. */
  integerField_gte?: InputMaybe<Scalars['Int']['input']>;
  /** All values that are contained in given list. */
  integerField_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** All values less than the given value. */
  integerField_lt?: InputMaybe<Scalars['Int']['input']>;
  /** All values less than or equal the given value. */
  integerField_lte?: InputMaybe<Scalars['Int']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  integerField_not?: InputMaybe<Scalars['Int']['input']>;
  /** All values that are not contained in given list. */
  integerField_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** All values containing the given json path. */
  jsonField_json_path_exists?: InputMaybe<Scalars['String']['input']>;
  /**
   * Recursively tries to find the provided JSON scalar value inside the field.
   * It does use an exact match when comparing values.
   * If you pass `null` as value the filter will be ignored.
   * Note: This filter fails if you try to look for a non scalar JSON value!
   */
  jsonField_value_recursive?: InputMaybe<Scalars['Json']['input']>;
  markdownField?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  markdownField_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  markdownField_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  markdownField_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  markdownField_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  markdownField_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  markdownField_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  markdownField_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  markdownField_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  markdownField_starts_with?: InputMaybe<Scalars['String']['input']>;
  multilineField?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  multilineField_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  multilineField_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  multilineField_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  multilineField_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  multilineField_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  multilineField_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  multilineField_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  multilineField_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  multilineField_starts_with?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  singleToManyReference2_every?: InputMaybe<Model2WhereInput>;
  singleToManyReference2_none?: InputMaybe<Model2WhereInput>;
  singleToManyReference2_some?: InputMaybe<Model2WhereInput>;
  singleToManyReference_every?: InputMaybe<Model2WhereInput>;
  singleToManyReference_none?: InputMaybe<Model2WhereInput>;
  singleToManyReference_some?: InputMaybe<Model2WhereInput>;
  singleToOneBackReference?: InputMaybe<Model2WhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum Model1OrderByInput {
  BooleanFieldAsc = 'booleanField_ASC',
  BooleanFieldDesc = 'booleanField_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DateFieldAsc = 'dateField_ASC',
  DateFieldDesc = 'dateField_DESC',
  DatetimeFieldAsc = 'datetimeField_ASC',
  DatetimeFieldDesc = 'datetimeField_DESC',
  EnumerationFieldAsc = 'enumerationField_ASC',
  EnumerationFieldDesc = 'enumerationField_DESC',
  FloatFieldAsc = 'floatField_ASC',
  FloatFieldDesc = 'floatField_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IntegerFieldAsc = 'integerField_ASC',
  IntegerFieldDesc = 'integerField_DESC',
  MarkdownFieldAsc = 'markdownField_ASC',
  MarkdownFieldDesc = 'markdownField_DESC',
  MultilineFieldAsc = 'multilineField_ASC',
  MultilineFieldDesc = 'multilineField_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type Model1UpdateInput = {
  assetField?: InputMaybe<AssetUpdateOneInlineInput>;
  booleanField?: InputMaybe<Scalars['Boolean']['input']>;
  colorField?: InputMaybe<ColorInput>;
  dateField?: InputMaybe<Scalars['Date']['input']>;
  datetimeField?: InputMaybe<Scalars['DateTime']['input']>;
  enumerationField?: InputMaybe<CustomEnumeration>;
  floatField?: InputMaybe<Scalars['Float']['input']>;
  integerField?: InputMaybe<Scalars['Int']['input']>;
  jsonField?: InputMaybe<Scalars['Json']['input']>;
  locationField?: InputMaybe<LocationInput>;
  markdownField?: InputMaybe<Scalars['String']['input']>;
  multilineField?: InputMaybe<Scalars['String']['input']>;
  richTextField?: InputMaybe<Scalars['RichTextAST']['input']>;
  singleToManyReference?: InputMaybe<Model2UpdateManyInlineInput>;
  singleToManyReference2?: InputMaybe<Model2UpdateManyInlineInput>;
  singleToOneBackReference?: InputMaybe<Model2UpdateOneInlineInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Model1UpdateManyInlineInput = {
  /** Connect multiple existing Model1 documents */
  connect?: InputMaybe<Array<Model1ConnectInput>>;
  /** Create and connect multiple Model1 documents */
  create?: InputMaybe<Array<Model1CreateInput>>;
  /** Delete multiple Model1 documents */
  delete?: InputMaybe<Array<Model1WhereUniqueInput>>;
  /** Disconnect multiple Model1 documents */
  disconnect?: InputMaybe<Array<Model1WhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Model1 documents */
  set?: InputMaybe<Array<Model1WhereUniqueInput>>;
  /** Update multiple Model1 documents */
  update?: InputMaybe<Array<Model1UpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Model1 documents */
  upsert?: InputMaybe<Array<Model1UpsertWithNestedWhereUniqueInput>>;
};

export type Model1UpdateManyInput = {
  booleanField?: InputMaybe<Scalars['Boolean']['input']>;
  colorField?: InputMaybe<ColorInput>;
  dateField?: InputMaybe<Scalars['Date']['input']>;
  datetimeField?: InputMaybe<Scalars['DateTime']['input']>;
  enumerationField?: InputMaybe<CustomEnumeration>;
  floatField?: InputMaybe<Scalars['Float']['input']>;
  integerField?: InputMaybe<Scalars['Int']['input']>;
  jsonField?: InputMaybe<Scalars['Json']['input']>;
  locationField?: InputMaybe<LocationInput>;
  markdownField?: InputMaybe<Scalars['String']['input']>;
  multilineField?: InputMaybe<Scalars['String']['input']>;
  richTextField?: InputMaybe<Scalars['RichTextAST']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Model1UpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: Model1UpdateManyInput;
  /** Document search */
  where: Model1WhereInput;
};

export type Model1UpdateOneInlineInput = {
  /** Connect existing Model1 document */
  connect?: InputMaybe<Model1WhereUniqueInput>;
  /** Create and connect one Model1 document */
  create?: InputMaybe<Model1CreateInput>;
  /** Delete currently connected Model1 document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Model1 document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Model1 document */
  update?: InputMaybe<Model1UpdateWithNestedWhereUniqueInput>;
  /** Upsert single Model1 document */
  upsert?: InputMaybe<Model1UpsertWithNestedWhereUniqueInput>;
};

export type Model1UpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: Model1UpdateInput;
  /** Unique document search */
  where: Model1WhereUniqueInput;
};

export type Model1UpsertInput = {
  /** Create document if it didn't exist */
  create: Model1CreateInput;
  /** Update document if it exists */
  update: Model1UpdateInput;
};

export type Model1UpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: Model1UpsertInput;
  /** Unique document search */
  where: Model1WhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type Model1WhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type Model1WhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<Model1WhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<Model1WhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<Model1WhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  assetField?: InputMaybe<AssetWhereInput>;
  booleanField?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  booleanField_not?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  dateField?: InputMaybe<Scalars['Date']['input']>;
  /** All values greater than the given value. */
  dateField_gt?: InputMaybe<Scalars['Date']['input']>;
  /** All values greater than or equal the given value. */
  dateField_gte?: InputMaybe<Scalars['Date']['input']>;
  /** All values that are contained in given list. */
  dateField_in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  /** All values less than the given value. */
  dateField_lt?: InputMaybe<Scalars['Date']['input']>;
  /** All values less than or equal the given value. */
  dateField_lte?: InputMaybe<Scalars['Date']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  dateField_not?: InputMaybe<Scalars['Date']['input']>;
  /** All values that are not contained in given list. */
  dateField_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  datetimeField?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  datetimeField_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  datetimeField_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  datetimeField_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  datetimeField_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  datetimeField_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  datetimeField_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  datetimeField_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  documentInStages_every?: InputMaybe<Model1WhereStageInput>;
  documentInStages_none?: InputMaybe<Model1WhereStageInput>;
  documentInStages_some?: InputMaybe<Model1WhereStageInput>;
  enumerationField?: InputMaybe<CustomEnumeration>;
  /** All values that are contained in given list. */
  enumerationField_in?: InputMaybe<Array<InputMaybe<CustomEnumeration>>>;
  /** Any other value that exists and is not equal to the given value. */
  enumerationField_not?: InputMaybe<CustomEnumeration>;
  /** All values that are not contained in given list. */
  enumerationField_not_in?: InputMaybe<Array<InputMaybe<CustomEnumeration>>>;
  floatField?: InputMaybe<Scalars['Float']['input']>;
  /** All values greater than the given value. */
  floatField_gt?: InputMaybe<Scalars['Float']['input']>;
  /** All values greater than or equal the given value. */
  floatField_gte?: InputMaybe<Scalars['Float']['input']>;
  /** All values that are contained in given list. */
  floatField_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  /** All values less than the given value. */
  floatField_lt?: InputMaybe<Scalars['Float']['input']>;
  /** All values less than or equal the given value. */
  floatField_lte?: InputMaybe<Scalars['Float']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  floatField_not?: InputMaybe<Scalars['Float']['input']>;
  /** All values that are not contained in given list. */
  floatField_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  integerField?: InputMaybe<Scalars['Int']['input']>;
  /** All values greater than the given value. */
  integerField_gt?: InputMaybe<Scalars['Int']['input']>;
  /** All values greater than or equal the given value. */
  integerField_gte?: InputMaybe<Scalars['Int']['input']>;
  /** All values that are contained in given list. */
  integerField_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** All values less than the given value. */
  integerField_lt?: InputMaybe<Scalars['Int']['input']>;
  /** All values less than or equal the given value. */
  integerField_lte?: InputMaybe<Scalars['Int']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  integerField_not?: InputMaybe<Scalars['Int']['input']>;
  /** All values that are not contained in given list. */
  integerField_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** All values containing the given json path. */
  jsonField_json_path_exists?: InputMaybe<Scalars['String']['input']>;
  /**
   * Recursively tries to find the provided JSON scalar value inside the field.
   * It does use an exact match when comparing values.
   * If you pass `null` as value the filter will be ignored.
   * Note: This filter fails if you try to look for a non scalar JSON value!
   */
  jsonField_value_recursive?: InputMaybe<Scalars['Json']['input']>;
  markdownField?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  markdownField_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  markdownField_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  markdownField_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  markdownField_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  markdownField_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  markdownField_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  markdownField_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  markdownField_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  markdownField_starts_with?: InputMaybe<Scalars['String']['input']>;
  multilineField?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  multilineField_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  multilineField_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  multilineField_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  multilineField_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  multilineField_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  multilineField_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  multilineField_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  multilineField_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  multilineField_starts_with?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  singleToManyReference2_every?: InputMaybe<Model2WhereInput>;
  singleToManyReference2_none?: InputMaybe<Model2WhereInput>;
  singleToManyReference2_some?: InputMaybe<Model2WhereInput>;
  singleToManyReference_every?: InputMaybe<Model2WhereInput>;
  singleToManyReference_none?: InputMaybe<Model2WhereInput>;
  singleToManyReference_some?: InputMaybe<Model2WhereInput>;
  singleToOneBackReference?: InputMaybe<Model2WhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type Model1WhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<Model1WhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<Model1WhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<Model1WhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<Model1WhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Model1 record uniquely */
export type Model1WhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Model with component and reference fields */
export type Model2 = Entity & Node & {
  __typename?: 'Model2';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Model2>;
  /** List of Model2 versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  multiComponentField?: Maybe<Model2multiComponentFieldUnion>;
  /** Multi two-way reference. The current reference is many-to-many, a list. */
  multiToManyReference: Array<MultiToManyReferenceMultiToManyReference>;
  /** Multi two-way reference. The current reference is one-to-one, not a list. */
  multiToOneReference?: Maybe<SingleToOneReferenceMultiToOneReference>;
  /** Multi two-way reference. The current reference is many-to-one, not a list. */
  multiToOneReference2?: Maybe<SingleToManyReference2MultiToOneReference2>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  singleComponentField?: Maybe<ComponentModel1>;
  /** Single one-way one-to-many reference. */
  singleToManyReference: Array<Model3>;
  /** Single two-way reference. The current reference is one-to-many, a list. */
  singleToManyReference3: Array<Model3>;
  /** Single one-way one-to-one reference. */
  singleToOneReference?: Maybe<Model3>;
  /** Single two-way many-to-one reference. Current reference is "to-one", not a list. The back-reference field in model3 is a list. */
  singleToOneReference2?: Maybe<Model3>;
  /** System stage field */
  stage: Stage;
  title?: Maybe<Scalars['String']['output']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


/** Model with component and reference fields */
export type Model2CreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Model with component and reference fields */
export type Model2DocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


/** Model with component and reference fields */
export type Model2HistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


/** Model with component and reference fields */
export type Model2MultiComponentFieldArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Model with component and reference fields */
export type Model2MultiToManyReferenceArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


/** Model with component and reference fields */
export type Model2MultiToOneReferenceArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Model with component and reference fields */
export type Model2MultiToOneReference2Args = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Model with component and reference fields */
export type Model2PublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Model with component and reference fields */
export type Model2ScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Model with component and reference fields */
export type Model2SingleComponentFieldArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Model with component and reference fields */
export type Model2SingleToManyReferenceArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<Model3OrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Model3WhereInput>;
};


/** Model with component and reference fields */
export type Model2SingleToManyReference3Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<Model3OrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Model3WhereInput>;
};


/** Model with component and reference fields */
export type Model2SingleToOneReferenceArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Model with component and reference fields */
export type Model2SingleToOneReference2Args = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Model with component and reference fields */
export type Model2UpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type Model2ConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: Model2WhereUniqueInput;
};

/** A connection to a list of items. */
export type Model2Connection = {
  __typename?: 'Model2Connection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<Model2Edge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type Model2CreateInput = {
  componentModel1?: InputMaybe<ComponentModel1CreateOneInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  multiComponentField?: InputMaybe<Model2multiComponentFieldUnionCreateOneInlineInput>;
  multiToManyReference?: InputMaybe<MultiToManyReferenceMultiToManyReferenceCreateManyInlineInput>;
  multiToOneReference?: InputMaybe<SingleToOneReferenceMultiToOneReferenceCreateOneInlineInput>;
  multiToOneReference2?: InputMaybe<SingleToManyReference2MultiToOneReference2CreateOneInlineInput>;
  singleComponentField?: InputMaybe<ComponentModel1CreateOneInlineInput>;
  singleToManyReference?: InputMaybe<Model3CreateManyInlineInput>;
  singleToManyReference3?: InputMaybe<Model3CreateManyInlineInput>;
  singleToOneReference?: InputMaybe<Model3CreateOneInlineInput>;
  singleToOneReference2?: InputMaybe<Model3CreateOneInlineInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Model2CreateManyInlineInput = {
  /** Connect multiple existing Model2 documents */
  connect?: InputMaybe<Array<Model2WhereUniqueInput>>;
  /** Create and connect multiple existing Model2 documents */
  create?: InputMaybe<Array<Model2CreateInput>>;
};

export type Model2CreateOneInlineInput = {
  /** Connect one existing Model2 document */
  connect?: InputMaybe<Model2WhereUniqueInput>;
  /** Create and connect one Model2 document */
  create?: InputMaybe<Model2CreateInput>;
};

/** An edge in a connection. */
export type Model2Edge = {
  __typename?: 'Model2Edge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Model2;
};

/** Identifies documents */
export type Model2ManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<Model2WhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<Model2WhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<Model2WhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<Model2WhereStageInput>;
  documentInStages_none?: InputMaybe<Model2WhereStageInput>;
  documentInStages_some?: InputMaybe<Model2WhereStageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values in which the modular component is connected to the given models */
  multiComponentField?: InputMaybe<Model2multiComponentFieldUnionWhereInput>;
  /** All values in which the union is empty. */
  multiComponentField_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** All values in which the union is empty */
  multiToManyReference_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  multiToManyReference_some?: InputMaybe<MultiToManyReferenceMultiToManyReferenceWhereInput>;
  /** All values in which the union is connected to the given models */
  multiToOneReference?: InputMaybe<SingleToOneReferenceMultiToOneReferenceWhereInput>;
  /** All values in which the union is connected to the given models */
  multiToOneReference2?: InputMaybe<SingleToManyReference2MultiToOneReference2WhereInput>;
  /** All values in which the union is empty */
  multiToOneReference2_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** All values in which the union is empty */
  multiToOneReference_empty?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  singleComponentField?: InputMaybe<ComponentModel1WhereInput>;
  singleToManyReference3_every?: InputMaybe<Model3WhereInput>;
  singleToManyReference3_none?: InputMaybe<Model3WhereInput>;
  singleToManyReference3_some?: InputMaybe<Model3WhereInput>;
  singleToManyReference_every?: InputMaybe<Model3WhereInput>;
  singleToManyReference_none?: InputMaybe<Model3WhereInput>;
  singleToManyReference_some?: InputMaybe<Model3WhereInput>;
  singleToOneReference?: InputMaybe<Model3WhereInput>;
  singleToOneReference2?: InputMaybe<Model3WhereInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum Model2OrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type Model2UpdateInput = {
  componentModel1?: InputMaybe<ComponentModel1UpdateOneInlineInput>;
  multiComponentField?: InputMaybe<Model2multiComponentFieldUnionUpdateOneInlineInput>;
  multiToManyReference?: InputMaybe<MultiToManyReferenceMultiToManyReferenceUpdateManyInlineInput>;
  multiToOneReference?: InputMaybe<SingleToOneReferenceMultiToOneReferenceUpdateOneInlineInput>;
  multiToOneReference2?: InputMaybe<SingleToManyReference2MultiToOneReference2UpdateOneInlineInput>;
  singleComponentField?: InputMaybe<ComponentModel1UpdateOneInlineInput>;
  singleToManyReference?: InputMaybe<Model3UpdateManyInlineInput>;
  singleToManyReference3?: InputMaybe<Model3UpdateManyInlineInput>;
  singleToOneReference?: InputMaybe<Model3UpdateOneInlineInput>;
  singleToOneReference2?: InputMaybe<Model3UpdateOneInlineInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Model2UpdateManyInlineInput = {
  /** Connect multiple existing Model2 documents */
  connect?: InputMaybe<Array<Model2ConnectInput>>;
  /** Create and connect multiple Model2 documents */
  create?: InputMaybe<Array<Model2CreateInput>>;
  /** Delete multiple Model2 documents */
  delete?: InputMaybe<Array<Model2WhereUniqueInput>>;
  /** Disconnect multiple Model2 documents */
  disconnect?: InputMaybe<Array<Model2WhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Model2 documents */
  set?: InputMaybe<Array<Model2WhereUniqueInput>>;
  /** Update multiple Model2 documents */
  update?: InputMaybe<Array<Model2UpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Model2 documents */
  upsert?: InputMaybe<Array<Model2UpsertWithNestedWhereUniqueInput>>;
};

export type Model2UpdateManyInput = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Model2UpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: Model2UpdateManyInput;
  /** Document search */
  where: Model2WhereInput;
};

export type Model2UpdateOneInlineInput = {
  /** Connect existing Model2 document */
  connect?: InputMaybe<Model2WhereUniqueInput>;
  /** Create and connect one Model2 document */
  create?: InputMaybe<Model2CreateInput>;
  /** Delete currently connected Model2 document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Model2 document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Model2 document */
  update?: InputMaybe<Model2UpdateWithNestedWhereUniqueInput>;
  /** Upsert single Model2 document */
  upsert?: InputMaybe<Model2UpsertWithNestedWhereUniqueInput>;
};

export type Model2UpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: Model2UpdateInput;
  /** Unique document search */
  where: Model2WhereUniqueInput;
};

export type Model2UpsertInput = {
  /** Create document if it didn't exist */
  create: Model2CreateInput;
  /** Update document if it exists */
  update: Model2UpdateInput;
};

export type Model2UpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: Model2UpsertInput;
  /** Unique document search */
  where: Model2WhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type Model2WhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type Model2WhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<Model2WhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<Model2WhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<Model2WhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<Model2WhereStageInput>;
  documentInStages_none?: InputMaybe<Model2WhereStageInput>;
  documentInStages_some?: InputMaybe<Model2WhereStageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values in which the modular component is connected to the given models */
  multiComponentField?: InputMaybe<Model2multiComponentFieldUnionWhereInput>;
  /** All values in which the union is empty. */
  multiComponentField_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** All values in which the union is empty */
  multiToManyReference_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  multiToManyReference_some?: InputMaybe<MultiToManyReferenceMultiToManyReferenceWhereInput>;
  /** All values in which the union is connected to the given models */
  multiToOneReference?: InputMaybe<SingleToOneReferenceMultiToOneReferenceWhereInput>;
  /** All values in which the union is connected to the given models */
  multiToOneReference2?: InputMaybe<SingleToManyReference2MultiToOneReference2WhereInput>;
  /** All values in which the union is empty */
  multiToOneReference2_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** All values in which the union is empty */
  multiToOneReference_empty?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  singleComponentField?: InputMaybe<ComponentModel1WhereInput>;
  singleToManyReference3_every?: InputMaybe<Model3WhereInput>;
  singleToManyReference3_none?: InputMaybe<Model3WhereInput>;
  singleToManyReference3_some?: InputMaybe<Model3WhereInput>;
  singleToManyReference_every?: InputMaybe<Model3WhereInput>;
  singleToManyReference_none?: InputMaybe<Model3WhereInput>;
  singleToManyReference_some?: InputMaybe<Model3WhereInput>;
  singleToOneReference?: InputMaybe<Model3WhereInput>;
  singleToOneReference2?: InputMaybe<Model3WhereInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type Model2WhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<Model2WhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<Model2WhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<Model2WhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<Model2WhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Model2 record uniquely */
export type Model2WhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Model2multiComponentFieldUnion = ComponentModel1 | ComponentModel2;

export type Model2multiComponentFieldUnionConnectInput = {
  ComponentModel1?: InputMaybe<ComponentModel1ConnectInput>;
  ComponentModel2?: InputMaybe<ComponentModel2ConnectInput>;
};

export type Model2multiComponentFieldUnionCreateInput = {
  ComponentModel1?: InputMaybe<ComponentModel1CreateInput>;
  ComponentModel2?: InputMaybe<ComponentModel2CreateInput>;
};

export type Model2multiComponentFieldUnionCreateManyInlineInput = {
  /** Create and connect multiple existing Model2multiComponentFieldUnion documents */
  create?: InputMaybe<Array<Model2multiComponentFieldUnionCreateInput>>;
};

export type Model2multiComponentFieldUnionCreateOneInlineInput = {
  /** Create and connect one Model2multiComponentFieldUnion document */
  create?: InputMaybe<Model2multiComponentFieldUnionCreateInput>;
};

export type Model2multiComponentFieldUnionCreateWithPositionInput = {
  ComponentModel1?: InputMaybe<ComponentModel1CreateWithPositionInput>;
  ComponentModel2?: InputMaybe<ComponentModel2CreateWithPositionInput>;
};

export type Model2multiComponentFieldUnionUpdateInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpdateInput>;
};

export type Model2multiComponentFieldUnionUpdateManyInlineInput = {
  /** Create and connect multiple Model2multiComponentFieldUnion component instances */
  create?: InputMaybe<Array<Model2multiComponentFieldUnionCreateWithPositionInput>>;
  /** Delete multiple Model2multiComponentFieldUnion documents */
  delete?: InputMaybe<Array<Model2multiComponentFieldUnionWhereUniqueInput>>;
  /** Update multiple Model2multiComponentFieldUnion component instances */
  update?: InputMaybe<Array<Model2multiComponentFieldUnionUpdateWithNestedWhereUniqueAndPositionInput>>;
  /** Upsert multiple Model2multiComponentFieldUnion component instances */
  upsert?: InputMaybe<Array<Model2multiComponentFieldUnionUpsertWithNestedWhereUniqueAndPositionInput>>;
};

export type Model2multiComponentFieldUnionUpdateManyWithNestedWhereInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateManyWithNestedWhereInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpdateManyWithNestedWhereInput>;
};

export type Model2multiComponentFieldUnionUpdateOneInlineInput = {
  /** Create and connect one Model2multiComponentFieldUnion document */
  create?: InputMaybe<Model2multiComponentFieldUnionCreateInput>;
  /** Delete currently connected Model2multiComponentFieldUnion document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Model2multiComponentFieldUnion document */
  update?: InputMaybe<Model2multiComponentFieldUnionUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Model2multiComponentFieldUnion document */
  upsert?: InputMaybe<Model2multiComponentFieldUnionUpsertWithNestedWhereUniqueInput>;
};

export type Model2multiComponentFieldUnionUpdateWithNestedWhereUniqueAndPositionInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateWithNestedWhereUniqueAndPositionInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpdateWithNestedWhereUniqueAndPositionInput>;
};

export type Model2multiComponentFieldUnionUpdateWithNestedWhereUniqueInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateWithNestedWhereUniqueInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpdateWithNestedWhereUniqueInput>;
};

export type Model2multiComponentFieldUnionUpsertWithNestedWhereUniqueAndPositionInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpsertWithNestedWhereUniqueAndPositionInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpsertWithNestedWhereUniqueAndPositionInput>;
};

export type Model2multiComponentFieldUnionUpsertWithNestedWhereUniqueInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpsertWithNestedWhereUniqueInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpsertWithNestedWhereUniqueInput>;
};

export type Model2multiComponentFieldUnionWhereInput = {
  ComponentModel1?: InputMaybe<ComponentModel1WhereInput>;
  ComponentModel2?: InputMaybe<ComponentModel2WhereInput>;
};

export type Model2multiComponentFieldUnionWhereUniqueInput = {
  ComponentModel1?: InputMaybe<ComponentModel1WhereUniqueInput>;
  ComponentModel2?: InputMaybe<ComponentModel2WhereUniqueInput>;
};

/** Model with list fields */
export type Model3 = Entity & Node & {
  __typename?: 'Model3';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Model3>;
  /** List of Model3 versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  listOfAssets: Array<Asset>;
  listOfEnums: Array<CustomEnumeration>;
  listOfFloats: Array<Scalars['Float']['output']>;
  listOfIntegers: Array<Scalars['Int']['output']>;
  listOfMultiComponents: Array<Model3listOfMultiComponentsUnion>;
  listOfMultiline: Array<Scalars['String']['output']>;
  listOfSingleComponents: Array<ComponentModel1>;
  listOfStrings: Array<Scalars['String']['output']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** Back reference to single two-way reference. The current reference is many-to-one, not a list. */
  singleToManyReference?: Maybe<Model2>;
  /** Back reference to multi two-way reference. The current reference is one-to-many, a list. */
  singleToManyReference2: Array<Model2>;
  /** Back reference to multi two-way reference. The current reference is many-to-many, a list. */
  singleToManyReference3: Array<Model2>;
  /** Back reference to single two-way reference. Current reference is one-to-many, a list. */
  singleToManyReference4: Array<Model2>;
  /** This is a back reference field. The current reference is one-to-one, not a list. */
  singleToOneBackReference?: Maybe<Model2>;
  /** System stage field */
  stage: Stage;
  title?: Maybe<Scalars['String']['output']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


/** Model with list fields */
export type Model3CreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Model with list fields */
export type Model3DocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


/** Model with list fields */
export type Model3HistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


/** Model with list fields */
export type Model3ListOfAssetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetWhereInput>;
};


/** Model with list fields */
export type Model3ListOfMultiComponentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


/** Model with list fields */
export type Model3ListOfSingleComponentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ComponentModel1OrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ComponentModel1WhereInput>;
};


/** Model with list fields */
export type Model3PublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Model with list fields */
export type Model3ScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Model with list fields */
export type Model3SingleToManyReferenceArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Model with list fields */
export type Model3SingleToManyReference2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Model2WhereInput>;
};


/** Model with list fields */
export type Model3SingleToManyReference3Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Model2WhereInput>;
};


/** Model with list fields */
export type Model3SingleToManyReference4Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<Model2OrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Model2WhereInput>;
};


/** Model with list fields */
export type Model3SingleToOneBackReferenceArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Model with list fields */
export type Model3UpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type Model3ConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: Model3WhereUniqueInput;
};

/** A connection to a list of items. */
export type Model3Connection = {
  __typename?: 'Model3Connection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<Model3Edge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type Model3CreateInput = {
  clyrbcgse03h207lh7gxw8bdd?: InputMaybe<Model2CreateManyInlineInput>;
  clyrbcwva03ie07lh74zi275s?: InputMaybe<Model2CreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  listOfAssets?: InputMaybe<AssetCreateManyInlineInput>;
  listOfEnums?: InputMaybe<Array<CustomEnumeration>>;
  listOfFloats?: InputMaybe<Array<Scalars['Float']['input']>>;
  listOfIntegers?: InputMaybe<Array<Scalars['Int']['input']>>;
  listOfMultiComponents?: InputMaybe<Model3listOfMultiComponentsUnionCreateManyInlineInput>;
  listOfMultiline?: InputMaybe<Array<Scalars['String']['input']>>;
  listOfSingleComponents?: InputMaybe<ComponentModel1CreateManyInlineInput>;
  listOfStrings?: InputMaybe<Array<Scalars['String']['input']>>;
  singleToManyReference?: InputMaybe<Model2CreateOneInlineInput>;
  singleToManyReference2?: InputMaybe<Model2CreateManyInlineInput>;
  singleToManyReference3?: InputMaybe<Model2CreateManyInlineInput>;
  singleToManyReference4?: InputMaybe<Model2CreateManyInlineInput>;
  singleToOneBackReference?: InputMaybe<Model2CreateOneInlineInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Model3CreateManyInlineInput = {
  /** Connect multiple existing Model3 documents */
  connect?: InputMaybe<Array<Model3WhereUniqueInput>>;
  /** Create and connect multiple existing Model3 documents */
  create?: InputMaybe<Array<Model3CreateInput>>;
};

export type Model3CreateOneInlineInput = {
  /** Connect one existing Model3 document */
  connect?: InputMaybe<Model3WhereUniqueInput>;
  /** Create and connect one Model3 document */
  create?: InputMaybe<Model3CreateInput>;
};

/** An edge in a connection. */
export type Model3Edge = {
  __typename?: 'Model3Edge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Model3;
};

/** Identifies documents */
export type Model3ManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<Model3WhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<Model3WhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<Model3WhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<Model3WhereStageInput>;
  documentInStages_none?: InputMaybe<Model3WhereStageInput>;
  documentInStages_some?: InputMaybe<Model3WhereStageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  listOfAssets_every?: InputMaybe<AssetWhereInput>;
  listOfAssets_none?: InputMaybe<AssetWhereInput>;
  listOfAssets_some?: InputMaybe<AssetWhereInput>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  listOfEnums?: InputMaybe<Array<CustomEnumeration>>;
  /** Matches if the field array contains *all* items provided to the filter */
  listOfEnums_contains_all?: InputMaybe<Array<CustomEnumeration>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  listOfEnums_contains_none?: InputMaybe<Array<CustomEnumeration>>;
  /** Matches if the field array contains at least one item provided to the filter */
  listOfEnums_contains_some?: InputMaybe<Array<CustomEnumeration>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  listOfEnums_not?: InputMaybe<Array<CustomEnumeration>>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  listOfFloats?: InputMaybe<Array<Scalars['Float']['input']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  listOfFloats_contains_all?: InputMaybe<Array<Scalars['Float']['input']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  listOfFloats_contains_none?: InputMaybe<Array<Scalars['Float']['input']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  listOfFloats_contains_some?: InputMaybe<Array<Scalars['Float']['input']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  listOfFloats_not?: InputMaybe<Array<Scalars['Float']['input']>>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  listOfIntegers?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  listOfIntegers_contains_all?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  listOfIntegers_contains_none?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  listOfIntegers_contains_some?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  listOfIntegers_not?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** All values in which the union is empty. */
  listOfMultiComponents_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Matches if the modular component contains at least one connection to the item provided to the filter */
  listOfMultiComponents_some?: InputMaybe<Model3listOfMultiComponentsUnionWhereInput>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  listOfMultiline?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  listOfMultiline_contains_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  listOfMultiline_contains_none?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  listOfMultiline_contains_some?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  listOfMultiline_not?: InputMaybe<Array<Scalars['String']['input']>>;
  listOfSingleComponents_every?: InputMaybe<ComponentModel1WhereInput>;
  listOfSingleComponents_none?: InputMaybe<ComponentModel1WhereInput>;
  listOfSingleComponents_some?: InputMaybe<ComponentModel1WhereInput>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  listOfStrings?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  listOfStrings_contains_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  listOfStrings_contains_none?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  listOfStrings_contains_some?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  listOfStrings_not?: InputMaybe<Array<Scalars['String']['input']>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  singleToManyReference?: InputMaybe<Model2WhereInput>;
  singleToManyReference2_every?: InputMaybe<Model2WhereInput>;
  singleToManyReference2_none?: InputMaybe<Model2WhereInput>;
  singleToManyReference2_some?: InputMaybe<Model2WhereInput>;
  singleToManyReference3_every?: InputMaybe<Model2WhereInput>;
  singleToManyReference3_none?: InputMaybe<Model2WhereInput>;
  singleToManyReference3_some?: InputMaybe<Model2WhereInput>;
  singleToManyReference4_every?: InputMaybe<Model2WhereInput>;
  singleToManyReference4_none?: InputMaybe<Model2WhereInput>;
  singleToManyReference4_some?: InputMaybe<Model2WhereInput>;
  singleToOneBackReference?: InputMaybe<Model2WhereInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum Model3OrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ListOfEnumsAsc = 'listOfEnums_ASC',
  ListOfEnumsDesc = 'listOfEnums_DESC',
  ListOfFloatsAsc = 'listOfFloats_ASC',
  ListOfFloatsDesc = 'listOfFloats_DESC',
  ListOfIntegersAsc = 'listOfIntegers_ASC',
  ListOfIntegersDesc = 'listOfIntegers_DESC',
  ListOfMultilineAsc = 'listOfMultiline_ASC',
  ListOfMultilineDesc = 'listOfMultiline_DESC',
  ListOfStringsAsc = 'listOfStrings_ASC',
  ListOfStringsDesc = 'listOfStrings_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type Model3UpdateInput = {
  clyrbcgse03h207lh7gxw8bdd?: InputMaybe<Model2UpdateManyInlineInput>;
  clyrbcwva03ie07lh74zi275s?: InputMaybe<Model2UpdateManyInlineInput>;
  listOfAssets?: InputMaybe<AssetUpdateManyInlineInput>;
  listOfEnums?: InputMaybe<Array<CustomEnumeration>>;
  listOfFloats?: InputMaybe<Array<Scalars['Float']['input']>>;
  listOfIntegers?: InputMaybe<Array<Scalars['Int']['input']>>;
  listOfMultiComponents?: InputMaybe<Model3listOfMultiComponentsUnionUpdateManyInlineInput>;
  listOfMultiline?: InputMaybe<Array<Scalars['String']['input']>>;
  listOfSingleComponents?: InputMaybe<ComponentModel1UpdateManyInlineInput>;
  listOfStrings?: InputMaybe<Array<Scalars['String']['input']>>;
  singleToManyReference?: InputMaybe<Model2UpdateOneInlineInput>;
  singleToManyReference2?: InputMaybe<Model2UpdateManyInlineInput>;
  singleToManyReference3?: InputMaybe<Model2UpdateManyInlineInput>;
  singleToManyReference4?: InputMaybe<Model2UpdateManyInlineInput>;
  singleToOneBackReference?: InputMaybe<Model2UpdateOneInlineInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Model3UpdateManyInlineInput = {
  /** Connect multiple existing Model3 documents */
  connect?: InputMaybe<Array<Model3ConnectInput>>;
  /** Create and connect multiple Model3 documents */
  create?: InputMaybe<Array<Model3CreateInput>>;
  /** Delete multiple Model3 documents */
  delete?: InputMaybe<Array<Model3WhereUniqueInput>>;
  /** Disconnect multiple Model3 documents */
  disconnect?: InputMaybe<Array<Model3WhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Model3 documents */
  set?: InputMaybe<Array<Model3WhereUniqueInput>>;
  /** Update multiple Model3 documents */
  update?: InputMaybe<Array<Model3UpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Model3 documents */
  upsert?: InputMaybe<Array<Model3UpsertWithNestedWhereUniqueInput>>;
};

export type Model3UpdateManyInput = {
  listOfEnums?: InputMaybe<Array<CustomEnumeration>>;
  listOfFloats?: InputMaybe<Array<Scalars['Float']['input']>>;
  listOfIntegers?: InputMaybe<Array<Scalars['Int']['input']>>;
  listOfMultiline?: InputMaybe<Array<Scalars['String']['input']>>;
  listOfStrings?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Model3UpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: Model3UpdateManyInput;
  /** Document search */
  where: Model3WhereInput;
};

export type Model3UpdateOneInlineInput = {
  /** Connect existing Model3 document */
  connect?: InputMaybe<Model3WhereUniqueInput>;
  /** Create and connect one Model3 document */
  create?: InputMaybe<Model3CreateInput>;
  /** Delete currently connected Model3 document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Model3 document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Model3 document */
  update?: InputMaybe<Model3UpdateWithNestedWhereUniqueInput>;
  /** Upsert single Model3 document */
  upsert?: InputMaybe<Model3UpsertWithNestedWhereUniqueInput>;
};

export type Model3UpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: Model3UpdateInput;
  /** Unique document search */
  where: Model3WhereUniqueInput;
};

export type Model3UpsertInput = {
  /** Create document if it didn't exist */
  create: Model3CreateInput;
  /** Update document if it exists */
  update: Model3UpdateInput;
};

export type Model3UpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: Model3UpsertInput;
  /** Unique document search */
  where: Model3WhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type Model3WhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type Model3WhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<Model3WhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<Model3WhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<Model3WhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<Model3WhereStageInput>;
  documentInStages_none?: InputMaybe<Model3WhereStageInput>;
  documentInStages_some?: InputMaybe<Model3WhereStageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  listOfAssets_every?: InputMaybe<AssetWhereInput>;
  listOfAssets_none?: InputMaybe<AssetWhereInput>;
  listOfAssets_some?: InputMaybe<AssetWhereInput>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  listOfEnums?: InputMaybe<Array<CustomEnumeration>>;
  /** Matches if the field array contains *all* items provided to the filter */
  listOfEnums_contains_all?: InputMaybe<Array<CustomEnumeration>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  listOfEnums_contains_none?: InputMaybe<Array<CustomEnumeration>>;
  /** Matches if the field array contains at least one item provided to the filter */
  listOfEnums_contains_some?: InputMaybe<Array<CustomEnumeration>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  listOfEnums_not?: InputMaybe<Array<CustomEnumeration>>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  listOfFloats?: InputMaybe<Array<Scalars['Float']['input']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  listOfFloats_contains_all?: InputMaybe<Array<Scalars['Float']['input']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  listOfFloats_contains_none?: InputMaybe<Array<Scalars['Float']['input']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  listOfFloats_contains_some?: InputMaybe<Array<Scalars['Float']['input']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  listOfFloats_not?: InputMaybe<Array<Scalars['Float']['input']>>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  listOfIntegers?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  listOfIntegers_contains_all?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  listOfIntegers_contains_none?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  listOfIntegers_contains_some?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  listOfIntegers_not?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** All values in which the union is empty. */
  listOfMultiComponents_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Matches if the modular component contains at least one connection to the item provided to the filter */
  listOfMultiComponents_some?: InputMaybe<Model3listOfMultiComponentsUnionWhereInput>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  listOfMultiline?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  listOfMultiline_contains_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  listOfMultiline_contains_none?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  listOfMultiline_contains_some?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  listOfMultiline_not?: InputMaybe<Array<Scalars['String']['input']>>;
  listOfSingleComponents_every?: InputMaybe<ComponentModel1WhereInput>;
  listOfSingleComponents_none?: InputMaybe<ComponentModel1WhereInput>;
  listOfSingleComponents_some?: InputMaybe<ComponentModel1WhereInput>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  listOfStrings?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  listOfStrings_contains_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  listOfStrings_contains_none?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  listOfStrings_contains_some?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  listOfStrings_not?: InputMaybe<Array<Scalars['String']['input']>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  singleToManyReference?: InputMaybe<Model2WhereInput>;
  singleToManyReference2_every?: InputMaybe<Model2WhereInput>;
  singleToManyReference2_none?: InputMaybe<Model2WhereInput>;
  singleToManyReference2_some?: InputMaybe<Model2WhereInput>;
  singleToManyReference3_every?: InputMaybe<Model2WhereInput>;
  singleToManyReference3_none?: InputMaybe<Model2WhereInput>;
  singleToManyReference3_some?: InputMaybe<Model2WhereInput>;
  singleToManyReference4_every?: InputMaybe<Model2WhereInput>;
  singleToManyReference4_none?: InputMaybe<Model2WhereInput>;
  singleToManyReference4_some?: InputMaybe<Model2WhereInput>;
  singleToOneBackReference?: InputMaybe<Model2WhereInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type Model3WhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<Model3WhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<Model3WhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<Model3WhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<Model3WhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Model3 record uniquely */
export type Model3WhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Model3listOfMultiComponentsUnion = ComponentModel1 | ComponentModel2;

export type Model3listOfMultiComponentsUnionConnectInput = {
  ComponentModel1?: InputMaybe<ComponentModel1ConnectInput>;
  ComponentModel2?: InputMaybe<ComponentModel2ConnectInput>;
};

export type Model3listOfMultiComponentsUnionCreateInput = {
  ComponentModel1?: InputMaybe<ComponentModel1CreateInput>;
  ComponentModel2?: InputMaybe<ComponentModel2CreateInput>;
};

export type Model3listOfMultiComponentsUnionCreateManyInlineInput = {
  /** Create and connect multiple existing Model3listOfMultiComponentsUnion documents */
  create?: InputMaybe<Array<Model3listOfMultiComponentsUnionCreateInput>>;
};

export type Model3listOfMultiComponentsUnionCreateOneInlineInput = {
  /** Create and connect one Model3listOfMultiComponentsUnion document */
  create?: InputMaybe<Model3listOfMultiComponentsUnionCreateInput>;
};

export type Model3listOfMultiComponentsUnionCreateWithPositionInput = {
  ComponentModel1?: InputMaybe<ComponentModel1CreateWithPositionInput>;
  ComponentModel2?: InputMaybe<ComponentModel2CreateWithPositionInput>;
};

export type Model3listOfMultiComponentsUnionUpdateInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpdateInput>;
};

export type Model3listOfMultiComponentsUnionUpdateManyInlineInput = {
  /** Create and connect multiple Model3listOfMultiComponentsUnion component instances */
  create?: InputMaybe<Array<Model3listOfMultiComponentsUnionCreateWithPositionInput>>;
  /** Delete multiple Model3listOfMultiComponentsUnion documents */
  delete?: InputMaybe<Array<Model3listOfMultiComponentsUnionWhereUniqueInput>>;
  /** Update multiple Model3listOfMultiComponentsUnion component instances */
  update?: InputMaybe<Array<Model3listOfMultiComponentsUnionUpdateWithNestedWhereUniqueAndPositionInput>>;
  /** Upsert multiple Model3listOfMultiComponentsUnion component instances */
  upsert?: InputMaybe<Array<Model3listOfMultiComponentsUnionUpsertWithNestedWhereUniqueAndPositionInput>>;
};

export type Model3listOfMultiComponentsUnionUpdateManyWithNestedWhereInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateManyWithNestedWhereInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpdateManyWithNestedWhereInput>;
};

export type Model3listOfMultiComponentsUnionUpdateOneInlineInput = {
  /** Create and connect one Model3listOfMultiComponentsUnion document */
  create?: InputMaybe<Model3listOfMultiComponentsUnionCreateInput>;
  /** Delete currently connected Model3listOfMultiComponentsUnion document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Model3listOfMultiComponentsUnion document */
  update?: InputMaybe<Model3listOfMultiComponentsUnionUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Model3listOfMultiComponentsUnion document */
  upsert?: InputMaybe<Model3listOfMultiComponentsUnionUpsertWithNestedWhereUniqueInput>;
};

export type Model3listOfMultiComponentsUnionUpdateWithNestedWhereUniqueAndPositionInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateWithNestedWhereUniqueAndPositionInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpdateWithNestedWhereUniqueAndPositionInput>;
};

export type Model3listOfMultiComponentsUnionUpdateWithNestedWhereUniqueInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpdateWithNestedWhereUniqueInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpdateWithNestedWhereUniqueInput>;
};

export type Model3listOfMultiComponentsUnionUpsertWithNestedWhereUniqueAndPositionInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpsertWithNestedWhereUniqueAndPositionInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpsertWithNestedWhereUniqueAndPositionInput>;
};

export type Model3listOfMultiComponentsUnionUpsertWithNestedWhereUniqueInput = {
  ComponentModel1?: InputMaybe<ComponentModel1UpsertWithNestedWhereUniqueInput>;
  ComponentModel2?: InputMaybe<ComponentModel2UpsertWithNestedWhereUniqueInput>;
};

export type Model3listOfMultiComponentsUnionWhereInput = {
  ComponentModel1?: InputMaybe<ComponentModel1WhereInput>;
  ComponentModel2?: InputMaybe<ComponentModel2WhereInput>;
};

export type Model3listOfMultiComponentsUnionWhereUniqueInput = {
  ComponentModel1?: InputMaybe<ComponentModel1WhereUniqueInput>;
  ComponentModel2?: InputMaybe<ComponentModel2WhereUniqueInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create an asset. Use the returned info to finish the creation process by uploading the asset. */
  createAsset?: Maybe<Asset>;
  /** Create one model1 */
  createModel1?: Maybe<Model1>;
  /** Create one model2 */
  createModel2?: Maybe<Model2>;
  /** Create one model3 */
  createModel3?: Maybe<Model3>;
  /** Create one scheduledRelease */
  createScheduledRelease?: Maybe<ScheduledRelease>;
  /** Delete one asset from _all_ existing stages. Returns deleted document. */
  deleteAsset?: Maybe<Asset>;
  /**
   * Delete many Asset documents
   * @deprecated Please use the new paginated many mutation (deleteManyAssetsConnection)
   */
  deleteManyAssets: BatchPayload;
  /** Delete many Asset documents, return deleted documents */
  deleteManyAssetsConnection: AssetConnection;
  /**
   * Delete many Model1 documents
   * @deprecated Please use the new paginated many mutation (deleteManyModels1Connection)
   */
  deleteManyModels1: BatchPayload;
  /** Delete many Model1 documents, return deleted documents */
  deleteManyModels1Connection: Model1Connection;
  /**
   * Delete many Model2 documents
   * @deprecated Please use the new paginated many mutation (deleteManyModels2Connection)
   */
  deleteManyModels2: BatchPayload;
  /** Delete many Model2 documents, return deleted documents */
  deleteManyModels2Connection: Model2Connection;
  /**
   * Delete many Model3 documents
   * @deprecated Please use the new paginated many mutation (deleteManyModels3Connection)
   */
  deleteManyModels3: BatchPayload;
  /** Delete many Model3 documents, return deleted documents */
  deleteManyModels3Connection: Model3Connection;
  /** Delete one model1 from _all_ existing stages. Returns deleted document. */
  deleteModel1?: Maybe<Model1>;
  /** Delete one model2 from _all_ existing stages. Returns deleted document. */
  deleteModel2?: Maybe<Model2>;
  /** Delete one model3 from _all_ existing stages. Returns deleted document. */
  deleteModel3?: Maybe<Model3>;
  /** Delete and return scheduled operation */
  deleteScheduledOperation?: Maybe<ScheduledOperation>;
  /** Delete one scheduledRelease from _all_ existing stages. Returns deleted document. */
  deleteScheduledRelease?: Maybe<ScheduledRelease>;
  /** Publish one asset */
  publishAsset?: Maybe<Asset>;
  /**
   * Publish many Asset documents
   * @deprecated Please use the new paginated many mutation (publishManyAssetsConnection)
   */
  publishManyAssets: BatchPayload;
  /** Publish many Asset documents */
  publishManyAssetsConnection: AssetConnection;
  /**
   * Publish many Model1 documents
   * @deprecated Please use the new paginated many mutation (publishManyModels1Connection)
   */
  publishManyModels1: BatchPayload;
  /** Publish many Model1 documents */
  publishManyModels1Connection: Model1Connection;
  /**
   * Publish many Model2 documents
   * @deprecated Please use the new paginated many mutation (publishManyModels2Connection)
   */
  publishManyModels2: BatchPayload;
  /** Publish many Model2 documents */
  publishManyModels2Connection: Model2Connection;
  /**
   * Publish many Model3 documents
   * @deprecated Please use the new paginated many mutation (publishManyModels3Connection)
   */
  publishManyModels3: BatchPayload;
  /** Publish many Model3 documents */
  publishManyModels3Connection: Model3Connection;
  /** Publish one model1 */
  publishModel1?: Maybe<Model1>;
  /** Publish one model2 */
  publishModel2?: Maybe<Model2>;
  /** Publish one model3 */
  publishModel3?: Maybe<Model3>;
  /** Schedule to publish one asset */
  schedulePublishAsset?: Maybe<Asset>;
  /** Schedule to publish one model1 */
  schedulePublishModel1?: Maybe<Model1>;
  /** Schedule to publish one model2 */
  schedulePublishModel2?: Maybe<Model2>;
  /** Schedule to publish one model3 */
  schedulePublishModel3?: Maybe<Model3>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishAsset?: Maybe<Asset>;
  /** Unpublish one model1 from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishModel1?: Maybe<Model1>;
  /** Unpublish one model2 from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishModel2?: Maybe<Model2>;
  /** Unpublish one model3 from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishModel3?: Maybe<Model3>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishAsset?: Maybe<Asset>;
  /**
   * Unpublish many Asset documents
   * @deprecated Please use the new paginated many mutation (unpublishManyAssetsConnection)
   */
  unpublishManyAssets: BatchPayload;
  /** Find many Asset documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyAssetsConnection: AssetConnection;
  /**
   * Unpublish many Model1 documents
   * @deprecated Please use the new paginated many mutation (unpublishManyModels1Connection)
   */
  unpublishManyModels1: BatchPayload;
  /** Find many Model1 documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyModels1Connection: Model1Connection;
  /**
   * Unpublish many Model2 documents
   * @deprecated Please use the new paginated many mutation (unpublishManyModels2Connection)
   */
  unpublishManyModels2: BatchPayload;
  /** Find many Model2 documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyModels2Connection: Model2Connection;
  /**
   * Unpublish many Model3 documents
   * @deprecated Please use the new paginated many mutation (unpublishManyModels3Connection)
   */
  unpublishManyModels3: BatchPayload;
  /** Find many Model3 documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyModels3Connection: Model3Connection;
  /** Unpublish one model1 from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishModel1?: Maybe<Model1>;
  /** Unpublish one model2 from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishModel2?: Maybe<Model2>;
  /** Unpublish one model3 from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishModel3?: Maybe<Model3>;
  /** Update one asset */
  updateAsset?: Maybe<Asset>;
  /**
   * Update many assets
   * @deprecated Please use the new paginated many mutation (updateManyAssetsConnection)
   */
  updateManyAssets: BatchPayload;
  /** Update many Asset documents */
  updateManyAssetsConnection: AssetConnection;
  /**
   * Update many models1
   * @deprecated Please use the new paginated many mutation (updateManyModels1Connection)
   */
  updateManyModels1: BatchPayload;
  /** Update many Model1 documents */
  updateManyModels1Connection: Model1Connection;
  /**
   * Update many models2
   * @deprecated Please use the new paginated many mutation (updateManyModels2Connection)
   */
  updateManyModels2: BatchPayload;
  /** Update many Model2 documents */
  updateManyModels2Connection: Model2Connection;
  /**
   * Update many models3
   * @deprecated Please use the new paginated many mutation (updateManyModels3Connection)
   */
  updateManyModels3: BatchPayload;
  /** Update many Model3 documents */
  updateManyModels3Connection: Model3Connection;
  /** Update one model1 */
  updateModel1?: Maybe<Model1>;
  /** Update one model2 */
  updateModel2?: Maybe<Model2>;
  /** Update one model3 */
  updateModel3?: Maybe<Model3>;
  /** Update one scheduledRelease */
  updateScheduledRelease?: Maybe<ScheduledRelease>;
  /** Upsert one asset */
  upsertAsset?: Maybe<Asset>;
  /** Upsert one model1 */
  upsertModel1?: Maybe<Model1>;
  /** Upsert one model2 */
  upsertModel2?: Maybe<Model2>;
  /** Upsert one model3 */
  upsertModel3?: Maybe<Model3>;
};


export type MutationCreateAssetArgs = {
  data: AssetCreateInput;
};


export type MutationCreateModel1Args = {
  data: Model1CreateInput;
};


export type MutationCreateModel2Args = {
  data: Model2CreateInput;
};


export type MutationCreateModel3Args = {
  data: Model3CreateInput;
};


export type MutationCreateScheduledReleaseArgs = {
  data: ScheduledReleaseCreateInput;
};


export type MutationDeleteAssetArgs = {
  where: AssetWhereUniqueInput;
};


export type MutationDeleteManyAssetsArgs = {
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationDeleteManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationDeleteManyModels1Args = {
  where?: InputMaybe<Model1ManyWhereInput>;
};


export type MutationDeleteManyModels1ConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Model1ManyWhereInput>;
};


export type MutationDeleteManyModels2Args = {
  where?: InputMaybe<Model2ManyWhereInput>;
};


export type MutationDeleteManyModels2ConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Model2ManyWhereInput>;
};


export type MutationDeleteManyModels3Args = {
  where?: InputMaybe<Model3ManyWhereInput>;
};


export type MutationDeleteManyModels3ConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Model3ManyWhereInput>;
};


export type MutationDeleteModel1Args = {
  where: Model1WhereUniqueInput;
};


export type MutationDeleteModel2Args = {
  where: Model2WhereUniqueInput;
};


export type MutationDeleteModel3Args = {
  where: Model3WhereUniqueInput;
};


export type MutationDeleteScheduledOperationArgs = {
  where: ScheduledOperationWhereUniqueInput;
};


export type MutationDeleteScheduledReleaseArgs = {
  where: ScheduledReleaseWhereUniqueInput;
};


export type MutationPublishAssetArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyAssetsArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<AssetManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<AssetManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyModels1Args = {
  to?: Array<Stage>;
  where?: InputMaybe<Model1ManyWhereInput>;
};


export type MutationPublishManyModels1ConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<Model1ManyWhereInput>;
};


export type MutationPublishManyModels2Args = {
  to?: Array<Stage>;
  where?: InputMaybe<Model2ManyWhereInput>;
};


export type MutationPublishManyModels2ConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<Model2ManyWhereInput>;
};


export type MutationPublishManyModels3Args = {
  to?: Array<Stage>;
  where?: InputMaybe<Model3ManyWhereInput>;
};


export type MutationPublishManyModels3ConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<Model3ManyWhereInput>;
};


export type MutationPublishModel1Args = {
  to?: Array<Stage>;
  where: Model1WhereUniqueInput;
};


export type MutationPublishModel2Args = {
  to?: Array<Stage>;
  where: Model2WhereUniqueInput;
};


export type MutationPublishModel3Args = {
  to?: Array<Stage>;
  where: Model3WhereUniqueInput;
};


export type MutationSchedulePublishAssetArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSchedulePublishModel1Args = {
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: Model1WhereUniqueInput;
};


export type MutationSchedulePublishModel2Args = {
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: Model2WhereUniqueInput;
};


export type MutationSchedulePublishModel3Args = {
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: Model3WhereUniqueInput;
};


export type MutationScheduleUnpublishAssetArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: AssetWhereUniqueInput;
};


export type MutationScheduleUnpublishModel1Args = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  where: Model1WhereUniqueInput;
};


export type MutationScheduleUnpublishModel2Args = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  where: Model2WhereUniqueInput;
};


export type MutationScheduleUnpublishModel3Args = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  where: Model3WhereUniqueInput;
};


export type MutationUnpublishAssetArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: AssetWhereUniqueInput;
};


export type MutationUnpublishManyAssetsArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUnpublishManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUnpublishManyModels1Args = {
  from?: Array<Stage>;
  where?: InputMaybe<Model1ManyWhereInput>;
};


export type MutationUnpublishManyModels1ConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<Model1ManyWhereInput>;
};


export type MutationUnpublishManyModels2Args = {
  from?: Array<Stage>;
  where?: InputMaybe<Model2ManyWhereInput>;
};


export type MutationUnpublishManyModels2ConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<Model2ManyWhereInput>;
};


export type MutationUnpublishManyModels3Args = {
  from?: Array<Stage>;
  where?: InputMaybe<Model3ManyWhereInput>;
};


export type MutationUnpublishManyModels3ConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<Model3ManyWhereInput>;
};


export type MutationUnpublishModel1Args = {
  from?: Array<Stage>;
  where: Model1WhereUniqueInput;
};


export type MutationUnpublishModel2Args = {
  from?: Array<Stage>;
  where: Model2WhereUniqueInput;
};


export type MutationUnpublishModel3Args = {
  from?: Array<Stage>;
  where: Model3WhereUniqueInput;
};


export type MutationUpdateAssetArgs = {
  data: AssetUpdateInput;
  where: AssetWhereUniqueInput;
};


export type MutationUpdateManyAssetsArgs = {
  data: AssetUpdateManyInput;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUpdateManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: AssetUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUpdateManyModels1Args = {
  data: Model1UpdateManyInput;
  where?: InputMaybe<Model1ManyWhereInput>;
};


export type MutationUpdateManyModels1ConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: Model1UpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Model1ManyWhereInput>;
};


export type MutationUpdateManyModels2Args = {
  data: Model2UpdateManyInput;
  where?: InputMaybe<Model2ManyWhereInput>;
};


export type MutationUpdateManyModels2ConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: Model2UpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Model2ManyWhereInput>;
};


export type MutationUpdateManyModels3Args = {
  data: Model3UpdateManyInput;
  where?: InputMaybe<Model3ManyWhereInput>;
};


export type MutationUpdateManyModels3ConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: Model3UpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Model3ManyWhereInput>;
};


export type MutationUpdateModel1Args = {
  data: Model1UpdateInput;
  where: Model1WhereUniqueInput;
};


export type MutationUpdateModel2Args = {
  data: Model2UpdateInput;
  where: Model2WhereUniqueInput;
};


export type MutationUpdateModel3Args = {
  data: Model3UpdateInput;
  where: Model3WhereUniqueInput;
};


export type MutationUpdateScheduledReleaseArgs = {
  data: ScheduledReleaseUpdateInput;
  where: ScheduledReleaseWhereUniqueInput;
};


export type MutationUpsertAssetArgs = {
  upsert: AssetUpsertInput;
  where: AssetWhereUniqueInput;
};


export type MutationUpsertModel1Args = {
  upsert: Model1UpsertInput;
  where: Model1WhereUniqueInput;
};


export type MutationUpsertModel2Args = {
  upsert: Model2UpsertInput;
  where: Model2WhereUniqueInput;
};


export type MutationUpsertModel3Args = {
  upsert: Model3UpsertInput;
  where: Model3WhereUniqueInput;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID']['output'];
  /** The Stage of an object */
  stage: Stage;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** Number of items in the current page. */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PublishLocaleInput = {
  /** Locales to publish */
  locale: Locale;
  /** Stages to publish selected locales to */
  stages: Array<Stage>;
};

export type Query = {
  __typename?: 'Query';
  /** Retrieve a single asset */
  asset?: Maybe<Asset>;
  /** Retrieve document version */
  assetVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple assets */
  assets: Array<Asset>;
  /** Retrieve multiple assets using the Relay connection interface */
  assetsConnection: AssetConnection;
  /** Fetches an object given its ID */
  entities?: Maybe<Array<Entity>>;
  /** Retrieve a single model1 */
  model1?: Maybe<Model1>;
  /** Retrieve document version */
  model1Version?: Maybe<DocumentVersion>;
  /** Retrieve a single model2 */
  model2?: Maybe<Model2>;
  /** Retrieve document version */
  model2Version?: Maybe<DocumentVersion>;
  /** Retrieve a single model3 */
  model3?: Maybe<Model3>;
  /** Retrieve document version */
  model3Version?: Maybe<DocumentVersion>;
  /** Retrieve multiple models1 */
  models1: Array<Model1>;
  /** Retrieve multiple models1 using the Relay connection interface */
  models1Connection: Model1Connection;
  /** Retrieve multiple models2 */
  models2: Array<Model2>;
  /** Retrieve multiple models2 using the Relay connection interface */
  models2Connection: Model2Connection;
  /** Retrieve multiple models3 */
  models3: Array<Model3>;
  /** Retrieve multiple models3 using the Relay connection interface */
  models3Connection: Model3Connection;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Retrieve a single scheduledOperation */
  scheduledOperation?: Maybe<ScheduledOperation>;
  /** Retrieve multiple scheduledOperations */
  scheduledOperations: Array<ScheduledOperation>;
  /** Retrieve multiple scheduledOperations using the Relay connection interface */
  scheduledOperationsConnection: ScheduledOperationConnection;
  /** Retrieve a single scheduledRelease */
  scheduledRelease?: Maybe<ScheduledRelease>;
  /** Retrieve multiple scheduledReleases */
  scheduledReleases: Array<ScheduledRelease>;
  /** Retrieve multiple scheduledReleases using the Relay connection interface */
  scheduledReleasesConnection: ScheduledReleaseConnection;
  /** Retrieve a single user */
  user?: Maybe<User>;
  /** Retrieve multiple users */
  users: Array<User>;
  /** Retrieve multiple users using the Relay connection interface */
  usersConnection: UserConnection;
};


export type QueryAssetArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: AssetWhereUniqueInput;
};


export type QueryAssetVersionArgs = {
  where: VersionWhereInput;
};


export type QueryAssetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<AssetWhereInput>;
};


export type QueryAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<AssetWhereInput>;
};


export type QueryEntitiesArgs = {
  locales?: InputMaybe<Array<Locale>>;
  where: Array<EntityWhereInput>;
};


export type QueryModel1Args = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: Model1WhereUniqueInput;
};


export type QueryModel1VersionArgs = {
  where: VersionWhereInput;
};


export type QueryModel2Args = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: Model2WhereUniqueInput;
};


export type QueryModel2VersionArgs = {
  where: VersionWhereInput;
};


export type QueryModel3Args = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: Model3WhereUniqueInput;
};


export type QueryModel3VersionArgs = {
  where: VersionWhereInput;
};


export type QueryModels1Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<Model1OrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<Model1WhereInput>;
};


export type QueryModels1ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<Model1OrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<Model1WhereInput>;
};


export type QueryModels2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<Model2OrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<Model2WhereInput>;
};


export type QueryModels2ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<Model2OrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<Model2WhereInput>;
};


export type QueryModels3Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<Model3OrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<Model3WhereInput>;
};


export type QueryModels3ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<Model3OrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<Model3WhereInput>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
  locales?: Array<Locale>;
  stage?: Stage;
};


export type QueryScheduledOperationArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ScheduledOperationWhereUniqueInput;
};


export type QueryScheduledOperationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type QueryScheduledOperationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type QueryScheduledReleaseArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ScheduledReleaseWhereUniqueInput;
};


export type QueryScheduledReleasesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledReleaseWhereInput>;
};


export type QueryScheduledReleasesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledReleaseWhereInput>;
};


export type QueryUserArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<UserOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<UserOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<UserWhereInput>;
};

/** Representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type Rgba = {
  __typename?: 'RGBA';
  a: Scalars['RGBATransparency']['output'];
  b: Scalars['RGBAHue']['output'];
  g: Scalars['RGBAHue']['output'];
  r: Scalars['RGBAHue']['output'];
};

/** Input type representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type RgbaInput = {
  a: Scalars['RGBATransparency']['input'];
  b: Scalars['RGBAHue']['input'];
  g: Scalars['RGBAHue']['input'];
  r: Scalars['RGBAHue']['input'];
};

/** Custom type representing a rich text value comprising of raw rich text ast, html, markdown and text values */
export type RichText = {
  __typename?: 'RichText';
  /** Returns HTMl representation */
  html: Scalars['String']['output'];
  /** Returns Markdown representation */
  markdown: Scalars['String']['output'];
  /** Returns AST representation */
  raw: Scalars['RichTextAST']['output'];
  /** Returns plain-text contents of RichText */
  text: Scalars['String']['output'];
};

/** Scheduled Operation system model */
export type ScheduledOperation = Entity & Node & {
  __typename?: 'ScheduledOperation';
  affectedDocuments: Array<ScheduledOperationAffectedDocument>;
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Operation description */
  description?: Maybe<Scalars['String']['output']>;
  /** Get the document in other stages */
  documentInStages: Array<ScheduledOperation>;
  /** Operation error message */
  errorMessage?: Maybe<Scalars['String']['output']>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  /** Raw operation payload including all details, this field is subject to change */
  rawPayload: Scalars['Json']['output'];
  /** The release this operation is scheduled for */
  release?: Maybe<ScheduledRelease>;
  /** System stage field */
  stage: Stage;
  /** operation Status */
  status: ScheduledOperationStatus;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


/** Scheduled Operation system model */
export type ScheduledOperationAffectedDocumentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


/** Scheduled Operation system model */
export type ScheduledOperationCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


/** Scheduled Operation system model */
export type ScheduledOperationPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationReleaseArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ScheduledOperationAffectedDocument = Asset | Model1 | Model2 | Model3;

export type ScheduledOperationConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ScheduledOperationWhereUniqueInput;
};

/** A connection to a list of items. */
export type ScheduledOperationConnection = {
  __typename?: 'ScheduledOperationConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ScheduledOperationEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ScheduledOperationCreateManyInlineInput = {
  /** Connect multiple existing ScheduledOperation documents */
  connect?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
};

export type ScheduledOperationCreateOneInlineInput = {
  /** Connect one existing ScheduledOperation document */
  connect?: InputMaybe<ScheduledOperationWhereUniqueInput>;
};

/** An edge in a connection. */
export type ScheduledOperationEdge = {
  __typename?: 'ScheduledOperationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ScheduledOperation;
};

/** Identifies documents */
export type ScheduledOperationManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  /** All values containing the given json path. */
  rawPayload_json_path_exists?: InputMaybe<Scalars['String']['input']>;
  /**
   * Recursively tries to find the provided JSON scalar value inside the field.
   * It does use an exact match when comparing values.
   * If you pass `null` as value the filter will be ignored.
   * Note: This filter fails if you try to look for a non scalar JSON value!
   */
  rawPayload_value_recursive?: InputMaybe<Scalars['Json']['input']>;
  release?: InputMaybe<ScheduledReleaseWhereInput>;
  status?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ScheduledOperationOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ErrorMessageAsc = 'errorMessage_ASC',
  ErrorMessageDesc = 'errorMessage_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** System Scheduled Operation Status */
export enum ScheduledOperationStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type ScheduledOperationUpdateManyInlineInput = {
  /** Connect multiple existing ScheduledOperation documents */
  connect?: InputMaybe<Array<ScheduledOperationConnectInput>>;
  /** Disconnect multiple ScheduledOperation documents */
  disconnect?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ScheduledOperation documents */
  set?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
};

export type ScheduledOperationUpdateOneInlineInput = {
  /** Connect existing ScheduledOperation document */
  connect?: InputMaybe<ScheduledOperationWhereUniqueInput>;
  /** Disconnect currently connected ScheduledOperation document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type ScheduledOperationWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  /** All values containing the given json path. */
  rawPayload_json_path_exists?: InputMaybe<Scalars['String']['input']>;
  /**
   * Recursively tries to find the provided JSON scalar value inside the field.
   * It does use an exact match when comparing values.
   * If you pass `null` as value the filter will be ignored.
   * Note: This filter fails if you try to look for a non scalar JSON value!
   */
  rawPayload_value_recursive?: InputMaybe<Scalars['Json']['input']>;
  release?: InputMaybe<ScheduledReleaseWhereInput>;
  status?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** References ScheduledOperation record uniquely */
export type ScheduledOperationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** Scheduled Release system model */
export type ScheduledRelease = Entity & Node & {
  __typename?: 'ScheduledRelease';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Release description */
  description?: Maybe<Scalars['String']['output']>;
  /** Get the document in other stages */
  documentInStages: Array<ScheduledRelease>;
  /** Release error message */
  errorMessage?: Maybe<Scalars['String']['output']>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  /** Whether scheduled release should be run */
  isActive: Scalars['Boolean']['output'];
  /** Whether scheduled release is implicit */
  isImplicit: Scalars['Boolean']['output'];
  /** Operations to run with this release */
  operations: Array<ScheduledOperation>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  /** Release date and time */
  releaseAt?: Maybe<Scalars['DateTime']['output']>;
  /** System stage field */
  stage: Stage;
  /** Release Status */
  status: ScheduledReleaseStatus;
  /** Release Title */
  title?: Maybe<Scalars['String']['output']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


/** Scheduled Release system model */
export type ScheduledReleaseCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Release system model */
export type ScheduledReleaseDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


/** Scheduled Release system model */
export type ScheduledReleaseOperationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Scheduled Release system model */
export type ScheduledReleasePublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Release system model */
export type ScheduledReleaseUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ScheduledReleaseConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ScheduledReleaseWhereUniqueInput;
};

/** A connection to a list of items. */
export type ScheduledReleaseConnection = {
  __typename?: 'ScheduledReleaseConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ScheduledReleaseEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ScheduledReleaseCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ScheduledReleaseCreateManyInlineInput = {
  /** Connect multiple existing ScheduledRelease documents */
  connect?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Create and connect multiple existing ScheduledRelease documents */
  create?: InputMaybe<Array<ScheduledReleaseCreateInput>>;
};

export type ScheduledReleaseCreateOneInlineInput = {
  /** Connect one existing ScheduledRelease document */
  connect?: InputMaybe<ScheduledReleaseWhereUniqueInput>;
  /** Create and connect one ScheduledRelease document */
  create?: InputMaybe<ScheduledReleaseCreateInput>;
};

/** An edge in a connection. */
export type ScheduledReleaseEdge = {
  __typename?: 'ScheduledReleaseEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ScheduledRelease;
};

/** Identifies documents */
export type ScheduledReleaseManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']['input']>;
  isImplicit?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  isImplicit_not?: InputMaybe<Scalars['Boolean']['input']>;
  operations_every?: InputMaybe<ScheduledOperationWhereInput>;
  operations_none?: InputMaybe<ScheduledOperationWhereInput>;
  operations_some?: InputMaybe<ScheduledOperationWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  releaseAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  releaseAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  releaseAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  releaseAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  releaseAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  releaseAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  releaseAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  status?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ScheduledReleaseOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ErrorMessageAsc = 'errorMessage_ASC',
  ErrorMessageDesc = 'errorMessage_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC',
  IsImplicitAsc = 'isImplicit_ASC',
  IsImplicitDesc = 'isImplicit_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  ReleaseAtAsc = 'releaseAt_ASC',
  ReleaseAtDesc = 'releaseAt_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** System Scheduled Release Status */
export enum ScheduledReleaseStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type ScheduledReleaseUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ScheduledReleaseUpdateManyInlineInput = {
  /** Connect multiple existing ScheduledRelease documents */
  connect?: InputMaybe<Array<ScheduledReleaseConnectInput>>;
  /** Create and connect multiple ScheduledRelease documents */
  create?: InputMaybe<Array<ScheduledReleaseCreateInput>>;
  /** Delete multiple ScheduledRelease documents */
  delete?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Disconnect multiple ScheduledRelease documents */
  disconnect?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ScheduledRelease documents */
  set?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Update multiple ScheduledRelease documents */
  update?: InputMaybe<Array<ScheduledReleaseUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple ScheduledRelease documents */
  upsert?: InputMaybe<Array<ScheduledReleaseUpsertWithNestedWhereUniqueInput>>;
};

export type ScheduledReleaseUpdateManyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ScheduledReleaseUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ScheduledReleaseUpdateManyInput;
  /** Document search */
  where: ScheduledReleaseWhereInput;
};

export type ScheduledReleaseUpdateOneInlineInput = {
  /** Connect existing ScheduledRelease document */
  connect?: InputMaybe<ScheduledReleaseWhereUniqueInput>;
  /** Create and connect one ScheduledRelease document */
  create?: InputMaybe<ScheduledReleaseCreateInput>;
  /** Delete currently connected ScheduledRelease document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected ScheduledRelease document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single ScheduledRelease document */
  update?: InputMaybe<ScheduledReleaseUpdateWithNestedWhereUniqueInput>;
  /** Upsert single ScheduledRelease document */
  upsert?: InputMaybe<ScheduledReleaseUpsertWithNestedWhereUniqueInput>;
};

export type ScheduledReleaseUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ScheduledReleaseUpdateInput;
  /** Unique document search */
  where: ScheduledReleaseWhereUniqueInput;
};

export type ScheduledReleaseUpsertInput = {
  /** Create document if it didn't exist */
  create: ScheduledReleaseCreateInput;
  /** Update document if it exists */
  update: ScheduledReleaseUpdateInput;
};

export type ScheduledReleaseUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ScheduledReleaseUpsertInput;
  /** Unique document search */
  where: ScheduledReleaseWhereUniqueInput;
};

/** Identifies documents */
export type ScheduledReleaseWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']['input']>;
  isImplicit?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  isImplicit_not?: InputMaybe<Scalars['Boolean']['input']>;
  operations_every?: InputMaybe<ScheduledOperationWhereInput>;
  operations_none?: InputMaybe<ScheduledOperationWhereInput>;
  operations_some?: InputMaybe<ScheduledOperationWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  releaseAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  releaseAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  releaseAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  releaseAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  releaseAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  releaseAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  releaseAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  status?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** References ScheduledRelease record uniquely */
export type ScheduledReleaseWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** Stage system enumeration */
export enum Stage {
  /** The Draft is the default stage for all your content. */
  Draft = 'DRAFT',
  /** The Published stage is where you can publish your content to. */
  Published = 'PUBLISHED'
}

export enum SystemDateTimeFieldVariation {
  Base = 'BASE',
  Combined = 'COMBINED',
  Localization = 'LOCALIZATION'
}

export type UnpublishLocaleInput = {
  /** Locales to unpublish */
  locale: Locale;
  /** Stages to unpublish selected locales from */
  stages: Array<Stage>;
};

/** User system model */
export type User = Entity & Node & {
  __typename?: 'User';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** Get the document in other stages */
  documentInStages: Array<User>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  /** Flag to determine if user is active or not */
  isActive: Scalars['Boolean']['output'];
  /** User Kind. Can be either MEMBER, PAT or PUBLIC */
  kind: UserKind;
  /** The username */
  name: Scalars['String']['output'];
  /** Profile Picture url */
  picture?: Maybe<Scalars['String']['output']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
};


/** User system model */
export type UserDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};

export type UserConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: UserWhereUniqueInput;
};

/** A connection to a list of items. */
export type UserConnection = {
  __typename?: 'UserConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<UserEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type UserCreateManyInlineInput = {
  /** Connect multiple existing User documents */
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserCreateOneInlineInput = {
  /** Connect one existing User document */
  connect?: InputMaybe<UserWhereUniqueInput>;
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: User;
};

/** System User Kind */
export enum UserKind {
  AppToken = 'APP_TOKEN',
  Member = 'MEMBER',
  Pat = 'PAT',
  Public = 'PUBLIC',
  Webhook = 'WEBHOOK'
}

/** Identifies documents */
export type UserManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  documentInStages_every?: InputMaybe<UserWhereStageInput>;
  documentInStages_none?: InputMaybe<UserWhereStageInput>;
  documentInStages_some?: InputMaybe<UserWhereStageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']['input']>;
  kind?: InputMaybe<UserKind>;
  /** All values that are contained in given list. */
  kind_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  /** Any other value that exists and is not equal to the given value. */
  kind_not?: InputMaybe<UserKind>;
  /** All values that are not contained in given list. */
  kind_not_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  picture_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  picture_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  picture_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  picture_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  picture_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  picture_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  picture_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  picture_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  picture_starts_with?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
};

export enum UserOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC',
  KindAsc = 'kind_ASC',
  KindDesc = 'kind_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PictureAsc = 'picture_ASC',
  PictureDesc = 'picture_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type UserUpdateManyInlineInput = {
  /** Connect multiple existing User documents */
  connect?: InputMaybe<Array<UserConnectInput>>;
  /** Disconnect multiple User documents */
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing User documents */
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserUpdateOneInlineInput = {
  /** Connect existing User document */
  connect?: InputMaybe<UserWhereUniqueInput>;
  /** Disconnect currently connected User document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

/** This contains a set of filters that can be used to compare values internally */
export type UserWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type UserWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  documentInStages_every?: InputMaybe<UserWhereStageInput>;
  documentInStages_none?: InputMaybe<UserWhereStageInput>;
  documentInStages_some?: InputMaybe<UserWhereStageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']['input']>;
  kind?: InputMaybe<UserKind>;
  /** All values that are contained in given list. */
  kind_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  /** Any other value that exists and is not equal to the given value. */
  kind_not?: InputMaybe<UserKind>;
  /** All values that are not contained in given list. */
  kind_not_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  picture_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  picture_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  picture_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  picture_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  picture_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  picture_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  picture_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  picture_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  picture_starts_with?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type UserWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<UserWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References User record uniquely */
export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Version = {
  __typename?: 'Version';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  revision: Scalars['Int']['output'];
  stage: Stage;
};

export type VersionWhereInput = {
  id: Scalars['ID']['input'];
  revision: Scalars['Int']['input'];
  stage: Stage;
};

export enum _FilterKind {
  And = 'AND',
  Not = 'NOT',
  Or = 'OR',
  Contains = 'contains',
  ContainsAll = 'contains_all',
  ContainsNone = 'contains_none',
  ContainsSome = 'contains_some',
  EndsWith = 'ends_with',
  Eq = 'eq',
  EqNot = 'eq_not',
  Gt = 'gt',
  Gte = 'gte',
  In = 'in',
  JsonPathExists = 'json_path_exists',
  JsonValueRecursive = 'json_value_recursive',
  Lt = 'lt',
  Lte = 'lte',
  NotContains = 'not_contains',
  NotEndsWith = 'not_ends_with',
  NotIn = 'not_in',
  NotStartsWith = 'not_starts_with',
  RelationalEvery = 'relational_every',
  RelationalNone = 'relational_none',
  RelationalSingle = 'relational_single',
  RelationalSome = 'relational_some',
  Search = 'search',
  StartsWith = 'starts_with',
  UnionEmpty = 'union_empty',
  UnionEvery = 'union_every',
  UnionNone = 'union_none',
  UnionSingle = 'union_single',
  UnionSome = 'union_some'
}

export enum _MutationInputFieldKind {
  Enum = 'enum',
  Relation = 'relation',
  RichText = 'richText',
  RichTextWithEmbeds = 'richTextWithEmbeds',
  Scalar = 'scalar',
  Union = 'union',
  Virtual = 'virtual'
}

export enum _MutationKind {
  Create = 'create',
  Delete = 'delete',
  DeleteMany = 'deleteMany',
  Publish = 'publish',
  PublishMany = 'publishMany',
  SchedulePublish = 'schedulePublish',
  ScheduleUnpublish = 'scheduleUnpublish',
  Unpublish = 'unpublish',
  UnpublishMany = 'unpublishMany',
  Update = 'update',
  UpdateMany = 'updateMany',
  Upsert = 'upsert'
}

export enum _OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum _RelationInputCardinality {
  Many = 'many',
  One = 'one'
}

export enum _RelationInputKind {
  Create = 'create',
  Update = 'update'
}

export enum _RelationKind {
  Regular = 'regular',
  Union = 'union'
}

export enum _SystemDateTimeFieldVariation {
  Base = 'base',
  Combined = 'combined',
  Localization = 'localization'
}

export type MultiToManyReferenceMultiToManyReference = Model1 | Model3;

export type MultiToManyReferenceMultiToManyReferenceConnectInput = {
  Model1?: InputMaybe<Model1ConnectInput>;
  Model3?: InputMaybe<Model3ConnectInput>;
};

export type MultiToManyReferenceMultiToManyReferenceCreateInput = {
  Model1?: InputMaybe<Model1CreateInput>;
  Model3?: InputMaybe<Model3CreateInput>;
};

export type MultiToManyReferenceMultiToManyReferenceCreateManyInlineInput = {
  /** Connect multiple existing multiToManyReferenceMultiToManyReference documents */
  connect?: InputMaybe<Array<MultiToManyReferenceMultiToManyReferenceWhereUniqueInput>>;
  /** Create and connect multiple existing multiToManyReferenceMultiToManyReference documents */
  create?: InputMaybe<Array<MultiToManyReferenceMultiToManyReferenceCreateInput>>;
};

export type MultiToManyReferenceMultiToManyReferenceCreateOneInlineInput = {
  /** Connect one existing multiToManyReferenceMultiToManyReference document */
  connect?: InputMaybe<MultiToManyReferenceMultiToManyReferenceWhereUniqueInput>;
  /** Create and connect one multiToManyReferenceMultiToManyReference document */
  create?: InputMaybe<MultiToManyReferenceMultiToManyReferenceCreateInput>;
};

export type MultiToManyReferenceMultiToManyReferenceUpdateInput = {
  Model1?: InputMaybe<Model1UpdateInput>;
  Model3?: InputMaybe<Model3UpdateInput>;
};

export type MultiToManyReferenceMultiToManyReferenceUpdateManyInlineInput = {
  /** Connect multiple existing multiToManyReferenceMultiToManyReference documents */
  connect?: InputMaybe<Array<MultiToManyReferenceMultiToManyReferenceConnectInput>>;
  /** Create and connect multiple multiToManyReferenceMultiToManyReference documents */
  create?: InputMaybe<Array<MultiToManyReferenceMultiToManyReferenceCreateInput>>;
  /** Delete multiple multiToManyReferenceMultiToManyReference documents */
  delete?: InputMaybe<Array<MultiToManyReferenceMultiToManyReferenceWhereUniqueInput>>;
  /** Disconnect multiple multiToManyReferenceMultiToManyReference documents */
  disconnect?: InputMaybe<Array<MultiToManyReferenceMultiToManyReferenceWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing multiToManyReferenceMultiToManyReference documents */
  set?: InputMaybe<Array<MultiToManyReferenceMultiToManyReferenceWhereUniqueInput>>;
  /** Update multiple multiToManyReferenceMultiToManyReference documents */
  update?: InputMaybe<Array<MultiToManyReferenceMultiToManyReferenceUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple multiToManyReferenceMultiToManyReference documents */
  upsert?: InputMaybe<Array<MultiToManyReferenceMultiToManyReferenceUpsertWithNestedWhereUniqueInput>>;
};

export type MultiToManyReferenceMultiToManyReferenceUpdateManyWithNestedWhereInput = {
  Model1?: InputMaybe<Model1UpdateManyWithNestedWhereInput>;
  Model3?: InputMaybe<Model3UpdateManyWithNestedWhereInput>;
};

export type MultiToManyReferenceMultiToManyReferenceUpdateOneInlineInput = {
  /** Connect existing multiToManyReferenceMultiToManyReference document */
  connect?: InputMaybe<MultiToManyReferenceMultiToManyReferenceWhereUniqueInput>;
  /** Create and connect one multiToManyReferenceMultiToManyReference document */
  create?: InputMaybe<MultiToManyReferenceMultiToManyReferenceCreateInput>;
  /** Delete currently connected multiToManyReferenceMultiToManyReference document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected multiToManyReferenceMultiToManyReference document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single multiToManyReferenceMultiToManyReference document */
  update?: InputMaybe<MultiToManyReferenceMultiToManyReferenceUpdateWithNestedWhereUniqueInput>;
  /** Upsert single multiToManyReferenceMultiToManyReference document */
  upsert?: InputMaybe<MultiToManyReferenceMultiToManyReferenceUpsertWithNestedWhereUniqueInput>;
};

export type MultiToManyReferenceMultiToManyReferenceUpdateWithNestedWhereUniqueInput = {
  Model1?: InputMaybe<Model1UpdateWithNestedWhereUniqueInput>;
  Model3?: InputMaybe<Model3UpdateWithNestedWhereUniqueInput>;
};

export type MultiToManyReferenceMultiToManyReferenceUpsertWithNestedWhereUniqueInput = {
  Model1?: InputMaybe<Model1UpsertWithNestedWhereUniqueInput>;
  Model3?: InputMaybe<Model3UpsertWithNestedWhereUniqueInput>;
};

export type MultiToManyReferenceMultiToManyReferenceWhereInput = {
  Model1?: InputMaybe<Model1WhereInput>;
  Model3?: InputMaybe<Model3WhereInput>;
};

export type MultiToManyReferenceMultiToManyReferenceWhereUniqueInput = {
  Model1?: InputMaybe<Model1WhereUniqueInput>;
  Model3?: InputMaybe<Model3WhereUniqueInput>;
};

export type SingleToManyReference2MultiToOneReference2 = Model1 | Model3;

export type SingleToManyReference2MultiToOneReference2ConnectInput = {
  Model1?: InputMaybe<Model1ConnectInput>;
  Model3?: InputMaybe<Model3ConnectInput>;
};

export type SingleToManyReference2MultiToOneReference2CreateInput = {
  Model1?: InputMaybe<Model1CreateInput>;
  Model3?: InputMaybe<Model3CreateInput>;
};

export type SingleToManyReference2MultiToOneReference2CreateManyInlineInput = {
  /** Connect multiple existing singleToManyReference2MultiToOneReference2 documents */
  connect?: InputMaybe<Array<SingleToManyReference2MultiToOneReference2WhereUniqueInput>>;
  /** Create and connect multiple existing singleToManyReference2MultiToOneReference2 documents */
  create?: InputMaybe<Array<SingleToManyReference2MultiToOneReference2CreateInput>>;
};

export type SingleToManyReference2MultiToOneReference2CreateOneInlineInput = {
  /** Connect one existing singleToManyReference2MultiToOneReference2 document */
  connect?: InputMaybe<SingleToManyReference2MultiToOneReference2WhereUniqueInput>;
  /** Create and connect one singleToManyReference2MultiToOneReference2 document */
  create?: InputMaybe<SingleToManyReference2MultiToOneReference2CreateInput>;
};

export type SingleToManyReference2MultiToOneReference2UpdateInput = {
  Model1?: InputMaybe<Model1UpdateInput>;
  Model3?: InputMaybe<Model3UpdateInput>;
};

export type SingleToManyReference2MultiToOneReference2UpdateManyInlineInput = {
  /** Connect multiple existing singleToManyReference2MultiToOneReference2 documents */
  connect?: InputMaybe<Array<SingleToManyReference2MultiToOneReference2ConnectInput>>;
  /** Create and connect multiple singleToManyReference2MultiToOneReference2 documents */
  create?: InputMaybe<Array<SingleToManyReference2MultiToOneReference2CreateInput>>;
  /** Delete multiple singleToManyReference2MultiToOneReference2 documents */
  delete?: InputMaybe<Array<SingleToManyReference2MultiToOneReference2WhereUniqueInput>>;
  /** Disconnect multiple singleToManyReference2MultiToOneReference2 documents */
  disconnect?: InputMaybe<Array<SingleToManyReference2MultiToOneReference2WhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing singleToManyReference2MultiToOneReference2 documents */
  set?: InputMaybe<Array<SingleToManyReference2MultiToOneReference2WhereUniqueInput>>;
  /** Update multiple singleToManyReference2MultiToOneReference2 documents */
  update?: InputMaybe<Array<SingleToManyReference2MultiToOneReference2UpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple singleToManyReference2MultiToOneReference2 documents */
  upsert?: InputMaybe<Array<SingleToManyReference2MultiToOneReference2UpsertWithNestedWhereUniqueInput>>;
};

export type SingleToManyReference2MultiToOneReference2UpdateManyWithNestedWhereInput = {
  Model1?: InputMaybe<Model1UpdateManyWithNestedWhereInput>;
  Model3?: InputMaybe<Model3UpdateManyWithNestedWhereInput>;
};

export type SingleToManyReference2MultiToOneReference2UpdateOneInlineInput = {
  /** Connect existing singleToManyReference2MultiToOneReference2 document */
  connect?: InputMaybe<SingleToManyReference2MultiToOneReference2WhereUniqueInput>;
  /** Create and connect one singleToManyReference2MultiToOneReference2 document */
  create?: InputMaybe<SingleToManyReference2MultiToOneReference2CreateInput>;
  /** Delete currently connected singleToManyReference2MultiToOneReference2 document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected singleToManyReference2MultiToOneReference2 document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single singleToManyReference2MultiToOneReference2 document */
  update?: InputMaybe<SingleToManyReference2MultiToOneReference2UpdateWithNestedWhereUniqueInput>;
  /** Upsert single singleToManyReference2MultiToOneReference2 document */
  upsert?: InputMaybe<SingleToManyReference2MultiToOneReference2UpsertWithNestedWhereUniqueInput>;
};

export type SingleToManyReference2MultiToOneReference2UpdateWithNestedWhereUniqueInput = {
  Model1?: InputMaybe<Model1UpdateWithNestedWhereUniqueInput>;
  Model3?: InputMaybe<Model3UpdateWithNestedWhereUniqueInput>;
};

export type SingleToManyReference2MultiToOneReference2UpsertWithNestedWhereUniqueInput = {
  Model1?: InputMaybe<Model1UpsertWithNestedWhereUniqueInput>;
  Model3?: InputMaybe<Model3UpsertWithNestedWhereUniqueInput>;
};

export type SingleToManyReference2MultiToOneReference2WhereInput = {
  Model1?: InputMaybe<Model1WhereInput>;
  Model3?: InputMaybe<Model3WhereInput>;
};

export type SingleToManyReference2MultiToOneReference2WhereUniqueInput = {
  Model1?: InputMaybe<Model1WhereUniqueInput>;
  Model3?: InputMaybe<Model3WhereUniqueInput>;
};

export type SingleToOneReferenceMultiToOneReference = Model1 | Model3;

export type SingleToOneReferenceMultiToOneReferenceConnectInput = {
  Model1?: InputMaybe<Model1ConnectInput>;
  Model3?: InputMaybe<Model3ConnectInput>;
};

export type SingleToOneReferenceMultiToOneReferenceCreateInput = {
  Model1?: InputMaybe<Model1CreateInput>;
  Model3?: InputMaybe<Model3CreateInput>;
};

export type SingleToOneReferenceMultiToOneReferenceCreateManyInlineInput = {
  /** Connect multiple existing singleToOneReferenceMultiToOneReference documents */
  connect?: InputMaybe<Array<SingleToOneReferenceMultiToOneReferenceWhereUniqueInput>>;
  /** Create and connect multiple existing singleToOneReferenceMultiToOneReference documents */
  create?: InputMaybe<Array<SingleToOneReferenceMultiToOneReferenceCreateInput>>;
};

export type SingleToOneReferenceMultiToOneReferenceCreateOneInlineInput = {
  /** Connect one existing singleToOneReferenceMultiToOneReference document */
  connect?: InputMaybe<SingleToOneReferenceMultiToOneReferenceWhereUniqueInput>;
  /** Create and connect one singleToOneReferenceMultiToOneReference document */
  create?: InputMaybe<SingleToOneReferenceMultiToOneReferenceCreateInput>;
};

export type SingleToOneReferenceMultiToOneReferenceUpdateInput = {
  Model1?: InputMaybe<Model1UpdateInput>;
  Model3?: InputMaybe<Model3UpdateInput>;
};

export type SingleToOneReferenceMultiToOneReferenceUpdateManyInlineInput = {
  /** Connect multiple existing singleToOneReferenceMultiToOneReference documents */
  connect?: InputMaybe<Array<SingleToOneReferenceMultiToOneReferenceConnectInput>>;
  /** Create and connect multiple singleToOneReferenceMultiToOneReference documents */
  create?: InputMaybe<Array<SingleToOneReferenceMultiToOneReferenceCreateInput>>;
  /** Delete multiple singleToOneReferenceMultiToOneReference documents */
  delete?: InputMaybe<Array<SingleToOneReferenceMultiToOneReferenceWhereUniqueInput>>;
  /** Disconnect multiple singleToOneReferenceMultiToOneReference documents */
  disconnect?: InputMaybe<Array<SingleToOneReferenceMultiToOneReferenceWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing singleToOneReferenceMultiToOneReference documents */
  set?: InputMaybe<Array<SingleToOneReferenceMultiToOneReferenceWhereUniqueInput>>;
  /** Update multiple singleToOneReferenceMultiToOneReference documents */
  update?: InputMaybe<Array<SingleToOneReferenceMultiToOneReferenceUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple singleToOneReferenceMultiToOneReference documents */
  upsert?: InputMaybe<Array<SingleToOneReferenceMultiToOneReferenceUpsertWithNestedWhereUniqueInput>>;
};

export type SingleToOneReferenceMultiToOneReferenceUpdateManyWithNestedWhereInput = {
  Model1?: InputMaybe<Model1UpdateManyWithNestedWhereInput>;
  Model3?: InputMaybe<Model3UpdateManyWithNestedWhereInput>;
};

export type SingleToOneReferenceMultiToOneReferenceUpdateOneInlineInput = {
  /** Connect existing singleToOneReferenceMultiToOneReference document */
  connect?: InputMaybe<SingleToOneReferenceMultiToOneReferenceWhereUniqueInput>;
  /** Create and connect one singleToOneReferenceMultiToOneReference document */
  create?: InputMaybe<SingleToOneReferenceMultiToOneReferenceCreateInput>;
  /** Delete currently connected singleToOneReferenceMultiToOneReference document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected singleToOneReferenceMultiToOneReference document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single singleToOneReferenceMultiToOneReference document */
  update?: InputMaybe<SingleToOneReferenceMultiToOneReferenceUpdateWithNestedWhereUniqueInput>;
  /** Upsert single singleToOneReferenceMultiToOneReference document */
  upsert?: InputMaybe<SingleToOneReferenceMultiToOneReferenceUpsertWithNestedWhereUniqueInput>;
};

export type SingleToOneReferenceMultiToOneReferenceUpdateWithNestedWhereUniqueInput = {
  Model1?: InputMaybe<Model1UpdateWithNestedWhereUniqueInput>;
  Model3?: InputMaybe<Model3UpdateWithNestedWhereUniqueInput>;
};

export type SingleToOneReferenceMultiToOneReferenceUpsertWithNestedWhereUniqueInput = {
  Model1?: InputMaybe<Model1UpsertWithNestedWhereUniqueInput>;
  Model3?: InputMaybe<Model3UpsertWithNestedWhereUniqueInput>;
};

export type SingleToOneReferenceMultiToOneReferenceWhereInput = {
  Model1?: InputMaybe<Model1WhereInput>;
  Model3?: InputMaybe<Model3WhereInput>;
};

export type SingleToOneReferenceMultiToOneReferenceWhereUniqueInput = {
  Model1?: InputMaybe<Model1WhereUniqueInput>;
  Model3?: InputMaybe<Model3WhereUniqueInput>;
};

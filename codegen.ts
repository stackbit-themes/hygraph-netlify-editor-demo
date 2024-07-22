import { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const config: CodegenConfig = {
  schema: process.env.HYGRAPH_ENDPOINT,
  documents: ['./**/*.tsx', './**/*.ts', '!src/gql/**/*', '!hygraph-content-source/**/*'],
  generates: {
    './gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;

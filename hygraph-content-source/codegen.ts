import type { CodegenConfig } from '@graphql-codegen/cli';

import path from 'path';
import { fileURLToPath } from 'url';
import { config as dotenvConfig } from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenvConfig({ path: path.join(__dirname, '../.env') });

const config: CodegenConfig = {
    overwrite: true,
    generates: {
        './src/gql-types/gql-management-types.ts': {
            schema: {
                [process.env.HYGRAPH_MANAGEMENT_API!]: {
                    headers: {
                        Authorization: process.env.HYGRAPH_MANAGEMENT_TOKEN!
                    }
                }
            },
            plugins: ['typescript']
        },
        './src/gql-types/gql-content-types.ts': {
            schema: process.env.HYGRAPH_ENDPOINT!,
            plugins: ['typescript']
        }
    }
};

export default config;

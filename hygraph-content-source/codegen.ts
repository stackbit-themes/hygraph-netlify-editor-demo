import type { CodegenConfig } from '@graphql-codegen/cli';

import path from 'path';
import { fileURLToPath } from 'url';
import { config as dotenvConfig } from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenvConfig({ path: path.join(__dirname, '../.env') });

const config: CodegenConfig = {
    overwrite: true,
    schema: {
        [process.env.HYGRAPH_MANAGEMENT_API!]: {
            headers: {
                Authorization: process.env.HYGRAPH_MANAGEMENT_TOKEN!
            }
        }
    },
    generates: {
        './src/gql-types.ts': {
            plugins: ['typescript']
        }
    }
};

export default config;

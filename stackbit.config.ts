import type * as StackbitTypes from '@stackbit/types';
import { defineStackbitConfig } from '@stackbit/types';
import { HygraphContentSource } from './hygraph-content-source/src';

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'nextjs',
  nodeVersion: '20',
  contentSources: [
    new HygraphContentSource({
      projectId: process.env.HYGRAPH_PROJECT_ID!,
      region: process.env.HYGRAPH_REGION!,
      environment: process.env.HYGRAPH_ENVIRONMENT!,
      contentApi: process.env.HYGRAPH_ENDPOINT!,
      managementApi: process.env.HYGRAPH_MANAGEMENT_API!,
      managementToken: process.env.HYGRAPH_MANAGEMENT_TOKEN!
    })
  ],
  modelExtensions: [
    {
      type: 'page',
      name: 'Page',
      fields: [
        { name: 'slug', required: true },
      ],
    },
    {
      type: 'page',
      name: 'Pdp',
      fields: [
        { name: 'slug', required: true },
      ],
    }
  ],
  sitemap: (options) => {
    const pageModels = ['Page', 'Pdp'];
    return options.documents.filter((document) => pageModels.includes(document.modelName)).map((document) => {
      const slug = (document.fields.slug as StackbitTypes.DocumentStringLikeFieldNonLocalized)?.value;
      const urlPath = slug === 'home' ? '/' : document.modelName === 'Pdp' ? `/pdp/${slug}` : slug;

      return {
        urlPath: urlPath,
        document: document
      }
    })
  }
});

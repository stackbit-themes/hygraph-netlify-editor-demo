import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://skncre-starter-next.vercel.app/',
      lastModified: new Date(),
    },
    {
      url: 'https://skncre-starter-next.vercel.app/pdp/face-serum',
      lastModified: new Date(),
    },
    {
      url: 'https://skncre-starter-next.vercel.app/pdp/face-cream',
      lastModified: new Date(),
    },
    {
      url: 'https://skncre-starter-next.vercel.app/pdp/eye-contour',
      lastModified: new Date(),
    },
    {
      url: 'https://skncre-starter-next.vercel.app/pdp/bundle',
      lastModified: new Date(),
    },
  ]
}
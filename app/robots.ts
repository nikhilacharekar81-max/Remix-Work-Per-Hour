import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/workstream/',
          '/checkout/',
          '/payouts/',
        ],
      },
    ],
    sitemap: 'https://workperhour.com/sitemap.xml',
  };
}

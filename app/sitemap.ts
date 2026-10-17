import type { MetadataRoute } from 'next';
import { SEED_GIGS, SEED_PROJECTS } from '../src/data/completeSeedDataset';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://workperhour.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/gigs`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/freelancers`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  const gigRoutes: MetadataRoute.Sitemap = (SEED_GIGS || []).map((gig) => ({
    url: `${baseUrl}/gigs/${gig.slug || gig.id}`,
    lastModified: new Date((gig as any).createdAt || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = (SEED_PROJECTS || []).map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(project.createdAt || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...gigRoutes, ...projectRoutes];
}

import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Fetch your posts from your backend
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?limit=1000`);
  const { data: posts } = await response.json();

  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';

  // 2. Map posts to sitemap format
  const postEntries: MetadataRoute.Sitemap = posts.map((post: { slug: any; publishedAt: any; updatedAt: any; }) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: new Date(post.publishedAt || post.updatedAt),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  // 3. Add static pages
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // Add contact, privacy, etc.
  ];

  return [...staticEntries, ...postEntries];
}
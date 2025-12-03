import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Fetch your posts from your NestJS Backend
  // We ask for a large limit to get as many recent posts as possible
  let posts = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?limit=1000`);
    const json = await res.json();
    posts = json.data || [];
  } catch (error) {
    console.error("Sitemap Fetch Error:", error);
  }

  const baseUrl = 'https://knowyourviews.com'; // Change this to your real domain later

  // 2. Map posts to sitemap format
  const postEntries: MetadataRoute.Sitemap = posts.map((post: { slug: string; publishedAt: string; updatedAt: string; }) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: new Date(post.publishedAt || post.updatedAt),
    changeFrequency: 'daily',
    priority: 0.7, // Articles are high priority
  }));

  // 3. Add static pages (Home, About, etc.)
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
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  return [...staticEntries, ...postEntries];
}
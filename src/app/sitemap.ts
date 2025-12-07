import { MetadataRoute } from 'next';

// 1. Helper to safely parse dates or fallback to 'now'
// This prevents the "RangeError: Invalid time value" crash
const safeDate = (dateStr: string | null | undefined): Date => {
  if (!dateStr) return new Date();
  const date = new Date(dateStr);
  // Check if the date is actually valid
  return isNaN(date.getTime()) ? new Date() : date;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts = [];
  
  // 2. Use a Fallback URL if env var is missing during build
  // (Sometimes env vars aren't loaded during 'npm run build')
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  try {
    // Ensure we are fetching from the correct URL
    const res = await fetch(`${apiUrl}/posts?limit=1000`, {
      cache: 'no-store' // Ensure we get fresh data
    });
    
    if (res.ok) {
      const json = await res.json();
      posts = json.data || [];
    }
  } catch (error) {
    console.error("Sitemap Fetch Error:", error);
    // Continue with empty posts array so build doesn't fail completely
  }

  const baseUrl = 'https://knowyourviews.com'; 

  // 3. Map posts using the safeDate helper
  const postEntries: MetadataRoute.Sitemap = posts.map((post: { slug: string; publishedAt: string; updatedAt: string; }) => ({
    url: `${baseUrl}/news/${post.slug}`,
    // FIX IS HERE:
    lastModified: safeDate(post.publishedAt || post.updatedAt),
    changeFrequency: 'daily',
    priority: 0.7, 
  }));

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
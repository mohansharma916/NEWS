import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL; // Change to your real domain

  return {
    rules: {
      userAgent: '*', // For all bots (Google, Bing, etc.)
      allow: '/',
      disallow: [
        '/admin/', // Protect your admin routes
        '/api/',   // Don't index your API calls
        '/search', // Don't index search results (prevents "search spam")
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
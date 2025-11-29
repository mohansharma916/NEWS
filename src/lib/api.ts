// lib/api.ts

// 1. Define the interface based on our NestJS Prisma Schema
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
  category?: {
    name: string;
    slug: string;
  };
  author?: {
    fullName: string;
    avatarUrl: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// 2. Fetch Trending Posts (For Carousel)
export async function getTrendingPosts(): Promise<Article[]> {
  const res = await fetch(`${API_URL}/posts/trending`, {
    cache: "no-store", // Ensure fresh news
  });
  if (!res.ok) return [];
  return res.json();
}

export async function getPostsByCategory(
  categorySlug: string, 
  page = 1, 
  limit = 10
): Promise<Article[]> { // We can keep returning Article[] to not break UI yet
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?category=${categorySlug}&page=${page}&limit=${limit}`, 
    { next: { revalidate: 60 } }
  );
  
  if (!res.ok) return [];
  const json = await res.json();
  
  // Return just the data array to keep your components happy for now
  return json.data; 
}


export async function getArticleBySlug(slug: string): Promise<Article | null> {
  // Use the backend URL (localhost:3001)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/posts/${slug}`, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!res.ok) return null;
  
  return res.json();
}


export async function incrementViewCount(postId: string): Promise<void> {
  // Fire and forget - we don't need to wait for the result
  fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/posts/${postId}/view`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  }).catch((err) => console.error("View count failed", err));
}
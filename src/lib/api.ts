// lib/api.ts

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
  category?: Category;
  author?: AuthorProfile
}


export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

// lib/api.ts

export interface AuthorProfile {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  bio: string | null;           // Nullable
  twitterHandle: string | null; // Nullable
  linkedinUrl: string | null;   // Nullable
  websiteUrl: string | null;    // Nullable
  posts: Array<{
    id: string;
    title: string;
    slug: string;
    coverImage: string;
    excerpt: string;
    publishedAt: string;
  }>;
}



// Global constant to ensure consistency
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

console.log("API_URL is set to:", API_URL); // Debug log

// 1. Fetch Trending Posts (The LCP Critical Path)
export async function getTrendingPosts(): Promise<Article[]> {
  const res = await fetch(`${API_URL}/posts/trending`, {
    
    // CHANGE: "no-store" -> revalidate: 60
    // This makes the homepage INSTANT for 99% of users.
    // Next.js serves the cached HTML from RAM, then updates it in the background.
    next: { revalidate: 60 } 
  });

  if (!res.ok) return [];
  console.log("Fetched trending posts",await res.clone().json()); // Debug log
  return res.json();
}




export async function getAuthorById(id: string): Promise<AuthorProfile | null> {
  console.log("Fetching author with ID:", id);
  const res = await fetch(`${API_URL}/users/${id}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) return null;
  return res.json();
}


export async function getAllCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`, {
    // CHANGE: "no-store" -> revalidate: 60
    // This makes the homepage INSTANT for 99% of users.
    // Next.js serves the cached HTML from RAM, then updates it in the background.
    next: { revalidate: 3600 } 
  });
  
  if (!res.ok) return [];
  return res.json();
}

export async function getPostsByCategory(
  categorySlug: string, 
  page = 1, 
  limit = 10
): Promise<Article[]> { 
  const res = await fetch(
    `${API_URL}/posts?category=${categorySlug}&page=${page}&limit=${limit}`, 
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return [];
  const json = await res.json();
  
  // Return just the data array
  return json.data; 
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const res = await fetch(`${API_URL}/posts/${slug}`, {
    next: { revalidate: 60 }, 
  });

  if (!res.ok) return null;
  return res.json();
}

export async function incrementViewCount(postId: string): Promise<void> {
  // Fire and forget - Keep 'no-store' here because this is an ACTION, not data fetching.
  // We don't want to cache the "vote".
  fetch(`${API_URL}/posts/${postId}/view`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  }).catch((err) => console.error("View count failed", err));
}
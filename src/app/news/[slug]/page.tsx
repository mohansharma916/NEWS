import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "../../../lib/api";
import { calculateReadingTime, getDate } from "utils/Utility";
import { ClockIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Breadcrumbs from "components/Breadcrumbs";
import ViewCounter from "components/ViewCounter";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// ==========================================
// 1. DYNAMIC SEO METADATA (OPTIMIZED)
// ==========================================
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  const previousImages = (await parent).openGraph?.images || [];
  
  // SEO 1: Define the specific URL (Canonical)
  const pageUrl = `https://knowyourviews.com/news/${article.slug}`;

  // SEO 2: Generate Keywords
  // We combine the Category + generic terms. 
  // Ideally, your API should return a 'tags' array (e.g., ["Politics", "Modi", "Election"])
  const keywords = [
    article.category?.name || "News",
    "Latest News",
    "India News", 
    "World News",
    "Know Your Views",
    ...(article.title.split(" ").slice(0, 5)) // Heuristic: Use first 5 words of title as keywords
  ];

  return {
    // SEO 3: Title Template (Includes Brand Name)
    title: `${article.title} | Know Your Views`, 
    description: article.excerpt || "Read the latest news on Know Your Views.",
    
    // SEO 4: Explicit Keywords Tag
    keywords: keywords,

    // SEO 5: Canonical URL (Crucial for authority)
    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      title: article.title,
      description: article.excerpt || "Read the latest news on Know Your Views.",
      url: pageUrl,
      siteName: "Know Your Views",
      images: [
        {
          url: article.coverImage || "/images/og-default.jpg",
          width: 1200,
          height: 630,
          alt: article.title,
        },
        ...previousImages,
      ],
      locale: "en_US",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt, // Helpful for Google News
      section: article.category?.name, // Helps categorize content
      authors: [article.author?.fullName || "Editorial Team"],
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || "Read the latest news.",
      images: [article.coverImage || "/images/og-default.jpg"],
      creator: "@knowyourviews",
    },
  };
}

// ==========================================
// 2. MAIN PAGE COMPONENT
// ==========================================
export default async function ArticlePage(props: Props) {
  const params = await props.params;
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }


  const readingTime = calculateReadingTime(article.content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    image: [article.coverImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    description: article.excerpt, // Added description to Schema
    author: [{
      '@type': 'Person',
      name: article.author?.fullName || 'Editorial Team',
      url: 'https://knowyourviews.com/about'
    }],
    publisher: {
      '@type': 'Organization',
      name: 'Know Your Views',
      logo: {
        '@type': 'ImageObject',
        url: 'https://knowyourviews.com/logo.png' // Update this
      }
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <ViewCounter postId={article.id} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to News
          </Link>

          <div className="hidden md:block">
            <Breadcrumbs category={article.category} title={article.title} />
          </div>

          <div className="flex items-center space-x-4">
             <span className="text-xs text-gray-400">Share</span>
          </div>
        </div>
      </div>

      {/* SEO: Use semantic 'article' tag */}
      <article className="mx-auto flex w-full max-w-[110rem] flex-col pb-20">
        
        {/* Hero Section */}
        <div className="relative h-[20rem] w-full md:h-[30rem] lg:h-[35rem]">
          <Image
            src={article.coverImage || "/images/placeholder.jpg"}
            alt={article.title} // Ensure this has keywords in CMS
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 md:p-10 lg:p-16">
            <div className="mx-auto max-w-4xl space-y-4">
              {article.category && (
                <Link 
                  href={`/?category=${article.category.slug}`}
                  className="inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white hover:bg-blue-700 md:text-sm"
                >
                  {article.category.name}
                </Link>
              )}
              {/* SEO: H1 is the most important tag. Ensure the title contains the main keyword. */}
              <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Meta Data Bar */}
        <div className="mx-auto -mt-8 w-full max-w-4xl px-5 relative z-10">
           <div className="flex flex-col items-start justify-between rounded-xl bg-white p-6 shadow-lg md:flex-row md:items-center">
              <div className="flex items-center space-x-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gray-100">
                  <Image
                    src={article.author?.avatarUrl || "https://avatars.githubusercontent.com/u/1?v=4"} 
                    alt={article.author?.fullName || "Author"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {article.author?.fullName || "Editorial Team"}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{getDate(article.publishedAt?.slice(0, 10) || "")}</span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                       <ClockIcon className="mr-1 h-4 w-4" /> {readingTime}
                    </span>
                  </div>
                </div>
              </div>
           </div>
        </div>

        {/* Content Body */}
        <div className="mx-auto mt-10 w-full max-w-3xl px-5">
          {/* SEO NOTE: The inner HTML should contain H2 and H3 tags with keywords. 
              This depends on the content coming from the Database, not React. */}
          <div 
            className="prose prose-lg prose-blue max-w-none text-gray-800 md:prose-xl"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>
    </main>
  );
}
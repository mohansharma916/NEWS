import { Suspense } from "react";
import Carousel from "components/Carousel";
import CategoryList from "components/CategoryList"; // I assume this displays the data
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { getTrendingPosts, getPostsByCategory } from "../lib/api";

// 1. Create a wrapper component to handle data fetching per category
// This isolates the slow fetches so they don't block the main page
async function CategorySection({ category, isMobile, heading }: { category: string, isMobile: boolean, heading: string }) {
  // This fetch happens independently now!
  const articles = await getPostsByCategory(category);
  
  return (
    <CategoryList
      isMobile={isMobile}
      article={articles}
      heading={heading}
    />
  );
}

// A simple Skeleton to show while specific categories load (Optional)
function CategorySkeleton() {
  return <div className="h-64 w-full animate-pulse rounded-lg bg-gray-200"></div>;
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const viewport = (searchParams.viewport as string) ?? "desktop";
  const isMobile = viewport === "mobile";

  // 1. Define the Organization Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaArticlesBlogOrganization',
    name: 'Know Your Views',
    url: 'https://knowyourviews.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://knowyourviews.com/logo.png', // <--- Make sure this image exists!
      width: 112,
      height: 112
    },
    // List your social profiles here to help Google verify your brand
    sameAs: [
      // 'https://www.facebook.com/knowyourviews',
      // 'https://twitter.com/knowyourviews',
      'https://www.instagram.com/knowyourviews'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      // telephone: '+91-1234567890', // Optional
      contactType: 'customer service',
      areaServed: 'IN'
    }
  };

  // 2. ONLY await the Critical LCP Data (Trending)
  // We want this to block slightly so the hero image arrives with the HTML (better LCP)
  const trendingArticles = await getTrendingPosts();

  return (
    <div className="m-0 mx-auto flex w-full max-w-[110rem] flex-col p-0">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* This renders INSTANTLY now, without waiting for the bottom categories */}
      <Carousel articles={trendingArticles} isMobile={isMobile} />

      <section className="flex w-full flex-col space-y-5 px-2.5 md:space-y-7 md:px-5 md:pt-7">
        
        <div className="flex flex-col px-2.5 md:px-0">
          <h2 className="truncate text-[1.15rem] md:text-[1.75rem]">Hot Topics</h2>
          <p className="flex items-center space-x-1 truncate text-xs text-gray-600 md:text-base">
            <span>Recommended based on latest trends</span>
            <QuestionMarkCircleIcon className="h-4 w-4 text-gray-600 md:h-5 md:w-5" />
          </p>
        </div>

        {/* 3. The Grid - Wrapped in Suspense */}
        {/* Each component fetches its own data independently. If 'Sports' is slow, only 'Sports' lags. */}
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          
          <Suspense fallback={<CategorySkeleton />}>
            <CategorySection category="india" heading="India" isMobile={isMobile} />
          </Suspense>

          <Suspense fallback={<CategorySkeleton />}>
            <CategorySection category="world" heading="World" isMobile={isMobile} />
          </Suspense>

          <Suspense fallback={<CategorySkeleton />}>
            <CategorySection category="technology" heading="Technology" isMobile={isMobile} />
          </Suspense>

          <Suspense fallback={<CategorySkeleton />}>
            <CategorySection category="business" heading="Business" isMobile={isMobile} />
          </Suspense>

          <Suspense fallback={<CategorySkeleton />}>
            <CategorySection category="sports" heading="Sports" isMobile={isMobile} />
          </Suspense>

          <Suspense fallback={<CategorySkeleton />}>
            <CategorySection category="entertainment" heading="Entertainment" isMobile={isMobile} />
          </Suspense>

        </div>
      </section>
    </div>
  );
}
import Carousel from "components/Carousel";
import CategoryList from "components/CategoryList";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { getTrendingPosts, getPostsByCategory } from "../lib/api";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const viewport = (searchParams.viewport as string) ?? "desktop";
  const isMobile = viewport === "mobile";

  // 1. Fetch Data in Parallel for Performance
  // We fetch Trending for the top, and 6 specific categories for the grid
  const [
    trendingArticles,
    indiaPosts,
    worldPosts,
    techPosts,
    businessPosts,
    sportsPosts,
    entertainmentPosts
  ] = await Promise.all([
    getTrendingPosts(),
    getPostsByCategory("india"),
    getPostsByCategory("world"),
    getPostsByCategory("technology"),
    getPostsByCategory("business"),
    getPostsByCategory("sports"),
    getPostsByCategory("entertainment")
  ]);

  return (
    <div className="m-0 mx-auto flex w-full max-w-[110rem] flex-col p-0">
      
      {/* 1. Carousel - Shows Trending/Hot News */}
      <Carousel articles={trendingArticles} isMobile={isMobile} />

      <section className="flex w-full flex-col space-y-5 px-2.5 md:space-y-7 md:px-5 md:pt-7">
        
        {/* Header */}
        <div className="flex flex-col px-2.5 md:px-0">
          <h2 className="truncate text-[1.15rem] md:text-[1.75rem]">Hot Topics</h2>
          <p className="flex items-center space-x-1 truncate text-xs text-gray-600 md:text-base">
            <span>Recommended based on latest trends</span>
            <QuestionMarkCircleIcon className="h-4 w-4 text-gray-600 md:h-5 md:w-5" />
          </p>
        </div>

        {/* 2. The Grid - Passing SPECIFIC data to each card */}
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          
          <CategoryList
            isMobile={isMobile}
            article={indiaPosts}
            heading="India"
          />
          <CategoryList
            isMobile={isMobile}
            article={worldPosts}
            heading="World"
          />
          <CategoryList
            isMobile={isMobile}
            article={techPosts}
            heading="Technology"
          />
          <CategoryList
            isMobile={isMobile}
            article={businessPosts}
            heading="Business"
          />
          <CategoryList
            isMobile={isMobile}
            article={sportsPosts}
            heading="Sports"
          />
          <CategoryList
            isMobile={isMobile}
            article={entertainmentPosts}
            heading="Entertainment"
          />
        </div>
      </section>
    </div>
  );
}
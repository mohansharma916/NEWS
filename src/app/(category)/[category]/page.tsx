import ResultList from "components/ResultList";
import { redirect } from "next/navigation";
import { getPostsByCategory } from "../../../lib/api"; // <--- Import the helper
import { Article } from "../../../lib/api";

type Props = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Category(props: Props) {
  const params = await props.params;
  const categorySlug = params.category;

  // 1. Safety Redirects
  if (!categorySlug || categorySlug === "Home") {
    redirect("/");
  }

  // 2. Fetch Data from NestJS Backend (Real DB)
  // We default to page 1, limit 20 for a category view
  console.log("Fetching articles for category page:", categorySlug);
  const articles: Article[] = await getPostsByCategory(categorySlug, 1, 20);

  // 3. Format the title (e.g., "technology" -> "Technology")
  const title = categorySlug
    .toString()
    .replaceAll("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="m-0 mx-auto flex w-full max-w-[70rem] flex-col p-0 py-5">
      <section className="flex w-full flex-col space-y-5 px-2.5 md:space-y-7 md:px-5 md:pt-7">
        <div className="flex flex-col px-2.5 md:px-0">
          <h2 className="truncate text-[1.15rem] md:text-[1.75rem]">
            {title}
          </h2>
          <p className="flex items-center space-x-1 truncate text-xs text-gray-600 md:text-base">
            {articles.length} results found
          </p>
        </div>
        
        {/* Pass data to the list component */}
        <ResultList article={articles} />
      </section>
    </div>
  );
}
import ResultList from "components/ResultList";
import { redirect } from "next/navigation";

type props = {
  searchParams: Promise<SearchParams>;
  params: Promise<{
    category: string;
  }>;
};

export default async function Category(props: props) {
  const searchParams = await props.searchParams;
  const category = (await props.params).category;
  const viewport = (await searchParams.viewport) ?? ("desktop" as string);
  const sortBy = (await searchParams.sortBy) ?? ("Relevancy" as string);
  const language = (await searchParams.language) ?? ("English" as string);
  const time =
    (await searchParams.time) ??
    new Date().toISOString().slice(0, 10).toString();

  if (!category) redirect("/");
  if (category === "Home") redirect("/");

  const data = await fetch("https://theviewisland.vercel.app/api", {
    method: "POST",
    body: JSON.stringify({
      sortBy: sortBy,
      time: time,
      language: language,
      viewport: viewport,
      q: category,
    }),
  });

  const articles = (await data.json()) as Articles[];

  return (
    <div className="m-0 mx-auto flex w-full max-w-[70rem] flex-col p-0 py-5">
      <section className="flex w-full flex-col space-y-5 px-2.5 md:space-y-7 md:px-5 md:pt-7">
        <div className="flex flex-col px-2.5 md:px-0">
          <h2 className="truncate text-[1.15rem] md:text-[1.75rem]">
            {category.toString().replaceAll("-", " ").replaceAll("%20", " ")}
          </h2>
          <p className="flex items-center space-x-1 truncate text-xs text-gray-600 md:text-base">
            {articles.length} results found
          </p>
        </div>
        <ResultList article={articles} />
      </section>
    </div>
  );
}

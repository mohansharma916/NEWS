import ResultList from "components/ResultList";
import SearchFilter from "components/SearchFilter";

type props = {
  searchParams: Promise<SearchParams>;
  params: Promise<{
    search: string;
  }>;
};

export default async function Search(props: props) {
  const searchParams = await props.searchParams;
  const search = (await props.params).search;
  const viewport = (await searchParams.viewport) ?? ("desktop" as string);
  const sortBy = (await searchParams.sortBy) ?? ("Relevancy" as string);
  const language = (await searchParams.language) ?? ("English" as string);
  const time =
    (await searchParams.time) ??
    new Date().toISOString().slice(0, 10).toString();

  const data = await fetch("https://theviewisland.vercel.app/api", {
    method: "POST",
    body: JSON.stringify({
      sortBy: sortBy,
      time: time,
      language: language,
      viewport: viewport,
      q: search,
    }),
  });

  const articles = (await data.json()) as Articles[];

  return (
    <div className="m-0 mx-auto flex w-full max-w-[70rem] flex-col p-0 py-5">
      <SearchFilter />
      <section className="z-10 flex w-full flex-col space-y-5 bg-white px-2.5 md:space-y-7 md:px-5 md:pt-7">
        <div className="flex flex-col px-2.5 md:px-0">
          <h2 className="truncate text-[1.15rem] md:text-[1.75rem]">
            {search.toString().replaceAll("-", " ").replaceAll("%20", " ")}
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

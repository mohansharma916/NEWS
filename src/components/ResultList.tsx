import Image from "next/image";
import Link from "next/link";
import { getDate } from "utils/Utility";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

export default function ResultList({ article }: Carousel) {
  return (
    <ul className="flex w-full flex-col space-y-5">
      {article.map((data, idx) => {
        return (
          <li key={idx} className="flex w-full rounded-xl md:rounded-2xl">
            <Link
              href={data.url ?? "#"}
              className="group flex w-full flex-col space-y-5 rounded-xl bg-gray-100 p-2.5 md:flex-row md:space-x-10 md:space-y-0 md:rounded-2xl md:p-5"
            >
              <div className="flex w-full flex-col space-y-2.5 md:max-w-[18.75rem] md:space-y-5">
                <Image
                  height={300}
                  width={300}
                  src={data.urlToImage ?? "/placeholder-image.png"}
                  alt={data.title ?? ""}
                  className="w-full rounded-xl object-cover md:max-h-[9.375rem] md:min-h-[9.375rem] md:min-w-[18.75rem] md:max-w-[18.75rem] md:rounded-2xl"
                />
                <h2 className="line-clamp-3 text-ellipsis text-base md:text-xl md:group-hover:underline md:group-hover:underline-offset-4">
                  {data.title}
                </h2>
                <h6 className="flex items-center truncate text-[0.6875rem] text-xs text-gray-700 md:text-sm">
                  <span>
                    {getDate(data.publishedAt?.slice(0, 10).replace(" ", "-"))}
                  </span>
                  {data.author && data.author.length > 0 && (
                    <>
                      <span className="mx-1 md:mx-2">•</span>
                      <span className="truncate font-semibold">
                        {data.author}
                      </span>
                    </>
                  )}
                </h6>
              </div>
              <span className="flex h-0.5 w-full bg-gray-200 md:hidden" />
              <div className="flex w-full flex-col justify-between space-y-2.5 md:space-y-5">
                <div className="flex w-full flex-col space-y-2.5 md:space-y-5">
                  <div className="flex w-full flex-col space-y-3">
                    <h6 className="text-sm font-semibold text-gray-600">
                      {data?.source?.name ?? ""}
                    </h6>
                    <p className="line-clamp-3 text-ellipsis text-[0.9375rem] md:text-xl">
                      {data.description ?? ""}
                    </p>
                  </div>
                  <p className="line-clamp-5 text-ellipsis text-xs leading-5 text-gray-500 md:text-base">
                    {data.content ?? ""}
                  </p>
                </div>
                <div className="flex w-full items-center justify-end space-x-1 md:space-x-2.5">
                  <p className="text-xs text-gray-500 md:text-[0.9375rem]">
                    Read more
                  </p>
                  <ArrowUpCircleIcon className="h-8 w-8 rotate-90 stroke-1 text-gray-400 md:h-10 md:w-10" />
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

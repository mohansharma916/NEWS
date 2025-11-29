import { ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { getDate, formattedTitle } from "utils/Utility";
import { Article } from "../lib/api"; 
import MarketWidget from "./MarketWidget";

// Define the expected props
type Props = {
  article: Article[];
};

export default function GridCarousel({ article }: Props) {
  // Safety check to prevent crashes if fewer articles are returned
  if (!article || article.length < 1) return null;

  return (
    <div className="grid h-[32rem] w-full grid-cols-2 gap-2.5 px-2.5 md:h-[50rem] md:grid-cols-3 md:px-5 lg:h-[55rem] xl:grid-cols-4">
      {/* COLUMN 1 (Main Feature + 2 Small) */}
      <div className="col-span-2 flex h-full w-full flex-col space-y-2.5">
        
        {/* Main Article [0] */}
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-gray-100 md:rounded-2xl">
          <Image
            fill
            src={article[0]?.coverImage ?? ""}
            alt={article[0]?.title ?? ""}
            className="object-cover"
          />
          <div className="absolute left-0 top-0 flex h-full w-full flex-col">
            <div className="flex h-full w-full flex-col justify-end bg-gradient-to-t from-gray-100 from-55% to-80% px-5 pb-5 md:from-45% md:to-70% 2xl:px-12 2xl:pb-11">
              <Link
                href={article[0] ? `/news/${article[0].slug}` : "#"}
                className="line-clamp-3 text-ellipsis text-pretty text-2xl md:decoration-[rgb(255,40,40)] md:decoration-2 underline-offset-[0.6rem] md:text-4xl md:leading-[3.5rem] md:hover:underline 2xl:text-5xl 2xl:leading-[4rem]"
              >
                <span className="select-none bg-[rgb(255,40,40)] px-2 text-white">
                  {article[0]?.title?.split(" ")[0]}
                </span>
                <span>{formattedTitle(article[0]?.title)}</span>
              </Link>
              <p className="my-4 line-clamp-4 text-ellipsis text-pretty text-sm text-gray-700 sm:line-clamp-3 sm:leading-7 md:text-base 2xl:line-clamp-2">
                {article[0]?.excerpt}
              </p>
              <h6 className="flex items-center truncate text-xs text-gray-700 md:text-sm">
                <ClockIcon className="mr-2 h-5 w-5 md:mr-2.5 md:h-6 md:w-6" />
                <span>
                  {getDate(article[0]?.publishedAt?.slice(0, 10).replace(" ", "-"))}
                </span>
                {article[0]?.author?.fullName && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="font-semibold">{article[0].author.fullName}</span>
                  </>
                )}
              </h6>
            </div>
          </div>
        </div>

        {/* Bottom Row of Col 1 */}
        <div className="flex h-[25%] w-full space-x-2.5">
          
          {/* Article [1] */}
          {article[1] && (
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-gray-100 md:rounded-2xl">
              <Image
                fill
                src={article[1]?.coverImage ?? ""}
                alt={article[1]?.title ?? ""}
                className="object-cover blur-2xl"
              />
              <div className="absolute left-0 top-0 flex h-full w-full flex-col">
                <div className="flex h-full w-full flex-col justify-between bg-gray-100 p-2.5 md:p-5">
                  <Link
                    href={`/news/${article[1].slug}`}
                    className="line-clamp-3 text-ellipsis text-pretty text-sm decoration-[rgb(175,90,255)] decoration-2 underline-offset-[0.25rem] md:hover:underline md:text-xl lg:text-2xl"
                  >
                    <span className="select-none bg-[rgb(175,90,255)] px-2 text-white">
                      {article[1].title?.split(" ")[0]}
                    </span>
                    <span>{formattedTitle(article[1].title)}</span>
                  </Link>
                  <h6 className="mt-2.5 flex items-center truncate text-xs text-gray-700 md:text-sm 2xl:mt-3">
                    <ClockIcon className="mr-2.5 hidden h-6 w-6 md:block" />
                    <span>
                      {getDate(article[1].publishedAt?.slice(0, 10).replace(" ", "-"))}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          )}

          {/* Article [2] */}
          {article[2] && (
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-gray-100 md:rounded-2xl">
              <Image
                fill
                src={article[2]?.coverImage ?? "#"}
                alt={article[2]?.title ?? "#"}
                className="object-cover blur-2xl"
              />
              <div className="absolute left-0 top-0 flex h-full w-full flex-col">
                <div className="flex h-full w-full flex-col justify-between bg-gray-100 p-2.5 md:p-5">
                  <Link
                    href={`/news/${article[2].slug}`}
                    className="line-clamp-3 text-ellipsis text-pretty text-sm decoration-[rgb(35,180,144)] decoration-2 underline-offset-[0.25rem] md:hover:underline md:text-xl lg:text-2xl"
                  >
                    <span className="select-none bg-[rgb(35,180,144)] px-2 text-white">
                      {article[2].title?.split(" ")[0]}
                    </span>
                    <span>{formattedTitle(article[2].title)}</span>
                  </Link>
                  <h6 className="mt-2.5 flex items-center truncate text-xs text-gray-700 md:text-sm 2xl:mt-3">
                    <ClockIcon className="mr-2.5 hidden h-6 w-6 md:block" />
                    <span>
                      {getDate(article[2].publishedAt?.slice(0, 10).replace(" ", "-"))}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* COLUMN 2 (Mid-size articles) */}
      <div className="hidden h-full w-full flex-col space-y-2.5 md:flex">
        
        {/* Article [3] */}
        {article[3] && (
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-gray-100 md:rounded-2xl">
            <Image
              fill
              src={article[3]?.coverImage ?? ""}
              alt={article[3]?.title ?? ""}
              className="object-cover"
            />
            <div className="absolute left-0 top-0 flex h-full w-full flex-col">
              <div className="flex h-full w-full flex-col justify-end bg-gradient-to-t from-gray-100 from-45% to-70% p-5">
                <Link
                  href={`/news/${article[3].slug}`}
                  className="line-clamp-4 text-ellipsis text-pretty text-2xl leading-[2rem] decoration-[rgb(41,141,255)] decoration-2 underline-offset-[0.45rem] md:hover:underline lg:line-clamp-3 lg:text-3xl lg:leading-[2.75rem] 2xl:text-4xl 2xl:leading-[3rem]"
                >
                  <span className="select-none bg-[rgb(41,141,255)] px-2 text-white">
                    {article[3].title?.split(" ")[0]}
                  </span>
                  <span>{formattedTitle(article[3].title)}</span>
                </Link>
                <h6 className="mt-4 flex items-center truncate text-sm text-gray-700">
                  <ClockIcon className="mr-2.5 h-6 w-6" />
                  <span>
                    {getDate(article[3].publishedAt?.slice(0, 10).replace(" ", "-"))}
                  </span>
                </h6>
              </div>
            </div>
          </div>
        )}

        {/* Article [4] + Socials + Article [5] */}
        <div className="flex h-full w-full flex-col space-y-2.5">
          
          {/* Article [4] */}
          {article[4] && (
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-gray-100 md:rounded-2xl">
              <Image
                fill
                src={article[4]?.coverImage ?? "#"}
                alt={article[4]?.title ?? "#"}
                className="object-cover blur-2xl"
              />
              <div className="absolute left-0 top-0 flex h-full w-full flex-col">
                <div className="flex h-full w-full flex-col justify-between bg-gray-100 p-5">
                  <div className="flex w-full flex-col">
                    <Link
                      href={`/news/${article[4].slug}`}
                      className="line-clamp-1 text-ellipsis text-pretty text-lg leading-[2rem] decoration-[rgb(238,47,174)] decoration-2 underline-offset-[0.25rem] md:hover:underline xl:text-xl xl:leading-[2.75rem] 2xl:text-2xl"
                    >
                      <span className="select-none bg-[rgb(238,47,174)] px-2 text-white">
                        {article[4].title?.split(" ")[0]}
                      </span>
                      <span>{formattedTitle(article[4].title)}</span>
                    </Link>
                    <p className="my-1 line-clamp-2 text-ellipsis text-pretty text-gray-700 xl:line-clamp-2 xl:text-base">
                      {article[4].excerpt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Social Icons (Static) */}
          <div className="flex h-[40%] w-full space-x-2.5">
            <Link href={"#"} className="flex h-full w-full items-center justify-center rounded-xl bg-red-200/75 md:rounded-2xl">
              <Image height={40} width={40} src="/images/youtube.png" alt="youtube logo" className="scale-[0.7] object-contain lg:scale-[0.8] xl:scale-[0.9] 2xl:scale-100" />
            </Link>
            <Link href={"#"} className="flex h-full w-full items-center justify-center rounded-xl bg-blue-200/75 md:rounded-2xl">
              <Image height={40} width={40} src="/images/telegram.png" alt="telegram logo" className="scale-[0.7] object-contain lg:scale-[0.8] xl:scale-[0.9] 2xl:scale-100" />
            </Link>
            <Link href={"#"} className="flex h-full w-full items-center justify-center rounded-xl bg-green-200/75 md:rounded-2xl">
              <Image height={40} width={40} src="/images/whatsapp.png" alt="whatsapp logo" className="scale-[0.7] object-contain lg:scale-[0.8] xl:scale-[0.9] 2xl:scale-100" />
            </Link>
            <Link href={"#"} className="flex h-full w-full items-center justify-center rounded-xl bg-gray-100 md:rounded-2xl">
              <Image height={30} width={30} src="/images/twitter.png" alt="twitter logo" className="scale-[0.7] object-contain lg:scale-[0.8] xl:scale-[0.9] 2xl:scale-100" />
            </Link>
          </div> 

          {/* Article [5] */}
          {article[5] && (
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-gray-100 md:rounded-2xl">
              <Image
                fill
                src={article[5]?.coverImage ?? "#"}
                alt={article[5]?.title ?? "#"}
                className="object-cover blur-2xl"
              />
              <div className="absolute left-0 top-0 flex h-full w-full flex-col">
                <div className="flex h-full w-full flex-col justify-between bg-gray-100 p-5">
                  <Link
                    href={`/news/${article[5].slug}`}
                    className="line-clamp-3 text-ellipsis text-pretty text-xl decoration-[rgb(236,155,48)] decoration-2 underline-offset-[0.25rem] md:hover:underline lg:text-2xl"
                  >
                    <span className="select-none bg-[rgb(236,155,48)] px-2 text-white">
                      {article[5].title?.split(" ")[0]}
                    </span>
                    <span>{formattedTitle(article[5].title)}</span>
                  </Link>
                  <h6 className="mt-2.5 flex items-center truncate text-sm text-gray-700 2xl:mt-3">
                    <ClockIcon className="mr-2.5 h-6 w-6" />
                    <span>
                      {getDate(article[5].publishedAt?.slice(0, 10).replace(" ", "-"))}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* COLUMN 3 (Large Article + Stock Ticker) */}
      <div className="hidden h-full w-full flex-col space-y-2.5 xl:flex">
        
        {/* Article [6] */}
        {article[6] && (
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-gray-100 md:rounded-2xl">
            <Image
              fill
              src={article[6]?.coverImage ?? ""}
              alt={article[6]?.title ?? ""}
              className="object-cover blur-2xl"
            />
            <div className="absolute left-0 top-0 flex h-full w-full flex-col">
              <div className="flex h-full w-full flex-col justify-between bg-gray-100 p-5">
                <div className="flex h-full w-full flex-col">
                  <Link
                    href={`/news/${article[6].slug}`}
                    className="line-clamp-4 text-ellipsis text-pretty text-3xl leading-[2.5rem] decoration-[rgb(29,148,55)] decoration-2 underline-offset-[0.45rem] md:hover:underline 2xl:line-clamp-3 2xl:text-4xl 2xl:leading-[3rem]"
                  >
                    <span className="select-none bg-[rgb(29,148,55)] px-2 text-white">
                      {article[6].title?.split(" ")[0]}
                    </span>
                    <span>{formattedTitle(article[6].title)}</span>
                  </Link>
                  <p className="my-4 line-clamp-6 text-ellipsis text-pretty text-base leading-7 text-gray-700 2xl:line-clamp-5">
                    {article[6].excerpt}
                  </p>
                </div>
                <h6 className="flex items-center truncate text-sm text-gray-700">
                  <ClockIcon className="mr-2.5 h-6 w-6" />
                  <span>
                    {getDate(article[6].publishedAt?.slice(0, 10).replace(" ", "-"))}
                  </span>
                </h6>
              </div>
            </div>
          </div>
        )}

        {/* Stock/Currency Widgets (Static for now) */}
     <MarketWidget />
      </div>
    </div>
  );
}
import { ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { getDate, formattedTitle } from "utils/Utility";
import { Article } from "../lib/api"; 
type Props = {
  article: Article[];
};

export default function GridCarousel({ article }: Props) {
  if (!article || article.length < 1) return null;


  console.log("Rendering GridCarousel with articles:", article.length); // Debug log

  return (
    <div className="grid h-[32rem] w-full grid-cols-2 gap-2.5 px-2.5 md:h-[50rem] md:grid-cols-3 md:px-5 lg:h-[55rem] xl:grid-cols-4">
      
      {/* =================================== */}
      {/* COLUMN 1 (Main Feature + 2 Small)   */}
      {/* =================================== */}
      <div className="col-span-2 flex h-full w-full flex-col space-y-2.5">
        
        {/* Article [0] - MAIN LCP ELEMENT */}
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-gray-100 md:rounded-2xl">
          <Image
            fill
            src={article[0]?.coverImage ?? ""}
            alt={article[0]?.title ?? ""}
            className="object-cover"
            priority={true} // Only this one gets priority!
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
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
                <span>{getDate(article[0]?.publishedAt)}</span>
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
                sizes="20vw"
              />
              <div className="absolute left-0 top-0 flex h-full w-full flex-col">
                <div className="flex h-full w-full flex-col justify-between bg-gray-100 p-2.5 md:p-5">
                  <Link href={`/news/${article[1].slug}`} className="line-clamp-3 text-sm decoration-[rgb(175,90,255)] decoration-2 underline-offset-4 md:hover:underline md:text-xl">
                     <span className="bg-[rgb(175,90,255)] px-2 text-white">{article[1].title?.split(" ")[0]}</span>
                     <span>{formattedTitle(article[1].title)}</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Article [2] */}
          {article[2] && (
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-gray-100 md:rounded-2xl">
              <Image
                fill
                src={article[2]?.coverImage ?? ""}
                alt={article[2]?.title ?? ""}
                className="object-cover blur-2xl"
                sizes="20vw"
              />
              <div className="absolute left-0 top-0 flex h-full w-full flex-col">
                <div className="flex h-full w-full flex-col justify-between bg-gray-100 p-2.5 md:p-5">
                   <Link href={`/news/${article[2].slug}`} className="line-clamp-3 text-sm decoration-[rgb(35,180,144)] decoration-2 underline-offset-4 md:hover:underline md:text-xl">
                     <span className="bg-[rgb(35,180,144)] px-2 text-white">{article[2].title?.split(" ")[0]}</span>
                     <span>{formattedTitle(article[2].title)}</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =================================== */}
      {/* COLUMN 2 (Mid-size articles)        */}
      {/* =================================== */}
      <div className="hidden h-full w-full flex-col space-y-2.5 md:flex">
        
        {/* Article [3] */}
        {article[3] && (
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-gray-100 md:rounded-2xl">
            <Image
              fill
              src={article[3]?.coverImage ?? ""}
              alt={article[3]?.title ?? ""}
              className="object-cover"
              sizes="33vw"
            />
            <div className="absolute left-0 top-0 flex h-full w-full flex-col">
              <div className="flex h-full w-full flex-col justify-end bg-gradient-to-t from-gray-100 from-45% to-70% p-5">
                <Link href={`/news/${article[3].slug}`} className="line-clamp-4 text-2xl decoration-[rgb(41,141,255)] decoration-2 underline-offset-4 md:hover:underline">
                  <span className="bg-[rgb(41,141,255)] px-2 text-white">{article[3].title?.split(" ")[0]}</span>
                  <span>{formattedTitle(article[3].title)}</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Article [4] + Article [5] Container */}
        <div className="flex h-full w-full flex-col space-y-2.5">
          {article[4] && (
             <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-gray-100 md:rounded-2xl">
               <Image fill src={article[4]?.coverImage ?? ""} alt={article[4]?.title ?? ""} className="object-cover blur-2xl" sizes="33vw" />
               <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between p-5">
                 <Link href={`/news/${article[4].slug}`} className="line-clamp-2 text-lg decoration-[rgb(238,47,174)] decoration-2 underline-offset-4 md:hover:underline">
                    <span className="bg-[rgb(238,47,174)] px-2 text-white">{article[4].title?.split(" ")[0]}</span>
                    <span>{formattedTitle(article[4].title)}</span>
                 </Link>
               </div>
             </div>
          )}
          {article[5] && (
             <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-gray-100 md:rounded-2xl">
               <Image fill src={article[5]?.coverImage ?? ""} alt={article[5]?.title ?? ""} className="object-cover blur-2xl" sizes="33vw" />
               <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between p-5">
                 <Link href={`/news/${article[5].slug}`} className="line-clamp-3 text-xl decoration-[rgb(236,155,48)] decoration-2 underline-offset-4 md:hover:underline">
                    <span className="bg-[rgb(236,155,48)] px-2 text-white">{article[5].title?.split(" ")[0]}</span>
                    <span>{formattedTitle(article[5].title)}</span>
                 </Link>
               </div>
             </div>
          )}
        </div>
      </div>

      {/* =================================== */}
      {/* COLUMN 3 (NOW FULL HEIGHT ARTICLE)  */}
      {/* =================================== */}
      <div className="hidden h-full w-full flex-col space-y-2.5 xl:flex">
        
        {/* Article [6] - Now fills the entire column height */}
        {article[6] && (
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-gray-100 md:rounded-2xl">
            <Image
              fill
              src={article[6]?.coverImage ?? ""}
              alt={article[6]?.title ?? ""}
              className="object-cover" // Removed blur here to make it a clear "Featured" sidebar post
              sizes="25vw"
            />
            <div className="absolute left-0 top-0 flex h-full w-full flex-col">
              <div className="flex h-full w-full flex-col justify-between bg-gradient-to-t from-gray-100 from-30% to-60% p-5">
                {/* Content */}
                <div className="flex h-full w-full flex-col">
                  <Link
                    href={`/news/${article[6].slug}`}
                    className="line-clamp-4 text-3xl leading-[2.5rem] decoration-[rgb(29,148,55)] decoration-2 underline-offset-4 md:hover:underline"
                  >
                    <span className="select-none bg-[rgb(29,148,55)] px-2 text-white">
                      {article[6].title?.split(" ")[0]}
                    </span>
                    <span>{formattedTitle(article[6].title)}</span>
                  </Link>
                  <p className="mt-4 line-clamp-[10] text-base leading-7 text-gray-700">
                    {article[6].excerpt}
                  </p>
                </div>
                {/* Meta */}
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
        
      </div>

      

    </div>
  );
}
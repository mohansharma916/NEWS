import Image from "next/image";
import Link from "next/link";
import { getDate } from "utils/Utility";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { Article } from "../lib/api";// Import the correct type

// Update props to accept the new Article type
type Props = {
  article: Article[];
};

export default function ResultList({ article }: Props) {
  // Safety check
  if (!article || article.length === 0) return null;

  return (
    <ul className="flex w-full flex-col space-y-5">
      {article.map((data, idx) => {
        return (
          <li key={data.id || idx} className="flex w-full rounded-xl md:rounded-2xl">
            <Link
              href={`/news/${data.slug}`} // Internal Link
              className="group flex w-full flex-col space-y-5 rounded-xl bg-gray-100 p-2.5 md:flex-row md:space-x-10 md:space-y-0 md:rounded-2xl md:p-5"
            >
              {/* Left Side: Image & Meta */}
              <div className="flex w-full flex-col space-y-2.5 md:max-w-[18.75rem] md:space-y-5">
                <div className="relative h-[150px] w-full md:h-[9.375rem] md:w-[18.75rem] flex-shrink-0">
                  <Image
                    fill
                    src={data.coverImage || "/images/placeholder.jpg"}
                    alt={data.title}
                    className="rounded-xl object-cover md:rounded-2xl"
                  />
                </div>
                
                {/* Mobile Title */}
                <h2 className="line-clamp-3 text-ellipsis text-base font-bold md:hidden">
                  {data.title}
                </h2>

                <h6 className="flex items-center truncate text-[0.6875rem] text-xs text-gray-700 md:text-sm">
                  <span>
                    {getDate(data.publishedAt)}
                  </span>
                  {data.author?.fullName && (
                    <>
                      <span className="mx-1 md:mx-2">•</span>
                      <span className="truncate font-semibold">
                        {data.author.fullName}
                      </span>
                    </>
                  )}
                </h6>
              </div>

              {/* Divider for Mobile */}
              <span className="flex h-0.5 w-full bg-gray-200 md:hidden" />

              {/* Right Side: Content */}
              <div className="flex w-full flex-col justify-between space-y-2.5 md:space-y-5">
                <div className="flex w-full flex-col space-y-2.5 md:space-y-5">
                  <div className="flex w-full flex-col space-y-3">
                    {/* Source / Author Name */}
                    <h6 className="text-sm font-semibold text-gray-600">
                       {data.author?.fullName || "Editorial Team"}
                    </h6>
                    
                    {/* Desktop Title */}
                    <h2 className="hidden md:block line-clamp-2 text-xl font-bold group-hover:underline group-hover:underline-offset-4">
                      {data.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="line-clamp-3 text-ellipsis text-[0.9375rem] md:text-lg text-gray-600">
                      {data.excerpt}
                    </p>
                  </div>
                </div>

                {/* Read More Button */}
                <div className="flex w-full items-center justify-end space-x-1 md:space-x-2.5">
                  <p className="text-xs text-gray-500 md:text-[0.9375rem] font-medium group-hover:text-blue-600">
                    Read more
                  </p>
                  <ArrowUpCircleIcon className="h-8 w-8 rotate-90 stroke-1 text-gray-400 md:h-10 md:w-10 group-hover:text-blue-600" />
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
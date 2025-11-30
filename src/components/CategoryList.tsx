import Link from "next/link";
import Image from "next/image";
import { getDate } from "utils/Utility";
import ListButton from "components/ListButton";
import { Article } from "../lib/api";// <--- Import new type

type Props = {
  article: Article[]; 
  heading: string;
  isMobile: boolean;
};

export default function CategoryList({
  article,
  heading,
}: Props) {
  // Safety check
  if (!article || article.length === 0) return null;

  return (
    <div className="h-full w-full items-center justify-center rounded-xl bg-gray-100 p-2.5">
      
      {/* Header Button (e.g., "Technology") */}
      <div className="flex pt-2 sm:pt-0">
        <ListButton heading={heading} />
      </div>
      
      <div className="flex w-full pt-4 md:px-2.5 md:pt-2.5">
        <span className="flex h-0.5 w-full bg-gray-200" />
      </div>
      
      <ul className="flex w-full flex-col space-y-4 pb-2.5 pt-4 md:px-2.5">
        {article.slice(0, 3).map((data, idx) => {
          return (
            <div key={data.id || idx}>
              <li className="flex w-full flex-col">
                <div className="flex w-full space-x-5">
                  <div className="flex w-full flex-col">
                    {/* Author or Site Name */}
                    <h6 className="text-[0.8rem] font-semibold text-gray-400 md:text-base">
                      {data.author?.fullName || "The View Island"}
                    </h6>
                    
                    {/* Internal Link to Article */}
                    <Link
                      href={`/news/${data.slug}`}
                      className="line-clamp-3 h-[4rem] md:h-[5.5rem] text-ellipsis text-[0.9rem] md:text-lg md:hover:underline md:hover:underline-offset-2"
                    >
                      {data.title}
                    </Link>
                  </div>
                  
                  {/* Article Image */}
                  <div className="relative h-[100px] w-[100px] md:h-[125px] md:w-[125px] flex-shrink-0">
                    <Image
                      fill
                      src={data.coverImage || "/images/placeholder.jpg"}
                      alt={data.title}
                      className="rounded-xl object-cover"
                    />
                  </div>
                </div>
                
                {/* Meta Data (Date • Author) */}
                <h6 className="flex items-center truncate pt-5 text-xs text-gray-700 md:text-sm">
                  <span>
                    {getDate(data.publishedAt?.slice(0, 10).replace(" ", "-"))}
                  </span>
                  {data.author?.fullName && (
                    <>
                      <span className="mx-1 md:mx-2">•</span>
                      <span className="font-semibold">{data.author.fullName}</span>
                    </>
                  )}
                </h6>
              </li>
              
              {/* Divider Line (only between items) */}
              {idx < 2 && idx < article.length - 1 && (
                <div className="flex w-full pt-4 md:px-2.5 mb-4">
                  <span className="flex h-0.5 w-full bg-gray-200" />
                </div>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}
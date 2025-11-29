import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type Props = {
  category: { name: string; slug: string } | undefined;
  title: string;
};

export default function Breadcrumbs({ category, title }: Props) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2 md:space-x-4">
        {/* 1. Home Link */}
        <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>

        {/* 2. Category Link (if exists) */}
        {category && (
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link
                href={`/?category=${category.slug}`} // Assuming your home filters by query param
                className="ml-2 md:ml-4 text-xs md:text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {category.name}
              </Link>
            </div>
          </li>
        )}

        {/* 3. Current Article (Truncated) */}
        <li>
          <div className="flex items-center">
            <ChevronRightIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <span
              className="ml-2 md:ml-4 max-w-[150px] md:max-w-xs truncate text-xs md:text-sm font-medium text-gray-700"
              aria-current="page"
            >
              {title}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
}
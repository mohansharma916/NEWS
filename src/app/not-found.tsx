import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

type props = {
  searchParams: Promise<SearchParams>;
};

export default async function NotFound(props: props) {
  const searchParams = await props.searchParams;
  const viewport = (await searchParams?.viewport) ?? ("desktop" as string);
  const isMobile = viewport === "mobile" ? true : false;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-2.5 md:pt-20">
      <div className="order-2 flex items-center md:order-1">
        <h1 className="text-[6.25rem] font-[250] text-black/30 md:text-[10rem]">
          4
        </h1>
        <Image
          height={isMobile ? 75 : 125}
          width={isMobile ? 75 : 125}
          className="opacity-30"
          src="/images/error.svg"
          alt="setup-error"
        />
        <h1 className="text-[6.25rem] font-[250] text-black/30 md:text-[10rem]">
          4
        </h1>
      </div>
      <div className="relative order-3 -mt-8 flex w-full max-w-[40rem] flex-col items-center justify-center space-y-5 overflow-hidden md:order-2">
        <div className="flex">
          <h1 className="w-full text-2xl font-bold text-black/35 md:text-4xl">
            Page not found
          </h1>
        </div>
        <h6 className="w-full text-center text-sm font-medium text-gray-500 md:text-base">
          We apologize for the inconvenience, but there seems to be an error
          with the page that you have requested.
        </h6>
      </div>
      <div className="order-1 mt-5 w-full max-w-[40rem] flex-col space-y-2 md:order-3 md:mt-10">
        <div className="flex w-full items-center justify-start">
          <Link
            href="/"
            className="flex -translate-x-2.5 scale-100 items-center space-x-2.5 rounded-lg p-2.5 text-blue-550 transition-all duration-200 ease-in-out active:scale-90 md:hover:translate-x-0 md:hover:bg-gray-100"
          >
            <ChevronLeftIcon className="h-4 w-4 stroke-[3] md:h-5 md:w-5" />
            <span className="text-xs font-semibold md:text-base">
              Back to home
            </span>
          </Link>
        </div>
        <div className="flex w-full items-center justify-start">
          {/* <SignInBackButton onClick={handleBackToHome} Label="Back to home" /> */}
        </div>
      </div>
    </div>
  );
}

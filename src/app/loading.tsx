import { Fragment } from "react";

export default function Loading() {
  return (
    <div
      key={"test"}
      className="mx-auto flex w-full max-w-[110rem] animate-pulse flex-col space-y-2.5 px-2.5 pt-5 md:space-y-7 md:px-5 md:pt-10"
    >
      {/* Top Header/Widgets */}
      <div className="flex w-full justify-between">
        {[...Array(2)].map((_, i) => (
          <span
            key={i}
            className="h-[3.438rem] w-[7.813rem] rounded-lg bg-gray-200 md:h-[4.688rem] md:w-[12.5rem] md:rounded-2xl"
          />
        ))}
      </div>

      {/* Main Feature Skeleton */}
      <div className="flex w-full flex-col">
        <span className="h-[18rem] w-full rounded-lg bg-gray-200 md:h-[55rem] md:rounded-2xl" />
      </div>

      {/* List Loop - FIXED */}
      {[...Array(3)].map((_, i) => (
        <Fragment key={i}>
          <div className="flex w-full justify-between pb-1 pt-1 md:pb-0 md:pt-5">
            <span className="h-[3.438rem] w-[7.813rem] rounded-lg bg-gray-200 md:h-[4.688rem] md:w-[12.5rem] md:rounded-2xl" />
          </div>
          <div className="flex w-full flex-col">
            <span className="h-[32.5rem] w-full rounded-lg bg-gray-200 md:h-[55rem] md:rounded-2xl" />
          </div>
        </Fragment>
      ))}
    </div>
  );
}
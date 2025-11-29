export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-[70rem] animate-pulse flex-col space-y-5 px-2.5 pt-5 md:mt-2.5 md:px-5 md:pt-10">
      <span className="h-[3.438rem] w-[9.375rem] rounded-xl bg-gray-200 md:h-[4.688rem] md:w-[12.5rem] md:rounded-2xl" />
      <div className="flex w-full flex-col space-y-2.5 md:space-y-5">
        {[...Array(5)].map((o, i) => {
          return (
            <span
              key={i}
              className="h-[20.875rem] w-full rounded-xl bg-gray-200 md:rounded-2xl"
            />
          );
        })}
      </div>
    </div>
  );
}

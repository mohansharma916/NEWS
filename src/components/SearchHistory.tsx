import { useEffect, useState } from "react";
import useNavigateList from "utils/KeyboardNavigationList";
import { ClockIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { MotionDiv } from "utils/Motion";
import useLocalStorage from "utils/LocalStorage";

export const SearchContent: SearchHistoryList[] = [
  {
    Id: "0",
    Key: "recent-search",
    Value: "Sumeet Kumar Paul",
  },
];

export default function SearchHistory(props: SearchHistory) {
  const [Data, setData] = useState(
    SearchContent.map((item) => ({
      ...item,
    })).reverse(),
  );

  const { getItem, setItem } = useLocalStorage("recent-search");

  const removeData = (index: number) => {
    if (index !== -1) {
      setData(Data.filter((o, i) => index !== i));
      setItem(getItem().filter((o: unknown, i: unknown) => index !== i));
      if (props.Search === Data[index].Value) props.setSearch("");
    }
  };

  const { activeIndex, itemProps } = useNavigateList({
    vertical: true,
    list: Data,
    GetEmptySearch: props.GetEmptySearch,
    EmptySearch: (data) => props.setSearch(data),
    onSelect: (data) => props.setSearch(data.Value),
    onClick: (data) => props.handleClick(data.Value),
  });

  useEffect(() => {
    if (getItem()) setData([...getItem(), ...Data]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (Data.length > 0) {
    return (
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        exit={{ opacity: 0 }}
        transition={{ key: "twin", duration: 0.1 }}
        className="absolute top-[3.3rem] z-10 block w-full rounded-lg bg-gray-100 px-1.5 py-2.5 text-black shadow-2xl backdrop-blur-3xl md:top-12"
      >
        {Data.slice(0, 6).map((data, idx) => (
          <div
            key={data.Id}
            className={` ${
              activeIndex === idx ? "bg-gray-400/15" : "bg-transparent"
            } flex h-9 w-full cursor-default items-center rounded-lg p-1 md:h-10`}
            {...itemProps(data)}
          >
            {data.Key == "recent-search" && (
              <ClockIcon className="mx-2 h-5 min-h-5 w-5 min-w-5 stroke-gray-500 stroke-2 font-bold text-gray-500" />
            )}
            {data.Key == "suggestions" && (
              <MagnifyingGlassIcon className="mx-2 h-5 min-h-5 w-5 min-w-5 stroke-gray-500 stroke-2 font-bold text-gray-500" />
            )}
            <div className="w-full items-center overflow-hidden px-1">
              <p className="block truncate text-left text-[0.8125rem] font-normal tracking-wide">
                {data.Value}
              </p>
            </div>
            {data.Id !== Data[Data.length - 1].Id &&
              data.Key == "recent-search" && (
                <button
                  title="delete"
                  type="button"
                  onPointerDown={() => removeData(idx)}
                  className={`${activeIndex === idx ? "flex" : "hidden"} h-8 w-8 cursor-pointer items-center justify-center bg-transparent`}
                >
                  <XMarkIcon className="h-5 min-h-5 w-5 min-w-5 stroke-gray-500 stroke-[0.6] font-bold text-gray-500" />
                </button>
              )}
          </div>
        ))}
      </MotionDiv>
    );
  }
}

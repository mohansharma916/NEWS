"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import { Categories } from "utils/Utility";
import { useNavStore } from "utils/Zustand";

export default function ListButton({ heading }: { heading: string }) {
  const { setNumber, setWidth, setLeft } = useNavStore();
  const isDesktop = useMediaQuery("(min-width:768px)");

  const handleClick = () => {
    const ScrollContainer = document.getElementById("nav-container");
    const ViewPortContainer =
      document.getElementById("parent-container")?.clientWidth;

    const idx = Categories.indexOf(heading.toString().replaceAll("-", " "));

    const CurrentButtonLeft = document
      .getElementById(`nav-button-id-${idx}`)
      ?.getBoundingClientRect()?.left;
    const CurrentButton = document.getElementById(`nav-button-id-${idx}`);

    if (
      CurrentButtonLeft &&
      ScrollContainer &&
      ViewPortContainer &&
      CurrentButton
    ) {
      setNumber(idx);
      setWidth(CurrentButton.clientWidth);
      setLeft(CurrentButton.offsetLeft);
      if (CurrentButtonLeft + (isDesktop ? 100 : 70) > ViewPortContainer) {
        ScrollContainer.scrollBy({
          left:
            CurrentButtonLeft +
            CurrentButton.clientWidth +
            (isDesktop ? 125 : 80) -
            ViewPortContainer -
            ScrollContainer.scrollLeft,
          behavior: "smooth",
        });
      }
      if (CurrentButtonLeft - (isDesktop ? 100 : 70) < 0) {
        ScrollContainer.scrollBy({
          left: CurrentButtonLeft - (isDesktop ? 100 : 70),
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <Link
      href={`/${heading}`}
      onClick={handleClick}
      className="group flex rounded-lg transition-all duration-200 ease-in-out active:scale-90 md:py-2.5 md:pl-2.5 md:pr-5 md:hover:bg-gray-200"
    >
      <h2 className="flex items-center space-x-1 truncate text-base transition-transform duration-200 ease-in-out md:text-xl md:group-hover:translate-x-2">
        <span>{heading}</span>
        <ChevronRightIcon className="h-4 w-4 stroke-[0.15rem] md:h-5 md:w-5" />
      </h2>
    </Link>
  );
}

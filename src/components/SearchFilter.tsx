"use client";

import { MotionDiv } from "utils/Motion";
import BackLink from "./BackLink";
import { useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import DropDownMenu from "./DropDownMenu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Variants } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { sortBy, language, time } from "utils/Utility";

export default function SearchFilter() {
  const [sortSelect, setSortSelect] = useState(sortBy[1]);
  const [timeSelect, setTimeSelect] = useState(time[0]);
  const [languageSelect, setLanguageSelect] = useState(language[2]);
  const [openFilter, setOpenFilter] = useState("close");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams);

  const isDesktop = useMediaQuery("(min-width:768px)");

  const sortChange = (value: { id: number; name: string; value: string }) => {
    params.set("sortBy", value.value);
    router.push(`${pathname}?${params.toString()}`);
    setSortSelect(value);
  };
  const timeChange = (value: { id: number; name: string; value: string }) => {
    if (value.value === "today") {
      params.set("time", new Date().toISOString().slice(0, 10).toString());
    }
    if (value.value === "yesterday") {
      params.set(
        "time",
        new Date(Date.now() - 86400000 * 1)
          .toISOString()
          .slice(0, 10)
          .toString(),
      );
    }
    if (value.value === "thisWeek") {
      params.set(
        "time",
        new Date(Date.now() - 86400000 * 2)
          .toISOString()
          .slice(0, 10)
          .toString(),
      );
    }
    router.push(`${pathname}?${params.toString()}`);
    setTimeSelect(value);
  };
  const languageChange = (value: {
    id: number;
    name: string;
    value: string;
  }) => {
    params.set("language", value.value);
    router.push(`${pathname}?${params.toString()}`);
    setLanguageSelect(value);
  };

  const variants: Variants = {
    close: {
      height: 0,
    },
    open: {
      height: isDesktop ? 90 : 190,
    },
  };

  return (
    <>
      <div className="flex w-full items-start justify-between px-2.5 md:px-5">
        <BackLink />
        <button
          type="button"
          onClick={() =>
            setOpenFilter((prev) => (prev === "close" ? "open" : "close"))
          }
          className="flex scale-100 items-center space-x-2 rounded-md bg-gray-100 px-2 py-2 text-sm font-medium transition-all duration-200 ease-in-out active:scale-90 md:px-5 md:text-base"
        >
          <AdjustmentsHorizontalIcon className="size-5" />
          <span>Filter</span>
        </button>
      </div>
      <MotionDiv
        initial={{ height: 0 }}
        animate={openFilter}
        variants={variants}
        className="bg-white"
      >
        <div className="grid w-full grid-cols-2 gap-5 px-5 pt-5 md:grid-cols-3 md:gap-10">
          <DropDownMenu
            data={sortBy}
            value={sortSelect}
            onChange={sortChange}
            title="Sort by"
          />
          <DropDownMenu
            value={timeSelect}
            onChange={timeChange}
            data={time}
            title="Time"
          />
          <div className="col-span-2 w-full md:col-span-1">
            <DropDownMenu
              data={language}
              value={languageSelect}
              onChange={languageChange}
              title="Language"
            />
          </div>
        </div>
      </MotionDiv>
    </>
  );
}

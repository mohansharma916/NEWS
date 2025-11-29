"use client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { MotionDiv, MotionSpan } from "utils/Motion";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import useLocalStorage from "utils/LocalStorage";
import dynamic from "next/dynamic";
import { useNavStore, useSearchStore } from "utils/Zustand";

const SearchHistory = dynamic<SearchHistory>(() => import("./SearchHistory"), {
  ssr: false,
});

export default function SearchBox() {
  const [SearchMenuOpen, setSearchMenuOpen] = useState(false);
  const { setNumber, setWidth, setLeft } = useNavStore();
  const { Search, setSearch } = useSearchStore();
  const ContainerRef = useRef<HTMLDivElement>(null);
  const SearchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { getItem, setItem } = useLocalStorage("recent-search");

  const TabletMatches = useMediaQuery("(min-width:768px)");
  const DesktopMatches = useMediaQuery("(min-width:1024px)");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = (search: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", "Relevancy");
    params.set("time", new Date().toISOString().slice(0, 10).toString());
    params.set("language", "English");
    router.push(`/search/${search.replaceAll(" ", "-")}?${params.toString()}`);
    setWidth(0);
    setLeft(0);
    if (getItem()) {
      setItem([
        {
          Id: (getItem().length + 1).toString(),
          Key: "recent-search",
          Value: search,
        },
        ...getItem(),
      ]);
    } else {
      setItem([
        {
          Id: "1",
          Key: "recent-search",
          Value: search,
        },
      ]);
    }
    setNumber(-1);
    SearchRef.current?.blur();
  };

  const handleListClick = (search: string) => {
    if (SearchMenuOpen) {
      setSearchMenuOpen(false);
      handleSearch(search);
    }
  };

  const handleSearchClick = async () => {
    if (Search.length > 0 && SearchMenuOpen) {
      setSearchMenuOpen(false);
      handleSearch(Search);
    }
  };

  const handleClear = () => {
    setSearch("");
    SearchRef.current?.focus();
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      event.currentTarget.setSelectionRange(
        event.currentTarget.value.length,
        event.currentTarget.value.length,
      );
    }
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const SearchBoxClick = () => {
    if (!SearchMenuOpen) {
      setSearchMenuOpen(true);
      SearchRef.current?.focus();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ContainerRef.current &&
        !ContainerRef.current.contains(event.target as Node)
      ) {
        setSearchMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ContainerRef, SearchMenuOpen, Search]);

  useEffect(() => {
    const search = searchParams.get("q");
    if (search) setSearch(search);
    const scrollDetect = () => {
      if (window.scrollY > 5) {
        setSearchMenuOpen(false);
        SearchRef.current?.blur();
      }
    };
    window.addEventListener("scroll", scrollDetect, { passive: true });
    return () => window.addEventListener("scroll", scrollDetect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MotionDiv
      ref={ContainerRef}
      animate={{
        marginLeft:
          SearchMenuOpen && TabletMatches && !DesktopMatches
            ? -212
            : TabletMatches
              ? 20
              : 0,
        marginRight:
          SearchMenuOpen && TabletMatches && !DesktopMatches ? -220 : 0,
        marginTop: SearchMenuOpen && !TabletMatches ? -48 : 0,
        marginBottom: SearchMenuOpen && !TabletMatches ? 48 : 0,
      }}
      transition={{ key: "twin", duration: 0.1 }}
      // className={`${SearchMenuOpen && TabletMatches && !DesktopMatches ? '-ml-[13.25rem] -mr-[13.75rem]' : TabletMatches ? '-ml-5 mr-0' : 'ml-0 mr-0'} ${SearchMenuOpen && !TabletMatches ? "-translate-y-12" : "translate-y-0"} transition-all relative z-20 col-span-2 mx-auto flex w-full flex-col bg-white pt-1 duration-100 ease-out md:pt-0 lg:w-[calc(100%/2.5)] lg:max-w-[40rem]`}
      className="lg:max-w-[40rem]} relative z-30 col-span-2 mx-auto flex w-full flex-col bg-white pt-1 md:pt-0 lg:w-[calc(100%/2.5)]"
    >
      <div
        onClick={SearchBoxClick}
        className="relative flex h-full w-full items-center overflow-hidden rounded-lg bg-gray-100"
      >
        <input
          ref={SearchRef}
          value={Search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          autoCorrect="off"
          autoComplete="off"
          aria-label="search-text-field"
          placeholder="Search for topics, locations & sources"
          className="flex h-12 w-full truncate bg-transparent px-3 py-5 pr-1 text-sm font-normal text-black placeholder:text-gray-500 md:p-5 md:text-base"
        />
        <button
          title="clear"
          type="button"
          onClick={handleClear}
          className={`${
            Search.length > 0 && SearchMenuOpen ? "flex" : "hidden"
          } h-9 w-9 min-w-9 items-center justify-center rounded-full transition-all duration-200 ease-in-out hover:bg-gray-400/15 active:scale-90 md:h-11 md:w-11 md:min-w-11`}
        >
          <XMarkIcon className="pointer-events-none h-5 min-h-5 w-5 min-w-5 stroke-gray-500 stroke-[0.6] font-bold text-gray-500" />
        </button>
        <button
          title="search"
          type="button"
          // disabled={pending}
          onClick={handleSearchClick}
          className="mr-1 flex h-9 w-9 min-w-9 items-center justify-center rounded-full transition-all duration-200 ease-in-out hover:bg-gray-400/15 active:scale-90 disabled:hover:bg-transparent disabled:active:scale-100 md:h-11 md:w-11 md:min-w-11"
        >
          <MagnifyingGlassIcon className="pointer-events-none h-5 min-h-5 w-5 min-w-5 stroke-gray-500 stroke-[0.6] font-bold text-gray-500" />
        </button>
        {SearchMenuOpen && (
          <MotionSpan
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0 }}
            transition={{ type: "twin", duration: 0.1 }}
            className="absolute bottom-0 h-[0.1rem] w-full bg-gray-500/75 md:h-[0.2rem]"
          />
        )}
      </div>
      {SearchMenuOpen && (
        <SearchHistory
          Search={Search}
          SearchRef={SearchRef}
          ContainerRef={ContainerRef}
          GetEmptySearch={Search.length > 0 ? false : true}
          setSearchMenu={setSearchMenuOpen}
          setSearch={setSearch}
          handleClick={handleListClick}
        />
      )}
    </MotionDiv>
  );
}

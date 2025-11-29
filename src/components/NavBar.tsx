"use client";

import { useEffect } from "react";
import { MotionSpan } from "utils/Motion";
import { Categories } from "utils/Utility";
import { useNavStore } from "utils/Zustand";
import { useMediaQuery } from "@mui/material";
import { useRouter, useParams } from "next/navigation";

export default function NavBar() {
  const { Number, Width, Left, setNumber, setWidth, setLeft } = useNavStore();
  const router = useRouter();
  const params = useParams();

  const { category } = params;

  const isDesktop = useMediaQuery("(min-width:768px)");
  const AdjustSize = isDesktop ? 100 : 70;
  const AdjustDSize = isDesktop ? 125 : 80;

  const getElement = (id: string) => document.getElementById(id);
  const getCategory = (category: string | string[]) =>
    category.toString().replaceAll("-", " ").replaceAll("%20", " ");

  const variants = {
    initial: { width: 0, left: 0 },
    animate: { width: Width, left: Left },
  };

  const onClick = (idx: number) => () => {
    if (Number != idx) {
      const PrevButton = getElement(`nav-button-id-${Number}`);
      const NewButton = getElement(`nav-button-id-${idx}`);
      const ContainerView = getElement("parent-container");
      const ScrollContainer = getElement("nav-container");

      if (NewButton && ScrollContainer && ContainerView) {
        const NewButtonView = NewButton.getBoundingClientRect();
        if (PrevButton) {
          setNumber(idx);
          if (Number < idx) {
            setLeft(PrevButton.offsetLeft + PrevButton.offsetWidth / 2);
            setWidth(
              NewButton.offsetWidth / 2 +
                NewButton.offsetLeft -
                PrevButton.offsetLeft -
                PrevButton.offsetWidth / 2,
            );
          }
          if (Number > idx) {
            setLeft(NewButton.offsetLeft + NewButton.offsetWidth / 2);
            setWidth(
              PrevButton.offsetLeft -
                NewButton.offsetLeft +
                PrevButton.offsetWidth / 2 -
                NewButton.offsetWidth / 2,
            );
          }
          if (
            NewButtonView.left + NewButton.offsetWidth + AdjustSize >
            ContainerView.clientWidth
          ) {
            ScrollContainer.scrollBy({
              left:
                NewButton.offsetLeft +
                NewButton.offsetWidth +
                AdjustDSize -
                ContainerView.clientWidth -
                ScrollContainer.scrollLeft,
              behavior: "smooth",
            });
          }
          if (NewButtonView.left - AdjustSize < 0) {
            ScrollContainer.scrollBy({
              left: NewButtonView.left - AdjustSize,
              behavior: "smooth",
            });
          }
        } else {
          setNumber(idx);
          setWidth(NewButton.offsetWidth);
          setLeft(NewButton.offsetLeft);
          if (NewButtonView.left + AdjustSize > ContainerView.clientWidth) {
            ScrollContainer.scrollBy({
              left:
                NewButtonView.left +
                NewButton.offsetWidth +
                AdjustDSize -
                ContainerView.clientWidth -
                ScrollContainer.scrollLeft,
              behavior: "smooth",
            });
          }
          if (NewButtonView.left - AdjustSize < 0) {
            ScrollContainer.scrollBy({
              left: NewButtonView.left - AdjustSize,
              behavior: "smooth",
            });
          }
        }
        router.push(`/${NewButton.innerText.replace(" ", "-")}`);
      }
    }
  };

  const onAnimationComplete = () => {
    const Button = getElement(`nav-button-id-${Number}`);
    if (Button) {
      if (Button.offsetLeft != Left && Button.offsetWidth != Width) {
        setLeft(Button.offsetLeft);
        setWidth(Button.offsetWidth);
      }
    }
  };

  useEffect(() => {
    const container = getElement("nav-container");
    const navBar = getElement("parent-container");
    const page = getElement("page-id");
    const Document = document.body;
    const properties = { passive: true };

    if (container && navBar && page) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY == 0) return;
        container.scrollBy({
          left:
            e.deltaY < 0
              ? -container.clientWidth * 0.25
              : container.clientWidth * 0.25,
          behavior: "smooth",
        });
      };
      const onMouseEnter = () => {
        if (Document.clientWidth > 768) {
          Document.style.overflow = "hidden";
          Document.style.paddingRight = "8px";
        }
      };
      const onMouseExit = () => {
        if (Document.clientWidth > 768) {
          Document.style.overflow = "auto";
          Document.style.paddingRight = "0px";
        }
      };
      const stickyNav = () => {
        if (Document.clientWidth > 768) {
          if (window.scrollY > 57) {
            navBar.style.position = "fixed";
            page.style.paddingTop = "57px";
          } else {
            navBar.style.position = "relative";
            page.style.paddingTop = "0px";
          }
        } else {
          if (window.scrollY > 104) {
            navBar.style.position = "fixed";
            page.style.paddingTop = "54px";
          } else {
            navBar.style.position = "relative";
            page.style.paddingTop = "0px";
          }
        }
      };

      container.addEventListener("wheel", onWheel, properties);
      container.addEventListener("mouseenter", onMouseEnter, properties);
      container.addEventListener("mouseleave", onMouseExit, properties);
      window.addEventListener("scroll", stickyNav, properties);

      return () => {
        container.removeEventListener("wheel", onWheel);
        container.removeEventListener("mouseenter", onMouseEnter);
        container.removeEventListener("mouseleave", onMouseExit);
        window.removeEventListener("scroll", stickyNav);
      };
    }
  }, []);

  useEffect(() => {
    const ScrollContainer = getElement("nav-container");
    const ContainerView = getElement("parent-container");
    const PreviousButton = getElement(`nav-button-id-${0}`);

    if (category) {
      const idx = Categories.indexOf(getCategory(category));
      const NewButton = getElement(`nav-button-id-${idx}`);

      if (NewButton && ScrollContainer && ContainerView) {
        const NewButtonView = NewButton.getBoundingClientRect();
        setNumber(idx);
        setWidth(NewButton.clientWidth);
        setLeft(NewButton.offsetLeft);
        if (NewButtonView.left + AdjustSize > ContainerView.clientWidth) {
          ScrollContainer.scrollBy({
            left:
              NewButtonView.left +
              NewButton.clientWidth +
              AdjustDSize -
              ContainerView.clientWidth -
              ScrollContainer.scrollLeft,
            behavior: "smooth",
          });
        }
        if (NewButtonView.left - AdjustSize < 0) {
          ScrollContainer.scrollBy({
            left: NewButtonView.left - AdjustSize,
            behavior: "smooth",
          });
        }
      }
    } else if (PreviousButton) {
      setNumber(0);
      setWidth(PreviousButton.clientWidth);
      setLeft(PreviousButton.offsetLeft);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      id="parent-container"
      className="z-20 flex w-full flex-col bg-white pt-[1.5rem] md:pt-[1.75]"
    >
      <div
        id="nav-container"
        className="hide-scrollbar relative mx-auto flex w-full max-w-[110rem] overflow-x-scroll"
      >
        <ul className="flex space-x-6 px-4 text-xs md:space-x-9 md:px-5 md:text-sm">
          {Categories.slice(0, 4).map((data, i) => {
            return (
              <li
                key={i}
                onClick={onClick(i)}
                id={`nav-button-id-${i}`}
                className={`${Number === i ? "text-blue-550" : isDesktop ? "text-black/60 hover:text-black" : "text-black/60"} cursor-pointer select-none whitespace-nowrap font-semibold transition-colors duration-300 ease-in-out`}
              >
                {data}
              </li>
            );
          })}
          <li className="mx-10 mb-2 h-5 min-h-5 w-0.5 min-w-0.5 bg-gray-200 md:mb-2.5" />
          {Categories.slice(4, Categories.length).map((data, i) => {
            return (
              <li
                key={i + 4}
                id={`nav-button-id-${i + 4}`}
                onClick={onClick(i + 4)}
                className={`${Number === i + 4 ? "text-blue-550" : isDesktop ? "text-black/60 hover:text-black" : "text-black/60"} cursor-pointer select-none whitespace-nowrap font-semibold transition-colors duration-300 ease-in-out`}
              >
                {data}
              </li>
            );
          })}
        </ul>
        <MotionSpan
          animate="animate"
          initial="initial"
          variants={variants}
          onAnimationComplete={onAnimationComplete}
          transition={{ type: "twin", duration: 0.1 }}
          className="absolute bottom-0 z-10 h-[0.2rem] rounded-t-full bg-blue-550 md:h-1"
        />
      </div>
      <span className="-mt-[0.05rem] h-[0.1rem] w-full bg-gray-200 md:h-0.5" />
    </nav>
  );
}

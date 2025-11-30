"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { getDate } from "utils/Utility";
import { Article } from "../lib/api";// <--- Import new type

const SliderCarousel = dynamic(() => import("./SliderCarousel"), { ssr: false });
const GridCarousel = dynamic(() => import("./GridCarousel"), { ssr: false });

type Props = {
  articles: Article[];
  isMobile: boolean;
};

interface WeatherData {
  temp: number;
  city: string;
  code: number;
}

export default function Carousel({ articles, isMobile }: Props) {
  if (isMobile) {
    return (
      <CarouselWrapper isMobile={isMobile} className="relative h-72">
        <Suspense>
          <SliderCarousel article={articles} />
        </Suspense>
      </CarouselWrapper>
    );
  } else {
    return (
      <CarouselWrapper
        isMobile={isMobile}
        className="relative flex w-full h-[32rem] md:h-[50rem] lg:h-[55rem]"
      >
        <Suspense>
          <GridCarousel article={articles} />
        </Suspense>
      </CarouselWrapper>
    );
  }
}

// --- HELPER: Map WMO Code to Your Local Images ---
const getWeatherIcon = (code: number): string => {
  if (code === 0) return "/images/sunny.png"; 
  if (code >= 1 && code <= 3) return "/images/weather.png"; 
  if (code >= 45 && code <= 48) return "/images/fog.png"; 
  if (code >= 51 && code <= 67) return "/images/rain.png";
  if (code >= 71 && code <= 77) return "/images/snow.png";
  if (code >= 95) return "/images/thunder.png";
  return "/images/weather.png";
};

const CarouselWrapper = ({
  children,
  isMobile,
  className,
}: {
  children: React.ReactNode;
  isMobile?: boolean;
  className?: string;
}) => {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 21,
    city: "New Delhi", // Default fallback
    code: 1, 
  });

  useEffect(() => {
    const initWeather = async () => {
      try {
        // 1. Get Location from IP (No permission needed)
        // ipapi.co is free (up to 1000 requests/day) and works well.
        // Alternatives: ipwho.is, ip-api.com
        const locationRes = await fetch("https://ipapi.co/json/");
        
        if (!locationRes.ok) throw new Error("Location fetch failed");
        
        const locData = await locationRes.json();
        const { latitude, longitude, city } = locData;

        // 2. Get Weather using those Coords
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const weatherData = await weatherRes.json();

        setWeather({
          temp: Math.round(weatherData.current_weather.temperature),
          city: city || "India", // Use the city from IP API
          code: weatherData.current_weather.weathercode,
        });

      } catch (error) {
        console.error("Weather/Location Error:", error);
        // Fail silently; the default "New Delhi" state will persist
      }
    };

    initWeather();
  }, []);

  return (
    <section className="flex w-full flex-col space-y-5 py-5">
      <div className="flex w-full items-center justify-between px-5">
        <div className="flex flex-col">
          <h2 className="truncate text-[1.15rem] md:text-[1.75rem]">
            Your briefing
          </h2>
          <p className="text-xs text-gray-600 md:text-base">{getDate()}</p>
        </div>
        
        <Link
          href={`https://www.google.com/search?q=weather+in+${weather.city}`}
          target="_blank"
          className="flex items-center space-x-1 rounded-2xl md:items-start md:space-x-2.5 md:px-5"
        >
          <Image
            height={isMobile ? 41 : 93}
            width={isMobile ? 41 : 93}
            src={getWeatherIcon(weather.code)} 
            alt="weather icon"
            className={`object-contain ${
              !isMobile &&
              "max-h-[2.5625rem] max-w-[2.5625rem] md:max-h-[5.8125rem] md:max-w-[5.8125rem]"
            }`}
          />
          <div className="flex md:flex-col">
            <span className="hidden text-xs font-medium text-gray-500 md:block md:text-sm">
              {weather.city}
            </span>
            <span className="text-base font-medium md:text-2xl md:font-semibold">
              {weather.temp}°C
            </span>
            <span className="hidden text-[0.65rem] font-medium text-blue-550 md:block md:text-xs">
              {/* Optional: Show source or just hide */}
              open-meteo
            </span>
          </div>
        </Link>
      </div>
      <div className={className}>{children}</div>
    </section>
  );
};
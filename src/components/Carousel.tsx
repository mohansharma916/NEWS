"use client";

// 1. Change these to STANDARD imports
// This includes the HTML in the initial server response
import SliderCarousel from "./SliderCarousel";
import GridCarousel from "./GridCarousel"; 

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"; // Removed Suspense (not needed here if we don't lazy load)
import { getDate } from "utils/Utility";
import { Article } from "../lib/api";

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
  // 2. Direct render. The server will now fill this content immediately.
  // Note: Ensure GridCarousel/SliderCarousel handle hydration correctly.
  
  if (isMobile) {
    return (
      <CarouselWrapper isMobile={isMobile} className="relative h-72">
        <SliderCarousel article={articles} />
      </CarouselWrapper>
    );
  } else {
    return (
      <CarouselWrapper
        isMobile={isMobile}
        className="relative flex w-full h-[32rem] md:h-[50rem] lg:h-[55rem]"
      >
        <GridCarousel article={articles} />
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
    city: "New Delhi", 
    code: 1, 
  });

  // Weather is a "Client Enhancement" so useEffect is fine here.
  // It does not block the main image from loading.
  useEffect(() => {
    const initWeather = async () => {
      try {
        const locationRes = await fetch("https://ipapi.co/json/");
        if (!locationRes.ok) throw new Error("Location fetch failed");
        const locData = await locationRes.json();
        const { latitude, longitude, city } = locData;

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const weatherData = await weatherRes.json();

        setWeather({
          temp: Math.round(weatherData.current_weather.temperature),
          city: city || "India", 
          code: weatherData.current_weather.weathercode,
        });

      } catch (error) {
        console.error("Weather/Location Error:", error);
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
        
        {/* <Link
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
           
          </div>
        </Link> */}
      </div>
      <div className={className}>{children}</div>
    </section>
  );
};
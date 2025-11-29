"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { getDate } from "utils/Utility";
import { Article } from "../lib/api";

const SliderCarousel = dynamic<Carousel>(() => import("./SliderCarousel"), {
  ssr: false,
});

const GridCarousel = dynamic<Carousel>(() => import("./GridCarousel"), {
  ssr: false,
});

type props = {
  articles: Article[];
  isMobile: boolean;
};

interface WeatherData {
  temp: number;
  city: string;
  code: number; // <--- Added code to state
}

export default function Carousel({ articles, isMobile }: props) {
  if (isMobile)
    return (
      <CarouselWrapper isMobile={isMobile} className="relative h-72">
        <Suspense>
          <SliderCarousel article={articles} />
        </Suspense>
      </CarouselWrapper>
    );
  else
    return (
      <CarouselWrapper
        isMobile={isMobile}
        className="relative flex w-full h-[32rem] md:h-[50rem] lg:h-[55rem]"
      >
        <Suspense>
          <GridCarousel article={articles} isMobile={isMobile} />
        </Suspense>
      </CarouselWrapper>
    );
}

// --- HELPER: Map WMO Code to Your Local Images ---
const getWeatherIcon = (code: number): string => {
  // WMO Weather Interpretation Codes (https://open-meteo.com/en/docs)
  // 0: Clear sky
  // 1, 2, 3: Mainly clear, partly cloudy, and overcast
  // 45, 48: Fog
  // 51-55: Drizzle
  // 61-65: Rain
  // 71-75: Snow
  // 95-99: Thunderstorm

  if (code === 0) return "/images/sunny.png"; // You need this image
  if (code >= 1 && code <= 3) return "/images/weather.png"; // (Cloudy)
  if (code >= 45 && code <= 48) return "/images/fog.png"; 
  if (code >= 51 && code <= 67) return "/images/rain.png";
  if (code >= 71 && code <= 77) return "/images/snow.png";
  if (code >= 95) return "/images/thunder.png";

  return "/images/weather.png"; // Fallback
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
    city: "Bengaluru",
    code: 1, // Default to cloudy
  });

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const weatherData = await weatherRes.json();

        const cityRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const cityData = await cityRes.json();
        
        const address = cityData.address;
        const cityName =
          address.city ||
          address.town ||
          address.village ||
          address.state_district ||
          "Bengaluru";

        setWeather({
          temp: Math.round(weatherData.current_weather.temperature),
          city: cityName,
          code: weatherData.current_weather.weathercode, // <--- Capture the code
        });
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchWeather(position.coords.latitude, position.coords.longitude),
        () => fetchWeather(12.9716, 77.5946)
      );
    } else {
      fetchWeather(12.9716, 77.5946);
    }
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
          {/* Dynamic Image Source */}
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
              open-meteo
            </span>
          </div>
        </Link>
      </div>
      <div className={className}>{children}</div>
    </section>
  );
};
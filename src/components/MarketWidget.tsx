"use client";

import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

// --- Types ---
type MarketType = "CRYPTO" | "FOREX";

interface MarketData {
  symbol: string;     // e.g., "BTC" or "INR"
  base: string;       // e.g., "USD"
  price: number;      // Current Price
  change: number;     // 24h Percentage Change
  type: MarketType;
}

export default function MarketWidget() {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results: MarketData[] = [];

        // 1. Fetch Crypto (CoinGecko) - BTC & ETH
        // 'simple/price' gives us price and 24h change directly
        const cryptoRes = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
        );
        const cryptoJson = await cryptoRes.json();

        results.push({
          symbol: "BTC",
          base: "USD",
          price: cryptoJson.bitcoin.usd,
          change: cryptoJson.bitcoin.usd_24h_change,
          type: "CRYPTO",
        });

        results.push({
          symbol: "ETH",
          base: "USD",
          price: cryptoJson.ethereum.usd,
          change: cryptoJson.ethereum.usd_24h_change,
          type: "CRYPTO",
        });

        // 2. Fetch Forex (Frankfurter) - USD to INR & EUR
        // We need 'current' and 'previous close' to calculate change %
        const today = new Date().toISOString().split("T")[0];
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterday = yesterdayDate.toISOString().split("T")[0];

        const forexRes = await fetch(
          `https://api.frankfurter.app/${today}..${yesterday}?from=USD&to=INR,EUR`
        );
        // Note: If today is weekend, API might return last available data. 
        // We handle this by just taking the last 2 rates available.
        const forexJson = await forexRes.json();
        
        // Extract rates
        const dates = Object.keys(forexJson.rates).sort(); // Sort dates
        const lastDate = dates[dates.length - 1]; // Latest
        const prevDate = dates[dates.length - 2]; // Previous

        if (lastDate && prevDate) {
          const inrCurrent = forexJson.rates[lastDate].INR;
          const inrPrev = forexJson.rates[prevDate].INR;
          const inrChange = ((inrCurrent - inrPrev) / inrPrev) * 100;

          const eurCurrent = forexJson.rates[lastDate].EUR;
          const eurPrev = forexJson.rates[prevDate].EUR;
          const eurChange = ((eurCurrent - eurPrev) / eurPrev) * 100;

          results.push({
            symbol: "INR",
            base: "USD",
            price: inrCurrent,
            change: inrChange,
            type: "FOREX",
          });

          results.push({
            symbol: "EUR",
            base: "USD",
            price: eurCurrent,
            change: eurChange,
            type: "FOREX",
          });
        }

        setData(results);
        setLoading(false);
      } catch (error) {
        console.error("Market data fetch failed:", error);
      }
    };

    fetchData();
    // Optional: Poll every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Loading Skeleton
  if (loading) return <MarketSkeleton />;

  return (
    <div className="flex h-full w-full flex-col space-y-2.5">
      {/* Row 1 */}
      <div className="flex h-full w-full space-x-2.5">
        <TickerCard data={data[2]} /> {/* INR */}
        <TickerCard data={data[0]} /> {/* BTC */}
      </div>
      {/* Row 2 */}
      <div className="flex h-full w-full space-x-2.5">
        <TickerCard data={data[3]} /> {/* EUR */}
        <TickerCard data={data[1]} /> {/* ETH */}
      </div>
    </div>
  );
}

// Sub-component for individual card
function TickerCard({ data }: { data: MarketData }) {
  if (!data) return null; // Safety

  const isPositive = data.change >= 0;
  const colorClass = isPositive
    ? "bg-green-200/75 text-green-700"
    : "bg-red-200/75 text-red-700";
  const iconColor = isPositive ? "text-green-600" : "text-red-600";
  const Icon = isPositive ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;

  return (
    <div
      className={`flex h-full w-full flex-col items-start justify-between rounded-xl py-5 pl-5 md:rounded-2xl ${colorClass}`}
    >
      <span className="flex w-full justify-between pr-5">
        <span className="text-sm font-semibold 2xl:text-base">
          {isPositive ? "Increasing" : "Decreasing"}
        </span>
        <Icon className={`h-5 w-5 stroke-[0.2rem] ${iconColor} 2xl:h-6 2xl:w-6`} />
      </span>

      <h6 className="flex flex-col 2xl:flex-row 2xl:items-end">
        <span className="text-3xl font-semibold 2xl:text-4xl text-black/80">
          {Math.abs(data.change).toFixed(2)}%
        </span>
        <span className="lg text-gray-500 2xl:ml-2 2xl:text-xl">
            {/* Show price with appropriate decimals */}
            {data.type === 'FOREX' ? data.price.toFixed(4) : data.price.toLocaleString()}
        </span>
      </h6>
      <p className="flex items-end text-black/80">
        <span className="text-xl 2xl:text-2xl">{data.symbol}</span>
        <span className="ml-2 text-lg text-gray-500 2xl:text-xl">
          / {data.base}
        </span>
      </p>
    </div>
  );
}

function MarketSkeleton() {
  return (
    <div className="flex h-full w-full flex-col space-y-2.5 animate-pulse">
      <div className="flex h-full w-full space-x-2.5">
        <div className="h-full w-full rounded-xl bg-gray-200 md:rounded-2xl" />
        <div className="h-full w-full rounded-xl bg-gray-200 md:rounded-2xl" />
      </div>
      <div className="flex h-full w-full space-x-2.5">
        <div className="h-full w-full rounded-xl bg-gray-200 md:rounded-2xl" />
        <div className="h-full w-full rounded-xl bg-gray-200 md:rounded-2xl" />
      </div>
    </div>
  );
}
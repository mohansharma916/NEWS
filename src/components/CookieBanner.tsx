
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user already accepted
    if (!Cookies.get("cookie_consent")) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    Cookies.set("cookie_consent", "true", { expires: 365 });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 p-4 text-white shadow-lg md:flex md:items-center md:justify-between">
      <div className="mb-4 text-sm md:mb-0">
        We use cookies to improve your experience and show personalized ads. 
        Read our <Link href="/privacy" className="underline text-blue-400">Privacy Policy</Link>.
      </div>
      <div className="flex gap-4">
        <button onClick={accept} className="rounded bg-blue-600 px-6 py-2 text-sm font-bold text-white hover:bg-blue-700">
          Accept
        </button>
        <button onClick={() => setShow(false)} className="rounded border border-gray-600 px-6 py-2 text-sm hover:bg-gray-800">
          Decline
        </button>
      </div>
    </div>
  );
}
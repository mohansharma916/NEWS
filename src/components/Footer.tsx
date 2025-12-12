"use client"; // <--- 1. Essential for interactive forms

import Link from "next/link";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { JSX, SVGProps, useState } from "react";
import { subscribeToNewsletter } from "../lib/api";

// --- Navigation Data (Kept same as your code) ---
const navigation = {
  categories: [
    { name: "India", href: "/?category=india" },
    { name: "World", href: "/?category=world" },
    { name: "Business", href: "/?category=business" },
    { name: "Technology", href: "/?category=technology" },
    { name: "Entertainment", href: "/?category=entertainment" },
    { name: "Sports", href: "/?category=sports" },
    { name: "Science", href: "/?category=science" },
    { name: "Health", href: "/?category=health" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
    { name: "Editorial Policy", href: "/editorial-policy" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ],
  social: [
    {
      name: "Twitter",
      href: "https://x.com/knowyourviews",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  // 2. Local State for Form Handling
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // 3. Form Submission Handler
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

const result = await subscribeToNewsletter(email);

    if (result.success) {
      setStatus("success");
      setMessage("Success! You've been subscribed to the daily briefing.");
      setEmail("");
    } else if (result.status === 409) {
      setStatus("error");
      setMessage("You are already subscribed to our newsletter.");
    } else {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* 1. Newsletter Section */}
      <div className="border-b border-gray-800 bg-gray-900 px-6 py-12 lg:px-8">
        <div className="mx-auto flex max-w-[110rem] flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-2xl font-bold leading-9 tracking-tight text-white">
              Subscribe to our Daily Briefing
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-300">
              The latest news, technology trends, and business insights sent to your inbox daily.
            </p>
          </div>
          
          <div className="w-full max-w-md">
            <form onSubmit={handleSubscribe} className="flex gap-x-3">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 disabled:opacity-50"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="flex-none rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "..." : "Subscribe"} 
                <PaperAirplaneIcon className="ml-2 h-4 w-4" />
              </button>
            </form>

            {/* 4. Feedback Messages */}
            {message && (
              <p className={`mt-3 text-xs font-medium ${
                status === "success" ? "text-green-400" : "text-red-400"
              }`}>
                {message}
              </p>
            )}
            
            {!message && (
               <p className="mt-2 text-xs leading-5 text-gray-400">
                We care about your data. Read our{' '}
                <Link href="/privacy" className="font-semibold text-white hover:text-blue-400">
                  privacy policy
                </Link>.
              </p>
            )}
          </div>

        </div>
      </div>

      <div className="mx-auto max-w-[110rem] px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* 2. Brand Column */}
          <div className="space-y-8">
            <span className="text-2xl font-bold text-white tracking-wider">
              KNOW YOUR VIEWS
            </span>
            <p className="text-sm leading-6 text-gray-300">
              Delivering accurate, timely, and unbiased news from around the globe. 
              Your trusted source for what matters today.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-500 hover:text-gray-400">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* 3. Links Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Categories</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.categories.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* 4. Bottom Copyright */}
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} Know Your Views, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
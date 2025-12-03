"use client";

import { useState } from "react";
import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Connect this to a real API (like Resend or Formspree)
    setTimeout(() => {
      alert("Thank you for your message! We will get back to you shortly.");
      setIsSubmitting(false);
      // Reset form logic here
    }, 1000);
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
        
        {/* Left Column: Info */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Get in touch</h1>
          <p className="mt-4 text-lg leading-7 text-gray-600">
            Have a news tip, a correction, or a partnership inquiry? We’d love to hear from you.
            Fill out the form or reach us via email.
          </p>

          <dl className="mt-8 space-y-6">
            <div className="flex gap-x-4">
              <dt className="flex-none">
                <span className="sr-only">Email</span>
                <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
              </dt>
              <dd>
                <a className="hover:text-gray-900" href="mailto:contact@knowyourviews.com">
                  contact@knowyourviews.com
                </a>
              </dd>
            </div>
            <div className="flex gap-x-4">
              <dt className="flex-none">
                <span className="sr-only">Address</span>
                <MapPinIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
              </dt>
              <dd className="text-gray-600">
                Bengaluru, Karnataka<br />
                India
              </dd>
            </div>
          </dl>
        </div>

        {/* Right Column: Form */}
      <form action="https://formspree.io/f/mrbnkwbq" method="POST" >
          <div className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
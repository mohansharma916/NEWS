import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import MotionOptimize from "utils/Motion";
import Header from "components/Header";
import { Suspense } from "react";
import "./globals.css";
import { AuthProvider } from "../context/authContext";
import Footer from "components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"], display: "swap" });

const Novante = localFont({
  src: [
    {
      path: "../fonts/Novante.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-novante",
});


export const metadata: Metadata = {
  title: {
    template: '%s | Know Your Views',
    default: 'Know Your Views | Bollywood, India, Automotive, Stocks, Tech.', // Stronger default
  },
  description: 'Understand the world with Know Your Views. Your trusted source for balanced news in Tech, Business, and World events. Get the latest insights on technology, business, sports, and entertainment on Know Your Views.',
  metadataBase: new URL('https://knowyourviews.com'), 
  keywords: ["News", "India News", "World News", "Technology", "Business", "Sports", "Know Your Views", "Breaking News"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    siteName: 'Know Your Views',
    type: 'website',
    locale: 'en_US',
  },
  verification: {
    google: 'ca-pub-2187551953908136', // Replace with your actual publisher ID
  }
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const NextFont = `${inter.className} ${Novante.variable}`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${NextFont} overflow-y-scroll antialiased`}>
        <meta name="google-adsense-account" content="ca-pub-2187551953908136"></meta>
         <GoogleAnalytics gaId="G-EF8V47D1TY" />
        <AuthProvider>
        <MotionOptimize>
          <Suspense>
            <Header />
          </Suspense>
          <main id="page-id" className="flex-grow">{children}</main>
          <Footer />
        </MotionOptimize>
        </AuthProvider>
      </body>
    </html>
  );
}

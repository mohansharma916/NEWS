import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    webVitalsAttribution: ["CLS", "LCP"],
  },
  images: {
    // 2. Security: Only allow images from your S3 bucket and trusted sources
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com", // Allow your S3 bucket
      },
      {
        protocol: "https",
        hostname: "loremflickr.com", // For your faker/seed data
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net", // Common placeholder host
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // Common for user avatars
      },{
         protocol: "http",
        hostname:"localhost"
      },{
        protocol: "https",
        hostname: "i.blogs.es"
      },{
        protocol: "https",
        hostname: "static.slickdealscdn.com"
      },
      {protocol: "https",
        hostname: "i.insider.com"
      },{
        protocol: "https",
        hostname: "**"
      }



    ],},
  async headers() {
    return [
      {
        source: "/(.*)?",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

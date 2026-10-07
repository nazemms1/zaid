import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false, // hide the Next.js "N" badge
  output: "export", // static site for Cloudflare Pages (out/)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;


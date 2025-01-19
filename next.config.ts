import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.cdn2.seaart.me'
      }
    ]
  },
};

export default nextConfig;

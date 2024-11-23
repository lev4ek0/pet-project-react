import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/static/:path*',
        destination: 'https://lev-4-ek.online/static/:path*' // Proxy to Backend
      }
    ]
  }
};

export default nextConfig;

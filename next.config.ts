import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disable extra renders in development
  swcMinify: true, // Enable SWC minification for faster builds
 
};

export default nextConfig;

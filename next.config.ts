import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  // Add empty turbopack config to resolve the warning
  turbopack: {},
  
  webpack: (config) => {
    // Add path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './'),
    };
    return config;
  },
};

export default nextConfig;

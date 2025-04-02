import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  webpack: (config, { isServer }) => {
    // Enable source maps in development and production
    if (!isServer) {
      config.devtool = "source-map";
    }
    return config;
  },
};

export default nextConfig;

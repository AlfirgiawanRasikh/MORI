import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  // Keep the maintained agent guidance from being regenerated with forbidden punctuation.
  agentRules: false,
};

export default nextConfig;

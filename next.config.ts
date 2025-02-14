import "dotenv/config";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default nextConfig;

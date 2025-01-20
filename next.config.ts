import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000", // Specify the port for your local backend
        pathname: "/uploads/**", // Match the folder where your input images are stored
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000", // Specify the port for your local backend
        pathname: "/outputs/**", // Match the folder where your output images are stored
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**", // Allows all image paths under this domain
      },
    ],
  },
};

export default nextConfig;

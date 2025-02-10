/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.graphassets.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "federate-this-astro.vercel.app",
        port: "",
      },
      {
        protocol: 'https',
        hostname: '**.graphassets.com'
      }
    ],
  },
};

export default nextConfig;

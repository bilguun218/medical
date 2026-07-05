/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.blob.vercel-storage.com"
      }
    ]
  },
  poweredByHeader: false
};

export default nextConfig;

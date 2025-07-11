/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
    serverActions: {
      bodySizeLimit: "20mb",
    },
    optimizePackageImports: [
      "@radix-ui/react-icons",
      "@radix-ui/react-avatar",
      "@radix-ui/react-dialog",
      "@radix-ui/react-label",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-slot",
      "@radix-ui/react-toast",
      "react-icons",
    ],
  },
  images: {
    domains: ["localhost", "images.unsplash.com", "via.placeholder.com"],
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;

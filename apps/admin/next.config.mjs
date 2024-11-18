/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLIP_DROP_API_KEY:
      "8b82702806483e97f99a51ba40c436e16139121644abdaf00126afb693bf8458a6eaae970e8ac29c323c98f0dfc3072a",
  },
  reactStrictMode: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/overview",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLIP_DROP_API_KEY:
      "0acf88a32f96321a0dae7e9d5c190406cfbcd6709b48bfeda1fd16e23a16eb16d593bff62cc9eb392a9504b9737134d8",
  },
  reactStrictMode: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;

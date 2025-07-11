/** @type {import('next').NextConfig} */
const createNextConfig = (options = {}) => {
  const {
    env = {},
    redirects = [],
    experimental = {},
    images = {},
    ...otherOptions
  } = options;

  return {
    reactStrictMode: true,
    swcMinify: true,
    
    // Environment variables
    env: {
      ...env,
    },

    // Experimental features
    experimental: {
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
      ...experimental,
    },

    // Image optimization
    images: {
      domains: ["localhost"],
      formats: ["image/webp", "image/avif"],
      ...images,
    },

    // Redirects
    async redirects() {
      return redirects;
    },

    // Bundle analyzer (only in development)
    ...(process.env.ANALYZE === "true" && {
      webpack: (config, { isServer }) => {
        if (!isServer) {
          const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
          config.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: "static",
              openAnalyzer: false,
            })
          );
        }
        return config;
      },
    }),

    // Other options
    ...otherOptions,
  };
};

module.exports = createNextConfig;

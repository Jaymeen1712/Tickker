/** @type {import('jest').Config} */
module.exports = {
  projects: [
    {
      displayName: "store-front",
      testMatch: ["<rootDir>/apps/store-front/**/*.test.{js,ts,tsx}"],
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      moduleNameMapping: {
        "^@/(.*)$": "<rootDir>/apps/store-front/src/$1",
        "^@repo/(.*)$": "<rootDir>/packages/$1",
      },
      transform: {
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
      },
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
      collectCoverageFrom: [
        "apps/store-front/src/**/*.{js,ts,tsx}",
        "!apps/store-front/src/**/*.d.ts",
        "!apps/store-front/src/**/*.stories.{js,ts,tsx}",
      ],
    },
    {
      displayName: "admin",
      testMatch: ["<rootDir>/apps/admin/**/*.test.{js,ts,tsx}"],
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      moduleNameMapping: {
        "^@/(.*)$": "<rootDir>/apps/admin/src/$1",
        "^@repo/(.*)$": "<rootDir>/packages/$1",
      },
      transform: {
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
      },
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
      collectCoverageFrom: [
        "apps/admin/src/**/*.{js,ts,tsx}",
        "!apps/admin/src/**/*.d.ts",
        "!apps/admin/src/**/*.stories.{js,ts,tsx}",
      ],
    },
    {
      displayName: "packages",
      testMatch: ["<rootDir>/packages/**/*.test.{js,ts,tsx}"],
      testEnvironment: "node",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      moduleNameMapping: {
        "^@repo/(.*)$": "<rootDir>/packages/$1",
      },
      transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
      },
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
      collectCoverageFrom: [
        "packages/**/*.{js,ts,tsx}",
        "!packages/**/*.d.ts",
        "!packages/**/*.stories.{js,ts,tsx}",
        "!packages/**/node_modules/**",
      ],
    },
  ],
  collectCoverageFrom: [
    "apps/**/*.{js,ts,tsx}",
    "packages/**/*.{js,ts,tsx}",
    "!**/*.d.ts",
    "!**/*.stories.{js,ts,tsx}",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/dist/**",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

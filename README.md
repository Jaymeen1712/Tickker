# Tickker - Watch E-commerce Platform

A modern, full-stack e-commerce platform for luxury watches built with Next.js, TypeScript, and Prisma.

## 🏗️ Architecture

This is a monorepo built with Turborepo containing:

- **Apps**:

  - `store-front`: Customer-facing e-commerce website
  - `admin`: Admin dashboard for managing products, orders, and users

- **Packages**:
  - `shared-auth`: Authentication utilities and configurations
  - `shared-config`: Shared configurations (Next.js, Tailwind, Prettier)
  - `shared-database`: Database queries and utilities
  - `shared-performance`: Performance optimization hooks and components
  - `shared-store`: Zustand store configurations and slices
  - `shared-testing`: Testing utilities, mocks, and fixtures
  - `shared-types`: TypeScript type definitions
  - `shared-ui`: Reusable UI components
  - `shared-utils`: Utility functions and constants
  - `database`: Prisma schema and database client
  - `eslint-config`: ESLint configurations
  - `typescript-config`: TypeScript configurations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Fill in the required environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `AUTH_SECRET`: Secret for NextAuth.js
- `CLIP_DROP_API_KEY`: API key for image processing (admin only)

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

# Design links

1. Admin: https://dribbble.com/shots/22092501-Clothes-Search-Admin-Dashboard-Analytics-UX-UI
2. Storefront: https://dribbble.com/shots/23365393-E-commerce-Watches-Web-Design

Check for text mask fading: https://pqina.nl/blog/fade-out-overflow-using-css-mask-image/

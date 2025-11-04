# 🕒 Tickker – Modern E-commerce Platform

A **full-stack e-commerce platform** for selling premium watches, built with **TurboRepo** for a scalable monorepo architecture.  
Tickker includes a **storefront** for customers and an **admin dashboard** for managing products, orders, and analytics — both sharing a unified design system and backend.

---

## 🚀 Tech Stack

**Frameworks & Libraries**

- **Next.js 14** (App Router, Server Components)
- **NextAuth.js** (Authentication)
- **Radix UI** + **Tailwind CSS** (Accessible UI & Styling)
- **Framer Motion** (Animations)
- **Zustand** (Global State Management)
- **Zod** + **React Hook Form** (Schema Validation & Form Handling)
- **Prisma ORM** (Database)
- **PostgreSQL** (Relational Database)
- **TurboRepo** (Monorepo Management)

---

## ✨ Features

### 🛍️ Storefront

- Dynamic product pages with SEO-optimized routing
- Category-based filtering & sorting
- User authentication & session handling
- Cart, checkout, and order flow
- Responsive, accessible, and animated UI

### 🧭 Admin Dashboard

- Product, category, and order management
- Analytics & sales overview
- Image upload and asset management
- Role-based authentication
- Built on the same stack for consistency and code sharing

---

## 🧩 Architecture

This project follows a **monorepo setup** using **TurboRepo**, with shared configurations, types, and database schema:

```

tickker/
├── apps/
│ ├── tickker-storefront/ # Customer-facing app
│ ├── tickker-admin/ # Admin dashboard
├── packages/
│ ├── database/ # Prisma schema and migrations
│ ├── ui/ # (Optional) shared UI components
│ ├── config/ # ESLint, Tailwind, tsconfig, etc.

```

---

## 🛠️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Jaymeen1712/Tickker.git
cd Tickker
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create `.env` files in both `apps/tickker-storefront` and `apps/tickker-admin`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/tickker"
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4️⃣ Run database migrations

```bash
npx prisma migrate dev
```

### 5️⃣ Start development servers

```bash
npm run dev
```

Storefront: [http://localhost:3000](http://localhost:3000)
Admin Dashboard: [http://localhost:3001](http://localhost:3001)

---

## 🧠 Learnings

- Mastered **monorepo architecture** with TurboRepo for managing multiple Next.js apps.
- Implemented **full-stack authentication** using NextAuth and Prisma adapter.
- Designed **reusable UI and validation logic** shared across admin and storefront.

---

## 🔗 Links

- 🌐 **Live Demo:** [tickker.vercel.app](https://tickker.vercel.app/)
- 💻 **GitHub Repo:** [github.com/Jaymeen1712/Tickker](https://github.com/Jaymeen1712/Tickker)

---

## 🖼️ Screenshots

| Storefront                               |
| ---------------------------------------- |
| ![Tickker Storefront](./tickker-img.png) |

---

# Design links

1. Admin: https://dribbble.com/shots/22092501-Clothes-Search-Admin-Dashboard-Analytics-UX-UI
2. Storefront: https://dribbble.com/shots/23365393-E-commerce-Watches-Web-Design

---

## 👨‍💻 Author

**Jaymeen Sonara**
Frontend Developer | React | Next.js | TypeScript
[GitHub](https://github.com/Jaymeen1712) • [LinkedIn](#)

---

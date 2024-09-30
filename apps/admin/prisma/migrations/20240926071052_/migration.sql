/*
  Warnings:

  - You are about to drop the column `description` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the `cartItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cartItems" DROP CONSTRAINT "cartItems_cartId_fkey";

-- DropForeignKey
ALTER TABLE "cartItems" DROP CONSTRAINT "cartItems_productId_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_profileId_fkey";

-- DropForeignKey
ALTER TABLE "orderItems" DROP CONSTRAINT "orderItems_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orderItems" DROP CONSTRAINT "orderItems_productId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_profileId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_productId_fkey";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "description";

-- DropTable
DROP TABLE "cartItems";

-- DropTable
DROP TABLE "carts";

-- DropTable
DROP TABLE "orderItems";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "products";

-- DropTable
DROP TABLE "reviews";

/*
  Warnings:

  - You are about to drop the column `description` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `carts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "OrderItemStatus" AS ENUM ('DELIVERED', 'CANCELLED', 'RETURNED', 'PENDING', 'FAILED', 'PROCESSING');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- AlterTable
ALTER TABLE "orderItems" ADD COLUMN     "status" "OrderItemStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "description";

-- CreateIndex
CREATE UNIQUE INDEX "carts_profileId_key" ON "carts"("profileId");

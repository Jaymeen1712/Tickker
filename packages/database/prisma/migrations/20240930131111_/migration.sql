/*
  Warnings:

  - Added the required column `stock` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "dimensions" TEXT,
ADD COLUMN     "isVisible" BOOLEAN DEFAULT true,
ADD COLUMN     "stock" INTEGER NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION;

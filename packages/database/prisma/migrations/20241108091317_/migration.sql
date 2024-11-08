/*
  Warnings:

  - You are about to drop the column `brand` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `products` table. All the data in the column will be lost.
  - Added the required column `model` to the `products` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `category` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SPACE_TIMER', 'TOURBILLON');

-- AlterTable
ALTER TABLE "products" DROP COLUMN "brand",
DROP COLUMN "rating",
ADD COLUMN     "model" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;

/*
  Warnings:

  - Added the required column `brand` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buckle` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `caseDiameter` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `caseMaterial` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dialColor` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movement` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strap` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strapSize` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waterResistance` to the `products` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "buckle" TEXT NOT NULL,
ADD COLUMN     "caseDiameter" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "caseMaterial" TEXT NOT NULL,
ADD COLUMN     "dialColor" TEXT NOT NULL,
ADD COLUMN     "movement" TEXT NOT NULL,
ADD COLUMN     "strap" TEXT NOT NULL,
ADD COLUMN     "strapSize" TEXT NOT NULL,
ADD COLUMN     "waterResistance" TEXT NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Category";

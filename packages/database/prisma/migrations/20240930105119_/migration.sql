/*
  Warnings:

  - You are about to drop the `AdminAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AdminSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `adminProfiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `adminUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "USER_ROLES" AS ENUM ('STANDARD', 'ADMIN');

-- DropForeignKey
ALTER TABLE "AdminAccount" DROP CONSTRAINT "AdminAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "AdminSession" DROP CONSTRAINT "AdminSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "adminProfiles" DROP CONSTRAINT "adminProfiles_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "roles" "USER_ROLES"[] DEFAULT ARRAY['STANDARD']::"USER_ROLES"[];

-- DropTable
DROP TABLE "AdminAccount";

-- DropTable
DROP TABLE "AdminSession";

-- DropTable
DROP TABLE "adminProfiles";

-- DropTable
DROP TABLE "adminUsers";

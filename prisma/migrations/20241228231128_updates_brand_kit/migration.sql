/*
  Warnings:

  - You are about to drop the column `isPreferred` on the `Term` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[brandKitId]` on the table `ColorPalette` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TermTypeEnum" AS ENUM ('PREFERRED', 'AVOID');

-- AlterTable
ALTER TABLE "BrandKit" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Term" DROP COLUMN "isPreferred",
ADD COLUMN     "termType" "TermTypeEnum";

-- CreateIndex
CREATE UNIQUE INDEX "ColorPalette_brandKitId_key" ON "ColorPalette"("brandKitId");

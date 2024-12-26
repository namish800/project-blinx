-- CreateEnum
CREATE TYPE "UserProfileStatus" AS ENUM ('INCOMPLETE', 'COMPLETE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileStatus" "UserProfileStatus" NOT NULL DEFAULT 'INCOMPLETE';

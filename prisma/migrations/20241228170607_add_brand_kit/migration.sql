-- CreateEnum
CREATE TYPE "StyleItemType" AS ENUM ('VALUE', 'TONE');

-- CreateTable
CREATE TABLE "BrandKit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BrandKit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersToBrandKits" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "brandKitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsersToBrandKits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorPalette" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "colors" TEXT[],
    "brandKitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ColorPalette_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logo" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "brandKitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Logo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Font" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    "brandKitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Font_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextStyleGuide" (
    "id" TEXT NOT NULL,
    "brandKitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TextStyleGuide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StyleItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "StyleItemType" NOT NULL,
    "textStyleGuideId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StyleItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rules" (
    "id" TEXT NOT NULL,
    "textStyleGuideId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Term" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isPreferred" BOOLEAN,
    "rulesId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersToBrandKits_userId_brandKitId_key" ON "UsersToBrandKits"("userId", "brandKitId");

-- CreateIndex
CREATE UNIQUE INDEX "TextStyleGuide_brandKitId_key" ON "TextStyleGuide"("brandKitId");

-- CreateIndex
CREATE UNIQUE INDEX "Rules_textStyleGuideId_key" ON "Rules"("textStyleGuideId");

-- AddForeignKey
ALTER TABLE "UsersToBrandKits" ADD CONSTRAINT "UsersToBrandKits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToBrandKits" ADD CONSTRAINT "UsersToBrandKits_brandKitId_fkey" FOREIGN KEY ("brandKitId") REFERENCES "BrandKit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorPalette" ADD CONSTRAINT "ColorPalette_brandKitId_fkey" FOREIGN KEY ("brandKitId") REFERENCES "BrandKit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logo" ADD CONSTRAINT "Logo_brandKitId_fkey" FOREIGN KEY ("brandKitId") REFERENCES "BrandKit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Font" ADD CONSTRAINT "Font_brandKitId_fkey" FOREIGN KEY ("brandKitId") REFERENCES "BrandKit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextStyleGuide" ADD CONSTRAINT "TextStyleGuide_brandKitId_fkey" FOREIGN KEY ("brandKitId") REFERENCES "BrandKit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StyleItem" ADD CONSTRAINT "StyleItem_textStyleGuideId_fkey" FOREIGN KEY ("textStyleGuideId") REFERENCES "TextStyleGuide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rules" ADD CONSTRAINT "Rules_textStyleGuideId_fkey" FOREIGN KEY ("textStyleGuideId") REFERENCES "TextStyleGuide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Term" ADD CONSTRAINT "Term_rulesId_fkey" FOREIGN KEY ("rulesId") REFERENCES "Rules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

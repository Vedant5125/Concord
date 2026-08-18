/*
  Warnings:

  - A unique constraint covering the columns `[name,organizationId]` on the table `Consumer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,organizationId]` on the table `Producer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizationId` to the `Consumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Producer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Consumer_name_key";

-- DropIndex
DROP INDEX "Producer_name_key";

-- AlterTable
ALTER TABLE "Consumer" ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Producer" ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "apiKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_apiKey_key" ON "Organization"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Consumer_name_organizationId_key" ON "Consumer"("name", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Producer_name_organizationId_key" ON "Producer"("name", "organizationId");

-- AddForeignKey
ALTER TABLE "Producer" ADD CONSTRAINT "Producer_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumer" ADD CONSTRAINT "Consumer_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

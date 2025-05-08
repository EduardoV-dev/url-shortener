/*
  Warnings:

  - You are about to drop the column `shortUrl` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `visits` on the `Url` table. All the data in the column will be lost.
  - Added the required column `originalUrl` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortCode` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Url_shortUrl_key";

-- AlterTable
ALTER TABLE "Url" DROP COLUMN "shortUrl",
DROP COLUMN "url",
DROP COLUMN "visits",
ADD COLUMN     "clickCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "originalUrl" TEXT NOT NULL,
ADD COLUMN     "shortCode" TEXT NOT NULL;

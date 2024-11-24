/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Track` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

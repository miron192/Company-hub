/*
  Warnings:

  - You are about to drop the column `creatorId` on the `meeting` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `meeting` table. All the data in the column will be lost.
  - Added the required column `userId` to the `meeting` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."meeting" DROP CONSTRAINT "meeting_creatorId_fkey";

-- AlterTable
ALTER TABLE "meeting" DROP COLUMN "creatorId",
DROP COLUMN "updatedAt",
ADD COLUMN     "time" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "meeting" ADD CONSTRAINT "meeting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

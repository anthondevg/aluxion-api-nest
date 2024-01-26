/*
  Warnings:

  - You are about to drop the column `passwordResetAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordResetAt",
DROP COLUMN "passwordResetToken",
ADD COLUMN     "expiryDate" TIMESTAMP(3),
ADD COLUMN     "resetToken" TEXT;

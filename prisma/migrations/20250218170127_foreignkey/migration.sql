/*
  Warnings:

  - You are about to drop the column `email` on the `OTP` table. All the data in the column will be lost.
  - Added the required column `userid` to the `OTP` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "OTP_email_key";

-- AlterTable
ALTER TABLE "OTP" DROP COLUMN "email",
ADD COLUMN     "userid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

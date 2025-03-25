/*
  Warnings:

  - You are about to drop the column `phone` on the `OTP` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `OTP` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OTP" DROP COLUMN "phone",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OTP_email_key" ON "OTP"("email");

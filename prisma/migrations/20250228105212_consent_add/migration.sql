/*
  Warnings:

  - You are about to drop the column `disclosure_of_inf` on the `personalInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "personalInfo" DROP COLUMN "disclosure_of_inf",
ADD COLUMN     "consent1" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "consent2" BOOLEAN NOT NULL DEFAULT false;

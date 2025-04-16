/*
  Warnings:

  - You are about to drop the column `hospital` on the `Appointments` table. All the data in the column will be lost.
  - Added the required column `hospital_email` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointments" DROP COLUMN "hospital",
ADD COLUMN     "hospital_email" TEXT NOT NULL;

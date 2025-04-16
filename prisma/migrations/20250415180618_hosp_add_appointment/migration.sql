/*
  Warnings:

  - Added the required column `hospital` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN     "hospital" TEXT NOT NULL;

/*
  Warnings:

  - Added the required column `patient` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN     "patient" TEXT NOT NULL;

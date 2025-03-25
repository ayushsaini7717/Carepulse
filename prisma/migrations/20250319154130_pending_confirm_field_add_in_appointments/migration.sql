-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN     "isconfirm" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pending" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Appointments" (
    "id" TEXT NOT NULL,
    "physician" TEXT NOT NULL,
    "Reason" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "appointment_date" TEXT NOT NULL,
    "userid" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointments_id_key" ON "Appointments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Appointments_userid_key" ON "Appointments"("userid");

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

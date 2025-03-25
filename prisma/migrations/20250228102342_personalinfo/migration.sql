-- CreateTable
CREATE TABLE "personalInfo" (
    "id" TEXT NOT NULL,
    "Dob" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "physician" TEXT NOT NULL,
    "allergies" TEXT NOT NULL,
    "medication" TEXT NOT NULL,
    "family_medical_history" TEXT NOT NULL,
    "Past_medical_history" TEXT NOT NULL,
    "disclosure_of_inf" BOOLEAN NOT NULL DEFAULT false,
    "userid" TEXT NOT NULL,

    CONSTRAINT "personalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personalInfo_userid_key" ON "personalInfo"("userid");

-- AddForeignKey
ALTER TABLE "personalInfo" ADD CONSTRAINT "personalInfo_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface DoctorSchema {
  name: string;
  userId: string;
}

export async function GET() {
  try {
    const response = await prisma.doctor.findMany({
      select: {
        name: true,
        userId: true, // userId refers to the hospital ID
      },
    });

    const groupByHospitalId = (doctors: DoctorSchema[]) => {
      return doctors.reduce((acc: Record<string, { doctorNames: string[] }>, doctor) => {
        const { userId, name } = doctor;
        if (!acc[userId]) {
          acc[userId] = { doctorNames: [] };
        }
        acc[userId].doctorNames.push(name);
        return acc;
      }, {});
    };

    const groupedDoctors = groupByHospitalId(response);
    return NextResponse.json(groupedDoctors);
  } catch (err) {
    console.error(err);
  }
}

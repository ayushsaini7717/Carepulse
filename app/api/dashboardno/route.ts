import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")!;

  try {
    const [scheduled, cancelled, confirmed, appointments] = await Promise.all([
      prisma.appointments.findMany({
        where: {
          isconfirm: true,
          hospital_email: email,
        },
      }),
      prisma.appointments.findMany({
        where: {
          isconfirm: false,
          pending: false,
          hospital_email: email,
        },
      }),
      prisma.appointments.findMany({
        where: {
          pending: true,
          hospital_email: email,
        },
      }),
      prisma.appointments.findMany({
        where: {
          hospital_email: email
        },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      scheduleCount: scheduled.length,
      cancelledCount: cancelled.length,
      confirmedCount: confirmed.length,
      appointments,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

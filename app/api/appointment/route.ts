"use server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        email: body.email
      }
    });

    if (!user) {
      throw new Error("User not found with given email");
    }

    await prisma.appointments.create({
      data: {
        physician: body.physician,
        Reason: body.reason,
        comments: body.comments,
        appointment_date: body.appointment_date,
        patient: body.patient,
        hospital_email: body.hospital_email,
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });

    return NextResponse.json({ msg: "Success" });
  } catch (err) {
    console.error(err);
    throw new Error("appointment not scheduled!");
  }
}

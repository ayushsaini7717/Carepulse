import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.specialization || !body.userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await prisma.doctor.create({
      data: {
        name: body.name,
        specialization: body.specialization,
        qualification: body.qualification,
        experience: body.experience,
        user: {
          connect: {
            id: body.userId, 
          },
        },
      },
    });

    return NextResponse.json({ msg: "Success" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

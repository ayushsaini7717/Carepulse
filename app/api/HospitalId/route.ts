import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    const email = decoded.email;

    if (!email) {
      return NextResponse.json({ error: "Email not found in token" }, { status: 400 });
    }

    const res = await prisma.hospital.findFirst({
      where: { email }
    });

    return NextResponse.json({ id: res?.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ verified: false, error: "Invalid or expired token" }, { status: 401 });
  }
}

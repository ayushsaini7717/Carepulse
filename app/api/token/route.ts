import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET || "";


export async function POST(req: Request) {
  const cookieStore=await cookies();
  const body=await req.json();
  const token = jwt.sign({ email: body.email }, SECRET_KEY);

  cookieStore.set('jwt',token);
  return NextResponse.json({ token });
}


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  
  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ verified: true, decoded });
  } catch (err) {
    return NextResponse.json({ verified: false, error: "Invalid token" }, { status: 401 });
  }
}

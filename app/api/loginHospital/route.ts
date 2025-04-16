import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient;

export async function POST(req: Request){
    try{
        const body=await req.json();
        const response=await prisma.hospital.findFirst({
            where: {
                email: body.email,
                password: body.password
            }
        })
        if(!response){
            return NextResponse.json({"Status": "Failed"});
        }
        return NextResponse.json({"Status": "Success"})
    }catch(err){
        console.log(err);
    }
}
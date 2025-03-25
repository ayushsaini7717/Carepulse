import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: Request){
    try{
        const body=await req.json();
        const update=await prisma.appointments.update({
            where: {
                id: body.id
            },data: {
                pending: false,
                isconfirm: true
            }
        })
        return NextResponse.json({msg: "successfully scheduled!",update});
    }catch(err){
        console.log(err);
        return;
    }
}
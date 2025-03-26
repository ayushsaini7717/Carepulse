import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: Request){
    try{
        const body=await req.json();
    
        await prisma.appointments.update({
            where: {
                id: body.id
            },data: {
                pending: false,
                isconfirm: false
            }
        })

        return NextResponse.json({msg: "Cancelled Successfully"});
    }catch(err){
        console.log(err);
    }
}
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req:Request){
    try{
        const body=await req.json();
        const ispresent=await prisma.oTP.findFirst({
            where: {
                email: body.email
            }
        })
        if(ispresent){
            const updateotp=await prisma.oTP.update({
                where: {
                    email: body.email
                },data:{
                    otp: body.otp,
                    createdAt: new Date()
                }
            })
        }else{
            const createotp=await prisma.oTP.create({
                data:{
                    otp: body.otp,
                    email: body.email
                }
            })
        }

        return NextResponse.json({msg: "success"});
    }catch(err){
        console.log(err);
    }
}

export async function GET(req: Request){
    try{
        const { searchParams } = new URL(req.url);
        const email=searchParams.get("email") ?? "";
        console.log(email);
        const ispresent=await prisma.oTP.findFirst({
            where: {
                email: email 
            }
        })
        if(ispresent){
            return NextResponse.json({msg: "retrived",ispresent})
        }else{
            return NextResponse.json({msg: "no data"})
        }
    }catch(err){
        return NextResponse.json({msg: "error"})
    }
    
}


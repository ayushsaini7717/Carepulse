
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: Request){
    try{
        const body=await req.json();
        const ispresent=await prisma.user.findFirst({
            where:{
                email: body.email,
                phone: body.phone
            }
        })
        if(ispresent){
            return NextResponse.json({msg: "user already present",ispresent})
        }else{
            const User=await prisma.user.create({
                data: {
                    fullName: body.fullName,
                    email: body.email,
                    phone: body.phone
                }
            })
            return NextResponse.json({msg: "user created",User})
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({msg: "somthing went wrong"})
    }
}
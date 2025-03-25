import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(){
    const scheduled=await prisma.appointments.findMany({
        where: {
            isconfirm: true
        }
    })

    const cancelled=await prisma.appointments.findMany({
        where: {
            isconfirm: false,
            pending: false
        }
    })

    const confirmed=await prisma.appointments.findMany({
        where: {
            pending: true
        }
    })

    const appointments=await prisma.appointments.findMany({
        include: {
            user: {
                select: {
                    email: true
                }
            }
        }
    });
    

    return NextResponse.json({scheduleCount: scheduled.length,cancelledCount: cancelled.length,confirmedCount: confirmed.length,appointments})
}



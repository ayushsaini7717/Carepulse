
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();

export async function schedule(id: string){
    const update=await prisma.appointments.update({
        where: {
            id: id
        },data: {
            pending: false,
            isconfirm: true
        }
    })
}

export async function cancelledappointment(id: string){
    const update=await prisma.appointments.update({
        where: {
            id: id
        },data: {
            pending: false,
            isconfirm: false
        }
    })
}
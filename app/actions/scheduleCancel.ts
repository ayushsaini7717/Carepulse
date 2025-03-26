
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();

export async function schedule(id: string){
    await prisma.appointments.update({
        where: {
            id: id
        },data: {
            pending: false,
            isconfirm: true
        }
    })
}

export async function cancelledappointment(id: string){
    await prisma.appointments.update({
        where: {
            id: id
        },data: {
            pending: false,
            isconfirm: false
        }
    })
}
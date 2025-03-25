"use server"
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
const prisma=new PrismaClient();

const AppointmentAction=async (formdata: FormData)=>{
    const physician=formdata.get("physician") as string;
    const reason=formdata.get("Reason") as string;
    const comments=formdata.get("comments") as string;
    const appointment_date=formdata.get("date-of-appointment") as string;
    const mail=formdata.get("email") as string;
    const patient=formdata.get("patient") as string;

    try{
        const user=await prisma.user.findFirst({
            where: {
                email: mail 
            }
        })
    
        const appointment_result=await prisma.appointments.create({
            data: {
                physician: physician,
                Reason: reason,
                comments: comments,
                appointment_date: appointment_date,
                patient: patient,
                user: {
                    connect: {
                        id: user?.id
                    }
                }
            }
        })
    }catch(err){
        console.log(err);
        throw new Error("appointment not scheduled!")
    }
    
    redirect("/success");

}

export default AppointmentAction;

// home/ayush-saini/ns-allinone-2.35/otcl-1.14, /home/ayush-saini/ns-allinone-2.35/lib
// /home/ayush-saini/ns-allinone-2.35/bin:/home/ayush-saini/ns-allinone-2.35/tcl8.5.10/unix:/home/ayush-saini/ns-allinone-2.35/tk8.5.10/unix
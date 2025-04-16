"use server"
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();

const HospitalRegister=async (formdata: FormData)=>{
    try{
        const name=formdata.get("name") as string;
        const email=formdata.get("email") as string;
        const password=formdata.get("password") as string;
        const city=formdata.get("city") as string;
        const state=formdata.get("state") as string;
        const address=formdata.get("address") as string;
        const contact=formdata.get("contact") as string;
        

        await prisma.hospital.create({
            data: {
                name: name,
                email: email,
                password: password,
                city: city,
                state: state,
                full_address: address,
                contact: contact
            }
        })

    }catch(err){
        console.log(err);
    }
    redirect("/hospital-login");
}

export default HospitalRegister;
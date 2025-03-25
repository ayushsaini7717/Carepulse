"use server"
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma=new PrismaClient();

export async function saveUserInfo(formdata: FormData){
    const name=formdata.get("name") as string;
    const email=formdata.get("email") as string;
    const phone=formdata.get("phone") as string;
    const dob=formdata.get("dob") as string;
    const gender=formdata.get("gender") as string;
    const physician=formdata.get("physician") as string;
    const allergies=formdata.get("allergies") as string;
    const consent1=formdata.get("consent1") === "on";
    const consent2=formdata.get("consent2") === "on";
    const address=formdata.get("address") as string;
    const occupation=formdata.get("occupation") as string;
    const medication=formdata.get("current-medication") as string;
    const family_history=formdata.get("family-history") as string;
    const past_history=formdata.get("past-history") as string;


    try{
        const user=await prisma.user.findFirst({
            where:{
                email: email
            }
        })
        const info=await prisma.personalInfo.create({
            data: {
                Dob: dob,
                gender: gender,
                address: address,
                physician: physician,
                allergies: allergies,
                consent1: consent1,
                consent2: consent2,
                occupation: occupation,
                medication: medication,
                family_medical_history: family_history,
                Past_medical_history: past_history,
                user: {
                    connect: {
                        id: user?.id
                    }
                }
            }
        })
        const update=await prisma.user.update({
            where: {
                id: user?.id
            },data: {
                personal: true
            }
        })
        console.log("Personal Info Saved!")
    }catch(err){
        console.log(err);
        throw new Error("Personal Info not Saved!")
    }
    redirect("/appointment");
}
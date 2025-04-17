// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";
// const prisma = new PrismaClient();

// export async function GET(){
//     try{
//         const response=await prisma.hospital.findMany({
//             select:{
//                 name: true,
//                 city: true,
//                 state: true
//             }
//         });
//         return NextResponse.json(response);
//     }catch(err){
//         console.log(err);
//     }
// }

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const response = await prisma.hospital.findMany({
      select: {
        id: true,
        name: true,
        city: true,
        state: true,
        email: true
      },
    });
    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
  }
}

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request){

    try{    
        const { to, subject, text } = await req.json();
        if(!to || !subject || !text){
            return NextResponse.json({success: false,message: "Please provide all the fields"},{status: 400});
        }

        const transporter=nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        
        const mailOptions = {
            from:  `"Carepulse" <${process.env.EMAIL}>`,
            to,
            subject,
            text
        }

        await transporter.sendMail(mailOptions);
        return NextResponse.json({success: true,message: "Email sent successfully"});
    }catch(e){
        console.log(e);
        return NextResponse.json({success: false,message: "Something went wrong"},{status: 500});
    }
}
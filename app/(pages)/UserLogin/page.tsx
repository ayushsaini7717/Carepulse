"use client";
export const dynamic = "force-dynamic";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import OTPButton from "../../custom-components/otp-button";
import { useEffect, useState } from "react";
import { setGlobals } from "../../utils/global";

const User_schema = z.object({
  fullName: z.string().min(2, "Full name must have at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Phone must be a 10-digit number"),
});

export default function Home() {
  const [notEmptyMail, SetnotEmptyMail] = useState("");
  const [notEmptyPhone, SetnotEmptyPhone] = useState("");
  const [notEmptyName, SetnotEmptyName] = useState("");
  const [status, Setstatus] = useState(false);

  useEffect(() => {
    const result = User_schema.safeParse({
      fullName: notEmptyName,
      email: notEmptyMail,
      phone: notEmptyPhone,
    });

    Setstatus(result.success);
  }, [notEmptyName, notEmptyMail, notEmptyPhone]);

  const sendmail = async () => {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const result = User_schema.safeParse({
      fullName: notEmptyName,
      email: notEmptyMail,
      phone: notEmptyPhone,
    });

    if (!result.success) {
      throw new Error("Invalid Inputs");
    }

    setGlobals(notEmptyMail, notEmptyName, notEmptyPhone, otp);

    const text = `Hi ${notEmptyName},

Thank you for signing up with CarePulse! To complete your verification, please use the One-Time Password (OTP) below:

🔒 Your OTP: ${otp}

Please do not share this code with anyone.

If you did not request this verification, please ignore this email or contact our support team.

Best regards,  
The CarePulse Team`;

    try {
      await Promise.all([
        fetch("/api/sendmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: notEmptyMail,
            subject: "Your OTP Verification Code for CarePulse",
            text: text,
          }),
        }),
        fetch("/api/sendotp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: notEmptyMail,
            otp: `${otp}`,
          }),
        }),
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#080D17] min-h-screen flex flex-col md:flex-row justify-center items-center gap-7 p-4 overflow-y-hidden">
      <div className="w-full md:w-[60vw] max-w-[496px]">
        <div className="flex flex-col justify-center items-center md:items-start h-full space-y-8 md:pl-16">
          <img src="/Logo.svg" alt="Logo" className="h-[32px] w-[162px]" />
          <div className="w-full text-white flex flex-col justify-between">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold leading-tight">
                Hi there, ....
              </h2>
              <h4 className="text-sm sm:text-base md:text-[18px] font-medium text-[#ABB8C4]">
                Get Started with Appointments.
              </h4>
            </div>
            <form className="space-y-6">
              <div>
                <label className="font-medium text-sm text-[#ABB8C4]">
                  Full name
                </label>
                <Input
                  id="Fname"
                  name="name"
                  type="text"
                  placeholder="Enter Your Full Name"
                  className="w-full mt-2"
                  onChange={(e) => {
                    SetnotEmptyName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="font-medium text-sm text-[#ABB8C4]">
                  Email address
                </label>
                <Input
                  id="emailid"
                  name="email"
                  type="text"
                  placeholder="abc@gmail.com"
                  className="w-full mt-2"
                  onChange={(e) => {
                    SetnotEmptyMail(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="font-medium text-sm text-[#ABB8C4]">
                  Phone number
                </label>
                <Input
                  id="phoneid"
                  name="phone"
                  type="text"
                  placeholder="+91 2558881110"
                  className="w-full mt-2"
                  onChange={(e) => {
                    SetnotEmptyPhone(e.target.value);
                  }}
                />
              </div>

              <div className="flex justify-center">
                <OTPButton requestOtp={sendmail} status={status} />
              </div>
            </form>
          </div>

          <div className="text-gray-400 text-sm text-center md:text-left">
            © CarePulse copyright
          </div>
        </div>
      </div>

      <div className="hidden md:block flex-1">
        <img
          src="/Home_image.png"
          alt="Home"
          className="h-[100vh] w-full object-cover"
        />
      </div>
    </div>
  );
}

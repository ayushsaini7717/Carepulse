"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
    const [email,Setemail]=useState("");
    const [password,Setpassword]=useState("");
    const router=useRouter();
    const [loading,setLoading]=useState(false);

    const token_generator=async (email:string)=>{
      try{
        const res=await fetch("/api/admintoken",{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },body: JSON.stringify({
              email: email
          })
        })

        const data=await res.json();
        Cookies.set("admin-token",data.token);
      }catch(err){
        console.log(err);
      }
    }

    const handler=async ()=>{
        try{
            setLoading(true);
            const res=await fetch("/api/loginHospital",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            const data=await res.json();
            if(data.Status === "Success"){
                sessionStorage.setItem("secure_access", "true");
                token_generator(email);
                router.push("/admin");
            }
            setLoading(false);
        }catch(err){
            console.log(err);
        }
    }

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
            
              
              <div>
                <label className="font-medium text-sm text-[#ABB8C4]">
                  Email address
                </label>
                <Input onChange={(e)=>{
                    Setemail(e.target.value);
                }} id="emailid"
                  name="email"
                  type="text"
                  placeholder="abc@gmail.com"
                  className="w-full mt-2"
                />
              </div>

              <div className="mt-4">
                <label className="font-medium text-sm text-[#ABB8C4]">
                  Password
                </label>
                <Input onChange={(e)=>{
                    Setpassword(e.target.value);
                }} id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Your Password"
                  className="w-full mt-2"
                />
              </div>
              

              
              <div className="flex justify-center">


                <Button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 mt-4 bg-blue-600 hover:bg-blue-700"
                  onClick={handler}
                >
                  {loading ? "Please wait..." : "Login"}
                </Button>
              </div>
          </div>

          <div className="text-gray-400 text-sm text-center md:text-left">
            @carepulse copyright
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
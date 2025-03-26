"use client";

import React, { useState } from "react";

interface schedulecancelProp{
    id: string,
    onAction: ()=>Promise<void>,
    patient: string,
    physician: string,
    appointment_date: string,
    email: string
};


const ScheduleCancelComp: React.FC<schedulecancelProp>=({id,onAction,patient,physician,appointment_date,email})=>{
    const [loading , setloading]=useState(false);
    const [loading2,setloading2]=useState(false);

    async function scheduled(){
        setloading(true);
        try{
            await fetch("/api/schedule",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: id
                })
            });
            await onAction();
        }catch(err){
            console.log(err);
        }
        setloading(false);
    }

    async function cancelled(){
        setloading2(true);

        try{
            await fetch("/api/cancel",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: id
                })
            });
            await onAction();
        }catch(err){
            console.log(err);
        }
        setloading2(false);
    }


    async function ConfirmEmail(){
        try{
            await fetch("api/sendmail",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "to": email,
                    "subject": "Your Appointment is Confirmed! 🎉",
                    "text": `Dear ${patient},

We are pleased to inform you that your appointment has been successfully confirmed. Below are the details of your appointment:

📅 Date: ${appointment_date}
🕒 Time: 10am to 2pm and 5pm to 7pm
👨‍⚕️ Doctor: ${physician}

If you have any questions or need to reschedule, please contact us.

We look forward to seeing you soon!

Best regards,
CarePulse`
                })
            })
        }catch(err){
            console.log(err);
        }
    }

    async function CancelEmail(){
        try{
            await fetch("api/sendmail",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "to": email,
                    "subject": "Your Appointment is Cancelled",
                    "text": `Dear ${patient},

We regret to inform you that your appointment scheduled for ${appointment_date} with ${physician} has been canceled due to unavailability.

If you would like to reschedule, please visit our website or contact us.

We apologize for any inconvenience caused and appreciate your understanding.

Best regards,
Carepulse`
                })
            })
        }catch(err){
            console.log(err);
        }
    }
    return <>
        <div className="flex gap-2">
            <button onClick={()=>{
                scheduled();
                ConfirmEmail();
            }} className="text-[#24AE7C]" disabled={loading}>{loading ? "Schedulling...": "Schedule"}</button>
            <button onClick={()=>{
                cancelled();
                CancelEmail();
            }} disabled={loading2}>{loading2 ? "Cancelling..." : "Cancel"}</button>
        </div>
    </>
}

export default ScheduleCancelComp;
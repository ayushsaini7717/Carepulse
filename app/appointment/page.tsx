import { DatePickerDemo } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppointmentAction from "../actions/appointAction";
import SubmitButton from "../custom-components/submitBtnInfo";
import { export_mail,export_fullName } from "../page";
import { cookies } from "next/headers";

async function verifyToken(token: string) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; 
    const res = await fetch(`${baseUrl}/api/token?token=${token}`, {
      method: "GET",
      cache: "no-store",
    });
  
    if (!res.ok) throw new Error("Failed to verify token");
    return res.json();
  }

const Appointment =async () => {
    const token=(await cookies()).get('jwt')?.value || "";
    const result = token ? await verifyToken(token) : { verified: false };
    if(result.verified){

    
    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center px-4 py-10">
            <div className="flex flex-col lg:flex-row justify-between gap-6 max-w-5xl w-full bg-gray-900 p-6 rounded-lg shadow-lg">
                <div className="text-white w-full">
                    <img src="/Logo.svg" alt="Logo" className="h-8 w-40 mt-2" />
                    <p className="text-2xl pt-6 font-bold">Hey there 👋</p>
                    <p className="text-[#ABB8C4]">Request a new appointment in 10 seconds</p>
                    <form action={AppointmentAction}>
                        <div className="flex flex-col mt-6 text-[#ABB8C4]">
                            <input type="hidden" name="email" value={export_mail} />
                            <p className="pb-1">Doctor</p>
                            <Select name="physician" required>
                                <SelectTrigger className="w-full text-left text-[#ABB8C4] border-2 pl-2 py-1 border-gray-400 rounded-md">
                                    <SelectValue placeholder="Primary care physician" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Dr. Devi Shetty">Dr. Devi Shetty</SelectItem>
                                    <SelectItem value="Dr. Naresh Trehan">Dr. Naresh Trehan</SelectItem>
                                    <SelectItem value="Dr. Randeep Guleria">Dr. Randeep Guleria</SelectItem>
                                    <SelectItem value="Dr. Prathap C. Reddy">Dr. Prathap C. Reddy</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <p>Reason for appointment</p>
                                    <Input required name="Reason" className="mt-1" type="text" placeholder="ex: Annual monthly check-up" />
                                </div>
                                <div>
                                    <p>Additional comments/notes</p>
                                    <Input name="comments" className="mt-1" type="text" placeholder="ex: Prefer afternoon appointments, if possible" />
                                </div>
                            </div>
                            <p className="mt-4 mb-1">Expected appointment date</p>
                            <DatePickerDemo name="date-of-appointment" />
                            <input type="hidden" value={export_fullName} name="patient"></input>
                            {/* <Button type="submit" className="mt-6 bg-[#24AE7C] w-full md:w-auto">Submit and continue</Button> */}
                            <SubmitButton/>
                        </div>
                    </form>
                </div>
                <div className="w-full lg:w-2/5 flex justify-center">
                    <img 
                        className="h-auto max-h-[400px] w-full object-contain" 
                        src="/bg.png" 
                        alt="bg" 
                    />
                </div>
            </div>
        </div>
    );
    }else{
        return <div>
            You are suppossed to be logged out...
        </div>
    }
};

export default Appointment;


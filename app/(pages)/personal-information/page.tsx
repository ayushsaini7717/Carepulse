import { Input } from "@/components/ui/input";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { saveUserInfo } from "../../actions/personalInfoAction";
import { export_fullName,export_mail,export_phone } from "../../utils/global";
import SubmitButton from "../../custom-components/submitBtnInfo";
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

const PersonalForm =async () => {
    const email=export_mail;
    const phone=export_phone;
    const fullName=export_fullName;

    const token=(await cookies()).get('jwt')?.value || "";

    const result=token ? await verifyToken(token) : { verified : false };

    if(result.verified){
    return (
        <div className="bg-black min-h-screen w-full overflow-x-hidden">
            <div className="flex flex-col lg:flex-row justify-between p-4 md:p-6 lg:p-8 gap-4">
                <div className="text-white w-full lg:w-2/3">
                    <img src="/Logo.svg" alt="Logo" className="h-12" />
                    <p className="text-2xl pt-6 font-bold">Welcome 👋</p>
                    <p className="text-[#ABB8C4]">Let us know more about yourself</p>

                    
                    <form action={saveUserInfo}>
                    <div className="pt-6">
                        <p className="font-bold pb-4">Personal Information</p>
                        <p className="text-[14px] text-[#ABB8C4]">Full name</p>
                        <Input value={fullName} readOnly name="name" placeholder="ex: Ram" className="text-[#76828D] mt-2 w-full" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            <div>
                                <p className="text-[#ABB8C4] text-[14px]">Email address</p>
                                <Input name="email" readOnly value={email} type="email" icon={<IoIosMail />} placeholder="carepulse@gmail.com" className="text-[#76828D] mt-2 w-full" />
                            </div>
                            <div>
                                <p className="text-[#ABB8C4] text-[14px]">Phone number</p>
                                <Input value={phone} readOnly name="phone" type="text" icon={<FaPhoneAlt />} placeholder="+91 0342 0453 34" className="text-[#76828D] mt-2 w-full" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            <div>
                                <p className="text-[#ABB8C4] text-[14px]">Date of birth</p>
                                <DatePickerDemo name="dob"/>
                            </div>
                            <div>
                                <p className="text-[#ABB8C4] text-[14px]">Gender</p>
                                <Select name="gender">
                                    <SelectTrigger className="w-full text-left text-[#ABB8C4] border-2 pl-2 py-1 border-gray-400 rounded-md">
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            <div>
                                <p className="text-[#ABB8C4] text-[14px]">Address</p>
                                <Input name="address" type="text" placeholder="House-212, Street 1, New Delhi" className="text-[#76828D] mt-2 w-full" />
                            </div>
                            <div>
                                <p className="text-[#ABB8C4] text-[14px]">Occupation</p>
                                <Input name="occupation" type="text" placeholder="Software Engineer" className="text-[#76828D] mt-2 w-full" />
                            </div>
                        </div>
                    </div>

                   
                    <div className="pt-6">
                        <p className="font-bold pb-4">Medical Information</p>
                        <p className="text-[14px] text-[#ABB8C4]">Primary care physician</p>
                        <Select name="physician">
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

                        <p className="text-[#ABB8C4] text-[14px] mt-2">Allergies (if any)</p>
                        <Input name="allergies" type="text" className="text-[#76828D] mt-2 w-full" placeholder="ex: Peanuts, Penicillin, Pollen" />

                        <p className="text-[#ABB8C4] text-[14px] mt-2">Current medications</p>
                        <Input name="current-medication" type="text" className="text-[#76828D] mt-2 w-full" placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            <div>
                                <p className="text-[#ABB8C4] text-[14px]">Family medical history</p>
                                <Input name="family-history" type="text" placeholder="ex: Mother had breast cancer" className="text-[#76828D] mt-2 w-full" />
                            </div>
                            <div>
                                <p className="text-[#ABB8C4] text-[14px]">Past medical history</p>
                                <Input name="past-history" type="text" placeholder="ex: Asthma diagnosis in childhood" className="text-[#76828D] mt-2 w-full" />
                            </div>
                        </div>
                    </div>

                    
                    <p className="mt-10 mb-5 text-2xl font-bold">Consent and Privacy</p>
                    <div className="flex items-start space-x-2">
                        <Checkbox name="consent1" className="border-white mt-1" id="terms1" />
                        <label htmlFor="terms1" className="text-sm font-medium leading-none">
                            I consent to the use and disclosure of my health information for treatment purposes.
                        </label>
                    </div>
                    <div className="flex items-start space-x-2 mt-2">
                        <Checkbox name="consent2" className="border-white mt-1" id="terms2" />
                        <label htmlFor="terms2" className="text-sm font-medium leading-none">
                            I acknowledge that I have reviewed and agree to the privacy policy.
                        </label>
                    </div>

                    {/* <Button type="submit" className="bg-[#24AE7C] mt-6 text-white py-2 px-6 rounded w-full sm:w-auto">
                        Submit and continue
                    </Button> */}
                    <SubmitButton/>
                    </form>
                    
                </div>

                
                <div className="hidden lg:block">
                    <img className="h-[70rem] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl" src="/Illustration.png" alt="Illustration" />
                </div>
            </div>
        </div>
    );
}else{
    return <div>You are suppossed to be logged out...</div>
}
};

export default PersonalForm;








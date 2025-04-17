"use client";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { export_mail,export_fullName } from "../../utils/global";
import { useRouter } from "next/navigation";

async function verifyToken(token: string) {
  const baseUrl=process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res=await fetch(`${baseUrl}/api/token?token=${token}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to verify token");
  return res.json();
}

interface Hospital {
  id: string;
  name: string;
  city: string;
  state: string;
  email: string
}

interface DoctorList {
  [hospitalId: string]: {
    doctorNames: string[];
  };
}

const Appointment = () => {
  const [filterBy, setFilterBy] = useState("Name");
  const [searchText, setSearchText] = useState("");
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
  const [doctorList, setDoctorList] = useState<DoctorList>({});
  const [verified, setVerified] = useState(false);
  const [doctor,setDoctor]=useState("");
  const [reason,setReason]=useState("");
  const [comment,setComment]=useState("");
  const [date,setDate]=useState("");
  const [loading,setloading]=useState(false);
  const [HosEmail,setHosEmail]=useState("");

  const router=useRouter();

  const SaveDetails=async ()=>{
    setloading(true);
    const res=await fetch("/api/appointment",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: export_mail,
        physician: doctor,
        reason: reason,
        comments: comment,
        appointment_date: date,
        hospital_email: HosEmail,
        patient: export_fullName
      })
    })

    const data=await res.json();
    if(data.msg === "Success"){
      router.push("/success");
    }
    setloading(false);
  }

  useEffect(() => {
    const fetcher = async () => {
      const [res1, res2] = await Promise.all([
        fetch("/api/hospital-list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
        fetch("/api/doctor-list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      ]);

      const [data1, data2] = [await res1.json(), await res2.json()];
      setHospitalList(data1);
      setDoctorList(data2);
    };
    fetcher();
  }, []);



  useEffect(() => {
    const verify = async () => {
      const token = Cookies.get("jwt");
      if (token) {
        const result = await verifyToken(token);
        setVerified(result.verified);
      } else {
        setVerified(false);
      }
    };
    verify();
  }, []);

  const filteredHospitals = searchText
    ? hospitalList.filter((hospital) => {
        const value = hospital[filterBy.toLowerCase() as keyof typeof hospital];
        return value.toLowerCase().includes(searchText.toLowerCase());
      })
    : [];

  const selectedHospitalDoctors = selectedHospital ? doctorList[selectedHospital]?.doctorNames || [] : [];

  if (!verified) {
    return <div>You are supposed to be logged out...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4 py-10">
      <div className="flex flex-col lg:flex-row justify-between gap-6 max-w-5xl w-full bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="text-white w-full">
          <img src="/Logo.svg" alt="Logo" className="h-8 w-40 mt-2" />
          <p className="text-2xl pt-6 font-bold">Hey there 👋</p>
          <p className="text-[#ABB8C4]">Request a new appointment in 10 seconds</p>

          <div className="flex flex-col mt-6 text-[#ABB8C4]">
            <p className="pb-1">Search hospital by</p>
            <Select value={filterBy} onValueChange={(value) => setFilterBy(value)}>
              <SelectTrigger className="w-full text-left text-[#ABB8C4] border-2 pl-2 py-1 border-gray-400 rounded-md">
                <SelectValue placeholder="Primary care physician" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Name">Name</SelectItem>
                <SelectItem value="City">City</SelectItem>
                <SelectItem value="State">State</SelectItem>
              </SelectContent>
            </Select>

            <p className="mt-3">Search</p>
            <Input
              name="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="mt-1"
              type="text"
              placeholder={`Search by ${filterBy.toLowerCase()}`}
            />

         
            {searchText && (
              <div className="mt-4 space-y-2">
                {filteredHospitals.length > 0 ? (
                  filteredHospitals.slice(0, 5).map((hospital, idx) => {
                    const isSelected = selectedHospital === hospital.id;

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setSearchText(hospital.name);
                          setSelectedHospital(hospital.id); 
                          setHosEmail(hospital.email);
                        }}
                        className={`cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 flex justify-between items-center hover:bg-gray-700 transition`}
                      >
                        <div>
                          <p className="font-semibold">{hospital.name}</p>
                          <p className="text-sm text-gray-400">
                            {hospital.city}, {hospital.state}
                          </p>
                        </div>
                        {isSelected && (
                          <span className="text-green-400 text-xl font-bold">✔</span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500 mt-2">No hospitals found.</p>
                )}
              </div>
            )}

            <p className="pb-1 mt-6">Doctor</p>
            <Select name="physician" required onValueChange={(e)=>setDoctor(e)}>
              <SelectTrigger className="w-full text-left text-[#ABB8C4] border-2 pl-2 py-1 border-gray-400 rounded-md">
                <SelectValue placeholder="Primary care physician" />
              </SelectTrigger>
              <SelectContent>
                {selectedHospitalDoctors.length > 0 ? (
                  selectedHospitalDoctors.map((doctor, i) => (
                    <SelectItem key={i} value={doctor}>
                      {doctor}
                    </SelectItem>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No doctors found for this hospital</p>
                )}
              </SelectContent>
            </Select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p>Reason for appointment</p>
                <Input onChange={(e)=>setReason(e.target.value)} required name="Reason" className="mt-1" type="text" placeholder="ex: Annual monthly check-up" />
              </div>
              <div>
                <p>Additional comments/notes</p>
                <Input onChange={(e)=>setComment(e.target.value)} name="comments" className="mt-1" type="text" placeholder="ex: Prefer afternoon appointments, if possible" />
              </div>
            </div>

            <p className="mt-4 mb-1">Expected appointment date</p>
            <DatePickerDemo
            name="date-of-appointment"
            selected={date}
            onSelect={setDate}
          />

            <button onClick={SaveDetails} className="bg-[#24AE7C] mt-6 text-white py-2 px-6 rounded w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed">{loading? "Please wait...":"Continue"}</button>
          </div>
        </div>

        <div className="w-full lg:w-2/5 flex justify-center">
          <img className="h-auto max-h-[400px] w-full object-contain" src="/bg.png" alt="bg" />
        </div>
      </div>
    </div>
  );
};

export default Appointment;

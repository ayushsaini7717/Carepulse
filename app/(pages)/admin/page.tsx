"use client";
import "@/app/styles/admin-dashboard.css"
import Adminval from "../../custom-components/admin-val";
import { FaClock } from "react-icons/fa";
import { HiCalendar } from "react-icons/hi2";
import { TbAlertSquareRoundedFilled } from "react-icons/tb";
import ScheduleCancelComp from "../../custom-components/schedulecancelBtn";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {  decode } from "jsonwebtoken";


interface Schema {
    id: string;
    physician: string;
    Reason: string;
    comments: string;
    appointment_date: string;
    pending: boolean;
    isconfirm: boolean;
    patient: string;
    userid: string;
    user: {
        email: string;
    };
}

interface MyTokenPayload {
    email: string;
}

const AdminDashboard = () => {
    const router= useRouter();
    const [Schedule, Setschedule] = useState(0);
    const [Cancelled, Setcancelled] = useState(0);
    const [Pending, Setpending] = useState(0);
    const [Appointment, Setappointment] = useState<Schema[]>([]);
    const [hasAccess, setHasAccess] = useState(false);
    const [email,setemail]=useState("");

    const [doctorName, setDoctorName] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [qualification, setQualification] = useState("");
    const [experience, setExperience] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");
    const [showDoctorForm, setShowDoctorForm] = useState(false);
    const [id,Setid]=useState("");


    
  useEffect(() => {


    const token = Cookies.get("admin-token");

    if (token) {
      try {
        const decoded = decode(token) as MyTokenPayload | null;
        if (decoded && decoded.email) {
          setemail(decoded.email);
        } else {
          console.error("Invalid token or missing email");
        }
      } catch (err) {
        console.error("Failed to decode the token", err);
      }
    }


    const VerifyToken=async ()=>{
      try{

        const [res1,res2]=await Promise.all([await fetch(`/api/admintoken?token=${token}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }),await fetch(`/api/HospitalId?token=${token}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })])
        

        const [data1,data2]=[await res1.json(),await res2.json()];
        if(data1.verified === true){
          setHasAccess(true);
        }
        Setid(data2.id);
      }catch(err){
        console.log(err);
      }
      
      }
      VerifyToken();
    }, [router]);

  useEffect(() => {
    if (email) {
      const fetchDetails = async () => {
        try {
          const response = await fetch(`/api/dashboardno?email=${email}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();
          Setschedule(data.scheduleCount);
          Setcancelled(data.cancelledCount);
          Setpending(data.confirmedCount);
          Setappointment(data.appointments);
        } catch (error) {
          console.error("Failed to fetch data", error);
        }
      };
      fetchDetails();
    }
  }, [email]);

    async function refreshData() {
        try {
            const Details = await fetch(`/api/dashboardno?email=${email}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const data = await Details.json();
            Setschedule(data.scheduleCount);
            Setcancelled(data.cancelledCount);
            Setpending(data.confirmedCount);
            Setappointment(data.appointments);
        } catch (error) {
            console.error("Error refreshing data:", error);
        }
    }
    if (!hasAccess) return <div className="flex justify-center items-center h-[100vh] background text-white">You are Logged out</div>;
    return (
        <div className="bg-black min-h-screen">
            <div className="bg-[#131619] text-white py-2 pl-4">
                <img src="./Logo.svg" alt="Logo" />
            </div>

            <div className="pt-10 pl-7 flex justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">Welcome, Admin {email}</h2>
                  <h5 className="text-[#ABB8C4] font-medium text-base">Start day with managing new appointments</h5>
                </div>
                <div className="pt-4 pl-7 mr-4">
                    <button
                        onClick={() => setShowDoctorForm(prev => !prev)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white rounded"
                    >
                        {showDoctorForm ? "Hide Add Doctor Form" : "Add New Doctor"}
                    </button>
                </div>
            </div>

            {showDoctorForm && (
              <div className="bg-[#1f1f1f] text-white p-6 mt-6 mx-4 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Add New Doctor</h3>
                  <form 
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
                      onSubmit={async (e) => {
                          e.preventDefault();
                          try {
                              const res = await fetch("/api/doctoradd", {
                                  method: "POST",
                                  headers: {
                                      "Content-Type": "application/json"
                                  },
                                  body: JSON.stringify({
                                      name: doctorName,
                                      specialization,
                                      qualification,
                                      experience,
                                      userId: id
                                  })
                              });
                              const data = await res.json();
                              if (data.msg === "Success") {
                                  setSubmitMessage("Doctor added successfully!");
                                  setDoctorName("");
                                  setSpecialization("");
                                  setQualification("");
                                  setExperience("");
                              } else {
                                  setSubmitMessage("Failed to add doctor.");
                              }
                          } catch (err) {
                              console.error("Error adding doctor:", err);
                              setSubmitMessage("Error occurred while submitting.");
                          }
                      }}
                  >
                      <input
                          type="text"
                          placeholder="Doctor Name"
                          value={doctorName}
                          onChange={(e) => setDoctorName(e.target.value)}
                          className="p-2 rounded bg-[#2a2a2a] text-white"
                          required
                      />
                      <input
                          type="text"
                          placeholder="Specialization"
                          value={specialization}
                          onChange={(e) => setSpecialization(e.target.value)}
                          className="p-2 rounded bg-[#2a2a2a] text-white"
                          required
                      />
                      <input
                          type="text"
                          placeholder="Qualification"
                          value={qualification}
                          onChange={(e) => setQualification(e.target.value)}
                          className="p-2 rounded bg-[#2a2a2a] text-white"
                          required
                      />
                      <input
                          type="text"
                          placeholder="Experience (in years)"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          className="p-2 rounded bg-[#2a2a2a] text-white"
                          required
                      />
                      <div className="sm:col-span-2 md:col-span-4 flex justify-end mt-4">
                          <button
                              type="submit"
                              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white"
                          >
                              Add Doctor
                          </button>
                      </div>
                  </form>
                  {submitMessage && (
                      <p className="mt-4 text-sm text-green-400">{submitMessage}</p>
                  )}
              </div>
          )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-white gap-4 px-4 mt-4">
                <Adminval prop={{ num: Schedule, text: "Scheduled Appointments", icon: <HiCalendar /> }} />
                <Adminval prop={{ num: Pending, text: "Pending Appointments", icon: <FaClock /> }} />
                <Adminval prop={{ num: Cancelled, text: "Cancelled Appointments", icon: <TbAlertSquareRoundedFilled /> }} />
            </div>

            <div className="mt-6 border border-white mx-4 overflow-x-auto">
            

                <div className="grid grid-cols-5 bg-black text-white p-2 text-sm md:text-base min-w-[600px]">
                    <div>Patient</div>
                    <div>Appointment Date</div>
                    <div>Status</div>
                    <div>Doctor</div>
                    <div>Actions</div>
                </div>

                {
                Appointment.map((item, i) => {
                    let status = "Pending";
                    if (!item.pending) {
                        status = item.isconfirm ? "Scheduled" : "Cancelled";
                    }

                    return (
                        <div className="grid grid-cols-5 text-white p-2 border-t border-white text-sm md:text-base min-w-[600px]" key={i}>
                            <div>{item.patient}</div>
                            <div>{item.appointment_date}</div>
                            <div className={status === "Cancelled" ? "text-red-500" : status === "Scheduled"? "text-green-500": "text-yellow-600"}>{status}</div>
                            <div>{item.physician}</div>
                            <div className="flex gap-2">
                                <ScheduleCancelComp id={item.id} onAction={refreshData} patient={item.patient} appointment_date={item.appointment_date} physician={item.physician} email={item.user.email} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminDashboard;

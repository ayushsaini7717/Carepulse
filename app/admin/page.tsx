"use client";
import "@/app/styles/admin-dashboard.css"
import Adminval from "../custom-components/admin-val";
import { FaClock } from "react-icons/fa";
import { HiCalendar } from "react-icons/hi2";
import { TbAlertSquareRoundedFilled } from "react-icons/tb";
import ScheduleCancelComp from "../custom-components/schedulecancelBtn";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


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

const AdminDashboard = () => {
    const router= useRouter();
    const [Schedule, Setschedule] = useState(0);
    const [Cancelled, Setcancelled] = useState(0);
    const [Pending, Setpending] = useState(0);
    const [Appointment, Setappointment] = useState<Schema[]>([]);
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        const accessGranted = sessionStorage.getItem("secure_access");
        if (!accessGranted) {
            router.replace("/");
        } else {
            setHasAccess(true);
        }

        const fetchDetails = async () => {
            const Details = await fetch("/api/dashboardno", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const data = await Details.json();
            Setschedule(data.scheduleCount);
            Setcancelled(data.cancelledCount);
            Setpending(data.confirmedCount);
            Setappointment(data.appointments);
        };
        fetchDetails();
    }, []);

    async function refreshData() {
        try {
            const Details = await fetch("/api/dashboardno", {
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
    if (!hasAccess) return null;
    return (
        <div className="bg-black min-h-screen">
            <div className="bg-[#131619] text-white py-2 pl-4">
                <img src="./Logo.svg" alt="Logo" />
            </div>

            <div className="pt-10 pl-7">
                <h2 className="text-3xl font-bold text-white">Welcome, Admin</h2>
                <h5 className="text-[#ABB8C4] font-medium text-base">Start day with managing new appointments</h5>
            </div>

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

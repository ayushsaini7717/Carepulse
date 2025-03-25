"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import CloseOTP from "../custom-components/close-otp";
import VerifyOTP from "../custom-components/verify-otp";
import { export_mail, export_phone, export_fullName } from "../page";

const verification_otp = async () => {
  try {
    const response = await fetch(`/api/sendotp?email=${export_mail}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data?.ispresent?.otp || null;
  } catch (error) {
    console.error("Error fetching OTP:", error);
    return null;
  }
};

const User_created = async (email: string, phone: string, fullName: string) => {
  try {
    const [response1, response2] = await Promise.all([
      fetch("/api/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, fullName }),
      }),
      fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }),
    ]);

    const [data1, data2] = await Promise.all([response1.json(), response2.json()]);

    if (data2?.token) {
      localStorage.setItem("jwt", data2.token);
    }

    localStorage.setItem("email", data1?.ispresent?.email || data1?.User?.email || "");
    localStorage.setItem("phone", data1?.ispresent?.phone || data1?.User?.phone || "");
    localStorage.setItem("name", export_fullName);

    return data1;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

const ModalPage = () => {
  const router = useRouter();
  const [otpValue, setOtpValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOTPSubmit = async () => {
    setLoading(true);

    const serverOtp = await verification_otp();
    if (!serverOtp) {
      alert("Failed to fetch OTP. Please try again.");
      setLoading(false);
      return;
    }

    if (serverOtp === otpValue) {
      const userData = await User_created(export_mail, export_phone, export_fullName);
      setLoading(false);

      if (!userData) {
        alert("Failed to create user. Please try again.");
        return;
      }

      const isPersonal = userData?.ispresent?.personal ?? userData?.User?.personal ?? false;
      router.push(isPersonal ? "/appointment" : "/personal-information");
    } else {
      setLoading(false);
      router.push("/failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center bg-black text-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white border-opacity-50"></div>
          <p className="mt-4 text-lg">Processing...</p>
        </div>
      ) : (
        <div className="w-full max-w-lg border border-white bg-[#1A1D21F5] rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center pb-4 border-b border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Verify OTP</h2>
            <button
              aria-label="Close modal"
              className="cursor-pointer"
              onClick={() => router.push("/")}
            >
              <CloseOTP />
            </button>
          </div>

          <p className="text-[#ABB8C4] text-sm sm:text-base mt-2">
            Please enter the OTP sent to your registered email address.
          </p>

          <div className="flex justify-center mt-6">
            <InputOTP value={otpValue} onChange={setOtpValue} maxLength={6}>
              <InputOTPGroup>
                {Array.from({ length: 3 }, (_, i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="h-12 w-12 mx-[0.1rem] sm:h-14 sm:w-14 bg-white text-xl rounded-md"
                  />
                ))}
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                {Array.from({ length: 3 }, (_, i) => (
                  <InputOTPSlot
                    key={i + 3}
                    index={i + 3}
                    className="h-12 w-12 mx-[0.1rem] sm:h-14 sm:w-14 bg-white text-xl rounded-md"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex justify-center mt-8">
            <VerifyOTP submitotp={handleOTPSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalPage;

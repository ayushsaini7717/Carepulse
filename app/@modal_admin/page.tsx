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


const ModalPage = () => {
  const router = useRouter();
  const [otpValue, setOtpValue] = useState("");
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="h-[40vh] w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] border border-white bg-black flex flex-col justify-center items-center rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white border-opacity-50"></div>
          <p className="mt-4 text-white text-lg sm:text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="w-full max-w-lg border border-white bg-[#1A1D21F5] rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center pb-4 border-b border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Access Verification
          </h2>
          <button
            aria-label="Close modal"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          >
            <CloseOTP />
          </button>
        </div>

       
        <p className="text-[#ABB8C4] font-light text-sm sm:text-base mt-2">
          To access the admin page, please enter the passkey below:
        </p>

        <div className="flex justify-center mt-6">
          <InputOTP value={otpValue} onChange={setOtpValue} maxLength={6}>
            <InputOTPGroup>
              {Array.from({ length: 3 }, (_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="h-12 w-12 sm:h-14 sm:w-14 mx-[0.1rem] bg-white text-xl rounded-md"
                />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {Array.from({ length: 3 }, (_, i) => (
                <InputOTPSlot
                  key={i + 3}
                  index={i + 3}
                  className="h-12 w-12 sm:h-14 sm:w-14 mx-[0.1rem] bg-white text-xl rounded-md"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              setLoading(true);
              setTimeout(async () => {
                if (otpValue === "348000") {
                  sessionStorage.setItem("secure_access", "true");
                  router.push("/admin");
                } else {
                  router.push("/");
                }
                setLoading(false);
              }, 1000);
            }}
            className="bg-[#24AE7C] hover:bg-[#1E9464] transition-colors duration-200 text-white font-semibold rounded-lg px-6 py-2"
          >
            Enter Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPage;

"use client";


interface VerifyOTPProps {
    submitotp: () => void;
}

const VerifyOTP: React.FC<VerifyOTPProps> = ({ submitotp }) => {
    return (
        <button className="bg-blue-500 hover:bg-blue-400 transition-colors duration-200 text-white p-2 rounded" onClick={submitotp}>
            Verify OTP
        </button>
    );
};
export default VerifyOTP;
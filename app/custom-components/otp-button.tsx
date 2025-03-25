// "use client"
// import { useRouter } from "next/navigation"

// interface OTPButtonProps {
//     requestOtp: () => Promise<void>;
// }

// const OTPButton =(requestOtp: ()=> void)=>{
//     const router=useRouter();
//     return <>
//         <button onClick={()=>{
//             router.push("?modal=otp");
//         }} type="button">otp</button>
//     </>
// }

// export default OTPButton;

"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface OTPButtonProps {
    requestOtp: () => Promise<void>;
    status: boolean
}

const OTPButton: React.FC<OTPButtonProps> = ({ requestOtp,status }) => {
    const router = useRouter();
    const [IsError,SetIsError]=useState(false);
    const [showText, setShowText] = useState(false);

    const handleShowMessage = () => {
        setShowText(true);

        setTimeout(() => {
        setShowText(false);
        }, 2000); 
    };
    return (
        <div className="text-red-500 gap-8 flex flex-col">
            {IsError && showText ? "Invalid Inputs" : <div></div>}
            <button
            onClick={() => {
                if(status){
                    requestOtp();  
                    router.push("?modal=otp");
                }else{
                    SetIsError(true);
                    handleShowMessage();
                }
            }}
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            Get Started
        </button>
        
        </div>
        
    );
};

export default OTPButton;

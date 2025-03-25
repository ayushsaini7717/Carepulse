"use client";
import { useRouter } from "next/navigation";


const CloseOTP=()=>{
    const router=useRouter();
    return <>
        <div className="cursor-pointer text-white" onClick={()=>{router.replace("/")} }>
            X
        </div>
    </>
}
export default CloseOTP;
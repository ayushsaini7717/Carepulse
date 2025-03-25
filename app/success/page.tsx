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

const Successpage =async () => {
    const token = (await cookies()).get("jwt")?.value || ""; 
    
    const result = token ? await verifyToken(token) : { verified: false };

    if(result.verified){
        return (
            <div className="bg-black min-h-screen flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center text-white text-center px-4">
            
                    <div className="mb-8">
                        <img className="m-auto" src="/Logo.svg" alt="Logo" />
                    </div>
    
                    <div className="mb-8">
                        <img src="/icon.png" alt="Success Icon" />
                    </div>
    
                    <div className="mb-6">
                        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">
                            Your <span className="text-[#4AC97E]">appointment request</span> has
                        </h2>
                        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">
                            been successfully submitted!
                        </h2>
                    </div>
    
                    <div className="mb-6">
                        <h4 className="text-[#ABB8C4] font-semibold text-base sm:text-lg md:text-xl">
                            We'll be in touch shortly to confirm.
                        </h4>
                    </div>
    
                    <div className="text-[#ABB8C4]">
                        <p className="text-sm sm:text-base md:text-lg">
                        If you have any questions, feel free to contact us. Thank you for choosing CarePulse!
                        </p>
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

export default Successpage;
  













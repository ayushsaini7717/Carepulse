"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

const SubmitButton = () => {
    const [isPending, startTransition] = useTransition(); 
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Button
            type="submit"
            disabled={isLoading || isPending} 
            onClick={(e) => {
                e.preventDefault(); 
                setIsLoading(true);
                
                startTransition(async () => {
                    const form = e.currentTarget.closest("form"); 
                    if (form) {
                        await form.requestSubmit(); 
                        setIsLoading(false);
                    }
                });
            }}
            className="bg-[#24AE7C] mt-6 text-white py-2 px-6 rounded w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading || isPending ? "Submitting..." : "Submit and Continue"}
        </Button>
    );
};

export default SubmitButton;

import React, { useState, useEffect, useRef } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from '@/components/ui/button';
import { useOTPMutation } from "@/services/auth/AuthService";
import toast from "react-hot-toast";

const OTP = ({ email: initialEmail, nextStep }: { email: string | null; nextStep: () => void }) => {
    const [otp, setOtp] = useState("");
    const { mutate, isLoading } = useOTPMutation();

    // Store email in useRef and localStorage
    const emailRef = useRef<string | null>(null);

    useEffect(() => {
        if (initialEmail) {
            emailRef.current = initialEmail;
            localStorage.setItem("otp_email", initialEmail);
        } else {
            emailRef.current = localStorage.getItem("otp_email");
        }
    }, [initialEmail]);

    // Handle OTP change
    const handleChange = (newOtp: string) => {
        // Ensure OTP contains only numbers
        if (/^\d*$/.test(newOtp)) {
            setOtp(newOtp);
        }
    };

    // Send OTP and email to backend
    const onSubmit = async () => {
        // nextStep()
        const storedEmail = emailRef.current;

        if (!otp || otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP.");
            return;
        }

        if (!storedEmail) {
            toast.error("Email not found. Please restart the registration.");
            return;
        }

        // Convert OTP to a number before sending
        const numericOtp = Number(otp);

        mutate(
            { otp: numericOtp, email: storedEmail }, // Sending OTP as a number
            {
                onSuccess: () => {
                    toast.success("OTP verified successfully!");
                    console.log("OTP verified for:", storedEmail);
                    localStorage.removeItem("otp_email"); // Remove email after success
                    nextStep();
                },
                onError: (error: any) => {
                    console.log("Error:", error);
                    toast.error(error?.message || "OTP verification failed.");
                },
            }
        );
    };

    return (
        <div className="h-fit flex flex-col items-center justify-center">
            <h1 className="text-xl font-medium mt-8">OTP</h1>
            <p className="text-[#BDBDBD] w-1/2 text-center">
                We sent you an email. Please check your mail and enter the OTP code.
            </p>

            {/* OTP Input */}
            <div className="h-20 mt-8 flex flex-wrap">
                <InputOTP maxLength={6} value={otp} onChange={handleChange}>
                    <InputOTPGroup><InputOTPSlot index={0} /></InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup><InputOTPSlot index={1} /></InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup><InputOTPSlot index={2} /></InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup><InputOTPSlot index={3} /></InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup><InputOTPSlot index={4} /></InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup><InputOTPSlot index={5} /></InputOTPGroup>
                </InputOTP>
            </div>

            {/* Display Email */}
            {/* <div className="mt-4 text-center">
                <p className="text-sm font-medium">📧 Email: {emailRef.current || "Not provided"}</p>
            </div> */}

            {/* Confirm OTP Button */}
            <div className="w-1/2 flex flex-col">
                <Button
                    onClick={onSubmit}
                    size="lg"
                    disabled={isLoading}
                    className="col-span-2 mt-10 h-10 w-full bg-[#4FD1C5] hover:text-[#4FD1C5] hover:bg-white hover:outline-[#4FD1C5]"
                >
                    {isLoading ? "Verifying..." : "Confirm OTP"}
                </Button>

                <h1 className="mt-2 text-sm text-center font-semibold text-gray-500">
                    Didn't receive any code? <span className="text-[#4FD1C5] font-semibold cursor-pointer">Send Again</span>
                </h1>
            </div>
        </div>
    );
};

export default OTP;

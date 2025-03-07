"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DynamicPhoneInput from "./PhoneInput";
import { Register, useRegisterMutation } from "@/services/auth/AuthService";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

interface RegisterFormProps {
    nextStep: (email?: string) => void;
}

const RegisterForm = ({ nextStep }: RegisterFormProps) => {
    const { mutate, isLoading } = useRegisterMutation();
    // const [loading, setLoading] = useState(false);


    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<Register>();

    // Submit Form
    const onSubmit = async (data: Register) => {
        mutate(data, {
            onSuccess: () => {
                toast.success("OTP dispatched, Check your email address")
                console.log("Data saved!", data);
                nextStep(data.email); // Pass email to next step
            },

            onError: (error: any) => {
                console.log("Error:", error);
                toast.error(error?.message || "Registration failed");
            },
        });
    };



    // Handle phone input change and update react-hook-form state
    const handlePhoneChange = (value: string) => {
        setValue("phone_number", value, { shouldValidate: true });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-5/6">
                <h1 className="text-2xl md:text-4xl font-semibold">Create Account</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-2 md:mt-10">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            {...register("name", {
                                required: "Name is required",
                                pattern: {
                                    value: /^[A-Za-z\s'-]+$/, // Allows letters, spaces, apostrophes, and hyphens
                                    message: "Invalid characters used"
                                }
                            })}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-2 md:mt-10">
                    <div>
                        <Label htmlFor="company_name">Company Name</Label>
                        <Input id="company_name" {...register("company_name", {
                            required: "Company name is required",
                            pattern: {
                                value: /^[A-Za-z\s'-]+$/, // Allows letters, spaces, apostrophes, and hyphens
                                message: "Invalid characters used"
                            }
                        })} />
                        {errors.company_name && <p className="text-red-500 text-sm">{errors.company_name.message as string}</p>}
                    </div>

                    <div>
                        <Label htmlFor="phone_number">Phone No</Label>
                        <div className="mt-1 md:mt-2">
                            <DynamicPhoneInput
                                id="phone_number"
                                name="phone_number"
                                onChange={handlePhoneChange}
                                className="w-full mt-1 md:mt-2"
                            // required={required}
                            />
                            {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message as string}</p>}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mt-2 md:mt-10">
                    <div className="col-span-1 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" {...register("address", { required: "Address is required" })} />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message as string}</p>}
                    </div>

                    <div>
                        <Label htmlFor="postal_code">Postal Code</Label>
                        <Input id="postal_code" {...register("postal_code", { required: "Postal Code is required" })} />
                        {errors.postal_code && <p className="text-red-500 text-sm">{errors.postal_code.message as string}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-2 md:mt-10">
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" {...register("password", { required: "Password is required" })} />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message as string}</p>}
                    </div>

                    <div>
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            {...register("password_confirmation", { required: "Please confirm your password" })}
                        />
                        {errors.password_confirmation && (
                            <p className="text-red-500 text-sm">{errors.password_confirmation.message as string}</p>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="col-span-2 mt-4 md:mt-10 h-10 w-full bg-[#4FD1C5] hover:text-[#4FD1C5] hover:bg-white hover:outline-[#4FD1C5]"
                >
                    {isSubmitting ? "Submitting..." : "Sign Up"}
                </Button>
            </form>
            <Toaster />
        </>
    );
};

export default RegisterForm;

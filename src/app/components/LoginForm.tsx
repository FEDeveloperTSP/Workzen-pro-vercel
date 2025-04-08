'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useLoginMutation } from '@/services/auth/AuthService'
import { Toaster, toast } from 'react-hot-toast'

type FormData = {
    email: string
    password: string
}

const LoginForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    // Use React Query mutation
    const { mutateAsync, isLoading } = useLoginMutation();

    const onSubmit = async (data: FormData) => {
        try {
            // Wait for the API call to finish before showing messages
            await mutateAsync(data);

            toast.success("Login successful!");
            console.log("Data saved!", data);
            router.replace("/");
        } catch (error: any) {
            toast.error(error || "Login failed");
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
                <div className="w-full">
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
                    {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
                </div>
                <div className="w-full mt-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters long" }
                        })}
                    />
                    {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
                </div>
                <Button
                    disabled={isLoading}
                    type="submit"
                    size="lg"
                    className='mt-4 h-10 w-full bg-[#4FD1C5] hover:text-[#4FD1C5] hover:bg-white hover:outline-[#4FD1C5]'
                >
                    {isLoading ? "Logging in..." : "Log In"}
                </Button>
            </form>
            <Toaster />
        </>
    );
};

export default LoginForm;

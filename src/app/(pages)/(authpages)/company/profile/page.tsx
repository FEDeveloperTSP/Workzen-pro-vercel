'use client'
import React, { useState } from 'react'
import vector from "@/assets/Vector 4.svg"
import vector2 from "@/assets/Vector 5.svg"
import Image from 'next/image'
import logo from "@/assets/Certificate_Muhammad_Shafeeq_2 2.svg"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button'


const page = () => {
    const [showForm, setShowForm] = useState(false);

    const labelClass = "text-black font-semibold";
    const inputClass = "bg-gray-100 border-none text-gray-600";
    const selectClass = "bg-gray-200 border-none text-gray-600";

    return (
        <>
            <div className='flex justify-between items-center'>
                <div className="relative hidden md:flex rounded-l-2xl overflow-hidden">
                    <Image
                        src={vector}
                        alt="Background"
                    />
                    <div className="absolute inset-0 flex justify-center ml-4 min-w-fit flex-col text-black">
                        <h1>Tech Solution Pro</h1>
                    </div>
                </div>
                <div>
                    <Image
                        src={vector2}
                        alt="Background"
                    />
                    <div className="absolute inset-0 flex justify-center ml-4 min-w-fit flex-col text-black">
                        <h1>Tech Solution Pro</h1>
                    </div>
                </div>
            </div>
            <div className='bg-white w-full p-4 px-20 flex'>
                <Image
                    src={logo}
                    alt="Background"
                />
                <div className='flex flex-col pl-8 justify-center'>
                    <h1 className='text-2xl font-semibold '>Tech Solutions Pro</h1>
                    <h1 className='text-gray-400'>support@tsp.com</h1>
                </div>
            </div>
            <Card className="p-6 shadow-sm mt-4 border-none">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Company Name */}
                        <div className="space-y-2">
                            <Label className={labelClass}>Company Name</Label>
                            <Input disabled value="Tech Solution Pro" className={inputClass} />
                        </div>

                        {/* Admin Name */}
                        <div className="space-y-2">
                            <Label className={labelClass}>Admin Name</Label>
                            <Input disabled value="Basit Khan" className={inputClass} />
                        </div>

                        {/* Email Address */}
                        <div className="space-y-2">
                            <Label className={labelClass}>Email Address</Label>
                            <Input disabled value="Support@tsp.com" className={inputClass} />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <Label className={labelClass}>Phone No</Label>
                            <Input disabled value="004449828034356" className={inputClass} />
                        </div>

                        {/* Language */}
                        <div className="space-y-2">
                            <Label className={labelClass}>Language</Label>
                            <Select defaultValue="english">
                                <SelectTrigger className={selectClass}>
                                    <SelectValue placeholder="Select Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="english">English</SelectItem>
                                    <SelectItem value="spanish">Spanish</SelectItem>
                                    <SelectItem value="french">French</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Time Zone */}
                        <div className="space-y-2">
                            <Label className={labelClass}>Time Zone</Label>
                            <Select defaultValue="gmt-5">
                                <SelectTrigger className={selectClass}>
                                    <SelectValue placeholder="Select Time Zone" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="gmt-5">GMT -5</SelectItem>
                                    <SelectItem value="gmt-6">GMT -6</SelectItem>
                                    <SelectItem value="gmt-7">GMT -7</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>
           
            <Card className='bg-white mt-4 border-none'>
                <CardHeader>
                    <div className='flex justify-between items-center'>
                        <CardTitle className="text-lg font-semibold">Security</CardTitle>
                        <Button
                            className='w-fit bg-[#4FD1C5] cursor-pointer relative z-10'
                            onClick={() => {
                                console.log("Button Clicked");
                                setShowForm(!showForm);
                            }}
                        >
                            {showForm ? "Cancel" : "Change Password"}
                        </Button>
                    </div>
                </CardHeader>
                {showForm && (
                    <Card className="p-4 border-none">
                        <div className="space-y-4 w-1/2">
                            <div>
                                <Label className={labelClass}>Current Password</Label>
                                <Input type="password" className={`${inputClass } text-black`} />
                            </div>
                            <div>
                                <Label className={labelClass}>New Password</Label>
                                <Input type="password" className={`${inputClass} text-black`} />
                            </div>
                            <div>
                                <Label className={labelClass}>Confirm Password</Label>
                                <Input type="password" className={`${inputClass} text-black`} />
                            </div>
                            <Button className="bg-[#4FD1C5] mt-4">Save Password</Button>
                        </div>
                    </Card>
                )}
            </Card>
        </>
    )
}

export default page

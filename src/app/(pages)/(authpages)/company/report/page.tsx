import { DatePickerDemo } from '@/app/components/DatePicker'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { FaRegFilePdf } from "react-icons/fa";
const page = () => {
    return (
        <div>
            <h1 className='text-2xl md:text-3xl font-semibold'>Reports</h1>
            <h1 className='text-md md:text-md mt-4'>Report Type</h1>

            <div className='mt-1 flex gap-3 w-full'>
                <div className='w-1/6'>
                    <Select>
                        <Select >
                            <SelectTrigger >
                                <SelectValue placeholder="Attendance" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="attendance">Attendance</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </Select>
                </div>
                <div className='w-1/6'>
                    <Select>
                        <Select >
                            <SelectTrigger >
                                <SelectValue placeholder="All branches" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="attendance">Attendance</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </Select>
                </div>
                <div className='w-1/6'>
                    <Select>
                        <Select >
                            <SelectTrigger >
                                <SelectValue placeholder="Manager" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="attendance">Attendance</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </Select>
                </div>
                <div className='w-1/6'>
                    <Select>
                        <Select >
                            <SelectTrigger >
                                <SelectValue placeholder="By Name" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="attendance">Attendance</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </Select>
                </div>
                <div className='w-1/6'>
                    <Select>
                        <Select >
                            <SelectTrigger >
                                <SelectValue placeholder="Search By Name" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="attendance">Attendance</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </Select>
                </div>
            </div>
            <h1 className='text-md md:text-md mt-4 '>Attendance</h1>
            <div className='flex gap-3'>
                <div className='w-1/6'>
                    <Select>
                        <Select >
                            <SelectTrigger >
                                <SelectValue placeholder="Last Week" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="attendance">Attendance</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </Select>
                </div>
                <div className='w-1/6 '>
                    <DatePickerDemo />
                </div>
            </div>
            <div className='mt-2 flex justify-end pr-0 md:pr-32'>
                <Button className='bg-[#4FD1C5]'><FaRegFilePdf />Download PDF</Button></div>
        </div>
    )
}

export default page

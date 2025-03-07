import ContractTable from '@/app/components/ContractTable';
import UploadContract from '@/app/components/UploadContract';
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { MdOutlineFileUpload } from "react-icons/md";
const page = () => {
    return (
        <div>
            <h1 className='text-2xl md:text-3xl font-semibold'>Contract</h1>
            <h1 className='text-md md:text-md mt-4'>Search doc</h1>
            <div className='mt-1 flex justify-between w-full'>
                <div className='flex w-full gap-3'>
                    <div className='w-1/6 '>
                        <Select>
                            <Select >
                                <SelectTrigger >
                                    <SelectValue placeholder="Branch" />
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
                                    <SelectValue placeholder="Junaid" />
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
                <div>
                    <UploadContract />
                </div>

            </div>
            <div className='mt-4'>
                <ContractTable />
            </div>
        </div>
    )
}

export default page

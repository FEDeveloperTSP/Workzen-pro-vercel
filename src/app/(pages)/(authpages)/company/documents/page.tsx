import ContractTable from '@/app/components/ContractTable';
import DocumentTable from '@/app/components/DocumentTable';
import Search from '@/app/components/Search';
import UploadContract from '@/app/components/UploadContract';
import UploadDoc from '@/app/components/UploadDoc';
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { MdOutlineFileUpload } from "react-icons/md";
const page = () => {
    return (
        <div>
            <h1 className='text-2xl md:text-3xl font-semibold'>Document</h1>
            <div className='mt-4 flex justify-between w-full bg-white p-4'>
                <div className='flex  gap-3'>
                    <Search placeholder='Search in table..... ' className='shadow-md rounded-lg' />
                </div>
                <div>
                    <UploadDoc />
                </div>
            </div>
            <div className=''>
                <DocumentTable />
            </div>
        </div>
    )
}

export default page

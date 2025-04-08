import ContractTable from '@/app/components/ContractTable';
import UploadContract from '@/app/components/UploadContract';
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { MdOutlineFileUpload } from "react-icons/md";
const page = () => {
    return (
        <div>
            <h1 className='text-2xl md:text-3xl font-semibold'>Contracts</h1>
          
            <div className='mt-4'>
                <ContractTable />
            </div>
        </div>
    )
}

export default page

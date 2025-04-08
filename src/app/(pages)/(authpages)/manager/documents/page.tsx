import ContractTable from '@/app/components/ContractTable';
// import DocumentTable from '@/app/components/DocumentTable';
import DocumentTable from '@/app/components/manager/documents/DocTableM';
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
            <h1 className='text-2xl md:text-3xl font-semibold'>Documents</h1>
            <DocumentTable />
        </div>
    )
}

export default page

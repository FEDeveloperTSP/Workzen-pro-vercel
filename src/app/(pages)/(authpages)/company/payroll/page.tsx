import { DateRangePicker } from '@/app/components/DatePicker';
import PayrollCom from '@/app/components/PayrollCom';
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { FaRegFilePdf } from "react-icons/fa";
const page = () => {
    return (
        <>
            <h1 className='text-2xl md:text-3xl font-semibold'>Payroll</h1>

            <PayrollCom />


        </>
    )
}

export default page

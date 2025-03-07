import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Modal } from 'antd'
import React, { useState } from 'react'
import { IoMdCalendar } from "react-icons/io";
import { DatePickerDemo } from './DatePicker'
import TimePopover from './TimePopover'

const SetRange = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <>
            <Button className='bg-[#4FD1C5]' onClick={() => setIsModalOpen(true)}><IoMdCalendar />Set Range</Button>
            <Modal okText='Submit' okButtonProps={{ className: 'bg-[#4FD1C5]' }} open={isModalOpen} className='flex flex-col p-8 overflow-visible' onClose={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                <h1 className='text-2xl font-normal text-center mb-8' >Set Date and Time Range</h1>
                <div className='p-10'>
                    <h3 className='text-lg '>Select date</h3>
                    <DatePickerDemo />
                    <h3 className='text-lg mt-4'>Select Time</h3>
                    <TimePopover />
                </div>
            </Modal>
        </>
    )
}

export default SetRange

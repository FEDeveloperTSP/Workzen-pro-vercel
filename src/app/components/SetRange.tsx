import { Button } from '@/components/ui/button'
import { Modal } from 'antd'
import React, { useState } from 'react'
import { IoMdCalendar } from "react-icons/io";
import TimePopover from './TimePopover'

const SetRange = ({ onTimeSelect }: { onTimeSelect: (start: string, end: string) => void }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    const handleTimeChange = (start: string, end: string) => {
        setStartTime(start)
        setEndTime(end)
        onTimeSelect(start, end) // Pass time to parent (table)
    }
    const handleSubmit = () => {
        onTimeSelect(startTime, endTime) // Send time to parent component
        setIsModalOpen(false) // Close modal after submission
    }

    return (
        <>
            <Button className='bg-[#4FD1C5]' onClick={() => setIsModalOpen(true)}><IoMdCalendar />Set Range</Button>
            <Modal
                okText='Submit'
                okButtonProps={{ className: 'bg-[#4FD1C5] ' }}
                open={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => setIsModalOpen(false)}
                className='h-full'
            // width={{}}
            >
                <h1 className='text-2xl font-normal text-center mb-8'>Set Time Range</h1>
                <div className=' h-full'>
                    <h3 className='text-lg mt-4'>Select Time</h3>
                    <div className='min-h-full'>
                        <TimePopover onTimeChange={handleTimeChange} />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default SetRange

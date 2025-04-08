"use client"
import React, { useEffect } from 'react'
import Search from './Search'
import SetRange from './SetRange'
import { Table } from 'antd'
import AvailibilityReqTable from './AvailibilityReqTable'
import { useSelector } from 'react-redux'
import { RootState } from '@/services/store'
import toast from 'react-hot-toast'
import { useGetAllManagersMutation } from '@/services/manager/useManager'

const AvailibiltyRequest = () => {
    const { mutateAsync, isLoading } = useGetAllManagersMutation();
    const { managerdata } = useSelector((state: RootState) => state.manager)
    // const [startTime, ]
    const onSubmit = async () => {
        try {
            // Wait for the API call to finish before showing messages
            await mutateAsync();

        } catch (error: any) {
            toast.error(error || "Login failed");
        }
    };
    useEffect(() => {
        onSubmit()
    }, [])
    return (
        <div className='h-screen bg-white rounded-lg mt-4'>

            {/* <Table columns={columns} dataSource={datasource} pagination={false}  // Ensure horizontal scrolling */}
            <AvailibilityReqTable data={managerdata} />

        </div>
    )
}

export default AvailibiltyRequest

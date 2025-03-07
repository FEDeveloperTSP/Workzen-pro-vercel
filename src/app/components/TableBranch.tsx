'use client'
import { Table } from 'antd'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CreateBranch from './CreateBranch'
import Search from './Search'
import { useGetBranchesMutation } from '@/services/branch/useBranch'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { RootState } from '@/services/store'

const TableBranch = () => {
    const { mutateAsync, isLoading } = useGetBranchesMutation();
    const { getAllBranchData } = useSelector((state: RootState) => state.branch)
    const router = useRouter();
    console.log("data", getAllBranchData)
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
    // Format data for Ant Design Table
    const dataSource = getAllBranchData?.branches_data?.map((branch, index) => ({
        key: branch.id || index,
        name: branch.name,
        location: branch.location,
        workers: branch.workers_count || "N/A",
        // manager: branch.managers?.name || "N/A", // Ensure manager exists
        status: branch.status,
        expenses: branch.worker_sum_wages || "0",
    })) || [];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => (
                <div className='flex gap-2'>
                    <div className='h-10 w-10 bg-[#4FD1C5] rounded-xl'></div>
                    <p className='font-bold'>{text}</p>
                    <p>{}</p>
                </div>
            )
        },
        {
            title: 'Total Workers',
            dataIndex: 'workers',
            key: 'workers',
            render: (text: string) => <p className='font-bold'>{text}</p>
        },
        {
            title: 'Manager',
            dataIndex: 'manager',
            key: 'manager',
            render: (text: string) => <p className='font-bold'>{text}</p>
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => (
                <div className={`p-2 w-fit h-fit rounded-xl font-semibold text-white ${text === "active" ? "bg-[#48BB78]" : "bg-[#A0AEC0]"}`}>
                    {text}
                </div>
            )
        },
        {
            title: 'Expenses',
            dataIndex: 'expenses',
            key: 'expenses',
            render: (text: string) => <p className='font-bold'>${text}</p>
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: any) => (
                <div className="flex gap-2">
                    <button onClick={() => router.push(`/branch/${record.key}`)}>Edit</button>
                    <button onClick={() => router.push(`/branch/${record.key}`)}>View</button>
                </div>
            )
        }
    ];

    return (
        <div className='h-screen bg-white rounded-lg'>
            <div className='flex justify-between gap-4 md:gap-0 p-4 flex-col md:flex-row'>
                <div className='w-1/6 '>
                    <Search placeholder='Search in table..... ' className='shadow-md rounded-lg' />
                </div>
                <CreateBranch />
            </div>

            <div className="w-full overflow-x-auto">
                {/* {isLoading ? (
                    <p className="text-center font-bold">Loading branches...</p>
                ) : error ? (
                    <p className="text-center text-red-500 font-bold">Failed to load branches</p>
                ) : ( */}
                <Table columns={columns} dataSource={dataSource} pagination={false} />
                {/* )} */}
            </div>
        </div>
    )
}

export default TableBranch;

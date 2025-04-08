'use client'
import { Table } from 'antd'
import React, { useState } from 'react'
import Search from '../../Search'
import { SingleWorker, WorkerData } from '@/services/worker/type'
import { getInitialsLogo, useFilter } from '@/services/useFilter'
import { useRouter } from 'next/navigation'
import CreateWorker from './CreateWorker'
import { useSelector } from 'react-redux'
import { RootState } from '@/services/store'
import { useGetSingleWorkersMutation } from '@/services/worker/useWorker'
import EditWorker from './EditWorkerModal'
const WorkerTableM = (
    { data }: { data: WorkerData }
) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { mutateAsync } = useGetSingleWorkersMutation()
    const { singleworkerdata } = useSelector((state: RootState) => state.worker)
    const [selectedWorker, setSelectedWorker] = useState<SingleWorker | null>(null)

    const handleEditClick = async (id: number) => {
        const managerData = await mutateAsync(id);
        console.log("asssd", managerData)
        setSelectedWorker(managerData);
        setIsModalOpen(true);
    };
    const router = useRouter()
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => (
                <div className='flex gap-2'>
                    <div className='h-10 w-10 bg-[#4FD1C5] text-white flex items-center justify-center rounded-xl font-bold text-sm uppercase'>
                        {record.logo ? (
                            <img src={`https://be.myweightlosscentre.co.uk/${record.logo}`} alt="Manager Logo" className="h-full w-full object-cover rounded-xl" />
                        ) : (
                            getInitialsLogo(text, record.logo) // Show initials if logo is null
                        )}
                    </div>
                    <div className='flex flex-col pl-2'>
                        <p className='font-bold'>{text}</p>
                        <p className='text-[#718096]'>{record.email}</p>
                    </div>
                </div>
            )
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
            render: (text: string) => (
                <p className='font-bold'>{text}</p>
            )
        },
        {
            title: 'Wages',
            dataIndex: 'wages',
            key: 'wages',
            render: (text: string) => (
                <p className='font-bold'>${text}</p>
            )
        }, {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => (
                <>
                    {text === "Inactive" && <div className='p-2 bg-[#A0AEC0] w-fit h-fit rounded-xl font-semibold text-white'>{text}</div>}
                    {text === "Active" && <div className='p-2 bg-[#48BB78] w-fit h-fit rounded-xl font-semibold text-white'>{text}</div>}

                </>
            )
        }, {
            title: 'Branch',
            dataIndex: 'branches',
            key: 'branches',
            render: (text: string) => (
                <h3 className='font-bold'>{text}</h3>
            )

        }, {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: any) => (
                <div className='flex gap-4'> <button onClick={() => {
                    console.log(record.key)
                    handleEditClick(record.key)
                }}>Edit</button>
                    <button onClick={() => router.push(`/manager/worker/${record.key}`)}>View</button>
                </div>
            )
        }
    ]
    console.log(data.workers_data)
    const { filterText, handleFilterChange } = useFilter();
    const dataSource = data?.workers_data?.map((worker, index) => ({
        key: worker.id || index,
        email: worker.email,
        name: worker.name,
        manager: worker.managers?.name || "N/A",
        status: worker.status,
        wages: worker.wage || "0",
        branches: worker.branches.name || "N/A",
        phone_number: worker.phone_number,
        logo: worker.logo,
    })) || [];
    const filteredData = dataSource.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(filterText.toLowerCase())
        )
    );
    return (
        <>
            <div className='h-screen bg-white rounded-lg mt-4'>
                <div className='flex justify-between gap-4 md:gap-0 p-4 flex-col md:flex-row'>
                    <div className='w-1/6 '>
                        <Search filterText={filterText}
                            onFilter={handleFilterChange} placeholder='Search in table..... ' />
                    </div>
                    <div className='w-1/6 '>
                        <CreateWorker />
                    </div>
                </div>
                <div className="w-full overflow-x-auto">
                    <Table columns={columns} dataSource={filteredData} pagination={false}  // Ensure horizontal scrolling
                    />
                </div>

            </div>
            <EditWorker
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                manager={selectedWorker}
            />
        </>
    )
}

export default WorkerTableM

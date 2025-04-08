'use client'
import { Modal, Table } from 'antd'
import React, { useState } from 'react'
import CreateManager from './CreateManager'
import Search from './Search'
import { ManagerData, ManagerTable } from '@/services/manager/Type'
import { getInitialsLogo, useFilter } from '@/services/useFilter'
import EditManagerModal from './EditManagerModal'
import { useGetSingleBranchMutation } from '@/services/branch/useBranch'
import { RootState } from '@/services/store'
import { useSelector } from 'react-redux'
import { SingleManagerData } from '@/services/branch/type'
import { useGetSingleManagersMutation } from '@/services/manager/useManager'
import { useRouter } from 'next/navigation'
const TableComponent = ({ data }: { data: ManagerData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()
    const { mutateAsync } = useGetSingleManagersMutation()
    const { singlemanager } = useSelector((state: RootState) => state.manager)
    const [selectedManager, setSelectedManager] = useState<SingleManagerData | null>(null)

    const handleEditClick = async (id: number) => {
        const managerData = await mutateAsync(id);
        console.log("asssd", managerData)
        setSelectedManager(managerData);
        setIsModalOpen(true);
    };
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
            title: 'Workers',
            dataIndex: 'workers',
            key: 'workers',
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
            dataIndex: 'branch',
            key: 'branch',
            render: (text: string) => (
                <h3 className='font-bold'>{text}</h3>
            )

        }, {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: any) => (
                <div className='flex gap-4'>
                    <button onClick={() => {
                        console.log(record.key)
                        handleEditClick(record.key)
                    }}>Edit</button>
                    <button onClick={() => router.push(`/company/manager/${record.key}`)}>View</button>
                </div>

            )
        }
    ]
    console.log(data)
    const { filterText, handleFilterChange } = useFilter()
    const dataSource = data.managers_data.map((manager: ManagerTable) => ({
        key: manager.id,
        email: manager.email,
        name: manager.name,
        workers: manager.workers_count,
        wages: manager.wage,
        status: manager.status,
        branch: manager.branches?.map(branch => branch.name).join(", ") || "N/A",
        logo: manager.logo
    }))
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
                    <div>
                        <CreateManager />
                    </div>
                </div>
                <div className="w-full">
                    <Table columns={columns} dataSource={filteredData} pagination={false}  // Ensure horizontal scrolling
                    />
                </div>

            </div>
           
            <EditManagerModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                }}
                manager={selectedManager}
            />
        </>
    )
}

export default TableComponent

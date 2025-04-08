'use client'
import { SingleBranchData } from '@/services/branch/type'
import { getInitialsLogo } from '@/services/useFilter'
import { Table } from 'antd'
import React from 'react'

const BrancWorkerTable = ({ data }: { data: SingleBranchData }) => {
    // Ensure data exists before mapping
    const dataSource = data?.branch_details?.flatMap((branch) =>
        branch.workers.map((worker) => ({
            key: worker.id,
            name: worker.name,
            email: worker.email,
            status: worker.status.toLowerCase(), // Normalize status case,
            logo: worker.logo
        }))
    ) || [];

    const columns = [
        {
            title: 'Workers',
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
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => (
                <>
                    {text === "inactive" && <div className='p-2 bg-[#A0AEC0] w-fit h-fit rounded-xl font-semibold text-white'>{text}</div>}
                    {text === "active" && <div className='p-2 bg-[#48BB78] w-fit h-fit rounded-xl font-semibold text-white'>{text}</div>}
                </>
            )
        },
    ];

    return (
        <div className="w-full overflow-x-auto">
            <Table columns={columns} dataSource={dataSource} pagination={false} />
        </div>
    )
}

export default BrancWorkerTable;

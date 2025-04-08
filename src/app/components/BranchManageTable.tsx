'use client'
import { SingleBranchData } from '@/services/branch/type'
import { getInitialsLogo, useFilter } from '@/services/useFilter'
import { Table } from 'antd'
import React from 'react'
import Search from './Search'
import { IoIosArrowDown } from 'react-icons/io'

const BrancManagerTable = ({ data }: { data: SingleBranchData }) => {
    // Ensure data exists before mapping
    const dataSource = data?.branch_details?.flatMap((branch) =>
        branch.managers.map((worker) => ({
            key: worker.id,
            name: worker.name,
            email: worker.email,
            status: worker.status, // Normalize status case
            logo: worker.logo,
        }))
    ) || [];
    // const { filterText, handleFilterChange } = useFilter();

    const columns = [
        {
            title: 'Managers',
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
                    {text === "Inactive" && <div className='p-2 bg-[#A0AEC0] w-fit h-fit rounded-xl font-semibold text-white'>{text}</div>}
                    {text === "Active" && <div className='p-2 bg-[#48BB78] w-fit h-fit rounded-xl font-semibold text-white'>{text}</div>}
                </>
            )
        },
    ];
    // const filteredData = dataSource.filter((item) =>
    //     Object.values(item).some((value) =>
    //         String(value).toLowerCase().includes(filterText.toLowerCase())
    //     )
    // );

    return (
        <>
            {/* <div className='w-1/6 m-2 '>
                <Search filterText={filterText}
                    onFilter={handleFilterChange} placeholder='Search in table..... ' />
            </div> */}
            <h3 className='flex gap-1 items-center font-bold pl-6'>
                <IoIosArrowDown />Manager
            </h3>
            <hr />
            <div className="w-full overflow-x-auto">
                <Table columns={columns} dataSource={dataSource} pagination={false} />
            </div>
        </>
    )
}

export default BrancManagerTable;

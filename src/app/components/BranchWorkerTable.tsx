'use client'
import { Table } from 'antd'
import React from 'react'

const BrancWorkerTable = () => {
    const columns = [
        {
            title: 'Workers',
            dataIndex: 'name',
            key: 'name',

            render: (text: string, _: any) => (
                <div className='flex gap-2'>
                    <div className='h-10 w-10 bg-[#4FD1C5] rounded-xl'></div><p className='font-bold'>{text}</p></div>
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
    ]
    const datasource = [
        {
            key: 1,
            name: "Branch Name",
            status: "active"
        }, {
            key: 2,
            name: "Branch Name",
            status: "inactive"
        }
    ]
    return (
        <Table columns={columns} dataSource={datasource} pagination={false} />
    )
}

export default BrancWorkerTable

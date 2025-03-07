'use client'
import { Table } from 'antd'
import React from 'react'
const TableBranch = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, _: any) => (
                <div className='flex gap-2'>
                    <div className='h-10 w-10 bg-[#4FD1C5] rounded-xl'></div><p className='font-bold'>{text}</p></div>
            )
        },
        
        {
            title: 'Manager',
            dataIndex: 'manager',
            key: 'manager',
            render: (text: string) => (
                <p className='font-bold'>{text}</p>
            )
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branch',
            render: (text: string) => (
                <h3 className='font-bold'>{text}</h3>
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
        {
            title: 'Wage',
            dataIndex: 'wage',
            key: 'wage',
            render: (text: string) => (
                <p className='font-bold'>${text}</p>
            )
        }, {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (_: any) => (
                <button>Edit</button>
            )
        }
    ]
    const datasource = [
        {
            key: '1',
            name: 'John',
            status: "active",
            manager: "Branch 1",
            wage: "1200",
            branch:"Branch 1"
        },
        {
            key: '2',
            name: 'John',
            status: "inactive",
            manager: "Branch 1",
            wage: "1200",
            branch: "Branch 1"
        }
    ]
    return (
        <Table columns={columns} dataSource={datasource} />
    )
}

export default TableBranch

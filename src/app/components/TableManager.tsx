'use client'
import { Table } from 'antd'
import React from 'react'
import CreateManager from './CreateManager'
import Search from './Search'
const TableComponent = () => {
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
                    {text === "inactive" && <div className='p-2 bg-[#A0AEC0] w-fit h-fit rounded-xl font-semibold text-white'>{text}</div>}
                    {text === "active" && <div className='p-2 bg-[#48BB78] w-fit h-fit rounded-xl font-semibold text-white'>{text}</div>}

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
            render: (_: any) => (
                <button>Edit</button>
            )
        }
    ]
    const datasource = [
        {
            key: '1',
            name: 'John',
            workers: "20",
            status: "inactive",
            branch: "Branch 1",
            wages: "1200",
        },
        {
            key: '2',
            name: 'John',
            workers: "20",
            status: "active",
            branch: "Branch 1",
            wages: "1000",
        }
    ]
    return (
        <>
            <div className='h-screen bg-white rounded-lg mt-4'>
                <div className='flex justify-between gap-4 md:gap-0 p-4 flex-col md:flex-row'>
                    <div className='w-1/6 '>
                        <Search placeholder='Search in table..... ' className='shadow-md rounded-lg' />
                    </div>
                    <div>
                        <CreateManager/>
                    </div>
                </div>
                <div className="w-full overflow-x-auto">
                    <Table columns={columns} dataSource={datasource} pagination={false}  // Ensure horizontal scrolling
                    />
                </div>

            </div>
        </>
    )
}

export default TableComponent

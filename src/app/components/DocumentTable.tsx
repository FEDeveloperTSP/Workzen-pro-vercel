'use client'
import { Table } from 'antd'
import React from 'react'

const DocumentTable = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (value: string) => (
                <p className='font-semibold'>{value}</p>
            )
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (value: string) => (
                <p className='font-semibold'>{value}</p>
            )
        },
        
        {
            title: "Updated Date",
            dataIndex: "updatedDate",
            key: "updatedDate",
            render: (value: string) => (
                <p className='font-semibold'>{value}</p>
            )
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_: any, record: any) => (
                <>
                    <button
                        className='p-1 mx-1 rounded-xl font-semibold text-gray-400  hover:text-gray-800'
                        onClick={() => window.open(record.viewLink, '_blank')}
                    >
                        View
                    </button>
                    <button
                        className='p-1 mx-1 rounded-xl font-semibold text-gray-400  hover:text-gray-800'
                        onClick={() => window.open(record.downloadLink, '_blank')}
                    >
                        Download
                    </button>
                </>
            )
        }
    ];

    const dataSource = [
        {
            key: '1',
            name: 'Employment Agreement',
            type: 'Legal',
            updatedDate: '2024-02-28',
            viewLink: 'https://example.com/employment-agreement.pdf',
            downloadLink: 'https://example.com/employment-agreement.pdf'
        },
        {
            key: '2',
            name: 'Service Contract',
            type: 'Business',
            updatedDate: '2024-02-20',
            viewLink: 'https://example.com/service-contract.pdf',
            downloadLink: 'https://example.com/service-contract.pdf'
        },
        {
            key: '3',
            name: 'Non-Disclosure Agreement',
            type: 'Confidentiality',
            against: 'Tech Solutions Ltd.',
            viewLink: 'https://example.com/nda.pdf',
            downloadLink: 'https://example.com/nda.pdf'
        }
    ];

    return (
        <Table columns={columns} dataSource={dataSource} />
    );
}

export default DocumentTable;

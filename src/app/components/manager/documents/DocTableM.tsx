'use client'
import { AllDocuments } from '@/services/document/type';
import { useGetAllDocumentsMutation } from '@/services/document/useDocument';
import { RootState } from '@/services/store';
import { Table } from 'antd'
import moment from 'moment';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
// import UploadDoc from '.';
import UploadDoc from '../../UploadDoc';
// import Loading from './Loading';
import Loading from '../../Loading';
import { useFilter } from '@/services/useFilter';
// import Search from './Search';
import Search from '../../Search';

const DocumentTable = () => {
    const { filterText, handleFilterChange } = useFilter();

    const { mutateAsync, isLoading } = useGetAllDocumentsMutation();
    const { alldocumentsdata } = useSelector((state: RootState) => state.documents)
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
    const handleDownload = (url: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sample.pdf'); // Optional: sets the downloaded file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
    };
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
                        onClick={() => window.open(`https://be.myweightlosscentre.co.uk/${record.data}`, '_blank')}
                    >
                        View
                    </button>
                    {/* <button
                        className='p-1 mx-1 rounded-xl font-semibold text-gray-400  hover:text-gray-800'
                        onClick={() => handleDownload(`https://be.myweightlosscentre.co.uk/${record.data}`)}
                    >
                        
                            Download
                    </button> */}
                </>
            )
        }
    ];
    const datasource = alldocumentsdata.map((doc: AllDocuments) => ({
        key: doc.id,
        name: doc.name,
        type: doc.file_type,
        updatedDate: doc.created_at
            ? moment(doc.created_at).format("DD/MM/YYYY") // Formatting date
            : "N/A",
        data: doc.file_data,
    }))
    const filteredData = datasource.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(filterText.toLowerCase())
        )
    );
    if (isLoading) return <Loading />
    return (
        <> <div className='mt-4 flex justify-between w-full bg-white p-4 rounded-xl'>
            <div className='flex  gap-3'>
                <Search filterText={filterText}
                    onFilter={handleFilterChange} placeholder='Search in table..... ' />
            </div>
            {/* <div>
                <UploadDoc />
            </div> */}
        </div>
            <div className=''>
                <Table columns={columns} dataSource={filteredData} pagination={false} />
            </div>

        </>
    );
}

export default DocumentTable;

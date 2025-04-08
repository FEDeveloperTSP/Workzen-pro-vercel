'use client'
import { Table } from 'antd'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Search from '../../Search'
import { BranchTableData } from '@/services/branch/type'
import { Modal } from 'antd'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useGetBranchesMutation, useUpdateSingleBranchMutation } from '@/services/branch/useBranch'
import { TypeCreateBranch } from '@/services/branch/branchSlice'
import { getInitialsOrLogo, useFilter } from '@/services/useFilter'
import toast from 'react-hot-toast'

const TableBranchM = ({ branchData }: { branchData: BranchTableData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedBranch, setSelectedBranch] = useState<any>(null);
    const [formData, setFormData] = useState<TypeCreateBranch>({
        name: '',
        location: '',
        status: '',
        code: '',
    });
    const { filterText, handleFilterChange } = useFilter();

    const router = useRouter();
    const updateBranchMutation = useUpdateSingleBranchMutation();
    const dataSource = branchData?.branches_data?.map((branch, index) => ({
        key: branch.id || index,
        name: branch.name,
        location: branch.location,
        workers: branch.workers_count || "0",
        count: branch.managers_count,
        manager: branch.managers?.map(mgr => mgr.name).join(", "),
        status: branch.status,
        expenses: branch.workers_sum_wage || "0",
        code: branch.code,

    })) || [];
    const filteredData = dataSource.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(filterText.toLowerCase())
        )
    );
    const handleEditClick = (branch: any) => {
        setSelectedBranch(branch);
        console.log(branch);
        setFormData({
            name: branch.name,
            location: branch.location,
            status: branch.status,
            code: branch.code,
        });
        setIsModalOpen(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStatusChange = (value: string) => {
        setFormData({ ...formData, status: value });
    };
    const { mutateAsync } = useGetBranchesMutation();
    const getAllBranchData = async () => {
        try {
            // Wait for the API call to finish before showing messages
            await mutateAsync();


        } catch (error: any) {
            toast.error(error || "Login failed");
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBranch) return;
        const Id = Number(selectedBranch.key)
        try {
            await updateBranchMutation.mutateAsync({ id: Id, data: formData });
            setIsModalOpen(false);
            getAllBranchData()
        } catch (error) {
            console.error("Error updating branch:", error);
        }
    };


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => (
                <div className='flex gap-2'>
                    <div className='h-10 w-10 bg-[#4FD1C5] text-white flex items-center justify-center rounded-xl font-bold text-sm uppercase'>
                        {getInitialsOrLogo(text)}
                    </div>
                    <div className='flex flex-col pl-2'>
                        <p className='font-bold'>{text}</p>
                        <p className='text-[#718096]'>{record.location}</p>
                    </div>
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
            title: 'Total Managers',
            dataIndex: 'count',
            key: 'manager',
            render: (text: string) => <p className='font-bold'>{text}</p>
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => (
                <div className={`p-2 w-fit h-fit rounded-xl font-semibold text-white ${text === "Active" ? "bg-[#48BB78]" : "bg-[#A0AEC0]"}`}>
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
                    {/* <button onClick={() => handleEditClick(record)}>Edit</button> */}
                    <button onClick={() => router.push(`/manager/branch/${record.key}`)}>View</button>
                </div>
            )
        }
    ];

    return (
        <>
            <div className='h-screen bg-white rounded-lg'>
                <div className='flex justify-between gap-4 md:gap-0 p-4 flex-col md:flex-row'>
                    <div className='w-1/6 '>
                        <Search filterText={filterText}
                            onFilter={handleFilterChange} placeholder='Search in table..... ' />
                    </div>
                </div>

                <div className="w-full overflow-x-auto">
                    <Table columns={columns} dataSource={filteredData} pagination={false} />
                </div>
            </div>


        </>
    );
}

export default TableBranchM;

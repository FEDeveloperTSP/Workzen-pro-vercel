'use client'
import { Table } from 'antd'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import CreateBranch from './CreateBranch'
import Search from './Search'
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

const TableBranch = ({ branchData }: { branchData: BranchTableData }) => {
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
        manager: branch.managers?.map(mgr => mgr.name).join(", "),
        status: branch.status,
        expenses: branch.workers_sum_wage || "0",
        code: branch.code,
        count: branch.managers_count
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
                <div className='flex gap-2 items-center'>
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
            render: (text: string) => <p className='font-bold'>{text}</p>,
        },
        {
            title: 'Total Managers',
            dataIndex: 'count',
            key: 'manager',
            render: (text: string) => <p className='font-bold'>{text}</p>,
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
                    <button onClick={() => handleEditClick(record)}>Edit</button>
                    <button onClick={() => router.push(`/company/branch/${record.key}`)}>View</button>
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
                    <CreateBranch />
                </div>

                <div className="w-full overflow-x-auto">
                    <Table columns={columns} dataSource={filteredData} pagination={false} className='text-center'/>
                </div>
            </div>

            {/* Edit Branch Modal */}
            <Modal
                className="min-w-screen h-screen"
                title="Edit Branch"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
            >
                {selectedBranch && (
                    <form onSubmit={onSubmit}>
                        <div className="p-6 border rounded-xl mt-2 min-w-full">
                            <div className="flex flex-col md:flex-row gap-8 w-full">
                                <div className="flex-1">

                                    <Label className="mt-4 text-black font-semibold">Branch Code</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        className="h-8"
                                        value={formData.code}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Label className="mt-4 text-black font-semibold">Branch Location</Label>
                                    <Input
                                        type="text"
                                        name="location"
                                        className="h-8"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 mt-8 w-full ">
                                <div className="flex-1">
                                    <Label className="mt-4 text-black font-semibold">Branch Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        className="h-8"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex-1'>
                                    <Label className="mt-4 text-black font-semibold">Branch Status</Label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={handleStatusChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={formData.status} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-4">
                            <Button type="button" className="bg-transparent text-grey-400" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-[#4FD1C5]">
                                Update
                            </Button>
                        </div>
                    </form>
                )}
            </Modal>
        </>
    );
}

export default TableBranch;

'use client'
import { useGetAllContractsMutation } from '@/services/contract/useContract';
import { RootState } from '@/services/store';
import { useFilter } from '@/services/useFilter';
import { Table, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Loading from './Loading';
import moment from 'moment';
import { Contract } from '@/services/contract/type';
import UploadContract from './UploadContract';
import { useGetBranchesMutation, useGetSingleBranchMutation } from '@/services/branch/useBranch';

const { Option } = Select;

const ContractTable = () => {
    const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
    const [selectedManager, setSelectedManager] = useState<string | null>(null);
    const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<string | null>(null); // Role selection

    const { getAllBranchData, datasingleBranch } = useSelector((state: RootState) => state.branch);
    const getSingleBranchMutation = useGetSingleBranchMutation();
    const { mutate } = useGetBranchesMutation();
    const { filterText, handleFilterChange } = useFilter();
    const { mutateAsync, isLoading } = useGetAllContractsMutation();
    const { allcontractsdata } = useSelector((state: RootState) => state.contracts)

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        try {
            await mutate();
        } catch (error) {
            toast.error("Failed to fetch branches");
        }
    };

    const fetchManagers = async (branchId: string) => {
        try {
            await getSingleBranchMutation.mutateAsync(Number(branchId));
        } catch (error) {
            toast.error("Failed to fetch managers");
        }
    };

    const handleBranchChange = async (branchId: string) => {
        setSelectedBranch(branchId);
        setSelectedManager(null);
        setSelectedWorker(null);
        setSelectedRole(null); // Reset role selection
        fetchManagers(branchId);
    };

    const handleRoleChange = (role: string) => {
        setSelectedRole(role);
        setSelectedManager(null);
        setSelectedWorker(null);
    };

    const handleSelectionChange = (id: string) => {
        if (selectedRole === "manager") {
            setSelectedManager(id);
            mutateAsync({ manager_id: id }); 
        } else if (selectedRole === "worker") {
            setSelectedWorker(id);
            mutateAsync({ worker_id: id }); 
        }
    };


    useEffect(() => {
        onSubmit();
    }, []);

    const onSubmit = async () => {
        try {
            await mutateAsync({});
        } catch (error: any) {
            toast.error(error || "Fetching contracts failed");
        }
    };

    const columns = [
        { title: 'Contracts', dataIndex: 'name', key: 'name', render: (value: string) => <p className='font-semibold'>{value}</p> },
        { title: 'Employee Name', dataIndex: 'against', key: 'against', render: (value: string) => <p className='font-semibold'>{value}</p> },
        { title: 'Designation', dataIndex: 'type', key: 'type', render: (value: string) => <p className='font-semibold'>{value}</p> },
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

    const datasource = allcontractsdata.map((doc: Contract) => ({
        key: doc.id,
        name: doc.name,
        type: doc.type,
        against: doc.contract_against,
        viewlink: doc.file_data,
        updatedDate: doc.created_at ? moment(doc.created_at).format("DD/MM/YYYY") : "N/A",
        data: doc.file_data,
    }));

    const filteredData = datasource.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(filterText.toLowerCase())
        )
    );

    if (isLoading) return <Loading />;

    return (
        <>
            <h1 className='text-md md:text-md mt-4'>Search contract</h1>
            <div className='mt-1 flex justify-between w-full'>
                <div className='flex w-full gap-3 mb-4'>
                    <div className='w-1/4'>
                        <Select
                            onChange={handleBranchChange}
                            value={selectedBranch}
                            loading={isLoading}
                            className="mt-2"
                            style={{ width: "100%" }}
                            placeholder="Select Branch"
                        >
                            {getAllBranchData.branches_data.map((branch) => (
                                <Option key={branch.id} value={branch.id}>{branch.name}</Option>
                            ))}
                        </Select>
                    </div>

                    <div className='w-1/4'>
                        <Select
                            className='w-full'
                            onChange={handleRoleChange}
                            value={selectedRole}
                            placeholder="Select Role"
                        >
                            <Option value="manager">Manager</Option>
                            <Option value="worker">Worker</Option>
                        </Select>
                    </div>

                    {selectedRole === "manager" && (
                        <div className='w-1/4'>
                            <Select
                                onChange={handleSelectionChange}
                                value={selectedManager}
                                className="mt-2"
                                style={{ width: "100%" }}
                                placeholder="Select Manager"
                            >
                                {datasingleBranch?.branch_details?.flatMap(branch =>
                                    branch.managers.map(manager => (
                                        <Option key={manager.id} value={manager.id}>{manager.name}</Option>
                                    ))
                                )}
                            </Select>
                        </div>
                    )}
                    {selectedRole === "worker" && (
                        <div className='w-1/4'>
                            <Select
                                onChange={handleSelectionChange}
                                value={selectedWorker}
                                className="mt-2"
                                style={{ width: "100%" }}
                                placeholder="Select Worker"
                            >
                                {datasingleBranch?.branch_details?.flatMap(branch =>
                                    branch.workers.map(worker => (
                                        <Option key={worker.id} value={worker.id}>{worker.name}</Option>
                                    ))
                                )}
                            </Select>
                        </div>
                    )}
                </div>
                <div>
                    <UploadContract />
                </div>
            </div>
            <Table columns={columns} dataSource={filteredData} pagination={false} />
        </>
    );
};

export default ContractTable;

'use client'
import { Button } from '@/components/ui/button'
import { Modal, UploadFile, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { MdOutlineFileUpload } from 'react-icons/md'
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useGetBranchesMutation, useGetSingleBranchMutation } from '@/services/branch/useBranch'
import { useSelector } from 'react-redux'
import { RootState } from '@/services/store'
import toast from 'react-hot-toast'
import { useGetAllContractsMutation, useUploadContractsMutation } from '@/services/contract/useContract'

const { Option } = Select;

const UploadContract = () => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
    const [selectedManager, setSelectedManager] = useState<string | null>(null);

    const { mutateAsync, isLoading } = useGetBranchesMutation();
    const { getAllBranchData } = useSelector((state: RootState) => state.branch);
    const { datasingleBranch } = useSelector((state: RootState) => state.branch);

    const getSingleBranchMutation = useGetSingleBranchMutation();

    useEffect(() => {
        if (isModalOpen) {
            fetchBranches();
        }
    }, [isModalOpen]);

    const fetchBranches = async () => {
        try {
            const response = await mutateAsync();
        } catch (error) {
            toast.error("Failed to fetch branches");
        }
    };

    const fetchManagers = async (branchId: string) => {
        try {
            const response = await getSingleBranchMutation.mutateAsync(Number(branchId));
        } catch (error) {
            toast.error("Failed to fetch managers");
        }
    };

    const handleBranchChange = async (branchId: string) => {
        setSelectedBranch(branchId);
        setSelectedManager(null); // Reset manager selection
        fetchManagers(branchId);
    };

    const handleManagerChange = (managerId: string) => {
        setSelectedManager(managerId);
    };

    const onChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        setFileList(newFileList.slice(-1)); // Keep only the most recent file
    };
    const handleGetAllContracts = async () => {
        try {
            const { mutateAsync } = useGetAllContractsMutation();

            // Wait for the API call to finish before showing messages
            await mutateAsync({});

        } catch (error: any) {
            // toast.error(error || "Login failed");

        }
    }
    const { mutate } = useUploadContractsMutation()

    const handleUpload = async () => {
        if (fileList.length === 0) {
            toast.error("Please select a file first.");
            return;
        }

        const file = fileList[0].originFileObj as File; // Extract actual file

        if (!file) {
            toast.error("Invalid file selection.");
            return;
        }

        const formData = new FormData();
        formData.append("contract", file);
        formData.append("name", file.name); // Send file name as well
        const id = Number(selectedManager)
        await mutate({ id: id, data: formData }, {
            onSuccess: () => {
                setIsModalOpen(false);
                handleGetAllContracts()

            },
            onError: (error: any) => {
                // console.log(error);
            },
        })

    };
    return (
        <div>
            <Button className="bg-[#4FD1C5]" onClick={() => setIsModalOpen(true)}>
                <MdOutlineFileUpload /> Upload Contract
            </Button>
            <Modal
                open={isModalOpen}
                onOk={handleUpload}
                okText="Upload"
                cancelText="Cancel"
                okButtonProps={{
                    style: { backgroundColor: "#4FD1C5",},
                }}
                className="flex flex-col overflow-visible"
                onCancel={() => setIsModalOpen(false)}
            >
                <h1 className="text-lg md:text-lg font-semibold border-b pb-3">Upload Contract</h1>
                <hr />
                <h1 className="text-md md:text-md mt-2">Upload against</h1>
                <div className="flex gap-3 mt-4">
                    {/* Branch Selection */}
                    <Select
                        onChange={handleBranchChange}
                        value={selectedBranch}
                        loading={isLoading}
                        className="mt-2"
                        style={{ width: "100%" }}
                        placeholder="Select Branch"
                    >
                        {getAllBranchData.branches_data.length > 0 ? (
                            getAllBranchData.branches_data.map((branch) => (
                                <Option key={branch.id} value={branch.id}>
                                    {branch.name}
                                </Option>
                            ))
                        ) : (
                            <Option value="loading" disabled>
                                Loading...
                            </Option>
                        )}
                    </Select>

                    {/* Manager Selection (Fetched Dynamically) */}
                    <Select
                        onChange={handleManagerChange}
                        value={selectedManager}
                        className="mt-2"
                        style={{ width: "100%" }}
                        placeholder="Select Manager"
                    // disabled={!selectedBranch || managers.length === 0}
                    >
                        {datasingleBranch.branch_details.length > 0 ? (
                            datasingleBranch.branch_details.map((branch) => branch.managers.map((manager) => (
                                <Option key={manager.id} value={manager.id}>
                                    {manager.name}
                                </Option>
                            ))
                            )) : (
                            <Option value="loading" disabled>
                                {selectedBranch ? "No managers available" : "Select a branch first"}
                            </Option>
                        )}
                    </Select>
                </div>
                <div className='mt-2'>
                    {/* File Upload Section */}
                    <Upload
                        name="file"
                        accept="application/pdf"
                        multiple={false} // Allow only one file
                        fileList={fileList} // Bind fileList state
                        onChange={onChange}
                        beforeUpload={() => false} // Prevent automatic upload
                        className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-[#82d8d8] p-6 bg-[#f7f9fc] rounded-lg"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <InboxOutlined className="text-[#5bc0be] text-5xl" />
                            <Button className="border border-[#5bc0be] text-[#5bc0be] bg-white mb-2">
                                Browse Files
                            </Button>
                        </div>
                    </Upload>
                </div>
            </Modal>
        </div>
    );
};

export default UploadContract;

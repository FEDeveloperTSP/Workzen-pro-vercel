"use client"
import { Button } from '@/components/ui/button';
import { Modal, UploadFile, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { HiUserAdd } from 'react-icons/hi';
import { Upload } from 'antd';
import { FiUpload } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from 'antd'
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useGetBranchesMutation } from '@/services/branch/useBranch';
import { RootState } from '@/services/store';
import { useCreateManagerMutation, useGetAllManagersMutation } from '@/services/manager/useManager';
import { useCreateWorkerMutation, useGetAllWorkersMutation } from '@/services/worker/useWorker';
import DynamicPhoneInput from '../../PhoneInput';
const { Option } = Select
const CreateWorker = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [branches, setBranches] = useState<number>(0); // Store fetched branches

    const [formData, setFormData] = useState<{
        name: string;
        logo: File | null;
        phone_number: string;
        email: string;
        branch_id: number; // ✅ Change from string to string[]
        address: string;
        contract: File | null;
        wage: string;
    }>({
        name: "",
        logo: null,
        phone_number: "",
        email: "",
        branch_id: 0, // ✅ Initialize as an empty array
        address: "",
        contract: null,
        wage: "",
    });

    const { mutateAsync, isLoading } = useGetBranchesMutation();
    const { getAllBranchData } = useSelector((state: RootState) => state.branch);

    // Fetch branches when modal opens
    useEffect(() => {
        if (isModalOpen) {
            fetchBranches();
        }
    }, [isModalOpen]);
    const { mutateAsync:getAllWorker } = useGetAllWorkersMutation();

    const getAllWorkers = async () => {
        try {

            // Wait for the API call to finish before showing messages
            await mutateAsync();

        } catch (error: any) {
            // toast.error(error || "Login failed");
        }
    };
    const fetchBranches = async () => {
        try {
            const response = await mutateAsync();
            setBranches(response?.data || []); // Update state with fetched branches
        } catch (error) {
            toast.error("Failed to fetch branches");
        }
    };
    const [selectedBranches, setSelectedBranches] = useState<number>();

    const handleBranchChange = (values: number) => {
        setSelectedBranches(values);
        setFormData((prev) => ({ ...prev, branch_id: values })); // Store as array
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, status: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files?.[0]) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0], // This updates the correct field based on the name
            }));
        }
    };
    const { mutate } = useCreateWorkerMutation()


    const handleSubmit = async () => {
        // if (!formData.name || !formData.email || !formData.phone || !formData.branch_ids) {
        //     toast.error("Please fill in all required fields.");
        //     return;
        // }
        const submitData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                // ✅ Append each array item separately
                value.forEach((item) => {
                    submitData.append(`${key}[]`, item);
                });
            } else if (typeof value === "number") {
                submitData.append(key, String(value));
            } else if (value instanceof File) {
                submitData.append(key, value);
            } else if (typeof value === "string") {
                submitData.append(key, value);
            }
        });



        await mutate(submitData, {
            onSuccess: async() => {
                setIsModalOpen(false);
                await getAllWorker()

            },
            onError: (error: any) => {
                // console.log(error);
            },
        })
    };
    const handleLogoChange: UploadProps["onChange"] = ({ fileList }) => {
        setFileList(fileList); // Update the UI file list

        // ✅ If a file is uploaded, update the formData with the latest file
        if (fileList.length > 0) {
            setFormData((prev) => ({
                ...prev,
                logo: fileList[fileList.length - 1].originFileObj || null, // Store the latest uploaded file
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                logo: null, // Reset if no file is uploaded
            }));
        }
    };

    const handlePhoneChange = (value: string) => {
        setFormData(prev => ({ ...prev, phone_number: value }));
    };
    return (
        <>
            <Button className='bg-[#4FD1C5] w-fit' onClick={() => setIsModalOpen(true)}>
                <HiUserAdd /> Create Worker
            </Button>
            <Modal
                className='min-w-screen h-screen'
                title="Create Worker"
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
                <div className="p-4 flex flex-col items-center rounded-xl w-fit ">
                    <Upload
                        className='bg-[#E2E8F0] rounded-xl'
                        id="logo"
                        accept="image/png, image/jpg, image/jpeg"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleLogoChange}
                    >
                        {fileList.length < 1 && <FiUpload size={40} />}
                    </Upload>
                </div>
                <div className='p-6 border rounded-xl mt-2 min-w-full'>
                    <div className='flex gap-8 w-full'>
                        <div className='flex-1'>
                            <Label className='text-black font-semibold'>Name</Label>
                            <Input type="text" name="name" onChange={handleInputChange} className='h-8' />
                        </div>
                        <div className='flex-1'>
                            <Label className='text-black font-semibold'>Address</Label>
                            <Input type="text" name="address" onChange={handleInputChange} className='h-8' />
                        </div>
                    </div>
                    <div className='flex gap-8 mt-8 w-full'>
                        <div className='flex-1'>
                            <Label className='text-black font-semibold'>Email</Label>
                            <Input type="email" name="email" onChange={handleInputChange} className='h-8' />
                        </div>
                        <div className='flex-1'>
                            <Label className='text-black font-semibold'>Status</Label>
                            <div className='w-full'>
                                {/* <Input type="text" name="id" onChange={handleInputChange} className='h-8' /> */}
                                <Select onChange={handleSelectChange} className='w-full mt-4'>
                                    <Option value="Inactive">Inactive</Option>
                                    <Option value="Active">Active</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-8 mt-8 w-full'>
                        <div className='flex-1'>
                            <Label htmlFor='phone_number' className='text-black font-semibold'>Phone no</Label>
                            <DynamicPhoneInput
                                id="phone_number"
                                name="phone_number"
                                onChange={handlePhoneChange}
                                className="w-full mt-1 md:mt-2"
                            // required={required}
                            />
                        </div>
                        <div className='flex-1'>
                            <Label className='text-black font-semibold'>Assign Wage/hr</Label>
                            <Input type="number" name="wage" onChange={handleInputChange} className='h-8' onWheel={(e) => e.currentTarget.blur()} // Prevents number change on scroll
                                style={{
                                    MozAppearance: "textfield", // Firefox
                                    WebkitAppearance: "none", // Chrome, Safari, Edge
                                }} />
                        </div>
                    </div>
                    <div className='flex gap-8 mt-8 w-full'>
                        <div className='flex-1'>
                            <Label className='text-black font-semibold'>Assign Branch</Label>
                            <Select
                                allowClear
                                onChange={handleBranchChange}
                                value={selectedBranches}
                                loading={isLoading}
                                className='mt-4'
                                style={{ width: "100%" }}
                            >
                                {getAllBranchData?.branches_data.length > 0 ? (
                                    getAllBranchData.branches_data.map((branch: any) => (
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
                        </div>
                        
                        <div className='flex-1'>
                            <Label className='text-black font-semibold'>Upload document</Label>
                            <Input id="contract" name='contract' type='file' accept=".pdf,.doc,.docx" onChange={handleFileChange} className='h-8' />
                        </div>

                    </div>
                </div>
                <div className='flex justify-end gap-4 mt-4'>
                    <Button className='bg-transparent text-grey-400' onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button className='bg-[#4FD1C5]' onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create"}
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default CreateWorker;

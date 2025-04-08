"use client";
import { Button } from '@/components/ui/button';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Upload, Select } from 'antd';
import { FiUpload, FiUser } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import { useGetAllManagersMutation, useUpdateManagerMutation } from '@/services/manager/useManager';
import { SingleManagerData } from '@/services/branch/type';
import { useSelector } from 'react-redux';
import { RootState } from '@/services/store';
import { useGetBranchesMutation } from '@/services/branch/useBranch';
import Link from 'next/link';
import placeholder from "@/assets/icons8-user-40.png"
const { Option } = Select;
import Image from 'next/image';
interface EditManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
    manager: SingleManagerData | null;
}

const EditManager = ({ isOpen, onClose, manager }: EditManagerModalProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        id: manager?.id,
        name: manager?.name || "",
        logo: manager?.logo,
        uniqueId: manager?.uniqueId || "",
        phone_number: manager?.phone_number || "",
        email: manager?.email || "",
        branch_ids: manager?.branches?.map((b) => b.id).filter(Boolean) || [], // Remove undefined values
        address: manager?.address || "",
        contract: manager?.contract_data, // Ensure it's an array
        wage: manager?.wage || "",
        status: manager?.status || "Inactive",
    });

    // Update form data when manager changes
    useEffect(() => {
        if (manager) {
            setFormData({
                id: manager.id,
                name: manager.name || "",
                logo: manager.logo,
                uniqueId: manager.uniqueId || "",
                phone_number: manager.phone_number || "",
                email: manager.email || "",
                branch_ids: manager.branches?.map((b) => b.id) || [],
                address: manager.address || "",
                contract: manager.contract_data || null,
                wage: manager.wage || "",
                status: manager.status || "Inactive",
            });
        }
    }, [manager]);

    const logoUrl =

        `https://be.myweightlosscentre.co.uk/${manager?.logo}`;
    const { mutate, isLoading } = useUpdateManagerMutation();
    const { mutateAsync } = useGetBranchesMutation();
    const { getAllBranchData } = useSelector((state: RootState) => state.branch);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                contract: [
                    {
                        id: prev.contract?.[0]?.id,  // Get ID from first contract in array, if available
                        name: file.name,
                        contract: file,
                        created_at: prev.contract?.[0]?.created_at || new Date().toISOString(),
                    },
                ],
            }));
        }
    };



    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFormData((prev) => ({
                ...prev,
                logo: file, // Store file in state
            }));
        }
    };

    const { mutateAsync: getAllManager } = useGetAllManagersMutation();


    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, status: value }));
    };

    const fetchBranches = async () => {
        try {
            const response = await mutateAsync();
        } catch (error) {
            toast.error("Failed to fetch branches");
        }
    };

    // Fetch branches when modal opens
    useEffect(() => {
        if (isOpen) {
            fetchBranches();
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        console.log("Updating", formData);
        const submitData = new FormData();
        function isFile(value: unknown): value is File {
            return value instanceof File;
        }

        Object.entries(formData).forEach(([key, value]) => {
            if (key === "id" || value === undefined || value === null) return;

            if (key === "contract" && value) {
                if (isFile(value)) {
                    submitData.append("contract", value); // Directly append if it's a File
                } else if (typeof value === "object" && "contract" in value) {
                    submitData.append("contract", value.contract as File); // Ensure it's a File
                }
            } else if (key === "branch_ids" && Array.isArray(value)) {
                value.forEach((id) => {
                    if (id !== undefined) {
                        submitData.append("branch_ids[]", id.toString());
                    }
                });
            }
            else if (key === "logo") {
                if (selectedFile) {
                    submitData.append("logo", selectedFile); // Only send logo if it's updated
                }
            } else if (isFile(value)) {
                submitData.append(key, value);
            } else if (typeof value === "string" || typeof value === "number") {
                submitData.append(key, String(value));
            }
        });
        console.log(submitData);
        if (formData.id) {
            await mutate({ id: formData.id, data: submitData }, {
                onSuccess: async () => {
                    toast.success("Manager updated successfully");
                    await getAllManager()
                    onClose();
                },
                onError: (error) => {
                    // console.error(error);
                    // toast.error("Failed to update manager");
                },
            });
        }

    };
    console.log("form data", formData)
    return (
        <Modal
            title="Edit Manager"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width="50%"
        >
            <div className="p-4 flex flex-col items-center rounded-xl w-fit">
                <div className="flex items-center justify-center">

                    <div className="flex items-center justify-center">
                        <Image
                            src={selectedFile ? URL.createObjectURL(selectedFile) : logoUrl || ""}
                            alt="Manager Logo"
                            width={40}
                            height={40}
                            className="h-12 w-12 rounded-full"
                        />
                        {/* {logoUrl !== null ? <Image src={logoUrl} alt="Manager Logo" className="h-12 w-12 rounded-full" width={100} height={100} /> : <Image src={placeholder} alt="placeholder" className="h-12 w-12 rounded-full" width={100} height={100} />} */}
                        <label htmlFor="logoUpload" className="ml-4 cursor-pointer">
                            upload
                        </label>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleLogoUpload}
                            className="hidden"
                            id="logoUpload"
                        />
                    </div>

                </div>

            </div>

            <div className="p-6 border rounded-xl mt-2">
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <Label>Name</Label>
                        <Input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label>ID</Label>
                        <Input type="text" name="uniqueId" value={formData.uniqueId} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label>Status</Label>
                        <Select value={formData.status} onChange={handleSelectChange} className="w-full">
                            <Option value="Inactive">Inactive</Option>
                            <Option value="Active">Active</Option>
                        </Select>
                    </div>
                    <div>
                        <Label>Phone No</Label>
                        <Input type="text" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label>Assign Wage/hr</Label>
                        <Input type="text" name="wage" value={formData.wage} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label>Assign Branch</Label>
                        <Select
                            mode="multiple"
                            allowClear
                            className="w-full mt-2"
                            value={formData.branch_ids}
                            onChange={(value) => setFormData((prev) => ({ ...prev, branch_ids: value }))}
                        >
                            {getAllBranchData?.branches_data.map((branch) => (
                                <Option key={branch.id} value={branch.id}>{branch.name}</Option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <Label>Address</Label>
                        <Input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="mt-4">
                    <Label>Contracts</Label>
                    <div className="mt-2 w-full md:w-1/2" >
                        <Input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                    </div>
                    {Array.isArray(formData.contract) && formData.contract.length > 0 && (
                        formData.contract.map((item, index) => (
                            <div
                                key={index}
                                className="flex w-full md:w-1/2 justify-between items-center bg-gray-100 p-2 rounded-md mt-2"
                            >
                                {typeof item.contract === "string" ? (
                                    <Link
                                        href={item.contract}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-black px-4"
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <span className="text-gray-500">{item.name || "No file available"}</span>
                                )}
                            </div>
                        ))
                    )}


                </div>
            </div>

            <div className="flex justify-end gap-4 mt-4">
                <Button onClick={onClose} className="bg-transparent text-grey-400" >Cancel</Button>
                <Button onClick={handleSubmit} className='bg-[#4FD1C5] text-white' disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update"}
                </Button>
            </div>
        </Modal>
    );
};

export default EditManager;

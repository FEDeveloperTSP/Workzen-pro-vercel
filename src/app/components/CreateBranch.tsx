"use client";
import { Button } from "@/components/ui/button";
import { Modal } from "antd";
import React, { useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypeCreateBranch } from "@/services/branch/branchSlice";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateBranchMutation } from "@/services/branch/useBranch";

// ✅ Validation Schema
const schema = yup.object().shape({
    name: yup.string().required("Branch Name is required"),
    code: yup.string().required("Branch Code is required"),
    location: yup.string().required("Branch Location is required"),
    status: yup.string().required("Branch Status is required"),
});

const CreateBranch = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate, isLoading } = useCreateBranchMutation()
    // ✅ React Hook Form
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // ✅ Form Submit Handler
    const onSubmit = async (data: TypeCreateBranch) => {
        console.log("Branch Data:", data);
        await mutate(data, {
            onSuccess: () => {
                setIsModalOpen(false);

            },
            onError: (error: any) => {
                console.log(error);
            },
        })
    };

    return (
        <>
            <Button className="bg-[#4FD1C5] w-fit" onClick={() => setIsModalOpen(true)}>
                <HiUserAdd /> Create Branch
            </Button>

            <Modal
                className="min-w-screen h-screen"
                title="Create Branch"
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 border rounded-xl mt-2 min-w-full">
                        <div className="flex flex-col md:flex-row gap-8 w-full">
                            <div className="flex-1">
                                <Label className="mt-4 text-black font-semibold">Branch Name</Label>
                                <Input {...register("name")} type="text" className="h-8" />
                                {errors.name && <p className="text-red-500">{errors.name.message as string}</p>}
                            </div>
                            <div className="flex-1">
                                <Label className="mt-4 text-black font-semibold">Branch Code</Label>
                                <Input {...register("code")} type="text" className="h-8" />
                                {errors.code && <p className="text-red-500">{errors.code.message as string}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 mt-8 w-full">
                            <div className="flex-1">
                                <Label className="mt-4 text-black font-semibold">Branch Location</Label>
                                <Input {...register("location")} type="text" className="h-8" />
                                {errors.location && <p className="text-red-500">{errors.location.message as string}</p>}
                            </div>
                            <div className="flex-1">
                                <Label className="mt-4 text-black font-semibold">Branch Status</Label>
                                <Select
                                    onValueChange={(value) => setValue("status", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && <p className="text-red-500">{errors.status.message as string}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                        <Button type="button" className="bg-transparent text-grey-400" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-[#4FD1C5]">
                            Create
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default CreateBranch;

"use client"
import { Button } from '@/components/ui/button';
import { Modal, UploadFile } from 'antd';
import React, { useState } from 'react';
import { HiUserAdd } from 'react-icons/hi';
import { Upload } from 'antd';
import { FiUpload } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const CreateManager = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        // Keep only the most recent file
        setFileList(newFileList.slice(-1));
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url;
        if (!src && file.originFileObj) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as Blob);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        if (src) {
            const image = new Image();
            image.src = src;
            const imgWindow = window.open(src);
            imgWindow?.document.write(image.outerHTML);
        }
    };

    return (
        <>
            <Button className='bg-[#4FD1C5] w-fit' onClick={() => setIsModalOpen(true)}>
                <HiUserAdd /> Create Manager
            </Button>
            <Modal
                className='min-w-screen h-screen'
                title="Create Manager"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null} // Hide default footer
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
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                        beforeUpload={() => false} // Prevents automatic upload
                    >
                        {fileList.length < 1 && <FiUpload size={40} />}
                    </Upload>
                </div>
                <div className='p-6 border rounded-xl mt-2 min-w-full'>
                    <div className='flex gap-8 w-full'>
                        <div className='flex-1'>
                            <Label className='mt-4 text-black font-semibold '>Name</Label>
                            <Input type="text" className='h-8' />
                        </div>
                        <div className='flex-1'>
                            <Label className='mt-4 text-black font-semibold'>ID</Label>
                            <Input type="text" className='h-8' />
                        </div>
                    </div>
                    <div className='flex gap-8 mt-8 w-full'>
                        <div className='flex-1'>
                            <Label className='mt-4 text-black font-semibold'>Phone no</Label>
                            <Input type="text" className='h-8' />
                        </div>
                        <div className='flex-1'>
                            <Label className='mt-4 text-black font-semibold'>Email Address</Label>
                            <Input type="text" className='h-8' />
                        </div>
                    </div>
                    <div className='flex gap-8 mt-8 w-full'>
                        <div className='flex-1'>
                            <Label className='mt-4 text-black font-semibold'>Assign Branch</Label>
                            <Select >
                                <SelectTrigger >
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex-1'>
                            <Label className='mt-4 text-black font-semibold'>Address</Label>
                            <Input type="text" className='h-8' />

                        </div>
                    </div>
                    <div className='flex gap-8 mt-8 w-full'>
                        <div className='flex-1'>
                            <Label className='mt-4 text-black font-semibold'>Upload document</Label>
                            <Input id="picture" type="file" className='h-8 ' />
                        </div>
                        <div className='flex-1'>
                            <Label className='mt-4 text-black font-semibold'>ID</Label>
                            <Input type="text" className='h-8 ' />
                        </div>
                    </div>
                </div>
                <div className='flex justify-end gap-4 mt-4'>
                    <Button className='bg-transparent text-grey-400'>Cancel</Button>
                    <Button className='bg-[#4FD1C5]' onClick={() => setIsModalOpen(false)}>Create</Button>
                </div>
            </Modal>
        </>
    );
};

export default CreateManager;

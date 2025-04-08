'use client'
import { Button } from '@/components/ui/button'
import { Modal, Upload } from 'antd'
import { UploadFile, UploadProps } from 'antd/es/upload/interface'
import React, { useState } from 'react'
import { MdOutlineFileUpload } from 'react-icons/md'
import { InboxOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'
import { useGetAllDocumentsMutation, useUploadDocumentsMutation } from '@/services/document/useDocument'

const { Dragger } = Upload;

const UploadDoc = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onChange: UploadProps["onChange"] = ({ fileList }) => {
        const latestFile = fileList.slice(-1); 
        setFileList(latestFile); // Update the UI file list
        // Keep only the most recent file
    };
    const handleGetAllDocuments = async () => {
        try {
            const { mutateAsync } = useGetAllDocumentsMutation();

            // Wait for the API call to finish before showing messages
            await mutateAsync();

        } catch (error: any) {
            // toast.error(error || "Login failed");
        }
    }
    const { mutate } = useUploadDocumentsMutation()
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
        formData.append("document", file);
        formData.append("name", file.name); // Send file name as well

        await mutate(formData, {
            onSuccess: () => {
                setIsModalOpen(false);
                handleGetAllDocuments()
                // ()

            },
            onError: (error: any) => {
                // console.log(error);
            },
        })

    };
    return (
        <div>
            <Button className="bg-[#4FD1C5]" onClick={() => setIsModalOpen(true)}>
                <MdOutlineFileUpload /> Upload Document
            </Button>
            <Modal
                open={isModalOpen}
                okText="Upload"
                cancelText="Cancel"
                okButtonProps={{
                    style: { backgroundColor: "#4FD1C5", },
                }}
                onOk={handleUpload}
                onCancel={() => setIsModalOpen(false)}
            >
                <h1 className="text-lg font-semibold border-b pb-3">Upload Document</h1>

                <Upload
                    name="file"
                    accept="application/pdf"
                    multiple={false} // Allow only one file
                    fileList={fileList} // Bind fileList state
                    onChange={onChange}
                    beforeUpload={() => false} // Prevent automatic upload
                    className="flex flex-col items-center justify-center border-2 border-dashed border-[#82d8d8] p-6 bg-[#f7f9fc] rounded-lg"
                >
                    <div className="flex flex-col items-center gap-2">
                        <InboxOutlined className="text-[#5bc0be] text-5xl" />
                        <Button className="border border-[#5bc0be] mb-2 text-[#5bc0be] bg-white">
                            Browse Files
                        </Button>
                    </div>
                </Upload>

            </Modal>
        </div>
    );
};

export default UploadDoc;

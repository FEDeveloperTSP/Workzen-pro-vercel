'use client'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Modal, UploadFile } from 'antd'
import React, { useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import { MdOutlineFileUpload } from 'react-icons/md'
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const UploadDoc = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false)
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
        <div>
            <Button className='bg-[#4FD1C5]' onClick={() => setIsModalOpen(true)}><MdOutlineFileUpload />Upload Doc</Button>
            <Modal open={isModalOpen} okText='Upload' cancelText='Cancel' okButtonProps={{ className: 'bg-[#4FD1C5]' }} className='flex flex-col overflow-visible' onClose={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                <h1 className='text-lg md:text-lg font-semibold border-b pb-3'>Upload Doc </h1>
                <hr />
                {/* <div className="p-4 flex flex-col rounded-xl w-full "> */}
                <Dragger
                    name="file"
                    multiple={true}
                    action="/upload"
                    showUploadList={false}
                    style={{
                        marginTop: "10px",
                        background: "#f7f9fc",
                        border: "2px dashed #82d8d8",
                        borderRadius: 10,
                    }}
                >
                    <InboxOutlined style={{ fontSize: "40px", color: "#5bc0be" }} />
                    <p style={{ margin: "10px 0", fontSize: "16px", color: "#666" }}>
                        Drag and Drop Files here or
                    </p>
                    <Button
                        style={{
                            // padding: "8px 16px",
                            backgroundColor: "#fff",
                            border: "1px solid #5bc0be",
                            // borderRadius: "5px",
                            color: "#5bc0be",
                            // cursor: "pointer",
                            // fontSize: "14px",
                        }}
                    >
                        Browse Files
                    </Button>
                </Dragger>
                {/* </div> */}
            </Modal>
        </div>
    )
}

export default UploadDoc

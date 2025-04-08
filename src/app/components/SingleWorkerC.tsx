"use client"
import { RootState } from '@/services/store';
import { useGetSingleWorkersMutation } from '@/services/worker/useWorker';
import { Table } from 'antd';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import placeholder from "@/assets/icons8-user-40.png"
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Vector from "@/assets/Vector 5.svg"
import rectangle from "@/assets/Rectangle 1080.svg"
import { FiUser } from 'react-icons/fi';
import moment from 'moment';
import Loading from './Loading';
import { getInitialsOrLogo } from '@/services/useFilter';
const SingleWorkerC = () => {
    const { id } = useParams();
    const branchId = Number(id);
    const { mutateAsync, isLoading } = useGetSingleWorkersMutation();
    const { singleworkerdata } = useSelector((state: RootState) => state.worker)
    const onSubmit = async () => {
        try {
            // Wait for the API call to finish before showing messages
            await mutateAsync(branchId);

        } catch (error: any) {
            toast.error(error || "Login failed");
        }
    };
    console.log("single worker data", singleworkerdata)
    console.log("single worker data", singleworkerdata.name)
    useEffect(() => {
        onSubmit()
    }, [])
    const generateInitialsImage = (name: string) => {
        const canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        // Background color
        ctx.fillStyle = "#4FD1C5";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Text settings
        ctx.fillStyle = "#fff";
        ctx.font = "bold 40px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Extract initials
        const initials = name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase();

        ctx.fillText(initials, canvas.width / 2, canvas.height / 2);

        return canvas.toDataURL(); // Convert canvas to base64 image
    };
    const [initialsImage, setInitialsImage] = useState<string | null>(null);

    useEffect(() => {
        if (singleworkerdata.logo == null && singleworkerdata.name) {
            const initialsImage = generateInitialsImage(singleworkerdata.name);
            setInitialsImage(initialsImage);
        }
    }, [singleworkerdata.logo, singleworkerdata.name]);
    const completed = 22;
    const total = 28;
    const logo = `https://be.myweightlosscentre.co.uk/${singleworkerdata.logo}`
    const dataa = {
        datasets: [
            {
                data: [completed, total - completed], // Completed vs Remaining
                backgroundColor: ["#6366F1", "#E5E7EB"], // Gradient effect with blue
                hoverBackgroundColor: ["#8B5CF6", "#D1D5DB"],
                borderWidth: 0,
                cutout: "75%", // Controls thickness
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: { enabled: false },
            legend: { display: false },
        },
    };

    const columns = [
        {
            title: "File Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "File Size",
            dataIndex: "file_size",
            key: "file_size",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: any) => (
                <div className="flex gap-4">
                    <button className="text-blue-500" onClick={() => {
                        console.log(record)
                        window.open(`https://be.myweightlosscentre.co.uk/${record.file_data}`)
                    }}>
                        View
                    </button>
                    {/* <button >
                        Delete
                    </button> */}
                </div>
            ),
        },
    ];


    // console.log()
    const dataSource = singleworkerdata?.contract_data?.map((contract, index) => ({
        //     id: contract.id,
        //     name: contract.name,
        //   const dataSource = singlemanager.contract_data.map((contract, index) => ({
        id: contract.id,
        file_data: contract.file_data,
        file_size: contract.file_size,
        name: contract.name,
        date: contract.created_at
            ? moment(contract.created_at).format("DD/MM/YYYY") // Formatting date
            : "N/A",
    }));
    const namelogo = getInitialsOrLogo(singleworkerdata.name)
    if (isLoading) return <Loading />
    return (
        <>
            <Image
                src={Vector}
                alt="Profile"
                className="absolute top-10 right-0 transform rounded-b-3xl h-40 mt-5"
            />
            <Image
                src={rectangle}
                alt="Profile"
                className="absolute top-12 right-1 transform rounded-b-3xl h-40 mt-5"
            />
            {/* <p>{singleworkerdata.name}hhhhh</p> */}
            <div className="h-40 w-full md:w-1/2 mt-20 flex items-center gap-4 rounded-xl pb-4 bg-white px-8 py-6 shadow-sm relative bg-opacity-60">

                {typeof singleworkerdata.logo === "string" && singleworkerdata.logo.trim() !== "" ? (
                    <Image
                        src={logo}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="w-20 h-20 rounded-full"
                    />
                ) : (
                    <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#4FD1C5]">
                        <span className="text-white font-bold text-lg">{namelogo}</span>
                    </div>
                )}
                <div className=''>
                    <h2 className="text-xl font-semibold">{singleworkerdata.name}</h2>
                    <p className="text-gray-500">{singleworkerdata.email}</p>
                </div>
            </div>

            {/* Profile Information */}
            <div className="grid grid-cols-3 gap-20 mt-4">
                <div className="bg-white shadow-sm p-4 rounded-xl px-4 py-4  min-w-fit">
                    <h3 className="font-semibold mb-2 py-4">Profile Information</h3>
                    <hr />
                    <div className='flex flex-col px-2 gap-3 mt-4'>
                        <div className='flex gap-2'>
                            <p className='text-greytext font-base '>Name:</p>
                            <p className='font-semibold'>{singleworkerdata.name}</p>
                        </div>
                        <div className='flex gap-2'>
                            <p className='text-greytext font-base '>Mobile:</p>
                            <p className='font-semibold'>{singleworkerdata.phone_number}</p>
                        </div>
                        <div className='flex gap-2'>
                            <p className='text-greytext font-base '>Address:</p>
                            <p className='font-semibold'>{singleworkerdata.address}</p>
                        </div>
                        <div className='flex gap-2'>
                            <p className='text-greytext font-base '>Email:</p>
                            <p className='font-semibold'>{singleworkerdata.email}</p>
                        </div>
                        <div className='flex gap-2'>
                            <p className='text-greytext font-base '>Wage:</p>
                            <p className='font-semibold'>${singleworkerdata.wage}</p>
                        </div>
                        <div className='flex gap-2'>
                            <p className='text-greytext font-base '>Branch:</p>
                            <p className='font-semibold'>{singleworkerdata.branch}</p>
                        </div>
                    </div>
                </div>

                {/* Annual Leave Chart Placeholder */}
                {/* <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg w-60 gap-6">
                    <h3 className="text-gray-800 font-medium text-md">Annual Leave</h3>
                    <hr />
                    <div className="relative w-40 h-40">

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <p className="text-gray-500 text-sm">Completed</p>
                            <p className="text-black text-xl font-semibold">
                                {completed}/{total}
                            </p>
                        </div>
                    </div>
                </div> */}

                {/* Attendance Chart Placeholder */}
                {/* <div className="border p-4 rounded-lg flex items-center justify-center">
                    <h3 className="font-semibold">Attendance (Mocked Data)</h3>
                    <p>Absents: 22 | Lates: 4</p>
                </div> */}
            </div>

            {/* Documents Section */}
            <div className="mt-6  custom-docs-table">
                <h3 className="font-semibold mb-2">Documents</h3>
                <Table columns={columns} dataSource={dataSource} pagination={false} />
            </div>
        </>
    )
}

export default SingleWorkerC

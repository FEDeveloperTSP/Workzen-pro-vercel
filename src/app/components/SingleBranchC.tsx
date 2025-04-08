'use client'
import BranchManageTable from '@/app/components/BranchManageTable';
import BranchWorkerTable from '@/app/components/BranchWorkerTable';
import Card from '@/app/components/Card'
import Search from '@/app/components/Search';
import { useGetSingleBranchMutation } from '@/services/branch/useBranch';
import { RootState } from '@/services/store';
import { Spin } from 'antd';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { FaUsers, FaUsersSlash } from 'react-icons/fa'
import { FaUsersGear } from "react-icons/fa6";
import { FaSackDollar } from "react-icons/fa6";
import { IoIosArrowDown } from 'react-icons/io';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const SingleBranchC = () => {
    const { id } = useParams();
    const branchId = Number(id);
    const { mutateAsync, isLoading } = useGetSingleBranchMutation();
    const { datasingleBranch } = useSelector((state: RootState) => state.branch)
    console.log("Branch Data:",datasingleBranch);
    const onSubmit = async () => {
        try {
            // Wait for the API call to finish before showing messages
            await mutateAsync(branchId);

        } catch (error: any) {
            toast.error(error || "Login failed");
        }
    };
    useEffect(() => {
        onSubmit()
    }, [])
    if (isLoading) return <Loading />
    return (

        <div>
            <h1 className='text-2xl md:text-3xl font-semibold'>{datasingleBranch.branch_name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full md:max-w-full justify-center items-center justify-items-center gap-32 mt-4 mb-4">
                <Card title='Total Managers' count={datasingleBranch.total_managers} Icon={FaUsers} />
                <Card title='Total Workers' count={datasingleBranch.total_workers} Icon={FaUsersGear} />
                <Card title='Total Expense' count={datasingleBranch.total_expenses} Icon={FaSackDollar} />
            </div>
            <div className='h-screen w-full bg-white rounded-lg mt-4'>
                
                <BranchManageTable data={datasingleBranch} />
                <h3 className='flex gap-1 items-center font-bold pl-6 pt-10'>
                    <IoIosArrowDown />Workers
                </h3>
                <hr />
                <BranchWorkerTable data={datasingleBranch} />
            </div>
        </div>
    )
}

export default SingleBranchC

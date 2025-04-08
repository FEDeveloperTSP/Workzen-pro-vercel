"use client"
import React, { useEffect } from 'react'
import Card from './Card'
import { useGetBranchesMutation } from '@/services/branch/useBranch';
import { useSelector } from 'react-redux';
import { RootState } from '@/services/store';
import toast from 'react-hot-toast';
import { FaCodeBranch } from 'react-icons/fa';
import { FaSackDollar } from 'react-icons/fa6';
import activebranch from '@/assets/active-branch.svg'
import inactivebranch from '@/assets/inactive-branch.svg'
import TableBranch from './TableBranch';
import { Spin } from 'antd';
import Loading from './Loading';
const BranchCard = () => {
    const { mutateAsync, isLoading } = useGetBranchesMutation();
    const { getAllBranchData } = useSelector((state: RootState) => state.branch)
    const onSubmit = async () => {
        try {
            // Wait for the API call to finish before showing messages
            await mutateAsync();

        } catch (error: any) {
            toast.error(error || "Login failed");
        }
    };
    useEffect(() => {
        onSubmit()
    }, [])
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full md:max-w-full justify-center items-center justify-items-center gap-4 mt-4 mb-4">
                        <Card title='Total Branches' count={getAllBranchData.total_branches} Icon={FaCodeBranch} />
                        <Card title='Active Branches' count={getAllBranchData.active_branches} imageSrc={activebranch} />
                        <Card title='Inactive Branches' count={getAllBranchData.inactive_branches} imageSrc={inactivebranch} />
                        <Card title='Total Expense' count={getAllBranchData.total_expenses} Icon={FaSackDollar} />
                    </div>
                    <TableBranch branchData={getAllBranchData} />
                </>
            )}
        </>

    )
}

export default BranchCard

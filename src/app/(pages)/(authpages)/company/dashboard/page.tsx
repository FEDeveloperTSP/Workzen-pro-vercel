import Card from '@/app/components/Card'
import React from 'react'
import { FaCodeBranch } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import BranchWiseExpenseChart from '@/app/components/BranchWiseChart';
import BranchWiseWorkers from '@/app/components/BranchWorkerChart';
const page = () => {
    return (
        <div>
            <h1 className='text-2xl md:text-3xl font-semibold'>Managers</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 mt-4'>
                <Card title='Total Branches' count={0} Icon={FaCodeBranch} />
                <Card title='Total Managers' count={0} Icon={GrUserManager} />
                <Card title='Total Workers' count={0} Icon={FaUsers} />
                <Card title='Total Expense' count={0} Icon={FaSackDollar} />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full gap-4 mt-4'>
                    <BranchWiseExpenseChart />
                    <BranchWiseWorkers />
            </div>
        </div>
    )
}

export default page

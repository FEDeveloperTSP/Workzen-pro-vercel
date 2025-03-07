import BranchManageTable from '@/app/components/BranchManageTable';
import BranchWorkerTable from '@/app/components/BranchWorkerTable';
import Card from '@/app/components/Card'
import Search from '@/app/components/Search';
import React from 'react'
import { FaUsers, FaUsersSlash } from 'react-icons/fa'
import { FaUsersGear } from "react-icons/fa6";
import { FaSackDollar } from "react-icons/fa6";
import { IoIosArrowDown } from 'react-icons/io';
const page = () => {
    return (
        <div>
            <div className='grid grid-cols-3 gap-32 pt-6'>
                <Card title='Total Managers' count={0} Icon={FaUsers} />
                <Card title='Total Workers' count={0} Icon={FaUsersGear} />
                <Card title='Total Expense' count={0} Icon={FaSackDollar} />
            </div>
            <div className='h-screen w-full bg-white rounded-lg mt-4'>
                <div className='flex justify-between p-4'>
                    <div className='w-1/6 '>
                        <Search placeholder='Search in table..... ' className='shadow-md rounded-lg' />
                    </div>

                </div>
                <h3 className='flex gap-1 items-center font-bold pl-6'>
                    <IoIosArrowDown />Manager
                </h3>
                <hr />
                <BranchManageTable />
                <h3 className='flex gap-1 items-center font-bold pl-6 pt-10'>
                    <IoIosArrowDown />Workers
                </h3>
                <hr />
                <BranchWorkerTable />
            </div>
        </div>
    )
}

export default page

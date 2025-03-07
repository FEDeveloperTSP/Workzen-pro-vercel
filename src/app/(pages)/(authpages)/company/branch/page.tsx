import Card from '@/app/components/Card'
import CreateManager from '@/app/components/CreateManager';
import NavbarManager from '@/app/components/NavbarManager';
import Search from '@/app/components/Search';
import TableComponent from '@/app/components/TableManager';
import { Button } from '@/components/ui/button';
import React from 'react'
import activebranch from '@/assets/active-branch.svg'
import inactivebranch from '@/assets/inactive-branch.svg'
import { FaUsers, FaUsersSlash } from 'react-icons/fa'
import { FaCodeBranch, FaUsersGear } from "react-icons/fa6";
import { FaSackDollar } from "react-icons/fa6";
import { HiUserAdd } from "react-icons/hi";
import TableBranch from '@/app/components/TableBranch';
import CreateBranch from '@/app/components/CreateBranch';
// import activeworkers from "@/app/assets/active-workers.svg"
const Branch = () => {
    return (
        <div className='overflow-x-hidden mt-4 md:mt-0'>
            <h1 className='text-2xl md:text-3xl font-semibold'>Branches</h1>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 w-full md:max-w-full justify-center items-center justify-items-center gap-4 mt-4 mb-4">
                <Card title='Total Branches' count={0} Icon={FaCodeBranch} />
                <Card title='Active Branches' count={0} imageSrc={activebranch} />
                <Card title='Inactive Branches' count={0} imageSrc={inactivebranch} />
                <Card title='Total Expense' count={0} Icon={FaSackDollar} />
            </div>

            <TableBranch />
        </div>
    )
}

export default Branch

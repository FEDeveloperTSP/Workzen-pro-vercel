import Card from '@/app/components/Card'
import CreateManager from '@/app/components/CreateManager';
import NavbarManager from '@/app/components/NavbarManager';
import Search from '@/app/components/Search';
import TableComponent from '@/app/components/TableManager';
import { Button } from '@/components/ui/button';
import React from 'react'
import { FaUsers, FaUsersSlash } from 'react-icons/fa'
import { FaUsersGear } from "react-icons/fa6";
import { FaSackDollar } from "react-icons/fa6";
import { HiUserAdd } from "react-icons/hi";
// import activeworkers from "@/app/assets/active-workers.svg"
const Manager = () => {
    return (
        <div className='scrollbar-hide'>
            <h1 className='text-2xl md:text-3xl font-semibold'>Workers</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 mt-4'>
                <Card title='Total Workers' count={0} Icon={FaUsers} />
                <Card title='Active Workers' count={0} Icon={FaUsersGear} />
                <Card title='Inactive Workers' count={0} Icon={FaUsersSlash} />
                <Card title='Total Wages' count={0} Icon={FaSackDollar} />
            </div>
           
            {/* <div className='h-screen w-full bg-white rounded-lg mt-4'>
                <div className='flex justify-between p-4'>
                    <div className='w-1/6 '>
                        <Search placeholder='Search in table..... ' className='shadow-md rounded-lg' />
                    </div>
                </div> */}
                <TableComponent />
            {/* </div> */}
        </div>
    )
}

export default Manager

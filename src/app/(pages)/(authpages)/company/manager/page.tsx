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
    <div className='overflow-x-hidden mt-4 md:mt-0'>
      <h1 className='text-2xl md:text-3xl font-semibold'>Managers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full md:max-w-full justify-center items-center justify-items-center gap-4 mt-4">
        <Card title='Total Workers' count={0} Icon={FaUsers} />
        <Card title='Active Workers' count={0} Icon={FaUsersGear} />
        <Card title='Inactive Workers' count={0} Icon={FaUsersSlash} />
        <Card title='Total Wages' count={0} Icon={FaSackDollar} />
      </div>
      <div className='mt-4'>
        <NavbarManager />
      </div>
      {/* <TableComponent /> */}

    </div>
  )
}

export default Manager

import Card from '@/app/components/Card'
import CreateManager from '@/app/components/CreateManager';
import ManagerCard from '@/app/components/ManagerCard';
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
    <div className='overflow-x-auto mt-4 md:mt-0'>
      <h1 className='text-2xl md:text-3xl font-semibold'>Managers</h1>
      <ManagerCard />
      {/* <TableComponent /> */}

    </div>
  )
}

export default Manager

import Card from '@/app/components/Card'
import CreateManager from '@/app/components/CreateManager';
import WorkerCardM from '@/app/components/manager/worker/WorkerCardM';
import NavbarManager from '@/app/components/NavbarManager';
import Search from '@/app/components/Search';
import TableComponent from '@/app/components/TableManager';
import WorkerCard from '@/app/components/WokerCard';
import { Button } from '@/components/ui/button';
import React from 'react'
import { FaUsers, FaUsersSlash } from 'react-icons/fa'
import { FaUsersGear } from "react-icons/fa6";
import { FaSackDollar } from "react-icons/fa6";
import { HiUserAdd } from "react-icons/hi";
// import activeworkers from "@/app/assets/active-workers.svg"
const Worker = () => {
  return (
    <div className='scrollbar-hide'>
      <h1 className='text-2xl md:text-3xl font-semibold'>Workers</h1>
      <WorkerCardM />
    </div>
  )
}

export default Worker

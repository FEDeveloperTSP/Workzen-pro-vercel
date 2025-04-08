'use client'
import React, { useEffect } from 'react'
import Card from './Card'
import { FaUsers, FaUsersSlash } from 'react-icons/fa'
import { FaUsersGear, FaSackDollar } from 'react-icons/fa6'
import NavbarManager from './NavbarManager'
import { useGetAllManagersMutation } from '@/services/manager/useManager'
import { useSelector } from 'react-redux'
import { RootState } from '@/services/store'
import toast from 'react-hot-toast'
import Loading from './Loading'

const ManagerCard = () => {
    const { mutateAsync, isLoading } = useGetAllManagersMutation();
    const { managerdata } = useSelector((state: RootState) => state.manager)
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
    if (isLoading) return <Loading />
    return (
        <>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full md:max-w-full justify-center items-center justify-items-center gap-4 mt-4 mb-4">
            <Card title='Total Managers' count={managerdata.total_managers} Icon={FaUsers} />
            <Card title='Active Managers' count={managerdata.active_managers} Icon={FaUsersGear} />
            <Card title='Inactive Managers' count={managerdata.inactive_managers} Icon={FaUsersSlash} />
            <Card title='Total Wages' count={managerdata.total_wages} Icon={FaSackDollar} />
        </div>
            <div className='mt-4'>
                <NavbarManager data={managerdata} />
            </div>
        </>

    )
}

export default ManagerCard

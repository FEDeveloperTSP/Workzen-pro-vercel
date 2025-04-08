"use client"
import React, { useEffect } from 'react'
// import Card from'
import { useGetBranchesMutation } from '@/services/branch/useBranch';
import { useSelector } from 'react-redux';
import { RootState } from '@/services/store';
import toast from 'react-hot-toast';
import { FaCodeBranch, FaUsers, FaUsersSlash } from 'react-icons/fa';
import { FaSackDollar, FaUsersGear } from 'react-icons/fa6';
import activebranch from '@/assets/active-branch.svg'
import inactivebranch from '@/assets/inactive-branch.svg'
// import Loading from './';
import Loading from '../../Loading';
import { useGetAllWorkersMutation } from '@/services/worker/useWorker';
import Card from '../../Card';
import WorkerTableM from './WorkerTable';
import NavbarWorker from './NavbarWorker';

const WorkerCard = () => {
    const { mutateAsync, isLoading } = useGetAllWorkersMutation();
    const { workerdata } = useSelector((state: RootState) => state.worker)
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
                        <Card title='Total Workers' count={workerdata.total_workers} Icon={FaUsers} />
                        <Card title='Active Workers' count={workerdata.active_workers} Icon={FaUsersGear} />
                        <Card title='Inactive Workers' count={workerdata.inactive_workers} Icon={FaUsersSlash} />
                        <Card title='Total Wages' count={workerdata.total_expenses} Icon={FaSackDollar} />
                    </div>
                    <NavbarWorker data={workerdata} />

                </>
            )}
        </>

    )
}

export default WorkerCard


import React from 'react'

import BranchCard from '@/app/components/BranchCard';
import BranchCardM from '@/app/components/manager/branch/BranchCardM';
// import activeworkers from "@/app/assets/active-workers.svg"
const Branch = () => {
    return (
        <div className='overflow-x-hidden mt-4 md:mt-0'>
            <h1 className='text-2xl md:text-3xl font-semibold'>Branches</h1>
            <BranchCardM />
        </div>
    )
}

export default Branch

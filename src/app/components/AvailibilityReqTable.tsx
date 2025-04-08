'use client'
import { Modal, Table } from 'antd'
import React, { useState } from 'react'
import CreateManager from './CreateManager'
import Search from './Search'
import { ManagerData, ManagerTable } from '@/services/manager/Type'
import { getInitialsLogo, useFilter } from '@/services/useFilter'
import EditManagerModal from './EditManagerModal'
import { useGetSingleBranchMutation } from '@/services/branch/useBranch'
import { RootState } from '@/services/store'
import { useSelector } from 'react-redux'
import { SingleManagerData } from '@/services/branch/type'
import { useAssignShiftMutation, useGetSingleManagersMutation } from '@/services/manager/useManager'
import { useRouter } from 'next/navigation'
import SetRange from './SetRange'
import toast from 'react-hot-toast'
const AvailibilityReqTable = ({ data }: { data: ManagerData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  const handleTimeSelect = (start: string, end: string) => {
    setStartTime(start)
    setEndTime(end)
    console.log(start, end)
  }
  const { mutateAsync } = useAssignShiftMutation()

  const handleSendRequest = async (managerId: number) => {
    if (!startTime && !endTime) {
      toast.error("Please select a date and time range")
    }
    else {
      console.log("Sending request for:", managerId, "from", startTime, "to", endTime)
      const data = {
        id: managerId,
        start_time: startTime,
        end_time: endTime
      }
      await mutateAsync(data)
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div className='flex gap-2'>
          <div className='h-10 w-10 bg-[#4FD1C5] text-white flex items-center justify-center rounded-xl font-bold text-sm uppercase'>
            {record.logo ? (
              <img src={`https://be.myweightlosscentre.co.uk/${record.logo}`} alt="Manager Logo" className="h-full w-full object-cover rounded-xl" />
            ) : (
              getInitialsLogo(text, record.logo) // Show initials if logo is null
            )}
          </div>
          <div className='flex flex-col pl-2'>
            <p className='font-bold'>{text}</p>
            <p className='text-[#718096]'>{record.email}</p>
          </div>
        </div>
      )
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      render: (text: string) => (
        <h3 className='font-bold'>{text}</h3>
      )

    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <>
          {text === "Inactive" && <div className='p-2 bg-[#A0AEC0] w-fit h-fit rounded-xl font-semibold text-white'>{text}</div>}
          {text === "Active" && <div className='p-2 bg-[#48BB78] w-fit h-fit rounded-xl font-semibold text-white'>{text}</div>}

        </>
      )
    }, {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => (
        <div className='flex gap-4'>
          <button
            onClick={() => handleSendRequest(record.key)}
            className={`px-4 py-2 rounded-full font-semibold 
                ${record.availability === "not_sent"
                ? "bg-[#48BB78] text-white hover:bg-green-600"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"}
            `}
            disabled={record.availability !== "not_sent"}
          >
            {record.availability === "not_sent" ? "Send Request" : "Request Sent"}
          </button>
        </div>
      )

    }
  ]
  console.log(data)
  const { filterText, handleFilterChange } = useFilter()
  const dataSource = data.managers_data.map((manager: ManagerTable) => ({
    key: manager.id,
    availability: manager.availability,
    email: manager.email,
    name: manager.name,
    workers: manager.workers_count,
    wages: manager.wage,
    status: manager.status,
    branch: manager.branches?.map(branch => branch.name).join(", ") || "N/A",
    logo: manager.logo,
  }))
  const filteredData = dataSource.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    )
  );
  return (
    <>
      <div className='flex justify-between gap-4 md:gap-0 p-4 flex-col md:flex-row'>
        <div className='w-1/6 h-1/2'>
        </div>
        <SetRange onTimeSelect={handleTimeSelect} />
      </div>
      <div className="w-full overflow-x-auto">
        <Table columns={columns} dataSource={filteredData} pagination={false}  // Ensure horizontal scrolling
        />
      </div>
    </>
  )
}

export default AvailibilityReqTable

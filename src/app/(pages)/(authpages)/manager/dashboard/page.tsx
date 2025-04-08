"use client"

import Card from "@/app/components/Card"
import Attendance from "@/app/components/manager/dashboard/Attendance"
import IncomingRequests from "@/app/components/manager/dashboard/IncomingRequests"
import Tabs from "@/app/components/Tabs"
import { useGetChangeShiftTime, useGetShifts } from "@/services/company/managers/shiftsAndAttendanceHooks"
import React, { useState } from "react"
import { FaUserCheck, FaUsers, FaUserTimes } from "react-icons/fa"
import { FaSackDollar } from "react-icons/fa6"

const page = () => {
  const tabs = ["Attendance", "Incoming Requests"]
  const [activeTab, setActiveTab] = useState(tabs[0])

  const { data: incomingReqData, isLoading, error } = useGetChangeShiftTime()

  console.log('incoming req data: ', incomingReqData)

  const renderComponent: Record<typeof tabs[number], React.JSX.Element> = {
    'Attendance': <Attendance />,
    'Incoming Requests': <IncomingRequests incomingReqData={incomingReqData?.data} />,
    // 'Incoming Requests': <IncomingRequests  />,
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 mt-4">
        <Card title="Total Workers" count={0} Icon={FaUsers} />
        <Card title="Active Workers" count={0} Icon={FaUserCheck} />
        <Card title="Inactive Workers" count={0} Icon={FaUserTimes} />
        <Card title="Total Expense" count={"$50,000"} Icon={FaSackDollar} />
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {renderComponent[activeTab] || null}
    </div>
  )
}

export default page

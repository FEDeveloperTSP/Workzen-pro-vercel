"use client"
import Card from "@/app/components/Card"
import React from "react"
import { FaCodeBranch, FaUsers, FaSackDollar } from "react-icons/fa6"
import { GrUserManager } from "react-icons/gr"
import BranchWiseExpenseChart from "@/app/components/BranchWiseChart"
import BranchWiseWorkers from "@/app/components/BranchWorkerChart"
import { useGetDashboardData } from "@/services/company/dashboard/dashboardHooks"
import { Avatar, Progress, Table } from "antd"
import { DashboardData } from "@/services/company/dashboard/types"
import { ColumnsType } from "antd/es/table"

const Page = () => {
  const { data, isLoading, error } = useGetDashboardData()
  const dashboardData: DashboardData | undefined = data?.data

  const branchWiseExpenseData = dashboardData?.branch_wise_data?.map(branch => ({
    name: branch.name,
    expense: branch.workers_sum_wage + branch.managers_sum_wage,
  })) || [];

  const branchWiseWorkerData = dashboardData?.branch_wise_data?.map(branch => ({
    label: branch.name, // Branch Name
    value: branch.workers_count, // Number of Workers
})) || [];

  // Calculate total workers
const totalWorkers = branchWiseWorkerData.reduce((sum, branch) => sum + branch.value, 0);

// Add color mapping and percentage calculation
const formattedBranchWiseWorkerData = branchWiseWorkerData.map((branch, index) => ({
    ...branch,
    color: ["#00C49F", "#0088FE", "#7C4DFF", "#FF4081", "#FFA726", "#FFD700"][index % 6], // Assigning colors
    percentage: totalWorkers > 0 ? ((branch.value / totalWorkers) * 100).toFixed(1) + "%" : "0%",
}));

  const dataSource =
    dashboardData?.branch_wise_data?.map((branch, index) => {
      const totalWorkers = branch?.workers?.length || 0
      const activeWorkers = branch?.workers?.filter((worker) => worker.status === "Active").length || 0
      const attendanceRate = totalWorkers > 0 ? ((activeWorkers / totalWorkers) * 100).toFixed(2) : "0.00"

      return {
        key: index.toString(),
        name: branch?.name || "N/A",
        workers: branch?.workers || [],
        manager: branch?.managers?.[0]?.name || "N/A",
        attendanceRate: `${attendanceRate}%`,
        workerscount: branch?.workers_count,
        managerscount: branch?.managers_count
      }
    }) || []

  const columns: ColumnsType<(typeof dataSource)[0]> = [
    {
      title: "Branches",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Workers",
      dataIndex: "workerscount",
      key: "workers",
      // render: (workers: { name: string; logo: string | null }[]) => (
      //   <div className="flex items-center">
      //     {workers.map((worker, index) => {
      //       return (
      //         <Avatar
      //           key={index}
      //           src={worker.logo ? `https://be.myweightlosscentre.co.uk/${worker?.logo}` : undefined}
      //           style={{
      //             backgroundColor: worker.logo ? "transparent" : "#4FD1C5",
      //             marginLeft: index === 0 ? 0 : "-10px", // Overlapping effect
      //             border: "2px solid white",
      //           }}
      //         >
      //           {!worker.logo && worker.name.charAt(0).toUpperCase()}
      //         </Avatar>
      //       )
      //     })}
      //   </div>
      // ),
    },
    {
      title: "Manager",
      dataIndex: "managerscount",
      key: "manager",
    },
    {
      title: "Attendance Rate",
      dataIndex: "attendanceRate",
      key: "attendanceRate",
      render: (value: string) => {
        const percentage = parseFloat(value.replace("%", ""))

        return (
          <div>
            <div className="text-[#4FD1C5] font-semibold">{value}</div>
            <Progress percent={percentage} showInfo={false} strokeColor="#4FD1C5" />
          </div>
        )
      },
    },
  ]

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 mt-4">
        <Card title="Total Branches" count={dashboardData?.total_branches || 0} Icon={FaCodeBranch} />
        <Card title="Total Managers" count={dashboardData?.total_managers || 0} Icon={GrUserManager} />
        <Card title="Total Workers" count={dashboardData?.total_workers || 0} Icon={FaUsers} />
        <Card title="Total Expense" count={dashboardData?.total_expenses || 0} Icon={FaSackDollar} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full gap-4 mt-4">
        <BranchWiseExpenseChart data={branchWiseExpenseData} />
        <BranchWiseWorkers data={formattedBranchWiseWorkerData} />
      </div>
      <div className="my-4 rounded-xl shadow-lg bg-white p-2 ">
        <h1 className="text-xl md:text-2xl font-semibold pl-3 pt-2 p-">Details</h1>

        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    </div>
  )
}

export default Page

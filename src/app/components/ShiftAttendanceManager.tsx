"use client"
import React from "react"
import { format, startOfWeek, addDays } from "date-fns"
import { Shift } from "@/services/company/types"
import { useSelector } from "react-redux"
import { RootState } from "@/services/store"

interface ScheduleComponentProps {
  selectedDate: string
  setSelectedDate: (date: string) => void
  data: Shift[]
}

type GroupedManagers = Record<
  string,
  {
    id: number
    name: string
    email: string
    address?: string
  }[]
>

const ScheduleComponent: React.FC<ScheduleComponentProps> = ({ selectedDate, setSelectedDate, data }) => {
  const { managerdata } = useSelector((state: RootState) => state.manager)
  const new_managers = managerdata?.managers_data || []

  // Grouping managers by branch
  const groupedManagers = new_managers.reduce((acc, manager) => {
    manager.branches.forEach((branch) => {
      if (!acc[branch.name]) {
        acc[branch.name] = []
      }
      acc[branch.name].push(manager)
    })
    return acc
  }, {} as GroupedManagers)

  const startOfSelectedWeek = startOfWeek(new Date(selectedDate), { weekStartsOn: 1 })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfSelectedWeek, i))

  const getShiftForManager = (managerId: number, day: Date) => {
    const shift = data.find((shift) => shift.manager_id === managerId && format(new Date(shift.date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd"))
    return shift ? `${shift.start_time} - ${shift.end_time}` : "-"
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-white">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Managers <span className="text-[#9F9EA4] ml-2 rounded-full text-sm p-1 border-2 border-[#EFEFEF]">{new_managers.length}</span>
            </th>
            {weekDays.map((day) => (
              <th key={day.toISOString()} className="border border-gray-300 px-4 py-2 text-center">
                <div className="text-xl font-bold">{format(day, "dd")}</div>
                <div className="text-sm text-gray-500">{format(day, "EEE")}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedManagers).map(([branchName, managers]) => (
            <React.Fragment key={branchName}>
              <tr className="bg-[#eefbfa] text-[#4FD1C5]">
                <td colSpan={8} className="border border-gray-300 px-4 py-2 font-semibold">
                  {branchName}
                </td>
              </tr>
              {managers.map((manager) => (
                <tr key={manager.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {manager.name} <br />
                    <span className="text-xs text-gray-500">{manager.email}</span>
                  </td>
                  {weekDays.map((day) => (
                    <td key={day.toISOString()} className="border border-gray-300 px-4 py-2 text-center">
                      {getShiftForManager(manager.id, day)}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ScheduleComponent

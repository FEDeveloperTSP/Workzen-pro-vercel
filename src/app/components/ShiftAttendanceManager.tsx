"use client"
import React from "react"
import { format, startOfWeek, addDays } from "date-fns"
import { Shift } from "@/services/company/types"
import { useSelector } from "react-redux"
import { RootState } from "@/services/store"
import { getInitialsLogo, getInitialsOrLogo } from "@/services/useFilter"

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
    address?: string,
    logo?: string
  }[]
>

const ScheduleComponent: React.FC<ScheduleComponentProps> = ({ selectedDate, setSelectedDate, data }) => {
  const { managerdata } = useSelector((state: RootState) => state.manager)
  const new_managers = managerdata?.managers_data || []

  const today = new Date();
  const isToday = (day: Date) => format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");

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
    const shift: Shift | undefined = data.find(
      (shift) => shift.manager_id === managerId && format(new Date(shift.date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
    )
    if (shift) {
      const startTime = shift.start_time ? format(new Date(`1970-01-01T${shift.start_time}`), "HH:mm") : "-"
      const endTime = shift.end_time ? format(new Date(`1970-01-01T${shift.end_time}`), "HH:mm") : "-"

      const presenceStatus = {
        present: "bg-[#53D800]",
        late: "bg-[#FFAE00]",
        absent: "bg-red-500",
      }

      const statusClass = presenceStatus[shift.presence_status] || presenceStatus.absent

      return startTime && endTime ? (
        <div className="border border-[#337E8980] rounded-sm bg-[#ebf3f4] flex items-center justify-between p-2">
          {`${startTime} - ${endTime}`}
          {day < today && <div className={`h-3 w-3 ${statusClass} rounded-full`}></div>}
        </div>
      ) : (
        "-"
      )
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-white">
            <th className="border border-gray-300 px-4 py-2 text-left ">
              Managers <span className="text-[#9F9EA4] ml-2 rounded-full text-sm p-1 border-2 border-[#EFEFEF]">{new_managers.length}</span>
            </th>
            {weekDays.map((day) => (
              <th
                key={day.toISOString()}
                className={`border border-gray-300 px-4 py-2 text-center ${isToday(day) ? "bg-[#4FD1C5] text-white" : ""
                  }`}
              >
                <span className="font-bold text-lg">{format(day, "dd")}</span> <br />
                <span className="text-sm">{format(day, "EEE")}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedManagers).map(([branchName, managers]) => (
            <React.Fragment key={branchName}>
              <tr className="bg-[#eefbfa] text-[#4FD1C5]">
                <td colSpan={8} className=" flex gap-2 items-center border border-gray-300 px-4 py-2 font-semibold">
                  <div className='h-7 w-7 bg-[#4FD1C5] text-white flex items-center justify-center rounded-xl font-bold text-sm uppercase'>
                    {getInitialsOrLogo(branchName)}
                  </div>
                  {branchName}
                </td>
              </tr>
              {managers.map((manager) => (
                <tr key={manager.id} className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 flex gap-2 items-center">
                    <div className='h-7 w-7 bg-[#4FD1C5] text-white flex items-center justify-center rounded-xl font-bold text-sm uppercase'>
                      {manager.logo ? (
                        <img src={`https://be.myweightlosscentre.co.uk/${manager.logo}`} alt="Manager Logo" className="h-full w-full object-cover rounded-xl" />
                      ) : (
                        
                          getInitialsLogo(manager.name, manager.logo ?? null) // Show initials if logo is null
                      )}
                    </div>
                    <div>
                      {manager.name} <br />
                      <span className="text-xs text-gray-500">{manager.email}</span>
                    </div>
                  </td>
                  {weekDays.map((day) => (
                    <td key={day.toISOString()} className="border border-gray-300 px-2 text-center">
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

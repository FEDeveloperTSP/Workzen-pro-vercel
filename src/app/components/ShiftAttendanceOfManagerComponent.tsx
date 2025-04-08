"use client"
import React from "react"
import { format, startOfWeek, addDays } from "date-fns"
import { useSelector } from "react-redux"
import { RootState } from "@/services/store"
import { Shift } from "@/services/company/types"
import { getInitialsLogo, getInitialsOrLogo } from "@/services/useFilter"

interface ScheduleComponentProps {
  selectedDate: string
  data: Shift[]
}

type GroupedWorkers = Record<
  string,
  {
    id: number
    name: string
    email: string
    address?: string
    branch?: string
    manager_id?: number
    logo: string
  }[]
>

const ShiftAndAttendanceOfWorkerComponent: React.FC<ScheduleComponentProps> = ({ selectedDate, data }) => {
  const workers = useSelector((state: RootState) => state.worker.workerdata)
  const new_workers = workers?.workers_data || []

  const today = new Date()
  const isToday = (day: Date) => format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")

  const groupedWorkers = new_workers.reduce((acc, worker) => {
    const branchName = worker.branch || "Unassigned"
    if (!acc[branchName]) {
      acc[branchName] = []
    }
    acc[branchName].push(worker)
    return acc
  }, {} as GroupedWorkers)

  const startOfSelectedWeek = startOfWeek(new Date(selectedDate), { weekStartsOn: 1 })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfSelectedWeek, i))

  const getShiftForWorker = (workerId: number, day: Date) => {
    const shift: Shift | undefined = data.find(
      (shift) => shift.worker_id === workerId && format(new Date(shift.date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
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

      return (
        <div className="border border-[#337E8980] rounded-sm bg-[#ebf3f4] flex items-center justify-between p-2">
          {`${startTime} - ${endTime}`}
          {day < today && <div className={`h-3 w-3 min-h-3 min-w-3 ${statusClass} rounded-full`}></div>}
        </div>
      )
    }

    return "-"
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-white">
            <th className="border border-gray-300 px-4 py-2 text-left w-[250px]">
              Workers
              <span className="text-[#9F9EA4] ml-2 rounded-full text-sm p-1 border-2 border-[#EFEFEF]">{new_workers.length}</span>
            </th>
            {weekDays.map((day) => (
              <th key={day.toISOString()} className={`border border-gray-300 px-4 py-2 text-center ${isToday(day) ? "bg-[#4FD1C5] text-white" : ""}`}>
                <span className="font-bold text-lg">{format(day, "dd")}</span> <br />
                <span className="text-sm">{format(day, "EEE")}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedWorkers).map(([branchName, workers]) => (
            <React.Fragment key={branchName}>
              <tr className="bg-[#eefbfa] text-[#4FD1C5] font-bold">
                <td colSpan={8} className="px-4 py-2 border border-gray-300 flex items-center justify-center gap-2">
                  <div className="h-7 w-7 bg-[#4FD1C5] text-white flex items-center justify-center rounded-xl font-bold text-sm uppercase">
                    {getInitialsOrLogo(branchName)}
                  </div>
                  {branchName}
                </td>
              </tr>
              {workers.map((worker) => (
                <tr key={worker.id} className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 flex gap-2 items-center">
                    <div className="h-7 w-7 bg-[#4FD1C5] text-white flex items-center justify-center rounded-xl font-bold text-sm uppercase">
                      {worker.logo ? (
                        <img src={`https://be.myweightlosscentre.co.uk/${worker.logo}`} alt="Manager Logo" className="h-full w-full object-cover rounded-xl" />
                      ) : (
                        getInitialsLogo(worker.name, worker.logo ?? null)
                      )}
                    </div>
                    <div>
                      {worker.name} <br />
                      <span className="text-xs text-gray-500">{worker.email}</span>
                    </div>
                  </td>
                  {weekDays.map((day) => (
                    <td key={day.toISOString()} className="border border-gray-300 px-2 text-center">
                      {getShiftForWorker(worker.id, day)}
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

export default ShiftAndAttendanceOfWorkerComponent

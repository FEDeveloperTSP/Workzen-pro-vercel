import { Progress } from "antd"
import React, { useMemo, useState } from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import ScheduleComponent from "./ShiftAttendanceManager"
import { useGetShifts } from "@/services/company/managers/shiftsAndAttendanceHooks"
import Loading from "./Loading"
import { Shift } from "@/services/company/types"

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const DateSelector = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedDay, setSelectedDay] = useState(new Date().getDate())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const {
    data: shifts,
    isLoading,
    error,
  } = useGetShifts(`${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`)

  const { totalHours, greenHours, redHours, orangeHours } = useMemo(() => {
    let total = 0,
      green = 0,
      red = 0,
      orange = 0
    const shiftsArray = shifts?.data || ([] as Shift[])

    const selectedDate = new Date(selectedYear, selectedMonth, selectedDay)
    const startOfWeek = new Date(selectedDate)
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 1)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)

    shiftsArray.forEach((shift: Shift) => {
      const shiftDate = new Date(shift.date)
      if (shiftDate >= startOfWeek && shiftDate <= endOfWeek) {
        const start = new Date(`1970-01-01T${shift.start_time}`)
        const end = new Date(`1970-01-01T${shift.end_time}`)
        const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60)

        total += duration
        switch (shift.attendance_report?.status) {
          case "present":
            green += duration
            break
          case "absent":
            red += duration
            break
          case "late":
            orange += duration
            break
        }
      }
    })

    return { totalHours: total, greenHours: green, redHours: red, orangeHours: orange }
  }, [shifts, selectedYear, selectedMonth, selectedDay])

  const formatDate = (day: number, monthIndex: number, year: number) => {
    return `${day} ${months[monthIndex]} ${year}`
  }

  const changeDay = (direction: "prev" | "next") => {
    const newDate = new Date(selectedYear, selectedMonth, selectedDay)
    newDate.setDate(direction === "next" ? newDate.getDate() + 7 : newDate.getDate() - 7)

    setSelectedYear(newDate.getFullYear())
    setSelectedMonth(newDate.getMonth())
    setSelectedDay(newDate.getDate())
  }

  console.log("data shifts: ", shifts)

  if (isLoading) return <Loading />
  if (error) return <p className="text-red-500">failed to fetch the shifts</p>

  return (
    <div className="p-4 overflow-x-auto w-full">
      {/* Date Navigation */}
      <div className="flex flex-wrap items-center space-x-4 my-2">
        <h1 className="font-bold text-lg">{formatDate(selectedDay, selectedMonth, selectedYear)}</h1>
        <button className="bg-white border p-2 rounded-full" onClick={() => changeDay("prev")}>
          <FaArrowLeft />
        </button>
        <button className="bg-white border p-2 rounded-full" onClick={() => changeDay("next")}>
          <FaArrowRight />
        </button>
      </div>

      {/* Month Selector */}
      <div className="border min-w-fit">
        <div className="flex space-x-2 mt-2 mb-4 border-b-2 ">
          {months.map((month, index) => (
            <React.Fragment key={month}>
              <button
                className={`px-1 py-1 font-semibold text-sm ${selectedMonth === index ? "bg-white text-black rounded-lg shadow-xl" : "text-[#C4C4C4]"}`}
                onClick={() => setSelectedMonth(index)}
              >
                {month}
              </button>
              {index !== months.length - 1 && <span className="text-[#C4C4C4]">|</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Hours Dashboard */}
        <div className="flex gap-4">
          <div className="text-[#6C6C6C] font-semibold text-md px-4 py-3 flex flex-col gap-4 w-1/6">
            Total working hours per week
            <div className="flex gap-4">
              <Progress strokeColor={"#4FD1C5"} percent={totalHours ? (totalHours / 40) * 100 : 0} showInfo={false} />
              {totalHours.toFixed(1)}h
            </div>
          </div>
          <div className="h-16 border-l "></div>
          <div className="text-[#6C6C6C] font-semibold text-md px-4 py-3 flex flex-col gap-4 w-4/6">
            Employee working time dashboard
            <div className="flex gap-4">
              <Progress
                strokeColor={["#53D800", "#EC1717", "#FFAE00"]}
                success={{ percent: (greenHours / totalHours) * 100 || 0 }}
                percent={((orangeHours + redHours) / totalHours) * 100 || 0}
                showInfo={false}
                className="w-full"
              />
              {totalHours.toFixed(1)}h
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-8 px-6">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span className="font-semibold text-black">PRESENT</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="font-semibold text-black">ABSENT</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="font-semibold text-black">LATE</span>
        </div>
      </div>

      <ScheduleComponent
        selectedDate={`${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`}
        setSelectedDate={(newDate: string) => {
          const date = new Date(newDate)
          setSelectedDay(date.getDate())
          setSelectedMonth(date.getMonth())
          setSelectedYear(date.getFullYear())
        }}
        data={shifts?.data || []}
      />
    </div>
  )
}

export default DateSelector

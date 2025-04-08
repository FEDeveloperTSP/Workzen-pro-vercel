"use client"

import { usePostChangeShiftTime } from "@/services/company/managers/shiftsAndAttendanceHooks"
import { useState } from "react"
import toast from "react-hot-toast"

// Define types
interface Shift {
  id: number
  date: string // YYYY-MM-DD
  start_time: string // HH:mm:ss
  end_time: string // HH:mm:ss
  unique_shift_id: string
  shift_time_changes: string // Indicates if the shift time was changed
}

interface SelectedTimeRange {
  start: string
  end: string
}

interface IncomingRequestsProps {
  incomingReqData: Shift[]
}

export default function IncomingRequests({
  incomingReqData,
}: IncomingRequestsProps) {
  const [selectedTimes, setSelectedTimes] = useState<
    Record<number, SelectedTimeRange>
  >({})
  const [dragging, setDragging] = useState<boolean>(false)
  const [currentColumn, setCurrentColumn] = useState<number | null>(null)

  const { mutate: postShiftTime, isLoading, error } = usePostChangeShiftTime()

  const uniqueShiftId = incomingReqData[0]?.unique_shift_id

  const handleMouseDown = (
    columnIndex: number,
    time: string,
    isDisabled: boolean
  ) => {
    if (isDisabled) return

    setDragging(true)
    setCurrentColumn(columnIndex)

    setSelectedTimes((prev) => {
      const existingRange = prev[columnIndex]

      if (existingRange) {
        // If the clicked time is the **ONLY** selected grid, remove it
        if (
          existingRange.start === existingRange.end &&
          existingRange.start === time
        ) {
          const updatedSelection = { ...prev }
          delete updatedSelection[columnIndex] // Remove the last remaining grid
          return updatedSelection
        }

        // If the clicked time is within the selected range
        if (time >= existingRange.start && time <= existingRange.end) {
          return {
            ...prev,
            [columnIndex]: { start: existingRange.start, end: time }, // Keep clicked grid, remove below
          }
        }

        // Extend selection if clicked outside range
        const newStart = time < existingRange.start ? time : existingRange.start
        const newEnd = time > existingRange.end ? time : existingRange.end
        return { ...prev, [columnIndex]: { start: newStart, end: newEnd } }
      } else {
        // New selection if no prior selection exists
        return { ...prev, [columnIndex]: { start: time, end: time } }
      }
    })
  }

  const handleMouseEnter = (
    columnIndex: number,
    time: string,
    isDisabled: boolean
  ) => {
    if (dragging && columnIndex === currentColumn && !isDisabled) {
      setSelectedTimes((prev) => {
        if (!prev[columnIndex]) return prev
        const { start, end } = prev[columnIndex]

        if (time >= start && time <= end) {
          return prev
        }

        if (
          time === start ||
          time === end ||
          time === getNextTime(end) ||
          time === getPrevTime(start)
        ) {
          return {
            ...prev,
            [columnIndex]: {
              start: time < start ? time : start,
              end: time > end ? time : end,
            },
          }
        }

        return prev
      })
    }
  }

  const handleMouseUp = () => {
    setDragging(false)
    setCurrentColumn(null)
  }

  const handleSubmit = () => {
    const payload: Record<string, string | number> = {
      unique_shift_id: uniqueShiftId,
    }

    Object.entries(selectedTimes).forEach(([columnIndex, range]) => {
      payload[`start_time[${columnIndex}]`] = range.start
      payload[`end_time[${columnIndex}]`] = range.end
    })

    postShiftTime(payload, {
      onSuccess: (response) => {
        toast.success("Shift changed successfully!")
        console.log("Shift change successful:", response)
      },
    })

    console.log("Submitting Payload:", payload)
  }

  const getNextTime = (time: string) => {
    const [hour] = time.split(":").map(Number)
    return `${String(hour + 1).padStart(2, "0")}:00`
  }

  const getPrevTime = (time: string) => {
    const [hour] = time.split(":").map(Number)
    return `${String(hour - 1).padStart(2, "0")}:00`
  }

  if (error) {
    return <>error</>
  }

  return (
    <div onMouseUp={handleMouseUp} className=' min-h-screen'>
      <div className='grid grid-cols-[0.5fr_repeat(7,1fr)] border border-gray-300'>
        <div className='border-r border-gray-300 p-2 text-center bg-gray-100 text-[#7A7C7E] text-[12px]'>
          EST GMT -5
        </div>

        {incomingReqData.map((shift) => (
          <div
            key={shift.date}
            className='border-r border-gray-100 p-2 text-center bg-white font-semibold'
          >
            <span className='text-[18px]'>
              {new Date(shift.date).getDate()}
            </span>
            <br />
            <span className='text-[#9D9CA3] text-[12px]'>
              {new Date(shift.date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </span>
          </div>
        ))}

        {Array.from({ length: 24 }).map((_, hourIndex) => {
          const time24 = `${String(hourIndex).padStart(2, "0")}:00`

          return (
            <div key={`hour-${hourIndex}`} className='contents'>
              <div className='p-2 text-[#7A7C7E] text-[12px] font-semibold bg-white'>
                {new Date(`2000-01-01T${time24}`).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>

              {incomingReqData.map((shift, columnIndex) => {
                const shiftStart = shift.start_time.slice(0, 5)
                const shiftEnd = shift.end_time.slice(0, 5)
                const isWithinRange = time24 >= shiftStart && time24 <= shiftEnd
                const isSelected =
                  selectedTimes[columnIndex] &&
                  time24 >= selectedTimes[columnIndex].start &&
                  time24 <= selectedTimes[columnIndex].end

                const isDisabled = false
                // shift.shift_time_changes === "changed" && isWithinRange;

                return (
                  <button
                    key={`${shift.date}-${hourIndex}`}
                    className={`relative border h-[40px] min-h-[40px] cursor-pointer flex items-center justify-center
                    ${
                      isWithinRange
                        ? isSelected
                          ? "bg-[#eefbfa] border-l-4 border-[#56d2c5]" // Selected: Blue/Teal
                          : "bg-[#fff7e7] border-l-4 border-[#f39d27]" // Unselected but within range: Orange/Yellow
                        : "bg-gray-50" // Outside selectable range: Default gray
                    }
                    ${isDisabled ? "bg-gray-300 cursor-not-allowed opacity-50" : ""}`}
                    onMouseDown={() =>
                      !isDisabled &&
                      handleMouseDown(columnIndex, time24, isDisabled)
                    }
                    onMouseEnter={() =>
                      !isDisabled &&
                      handleMouseEnter(columnIndex, time24, isDisabled)
                    }
                  >
                    {isDisabled && (
                      <span className='text-[10px] text-gray-700'>
                        Already Selected
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || Object.keys(selectedTimes).length === 0}
        className={`mt-4 px-4 py-2 rounded text-white font-semibold transition-all
        ${
          Object.keys(selectedTimes).length > 0
            ? "bg-[#36B5B0]"
            : "bg-[#FFA726]"
        }
        disabled:opacity-50`}
      >
        {isLoading
          ? "Submitting..."
          : Object.keys(selectedTimes).length > 0
          ? "Selected"
          : "Select Time"}
      </button>
    </div>
  )
}

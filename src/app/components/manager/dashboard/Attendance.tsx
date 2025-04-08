"use client"
import { useState } from "react"

const generateCalendarData = () => {
  const weekData = []

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + i)

    const dateStr = currentDate.toISOString().split("T")[0] // YYYY-MM-DD
    const dayName = currentDate.toLocaleDateString("en-US", { weekday: "short" }) // Mon, Tue...

    weekData.push({
      date: dateStr,
      day: dayName,
    })
  }

  return weekData
}

const CalendarUI = () => {
  const [weekData] = useState(generateCalendarData())
  const [events, setEvents] = useState<{ date: string; time: string; type: string }[]>([])

  const handleSlotClick = (date: string, time: string) => {
    const eventType = prompt("Enter event type (Check-in or Check-out):")

    if (!eventType || !["Check-in", "Check-out"].includes(eventType)) {
      alert("Invalid event type! Please enter 'Check-in' or 'Check-out'.")
      return
    }

    // Check if event already exists at the same slot
    if (events.some((event) => event.date === date && event.time === time)) {
      alert("An event already exists at this time slot!")
      return
    }

    // Prevent Check-out if no Check-in exists on the same day
    if (eventType === "Check-out" && !events.some((event) => event.date === date && event.type === "Check-in")) {
      alert("A Check-out cannot be added without a Check-in on the same day!")
      return
    }

    // Add the event to state
    setEvents([...events, { date, time, type: eventType }])
  }

  return (
    <div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-[0.5fr_repeat(7,1fr)] border border-gray-300">
        {/* Top Row (Days & Dates) */}
        <div className="border-r border-gray-300 p-2 text-center bg-gray-100 text-[#7A7C7E] text-[12px]">EST GMT -5</div>
        {weekData.map((day) => (
          <div key={day.date} className="border-r border-gray-100 p-2 text-center bg-white font-semibold">
            <span className="text-[18px]">{day.date.split("-")[2]}</span> <br />
            <span className="text-[#9D9CA3] text-[12px]">{day.day}</span>
          </div>
        ))}

        {/* Main Grid */}
        {Array.from({ length: 24 }).map((_, hourIndex) => {
          const time24 = `${String(hourIndex).padStart(2, "0")}:00`
          const time12 = new Date(`2000-01-01T${time24}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })

          return (
            <div key={`hour-${hourIndex}`} className="contents">
              {/* Left Column (Hours) */}
              <div className="p-2 text-[#7A7C7E] text-[12px] font-semibold bg-white">{time12}</div>

              {/* Hourly Slots for Each Day */}
              {weekData.map((day) => {
                const event = events.find((e) => e.date === day.date && e.time === time24)

                return (
                  <div key={`${day.date}-${hourIndex}`} className="border border-gray-300 cursor-pointer h-[96px] min-h-[96px] overflow-hidden" onClick={() => handleSlotClick(day.date, time24)}>
                    {event && (
                      <div className="border-l-2 border-[#0EA5E9] bg-[#0EA5E91A] p-2">
                        <div className="text-[#0369A1] font-medium flex items-center gap-2">
                          {time12}
                          {event.type === "Check-in" && <span className="w-2 h-2 bg-[#0369A1] rounded-full"></span>}
                        </div>
                        <div
                          className={`px-8 py-2  text-center rounded-lg mt-4 font-semibold ${
                            event.type === "Check-in" ? "bg-[#45AE03] text-white" : "bg-white text-black"
                          }`}
                        >
                          {event.type}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Attendance = () => {
  return (
    <div>
      <CalendarUI />
    </div>
  )
}

export default Attendance

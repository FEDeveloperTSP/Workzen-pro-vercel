import { Progress } from "antd";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ScheduleComponent from "./ShiftAttendanceManager";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const DateSelector = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedDay, setSelectedDay] = useState(new Date().getDate());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // Format date as "3 March 2025"
    const formatDate = (day: number, monthIndex: number, year: number) => {
        return `${day} ${months[monthIndex]} ${year}`;
    };

    // Function to update day when clicking arrows
    const changeDay = (direction: "prev" | "next") => {
        const newDate = new Date(selectedYear, selectedMonth, selectedDay);
        newDate.setDate(direction === "next" ? newDate.getDate() + 7 : newDate.getDate() - 7);
        setSelectedDay(newDate.getDate());
        setSelectedMonth(newDate.getMonth());
        setSelectedYear(newDate.getFullYear());
    };
    const totalHours = 2446;
    const greenHours = 1500;
    const redHours = 600;
    const orangeHours = 346;
    return (
        <div className="p-4">
            {/* Month Selector */}


            {/* Date Display and Navigation */}
            <div className="flex space-x-4">

                <h1 className="font-bold text-lg">{formatDate(selectedDay, selectedMonth, selectedYear)}</h1>
                <button className="bg-white border p-2 rounded-full" onClick={() => changeDay("prev")}>
                    <FaArrowLeft />
                </button>
                <button className="bg-white border p-2 rounded-full" onClick={() => changeDay("next")}>
                    <FaArrowRight />
                </button>
            </div>
            <div className="border">
                <div className="flex space-x-2 mt-2 mb-4 border-b-2">
                    {months.map((month, index) => (
                        <React.Fragment key={month}>
                            <button
                                className={`px-6 py-1 font-semibold text-sm ${selectedMonth === index ? "bg-white text-black rounded-lg shadow-xl" : "text-[#C4C4C4]"
                                    }`}
                                onClick={() => setSelectedMonth(index)}
                            >
                                {month}
                            </button>
                            {index !== months.length - 1 && <span className="text-[#C4C4C4]">|</span>}
                        </React.Fragment>
                    ))}
                </div>
                <div >
                    <div className="flex gap-4">
                        <div className="text-[#6C6C6C] font-semibold text-md px-4 py-3 flex flex-col gap-4 w-1/6">
                            Total working hours per week

                            <div className="flex gap-4"><Progress strokeColor={"#4FD1C5"} percent={50} showInfo={false} /> 555h</div>
                        </div>
                        <div className="h-16 border-l "></div>
                        <div className="text-[#6C6C6C] font-semibold text-md px-4 py-3 flex flex-col gap-4 w-4/6">
                            Employee working time dashboard
                            <div className="flex gap-4">
                                <Progress
                                    strokeColor={["#53D800", "EC1717", "#FFAE00"]} // Green, Red, Orange
                                    success={{ percent: (greenHours / totalHours) * 100 }} // Green portion
                                    percent={((orangeHours + redHours) / totalHours) * 100} // Green + Red
                                    showInfo={false}
                                    className="w-full"
                                />
                                555h</div>
                        </div>
                    </div>
                </div>
            </div>

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
                    const date = new Date(newDate);
                    setSelectedDay(date.getDate());
                    setSelectedMonth(date.getMonth());
                    setSelectedYear(date.getFullYear());
                }}
            />

        </div>
    );
};

export default DateSelector;

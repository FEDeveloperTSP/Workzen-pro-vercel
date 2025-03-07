"use client"
import React, { useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";

const managers = [
    {
        branch: "GULBERG BRANCH",
        employees: [
            { id: 1, name: "Maryam", username: "@001", avatar: "/maryam.jpg" },
            { id: 2, name: "Junaid", username: "@002", avatar: "/junaid.jpg" },
        ],
    },
    {
        branch: "UK BRANCH",
        employees: [
            { id: 3, name: "Maryam", username: "@001", avatar: "/maryam.jpg" },
            { id: 4, name: "Junaid", username: "@002", avatar: "/junaid.jpg" },
        ],
    },
];

const shifts = [
    { id: 1, employeeId: 1, date: "2025-03-08", status: "present", time: "8:00 - 16:00" },
    { id: 2, employeeId: 3, date: "2025-03-08", status: "present", time: "8:00 - 16:00" },
    { id: 3, employeeId: 4, date: "2025-03-11", status: "absent", time: "8:00 - 16:00" },
    { id: 4, employeeId: 2, date: "2025-03-12", status: "present", time: "8:00 - 16:00" },
];
interface ScheduleComponentProps {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
}
const ScheduleComponent: React.FC<ScheduleComponentProps> = ({ selectedDate, setSelectedDate }) => {
    const getShiftForEmployee = (employeeId: number, date: string) => {
        return shifts.find((shift) => shift.employeeId === employeeId && shift.date === date);
    };

    const startOfSelectedWeek = startOfWeek(new Date(selectedDate), { weekStartsOn: 0 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfSelectedWeek, i));

    return (
        <div className="flex">
            {/* Sidebar - Managers */}
            <div className="min-w-[250px] bg-white">
                <div className="px-4 py-2 border">
                    <h2 className="text-lg font-bold mb-2">
                        Managers
                        <span className="text-[#9F9EA4] ml-2 rounded-full text-sm p-1 border-2 border-[#EFEFEF]">20</span>
                    </h2>
                </div>
                {managers.map((branch) => (
                    <div key={branch.branch}>
                        {/* Branch Header - Extends Below the Table */}
                        <div className="flex bg-[#4FD1C51A] px-4 py-1 gap-2 border sticky top-0 z-10">
                            <input type="checkbox" disabled className="bg-white" />
                            <h3 className="text-[#4FD1C5] font-semibold">{branch.branch}</h3>
                        </div>
                        {branch.employees.map((emp) => (
                            <div key={emp.id} className="flex items-center px-4 py-1 gap-2 mb-2">
                                <input type="checkbox" disabled />
                                <div>
                                    <p className="font-semibold">{emp.name}</p>
                                    <p className="text-gray-500 text-sm">{emp.username}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Main Table */}
            <div className="flex-1 border">
                {/* Table Header */}
                <div className="grid grid-cols-7 border-b border-r divide-x sticky top-0 bg-white z-10">
                    {weekDays.map((date, index) => (
                        <div
                            key={index}
                            className={`p-2 text-center border-r cursor-pointer ${format(date, "yyyy-MM-dd") === selectedDate ? "bg-teal-300 rounded-lg" : ""}`}
                            onClick={() => setSelectedDate(format(date, "yyyy-MM-dd"))}
                        >
                            <p className="text-gray-700">{format(date, "d")}</p>
                            <p className="text-sm text-gray-500">{format(date, "E")}</p>
                        </div>
                    ))}
                </div>

                {/* Employee Schedule Table */}
                <div className="grid grid-cols-7 divide-x border-t">
                    {weekDays.map((date, index) => (
                        <div key={index} className="border-r">
                            {managers.map((branch) =>
                                branch.employees.map((emp) => {
                                    const shift = getShiftForEmployee(emp.id, format(date, "yyyy-MM-dd"));
                                    return (
                                        <div key={emp.id} className="p-4 h-20 border-b">
                                            {shift ? (
                                                <div className="border rounded-md p-2 flex items-center gap-2 text-sm bg-gray-100">
                                                    <p className="font-semibold">Full day</p>
                                                    <p className="text-gray-500">{shift.time}</p>
                                                    <span className={`w-3 h-3 rounded-full ${shift.status === "present" ? "bg-green-500" : "bg-red-500"}`}></span>
                                                </div>
                                            ) : null}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default ScheduleComponent;
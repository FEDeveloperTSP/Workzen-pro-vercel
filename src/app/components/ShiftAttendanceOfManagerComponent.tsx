"use client"
import React from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { Shift } from "@/services/company/types";
import { useSelector } from "react-redux";
import { RootState } from "@/services/store";

interface ScheduleComponentProps {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    data: Shift[];
}

type GroupedManagers = Record<
    string, // Branch Name
    {
        id: number;
        name: string;
        email: string;
        address?: string;
    }[]
>;

const ShiftAttendanceOfManagerComponent: React.FC<ScheduleComponentProps> = ({ selectedDate, setSelectedDate, data }) => {
    const { managerdata } = useSelector((state: RootState) => state.manager);
    const new_managers = managerdata?.managers_data || [];

    // **Group managers by branch**
    const groupedManagers = new_managers.reduce((acc, manager) => {
        manager.branches.forEach((branch) => {
            if (!acc[branch.name]) {
                acc[branch.name] = [];
            }
            acc[branch.name].push(manager);
        });
        return acc;
    }, {} as GroupedManagers);

    // **Extract Unique User IDs from Shifts**
    const uniqueUserIds = Array.from(new Set(data.map((shift) => shift.user_id)));

    // **Create a Map for Quick Shift Lookups**
    const shiftsMap = data.reduce((acc, shift) => {
        const key = `${shift.user_id}-${shift.date}`;
        acc[key] = shift;
        return acc;
    }, {} as Record<string, Shift>);

    const startOfSelectedWeek = startOfWeek(new Date(selectedDate), { weekStartsOn: 0 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfSelectedWeek, i));

    return (
        <div className="flex">
            {/* Sidebar - Managers */}
            <div className="min-w-[250px] bg-white">
                <div className="px-4 py-2 border">
                    <h2 className="text-lg font-bold mb-2">
                        Managers
                        <span className="text-[#9F9EA4] ml-2 rounded-full text-sm p-1 border-2 border-[#EFEFEF]">
                            {new_managers.length}
                        </span>
                    </h2>
                </div>
                {Object.entries(groupedManagers).map(([branchName, managers]) => (
                    <div key={branchName}>
                        <div className="flex bg-[#4FD1C51A] px-4 py-1 gap-2 border sticky top-0 z-10">
                            <input type="checkbox" disabled className="bg-white" />
                            <h3 className="text-[#4FD1C5] font-semibold">{managers[0].address}</h3>
                        </div>
                        {managers.map((manager) => (
                            <div key={manager.id} className="flex items-center px-4 py-1 gap-2 mb-2">
                                <input type="checkbox" disabled />
                                <div>
                                    <p className="font-semibold">{manager.name}</p>
                                    <p className="text-gray-500 text-sm">{manager.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Main Table */}
            <div className="flex-1 border">
                {/* Header - Dates */}
                <div className="grid grid-cols-7 border-b border-r divide-x sticky top-0 bg-white z-10">
                    {weekDays.map((date, index) => (
                        <div
                            key={index}
                            className={`p-2 text-center border-r cursor-pointer ${
                                format(date, "yyyy-MM-dd") === selectedDate ? "bg-teal-300 rounded-lg" : ""
                            }`}
                            onClick={() => setSelectedDate(format(date, "yyyy-MM-dd"))}
                        >
                            <p className="text-gray-700">{format(date, "d")}</p>
                            <p className="text-sm text-gray-500">{format(date, "E")}</p>
                        </div>
                    ))}
                </div>

                {/* Body - Shifts */}
                <div className="grid grid-cols-7 divide-x border-t min-w-40">
                    {weekDays.map((date, index) => (
                        <div key={index} className="border-r">
                            {/* Display managers if available, otherwise display shifts independently */}
                            {uniqueUserIds.map((userId) => {
                                const manager = new_managers.find((m) => m.id === userId);
                                return (
                                    <div key={userId} className="p-4 h-20 border-b">
                                        {shiftsMap[`${userId}-${format(date, "yyyy-MM-dd")}`] ? (
                                            <div className="border rounded-md p-2 flex items-center gap-2 text-sm bg-gray-100">
                                                <p className="text-gray-500">
                                                    {shiftsMap[`${userId}-${format(date, "yyyy-MM-dd")}`].start_time} -{" "}
                                                    {shiftsMap[`${userId}-${format(date, "yyyy-MM-dd")}`].end_time}
                                                </p>
                                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShiftAttendanceOfManagerComponent;

"use client";
import { useState } from "react";
// import Workers from ""; // Import your components
// import ShiftsAttendance from "./ShiftsAttendance";
// import AvailabilityRequest from "./AvailabilityRequest";
import TableComponent from '@/app/components/TableManager';
import AvailibiltyRequest from "./AvailibiltyRequest";
import ShiftAttendance from "./ShiftAttendance";
import { ManagerData } from "@/services/manager/Type";




const NavbarManager = ({ data }: { data: ManagerData }) => {
    const [activeTab, setActiveTab] = useState("Managers");
    const tabs = [
        { name: "Managers", component: < TableComponent data={data} /> },
        { name: "Shifts & Attendance", component: <ShiftAttendance /> },
        { name: "Availability Request", component: <AvailibiltyRequest /> },
    ];

    console.log("managers data: ", data)

    return (
        <div className="w-full overflow-x-auto">
            {/* Tabs Navigation */}
            <div className="flex bg-[#fbfbfb] border-b">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`px-4 py-2 text-gray-500 text-sm hover:text-gray-800 focus:text-black transition-all
                ${activeTab === tab.name ? "font-semibold text-sm bg-white shadow rounded-md text-black" : ""}
                `}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* Render Active Tab Component */}
            <div className="p-4">
                {tabs.find((tab) => tab.name === activeTab)?.component}
            </div>
        </div>
    );
};

export default NavbarManager;

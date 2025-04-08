"use client";
import { useState } from "react";
// import Workers from ""; // Import your components
// import ShiftsAttendance from "./ShiftsAttendance";
// import AvailabilityRequest from "./AvailabilityRequest";
import TableComponent from '@/app/components/TableManager';
// import AvailibiltyRequest from "./AvailibiltyRequest";
// import ShiftAttendance from "./ShiftAttendance";
import { ManagerData } from "@/services/manager/Type";
import WorkerTableM from "./WorkerTable";
import { WorkerData } from "@/services/worker/type";
import ShiftAttendance from "../../ShiftAttendance";
import AvailibiltyReqWorker from "./AvailibiltyReqWorker";
import ShiftAttendanceOfManager from "../../ShiftAttendanceOfManager";



const NavbarWorker = ({ data }: { data: WorkerData }) => {
    const [activeTab, setActiveTab] = useState("Workers");
    const tabs = [
        { name: "Workers", component: <WorkerTableM data={data} /> },
        { name: "Shifts & Attendance", component: <ShiftAttendanceOfManager /> },
        { name: "Availability Request", component: <AvailibiltyReqWorker /> },
    ];
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

export default NavbarWorker;

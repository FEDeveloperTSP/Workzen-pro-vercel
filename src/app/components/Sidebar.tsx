'use client';
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes, FaHome, FaCodeBranch, FaUsersCog, FaBusinessTime } from "react-icons/fa";
import { FaUsersViewfinder } from "react-icons/fa6";
import { TbTimeDuration30 } from "react-icons/tb";
// import Logo from "../../../public/logo.png"; // Adjust the path as needed
import { FaFileContract } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { HiMiniDocumentText } from "react-icons/hi2";
import axios from "@/services/axiosService";
import { useQuery } from "react-query";
import { apiRoutes } from "@/services/apiRoutes";
import { useDispatch } from "react-redux";
import { setUser } from "@/services/auth/authSlice";
import Cookies from 'js-cookie'
import WorkzenLogo from '@/assets/workzen logo.svg'
import { Typography } from "antd";

const { Paragraph } = Typography;

type Role = "manager" | "company";

type MenuItem = {
    icon: React.ElementType;
    label: string;
    path: string;
};

// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// const getRoleFromCookies = (req:NextResponse) => {
//     const roleCookie = req.cookies.get("role")?.value;
//     return roleCookie ? roleCookie : "worker"; // Default to 'worker' if not found
// };
// const menuItems = {
//     company: [
//         { icon: FaHome, label: "Dashboard", path: "/company/dashboard" },
//         { icon: FaCodeBranch, label: "Branches", path: "/company/branch" },
//         { icon: FaUsersViewfinder, label: "Managers", path: "/company/manager" },
//         { icon: FaUsersCog, label: "Workers", path: "/company/worker" },
//         { icon: BiSolidReport, label: "Reports", path: "/company/report" },
//         { icon: FaFileContract, label: "Contracts", path: "/company/contract" },
//         { icon: MdOutlinePayments, label: "Payroll", path: "/company/payroll" },
//         { icon: HiMiniDocumentText, label: "Documents", path: "/company/documents" }
//     ],
//     manager: [
//         { icon: FaHome, label: "Dashboard", path: "/manager/dashboard" },
//         { icon: FaCodeBranch, label: "Branches", path: "/manager/branch" },
//         { icon: FaUsersCog, label: "Workers", path: "/manager/worker" },
//         { icon: BiSolidReport, label: "Reports", path: "/manager/report" }
//     ],
//     worker: [
//         { icon: FaHome, label: "Dashboard", path: "/worker/dashboard" },
//         { icon: HiMiniDocumentText, label: "Shifts & Availability", path: "/worker/shifts" },
//         { icon: BiSolidReport, label: "Reports", path: "/worker/report" }
//     ]
// };
const Sidebar = () => {

    // const role = getRoleFromCookies();
    // const filteredMenu = menuItems[role] || menuItems["worker"]; // Default fallback
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const dispatch = useDispatch();
    let role = (Cookies.get("role") as Role);



    const managerMenuItems: MenuItem[] = [
        { icon: FaHome, label: "Dashboard", path: "/manager/dashboard" },
        { icon: FaCodeBranch, label: "Branches", path: "/manager/branch" },
        { icon: FaUsersCog, label: "Workers", path: "/manager/worker" },
        { icon: BiSolidReport, label: "Reports", path: "/manager/report" },
        { icon: HiMiniDocumentText, label: "Documents", path: '/manager/documents' }

    ]

    const companyMenuItems: MenuItem[] = [
        { icon: FaHome, label: "Dashboard", path: "/company/dashboard" },
        { icon: FaCodeBranch, label: "Branches", path: "/company/branch" },
        { icon: FaUsersViewfinder, label: "Managers", path: "/company/manager" },
        { icon: FaUsersCog, label: "Workers", path: "/company/worker" },
        { icon: BiSolidReport, label: "Reports", path: "/company/report" },
        { icon: FaFileContract, label: "Contracts", path: "/company/contract" },
        { icon: MdOutlinePayments, label: "Payroll", path: "/company/payroll" },
        { icon: HiMiniDocumentText, label: "Documents", path:'/company/documents'}
    ];

    const workerMenuItems: MenuItem[] = [
        { icon: FaHome, label: "Dashboard", path: "/worker/dashboard" },
        { icon: FaUsersCog, label: "Shifts & Availability", path: "/worker/shiftandavailability" },
        { icon: BiSolidReport, label: "Reports", path: "/worker/report" },
    ];

    const getMenuItems = {
        'company': companyMenuItems,
        'manager': managerMenuItems,
        'worker': workerMenuItems
    }

    const menuItems = getMenuItems[role]

    const fetchData = async () => {
        const response = await axios.get(apiRoutes.auth.getUserData);
        return response.data
    }
    const { isLoading, isError, data, error } = useQuery('todos', fetchData, {
        onSuccess: (data) => {
            dispatch(setUser(data.data))
        },
        onError: (error) => {
            console.error("Error fetching user data:", error);
        },
    })
    const logo = `https://be.myweightlosscentre.co.uk/${data?.data.logo}`

    return (
        <>
            {/* Hamburger Button (Only Visible on Mobile) */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full shadow"
                onClick={() => setIsOpen(true)}
            >
                <FaBars className="w-6 h-6 text-gray-700" />
            </button>

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-[#F8F9FA] p-5 z-40 shadow-lg transition-transform duration-300 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                md:relative md:translate-x-0 md:flex md:flex-col w-70 overflow-y-auto scrollbar-hide `}
            >
                {/* Close Button (Only in Mobile View) */}
                <button
                    className="md:hidden absolute top-4 right-4 p-2 bg-gray-200 rounded-full"
                    onClick={() => setIsOpen(false)}
                >
                    <FaTimes className="w-6 h-6 text-gray-700" />
                </button>

                    <Image
                        src={WorkzenLogo.src}
                        alt="Company Logo"
                        width={120}
                        height={80}
                        className=""
                    />
                    <div className="flex gap-2 font-bold text-xl font-poppins pt-6 items-center">
                        {data?.data.logo ? (
                            <Image
                                src={logo}
                                alt="Company Logo"
                                width={24}
                                height={24}
                                className="rounded-full border border-gray-300 w-[24px] h-[24px]"
                            />
                        ) : (
                            <div className="w-[24px] h-[24px] flex items-center justify-center bg-gray-200 rounded-full">
                                {/* <span className="text-gray-500">No Logo</span> */}
                            </div>
                        )}

                        <div className="text-[#2D3748]">{data?.data.company_name || 'Loading...'}</div>
                    </div>
                <hr className="text-[#E0E1E2] mt-8" />

                <ul className="flex-1 overflow-y-auto scrollbar-hide">
                    {menuItems?.map(({ icon: Icon, label, path }, index) => (
                        <li key={index} onClick={() => setIsOpen(false)}>
                            <Link href={path} className={`group flex w-[90%] items-center mb-3 gap-3 p-3 rounded-3xl mt-1 transition-all 
                                ${pathname === path ? "bg-white text-black" : "text-[#A0AEC0] hover:bg-white hover:text-black"}`}
                            >
                                <div
                                    className={`p-2 rounded-xl group-hover:bg-[#4FD1C5] transition-all 
                                    ${pathname === path ? "bg-[#4FD1C5] text-white" : "bg-[#fff]"}`}
                                >
                                    <Icon className={`w-4 h-4 group-hover:text-white 
                                        ${pathname === path ? " text-white" : "text-[#4FD1C5]"}`}
                                    />
                                </div>
                                <span className="pt-1 font-bold text-sm">{label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Overlay (Only Visible When Sidebar is Open) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;

'use client';
import { useState } from "react";
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
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname(); // Get current route

    const menuItems = [
        { icon: FaHome, label: "Dashboard", path: "/company/dashboard" },
        { icon: FaCodeBranch, label: "Branches", path: "/company/branch" },
        { icon: FaUsersViewfinder, label: "Managers", path: "/company/manager" },
        { icon: FaUsersCog, label: "Workers", path: "/company/worker" },
        { icon: BiSolidReport, label: "Reports", path: "/company/report" },
        { icon: FaFileContract, label: "Contracts", path: "/company/contract" },
        { icon: MdOutlinePayments, label: "Payroll", path: "/company/payroll" },
        { icon: HiMiniDocumentText, label: "Documents", path:'/company/documents'}
    ];
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

                <h1 className="font-bold text-xl font-poppins mt-10 md:m-0">LOGO</h1>
                <div className="flex gap-4 font-bold text-xl font-poppins pt-6">
                    <h1 className="text-[#2D3748]">Tech Solutions Pro</h1>
                </div>
                <hr className="text-[#E0E1E2] mt-8" />

                <ul className="flex-1 overflow-y-auto scrollbar-hide">
                    {menuItems.map(({ icon: Icon, label, path }, index) => (
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

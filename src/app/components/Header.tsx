"use client";
import Link from "next/link";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { HiUser } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";

const UserDropdown = () => {
    return (
        <div className="flex gap-3 justify-end">
            <div className="flex gap-4 items-center">
                <IoMdNotifications className="text-[#718096] cursor-pointer" />
                <Menu as="div" className="relative inline-block text-left">
                    <MenuButton className="flex items-center space-x-1 text-[#718096] text-sm font-medium focus:outline-none">
                        <HiUser className="text-[#718096]" />
                        <p>Sign</p>
                        <IoIosArrowDown />
                    </MenuButton>

                    {/* Dropdown Menu */}
                    <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 focus:outline-none">
                        {/* Company Profile */}
                        <MenuItem as={Link} href="/company-profile">
                            <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                                <FaBuilding className="mr-2 text-blue-500" />
                                Tech Solutions Pro
                            </div>
                        </MenuItem>

                        {/* Profile Settings */}
                        <MenuItem as={Link} href="/company/profile">
                            <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                                <MdSettings className="mr-2 text-teal-500" />
                                Profile Settings
                            </div>
                        </MenuItem>

                        {/* Logout */}
                        <MenuItem as={Link} href="/logout">
                            <div className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100">
                                <FaSignOutAlt className="mr-2 text-red-500" />
                                Log Out
                            </div>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    );
};

export default UserDropdown;

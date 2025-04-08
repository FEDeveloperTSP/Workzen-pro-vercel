"use client";
import Link from "next/link";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { HiUser } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { RootState } from "@/services/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation'
import { logout } from "@/services/auth/authSlice";
import { getInitialsLogo, getInitialsOrLogo } from "@/services/useFilter";

const UserDropdown = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const user = useSelector((state: RootState) => state.auth.user);
    const role = localStorage.getItem("role");
    const profilePath = role === "company"
        ? "/company/profile"
        : role === "manager"
            ? "/manager/profile"
            : role === "worker"
                ? "/worker/profile"
                : "/profile";



    const handleLogout = () => {
        dispatch(logout())
        router.replace('/login')
    }

    return (
        <div className="relative flex gap-3 justify-end">
            <div className="flex gap-4 items-center">
                {/* <IoMdNotifications className="text-[#718096] cursor-pointer" /> */}
                <Menu as="div" className="relative">
                    <MenuButton className="flex items-center space-x-1 text-[#718096] text-sm font-medium focus:outline-none">
                        {/* <HiUser className="text-[#718096]" /> */}
                        {/* <Image src={user?.logo || ""} alt="User" width={30} height={30} /> */}
                        <div className='h-8 w-8 bg-[#4FD1C5] text-white flex items-center justify-center rounded-full font-bold text-sm uppercase'>
                            {user?.logo ? (
                                <img
                                    src={`https://be.myweightlosscentre.co.uk/${user.logo}`}
                                    alt="Manager Logo"
                                    className="h-full w-full object-cover rounded-xl"
                                />
                            ) : (
                                user?.name ? getInitialsOrLogo(user.name) : null // Call getInitialsLogo only if name is defined
                            )}
                        </div>

                            <p>{user?.name || 'User'}</p>
                            <IoIosArrowDown />
                    </MenuButton>

                    {/* Dropdown Menu */}
                    <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 focus:outline-none z-50">
                        {/* Company Profile */}
                        {/* <MenuItem>
                            <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer">
                                <FaBuilding className="mr-2 text-blue-500" />
                                {user?.company_name || 'Tech Solutions Pro'}
                            </div>
                        </MenuItem> */}

                        {/* Profile Settings */}
                        <MenuItem as={Link} href={profilePath}>
                            <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                                <MdSettings className="mr-2 text-teal-500" />
                                Profile Settings
                            </div>
                        </MenuItem>

                        {/* Logout */}
                        <MenuItem>
                            <div className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 cursor-pointer" onClick={handleLogout}>
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

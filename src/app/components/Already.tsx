"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const RegisterHeader = () => {
    const pathname = usePathname();
    const isLogin = pathname === "/login";

    return (
        <div className='flex justify-end space-x-4'>
            <h1 className='text-semibold text-medium text-gray-500 text-xs md:text-lg'>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <Link
                    href={isLogin ? "/register" : "/login"}
                    className='text-[#4FD1C5] ml-2 text-md font-semibold hover:underline'
                >
                    {isLogin ? "Sign Up" : "Sign In"}
                </Link>
            </h1>
        </div>
    )
}

export default RegisterHeader;

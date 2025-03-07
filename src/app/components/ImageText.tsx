"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
const ImageText = () => {
    const pathname = usePathname();
    const isLogin = pathname === "/login";
    return (
        <>
            <h1 className="text-md md:text-lg font-bold">{isLogin ? "Welcome Back" : "Welcome"}</h1>
            <p className="text-xs md:text-base lg:text-lg w-2/3">Employee Management System</p>
        </>
    )
}

export default ImageText

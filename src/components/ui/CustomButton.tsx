"use client"
import { MdOutlineArrowForward } from "react-icons/md"
import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

type ButtonVariant = "primary" | "outline" | "secondary" | "white" | "light-black"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant
  size?: ButtonSize
  showArrow?: boolean
}

const CustomButton = ({
  variant = "primary",
  size = "md",
  showArrow = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "rounded-lg flex items-center justify-center gap-2 font-medium",
        "transition-all duration-200 active:scale-95",
        variant === "primary" && [
          "bg-[#4FD1C5] text-white",
          "hover:bg-[#38b2ac] hover:shadow-lg"
        ],
        variant === "secondary" && [
          "bg-[#4F9CF9] text-white",
          "hover:bg-[#3b82f6] hover:shadow-lg"
        ],
        variant === "outline" && [
          "border border-[#FFE492] bg-transparent text-gray-800",
          "hover:border-amber-300 hover:bg-amber-50/50"
        ],
        variant === "white" && [
          "bg-white text-[#4FD1C5]",
          "hover:bg-gray-100 hover:shadow-md"
        ],
        variant === "light-black" && [
          "bg-[#424242] text-white",
          "hover:bg-gray-100 hover:text-[#4FD1C5] hover:shadow-md"
        ],
        size === "sm" && "px-6 py-3 text-sm",
        size === "md" && "px-8 py-4 text-base",
        size === "lg" && "px-10 py-5 text-lg",
        className
      )}
      {...props}
    >
      {children}
      {showArrow && <MdOutlineArrowForward className="w-5 h-5" />}
    </button>
  )
}

export default CustomButton
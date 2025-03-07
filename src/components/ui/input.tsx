import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible((prev) => !prev);

    return (
      <div className="relative w-full">
        <input
          type={type === "password" ? (isVisible ? "text" : "password") : type}
          className={cn(
            "mt-1 md:mt-2 flex w-full border border-[#c4c4c4] rounded-lg h-8 bg-transparent px-3 py-1 text-base shadow-sm transition-colors",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-600",
            "hover:border-gray-500 transition-all duration-200 ease-in-out",
            "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
        {/* Toggle Eye Icon for Password Visibility */}
        {type === "password" && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {isVisible ? <Eye size={12} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

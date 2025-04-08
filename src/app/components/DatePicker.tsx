import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { DateRange } from "react-day-picker"
interface DateRangePickerProps {
    range: DateRange | undefined;
    setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export function DateRangePicker({ range, setRange }: DateRangePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="border-[#c4c4c4] w-full mt-2 justify-start text-left font-normal"
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {range?.from && range?.to
                        ? `${format(range.from, "PPP")} - ${format(range.to, "PPP")}`
                        : "Select Date Range"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="range"
                    selected={range}
                    onSelect={setRange}  // This will update the parent state
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
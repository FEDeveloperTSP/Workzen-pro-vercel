import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card } from "@/components/ui/card";
const TimePopover = () => {
    const [selected, setSelected] = useState("Time Range");
    const [startTime, setStartTime] = useState("07:00");
    const [allStartTime, setAllStartTime] = useState("12:00");
    const [allEndTime, setAllEndTime] = useState("11:59");
    const [endTime, setEndTime] = useState("09:00");
    const [startPeriod, setStartPeriod] = useState("AM");
    const [endPeriod, setEndPeriod] = useState("PM");

    return (
        <Popover>
            <PopoverTrigger  className="w-full">
                <Input placeholder="Select Time" className="w-full h-9" />
            </PopoverTrigger>
            <PopoverContent className="p-3 w-auto shadow-md bg-white z-[9999]" forceMount side="bottom" align="start">
                <h1 className="font-medium text-gray-600 mb-2">Select time:</h1>
                <ToggleGroup
                    type="single"
                    value={selected}
                    onValueChange={(value) => value && setSelected(value)}
                    className="w-full inline-flex rounded-lg overflow-hidden bg-white border"
                >
                    <ToggleGroupItem
                        value="All day"
                        className={`w-1/2 text-sm py-2 ${selected === "All day" ? "bg-blue-200 text-blue-600 font-semibold" : "text-gray-700"
                            }`}
                    >
                        All day
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="Time Range"
                        className={`w-1/2 text-sm py-2 ${selected === "Time Range" ? "bg-blue-200 text-blue-600 font-semibold" : "text-gray-700"
                            }`}
                    >
                        Time Range
                    </ToggleGroupItem>
                </ToggleGroup>

                {/* Show this small component below based on selection */}
                {selected === "Time Range" && (
                    <>

                        <div className="flex items-center justify-between space-x-2">
                            <div className="flex flex-col  p-2">
                                <p>Start</p>
                                <Input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="w-auto text-center"
                                />
                                <ToggleGroup type="single" value={startPeriod} onValueChange={setStartPeriod}>

                                </ToggleGroup>
                            </div>

                            <span className="text-gray-500 items-center text-lg pt-6">→</span>

                            <div className="flex flex-col  p-2">
                                <p>End</p>
                                <Input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="w-auto text-center"
                                />
                                <ToggleGroup type="single" value={endPeriod} onValueChange={setEndPeriod}>

                                </ToggleGroup>
                            </div>
                        </div>
                    </>

                )}

                {selected === "All day" && (
                    <>
                        <div className="flex items-center justify-between space-x-2">
                            <div className="flex flex-col p-2">
                                <p>Start</p>
                                <Input
                                    type="time"
                                    value="00:00" // 12:00 AM
                                    disabled // Prevents user modification
                                    className="w-auto text-center bg-gray-100 cursor-not-allowed"
                                />
                                <ToggleGroup type="single" value="AM">
                                    {/* <ToggleGroupItem value="AM" className="bg-blue-100 text-blue-600">
                                        AM
                                    </ToggleGroupItem> */}
                                </ToggleGroup>
                            </div>

                            <span className="text-gray-500 items-center text-lg pt-6">→</span>

                            <div className="flex flex-col p-2">
                                <p>End</p>
                                <Input
                                    type="time"
                                    value="23:59" // 11:59 PM
                                    disabled // Prevents user modification
                                    className="w-auto text-center bg-gray-100 cursor-not-allowed"
                                />
                                <ToggleGroup type="single" value="PM">
                                    {/* <ToggleGroupItem value="PM" className="bg-blue-100 text-blue-600">
                                        PM
                                    </ToggleGroupItem> */}
                                </ToggleGroup>
                            </div>
                        </div>
                    </>
                )}

            </PopoverContent>
        </Popover>
    );
};

export default TimePopover;

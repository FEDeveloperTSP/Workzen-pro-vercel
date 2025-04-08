'use client'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaRegFilePdf } from 'react-icons/fa6'
import { useGetBranchesMutation, useGetSingleBranchMutation } from '@/services/branch/useBranch'
import { RootState } from '@/services/store'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Select } from 'antd'
import { DateRangePicker } from './DatePicker'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { useGenerateReportMutation } from '@/services/contract/useContract'
import { Report } from '@/services/contract/type'
import { generatePDFBlob } from '@/hooks'
const { Option } = Select

const ReportsComM = () => {
    const { mutateAsync } = useGenerateReportMutation()
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
    const [selectedManager, setSelectedManager] = useState<string | null>(null);
    const { getAllBranchData, datasingleBranch } = useSelector((state: RootState) => state.branch);
    const getSingleBranchMutation = useGetSingleBranchMutation();
    const [type, setType] = useState('attendance')
    const { mutate } = useGetBranchesMutation();

    useEffect(() => {
        fetchBranches();
    }, []);

    const handleTypeChange = (value: string) => {
        setType(value);
        // Reset worker selection if switching to expense report
        if (value === "expense") {
            setSelectedManager(null);
        }
    };

    const fetchBranches = async () => {
        try {
            await mutate();
        } catch (error) {
            toast.error("Failed to fetch branches");
        }
    };

    const fetchManagers = async (branchId: string) => {
        try {
            await getSingleBranchMutation.mutateAsync(Number(branchId));
        } catch (error) {
            toast.error("Failed to fetch managers");
        }
    };

    const handleBranchChange = async (branchId: string) => {
        setSelectedBranch(branchId);
        if (type === "attendance") {
            setSelectedManager(null);
            fetchManagers(branchId);
        }
    };

    const handleManagerChange = (managerId: string) => {
        setSelectedManager(managerId);
    };

    const handleGenerateReport = async () => {
        if (!range) {
            toast.error("Please select a date range");
            return;
        }

        const formattedFrom = range.from ? format(range.from, "yyyy-MM-dd") : null;
        const formattedTo = range.to ? format(range.to, "yyyy-MM-dd") : null;

        if (!formattedFrom || !formattedTo) {
            toast.error("Invalid date range selected");
            return;
        }

        if (type === "attendance" && !selectedManager) {
            toast.error("Please select a worker for the attendance report");
            return;
        }

        const reportData: Report = {
            report_type: type,
            id: type === "attendance" ? Number(selectedManager) : Number(selectedBranch),
            start_date: formattedFrom,
            end_date: formattedTo
        };
        const response = await mutateAsync(reportData);

        // 3. Create Blob correctly
        generatePDFBlob(response)
    };

    return (
        <>
            <h1 className='text-md md:text-md mt-4'>Report Type</h1>

            <div className='mt-1 flex flex-col md:flex-row gap-3 w-full'>
                <div className='w-full md:w-1/4 lg:w-1/6'>
                    <Select className='w-full' placeholder="Select Report Type" onChange={handleTypeChange} value={type}>
                        <Option value="attendance">Attendance</Option>
                        <Option value="expense">Expense</Option>
                    </Select>
                </div>

                {/* Show Branch selection for Expense Report */}
                {(type === "expense" || type === "attendance") && (
                    <div className='w-full md:w-1/4 lg:w-1/6'>
                        <Select
                            onChange={handleBranchChange}
                            value={selectedBranch}
                            className="mt-2"
                            style={{ width: "100%" }}
                            placeholder="Select Branch"
                        >
                            {getAllBranchData.branches_data.map((branch) => (
                                <Option key={branch.id} value={branch.id}>{branch.name}</Option>
                            ))}
                        </Select>
                    </div>
                )}

                {/* Show Worker selection only for Attendance Report */}
                {type === "attendance" && (
                    <div className='w-full md:w-1/4 lg:w-1/6'>
                        <Select
                            onChange={handleManagerChange}
                            value={selectedManager}
                            className="mt-2"
                            style={{ width: "100%" }}
                            placeholder="Select Manager"
                        >
                            {datasingleBranch?.branch_details?.flatMap(branch =>
                                branch.managers.map(manager => (
                                    <Option key={manager.id} value={manager.id}>{manager.name}</Option>
                                ))
                            )}
                        </Select>
                    </div>
                )}
            </div>

            <h1 className='text-md md:text-md mt-4'>Date Range</h1>
            <div className='flex gap-3'>
                <div className='w-fit'>
                    <DateRangePicker range={range} setRange={setRange} />
                </div>
            </div>

            <div className='mt-2 flex justify-end pr-0 md:pr-32'>
                <Button className='bg-[#4FD1C5]' onClick={handleGenerateReport}><FaRegFilePdf /> Download PDF</Button>
            </div>
        </>
    );
};

export default ReportsComM;

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
import { DateRangePicker } from '../../DatePicker'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { useGenerateReportMutation } from '@/services/contract/useContract'
import { Report } from '@/services/contract/type'
const { Option } = Select
const ReportsCom = () => {
    const { mutateAsync } = useGenerateReportMutation()
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
    const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
    const { getAllBranchData, datasingleBranch } = useSelector((state: RootState) => state.branch);
    const getSingleBranchMutation = useGetSingleBranchMutation();
    const [type, setType] = useState('attendance')
    const { mutate } = useGetBranchesMutation();
    useEffect(() => {
        fetchBranches();
    }, []);
    const handleTypeChange = (value: string) => {
        setType(value)
    }
    const fetchBranches = async () => {
        try {
            await mutate();
        } catch (error) {
            toast.error("Failed to fetch branches");
        }
    };
    const fetchWorkers = async (branchId: string) => {
        try {
            await getSingleBranchMutation.mutateAsync(Number(branchId));
        } catch (error) {
            toast.error("Failed to fetch workers");
        }
    };

    const handleBranchChange = async (branchId: string) => {
        setSelectedBranch(branchId);
        setSelectedWorker(null);
        fetchWorkers(branchId);
    };
    const handleWorkerChange = (managerId: string) => {
        setSelectedWorker(managerId);
    };
    const handleGenerateReport = async () => {
        if (!range || !selectedWorker) {
            toast.error("Please select a date range and a worker to generate report");
            return;
        }

        const formattedFrom = range.from ? format(range.from, "yyyy-MM-dd") : null;
        const formattedTo = range.to ? format(range.to, "yyyy-MM-dd") : null;

        if (!formattedFrom || !formattedTo) {
            toast.error("Invalid date range selected");
            return;
        }
        const workerId = Number(selectedWorker)
        const generatereport: Report = {
            report_type: type, // Make sure `type` is defined somewhere
            id: workerId,
            start_date: formattedFrom,
            end_date: formattedTo
        };
        const response = await mutateAsync(generatereport);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const fileUrl = URL.createObjectURL(blob);

        // Display in an iframe
        window.open(fileUrl, "_blank");
    };
    return (
        <>
            <h1 className='text-md md:text-md mt-4'>Report Type</h1>

            <div className='mt-1 flex flex-col md:flex-row gap-3 w-full'>
                <div className='w-full md:w-1/4 lg:w-1/6'>

                    <Select className='w-full' placeholder="Select Report Type" onChange={handleTypeChange} value={type}>
                        <Option value="attendance">Attendance</Option>
                    </Select>
                </div>
                <div className='w-full md:w-1/4 lg:w-1/6'>
                    <Select
                        onChange={handleBranchChange}
                        value={selectedBranch}
                        // loading={isLoading}
                        className="mt-2"
                        style={{ width: "100%" }}
                        placeholder="Select Branch"
                    >
                        {getAllBranchData.branches_data.map((branch) => (
                            <Option key={branch.id} value={branch.id}>{branch.name}</Option>
                        ))}
                    </Select>
                </div>
                <div className='w-full md:w-1/4 lg:w-1/6'>

                    <Select
                        onChange={handleWorkerChange}
                        value={selectedWorker}
                        className="mt-2"
                        style={{ width: "100%" }}
                        placeholder="Select Worker"
                    >
                        {datasingleBranch?.branch_details?.flatMap(branch =>
                            branch.workers.map(manager => (
                                <Option key={manager.id} value={manager.id}>{manager.name}</Option>
                            ))
                        )}
                    </Select>
                </div>

            </div>
            <h1 className='text-md md:text-md mt-4 '>Date Range</h1>
            <div className='flex gap-3'>

                <div className='w-full md:w-1/3'>

                    <DateRangePicker range={range} setRange={setRange} />
                </div>
            </div>
            <div className='mt-2 flex justify-end pr-0 md:pr-32'>
                <Button className='bg-[#4FD1C5]' onClick={handleGenerateReport}><FaRegFilePdf />Download PDF</Button>
            </div>
        </>
    )
}

export default ReportsCom

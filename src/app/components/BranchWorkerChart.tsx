"use client";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
} from "chart.js";
import { Table } from "antd";

ChartJS.register(ArcElement, Tooltip);

const BranchWiseWorkers = () => {
    const branchData = [
        { label: "Branch 1", value: 12, color: "#00C49F" },
        { label: "Branch 2", value: 22, color: "#0088FE" },
        { label: "Branch 3", value: 12, color: "#7C4DFF" },
        { label: "Branch 4", value: 12, color: "#FF4081" },
        { label: "Branch 5", value: 7, color: "#FFA726" },
        { label: "Branch 6", value: 7, color: "#FFD700" },
    ];

    const totalValue = branchData.reduce((sum, branch) => sum + branch.value, 0);

    const data = {
        labels: branchData.map((b) => b.label),
        datasets: [
            {
                data: branchData.map((b) => b.value),
                backgroundColor: branchData.map((b) => b.color),
                borderWidth: 2,
            },
        ],
    };

    const options = {
        cutout: "75%", // Creates the doughnut hole
        plugins: {
            legend: { display: false }, // Hide default legend
            tooltip: { enabled: true }, // Enable hover tooltips
        },
    };
    const columns = [
        {
            title: "Label",
            dataIndex: "label",
            key: "label",
            render: (text: string, record: any) => (
                <div className="flex items-center gap-2">
                    <span
                        className="w-3 h-3 rounded-full inline-block"
                        style={{ backgroundColor: record.color }}
                    ></span>
                    {text}
                </div>
            ),
        },
        {
            title: "Value",
            dataIndex: "value",
            key: "value",
        },
        {
            title: "%",
            dataIndex: "percentage",
            key: "percentage",
            render: (_: any, record: any) => (
                <span className="font-semibold">
                    {((record.value / totalValue) * 100).toFixed(1)}%
                </span>
            ),
        },
    ];

    return (
        <div className="p-3 bg-white rounded-xl shadow-md w-full max-w-3xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Branch Wise Workers</h2>

            <div className="flex flex-col md:flex-row items-center justify-between">
                {/* Doughnut Chart */}
                <div className="relative w-20 h-20 md:w-48 md:h-48">
                    <Doughnut data={data} options={options} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-[10px] md:text-sm  text-gray-500">Total Value</p>
                        <p className="text-sm md:text-lg font-bold text-gray-900">{totalValue}</p>
                    </div>
                </div>

                {/* Custom Legend Table */}
                <div className="w-1/2">
                    <Table
                        columns={columns}
                        dataSource={branchData.map((branch, index) => ({
                            key: index,
                            ...branch,
                            percentage: ((branch.value / totalValue) * 100).toFixed(1),
                        }))}
                        pagination={false} // Disable pagination if not needed
                        size="small" // Adjust size for compact look
                    />
                </div>
            </div>
        </div>
    );
};

export default BranchWiseWorkers;

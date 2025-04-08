"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Table } from "antd";

ChartJS.register(ArcElement, Tooltip);

interface BranchData {
    label: string;
    value: number;
    color: string;
    percentage?: string;
}

interface BranchWiseWorkersProps {
    data: BranchData[];
}

const BranchWiseWorkers: React.FC<BranchWiseWorkersProps> = ({ data }) => {
    const totalValue = data?.reduce((sum, branch) => sum + branch.value, 0) || 0;

    const chartData = {
        labels: data?.map((b) => b.label),
        datasets: [
            {
                data: data?.map((b) => b.value),
                backgroundColor: data?.map((b) => b.color),
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="p-3 bg-white rounded-xl shadow-md w-full max-w-3xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Branch Wise Workers</h2>

            <div className="flex flex-col md:flex-row items-center justify-between">
                {/* Doughnut Chart */}
                <div className="relative w-20 h-20 md:w-48 md:h-48">
                    <Doughnut data={chartData} options={{ cutout: "75%", plugins: { tooltip: { enabled: true }, legend: { display: false } } }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-[10px] md:text-sm text-gray-500">Total Value</p>
                        <p className="text-sm md:text-lg font-bold text-gray-900">{totalValue}</p>
                    </div>
                </div>

                {/* Custom Legend Table */}
                <div className="w-1/2">
                    <Table
                        columns={[
                            {
                                title: "Label",
                                dataIndex: "label",
                                key: "label",
                                render: (text: string, record: BranchData) => (
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-3 h-3 rounded-full inline-block"
                                            style={{ backgroundColor: record.color }}
                                        ></span>
                                        {text}
                                    </div>
                                ),
                            },
                            { title: "Value", dataIndex: "value", key: "value" },
                            {
                                title: "%",
                                dataIndex: "percentage",
                                key: "percentage",
                                render: (_: any, record: BranchData) => (
                                    <span className="font-semibold">
                                        {((record.value / totalValue) * 100).toFixed(1)}%
                                    </span>
                                ),
                            },
                        ]}
                        dataSource={data}
                        pagination={false}
                        size="small"
                        rowKey="label"
                    />
                </div>
            </div>
        </div>
    );
};

export default BranchWiseWorkers;

"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

interface ExpenseChartProps {
  data: { name: string; expense: number }[];
}

const BranchWiseExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  const [screenWidth, setScreenWidth] = useState(1024); // Default for SSR

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    setScreenWidth(window.innerWidth); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Extract labels and expenses dynamically
  const labels = data.map(branch => branch.name);
  const expenses = data.map(branch => branch.expense);

  // Define chart data dynamically
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Expenses",
        data: expenses,
        backgroundColor: "#ffffff",
        borderRadius: 15,
        barThickness: screenWidth < 768 ? 10 : 60,
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#000000",
        titleFont: { size: 16, weight: "bold" as "bold" },
        bodyColor: "#000000",
        padding: 10,
        displayColors: false,
        borderWidth: 1,
        borderColor: "#ccc",
        cornerRadius: 6,
        caretSize: 6,
        caretPadding: 10,
        callbacks: {
          title: () => "",
          label: (tooltipItem: any) => `Expense: $${tooltipItem.raw}`,
        },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: "#ffffff", font: { size: screenWidth < 768 ? 10 : 14 } },
      },
      y: {
        ticks: { color: "#ffffff", font: { size: screenWidth < 768 ? 10 : 14 } },
      },
    },
  };

  return (
    <div className="p-3 bg-white rounded-xl shadow-lg">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Branch Wise Expense</h2>
      <div className="p-4 bg-custom-gradient from-gray-900 to-black rounded-xl">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BranchWiseExpenseChart;

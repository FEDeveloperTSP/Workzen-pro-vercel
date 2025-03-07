"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const BranchWiseExpenseChart = () => {
    // State for screen width
    const [screenWidth, setScreenWidth] = useState(1024); // Default value for SSR

    useEffect(() => {
        // Update width only in the client
        const handleResize = () => setScreenWidth(window.innerWidth);
        setScreenWidth(window.innerWidth); // Set initial value
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Define chart data
    const data = {
        labels: ["Gulberg Branch", "Johar Town", "United Kingdom", "United Kingdom", "United Kingdom"],
        datasets: [
            {
                label: "Workers",
                data: [250, 180, 90, 180, 250], // Expense data
                backgroundColor: "#ffffff", // White bars
                borderRadius: 15,
                barThickness: screenWidth < 768 ? 10 : 60, // Use state instead of `window`
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
                    label: (tooltipItem: any) => `Workers\n${tooltipItem.raw}`,
                },
            },
            legend: { display: false },
        },
        scales: {
            x: {
                ticks: { color: "#ffffff", font: { size: screenWidth < 768 ? 10 : 14 } }, // Use state
            },
            y: {
                ticks: { color: "#ffffff", font: { size: screenWidth < 768 ? 10 : 14 } }, // Use state
            },
        },
    };

    return (
        <div className="p-2 bg-white rounded-xl shadow-lg">
            <h2 className="text-lg font-bold text-gray-800">Branch Wise Expense</h2>
            <div className="p-4 bg-custom-gradient from-gray-900 to-black rounded-xl">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default BranchWiseExpenseChart;

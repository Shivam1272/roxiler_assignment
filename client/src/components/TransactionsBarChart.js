import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const TransactionsBarChart = ({ barData }) => {
  if (barData?.labels === undefined) return <div>Loading...</div>;
  return (
    <div className="flex items-center justify-center h-96 w-full">
      <Bar data={barData} options={{ responsive: true }} />
    </div>
  );
};

export default TransactionsBarChart;

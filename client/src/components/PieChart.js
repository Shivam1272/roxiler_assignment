import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
ChartJs.register(ArcElement, Tooltip, Legend);

const PieChart = ({ ChartData }) => {
  if (ChartData?.labels === undefined) return <div>Loading...</div>;
  return (
    <div className="flex items-center justify-center h-96 w-full">
      <Pie data={ChartData} options={{ responsive: true }} />
    </div>
  );
};

export default PieChart;

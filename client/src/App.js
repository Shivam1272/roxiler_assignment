import React, { useEffect, useState } from "react";
import {
  TransactionsTable,
  TransactionsBarChart,
  PieChart,
  StatisticsBox,
} from "./components";
import axios from "axios";

function App() {
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [transaction, setTransaction] = useState();

  const [stats, setStats] = useState();
  const [barData, setBarData] = useState();
  const [ChartData, setChartData] = useState();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const baseURL = "http://localhost:8000/api";
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${baseURL}/combinedData?month=${selectedMonth}&search=${search}&page=${page}`
      );
      const { transactions, statistics, barChartData, pieChartData } = data;
      setTransaction(transactions.data);
      setStats(statistics);
      setBarData({
        labels: barChartData.map((item) => item.priceRange),
        datasets: [
          {
            label: "Number of Product",
            data: barChartData.map((item) => item.itemCount),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
          },
        ],
      });
      const categories = pieChartData.map((item) => item.category);
      const itemCounts = pieChartData.map((item) => item.itemCount);
      setChartData({
        labels: categories,
        datasets: [
          {
            data: itemCounts,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#C9CBCF",
              "#FF9F40",
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#C9CBCF",
              "#FF9F40",
            ],
          },
        ],
      });
    })();
  }, [search, selectedMonth, page]);
  return (
    <div className="m-2">
      <div className="flex justify-between items-center">
        <select
          className="ml-2 border-separate"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {month.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <input
          placeholder="Search"
          className="border ml-4 rounded px-3 py-1"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <TransactionsTable transaction={transaction} />
        <div className="m-2 flex items-center justify-around">
          <button
            className="p-2 w-[100px] rounded-md bg-blue-400 text-white font-bold cursor-pointer hover:bg-transparent hover:text-black"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="p-2 w-[100px] rounded-md bg-blue-400 text-white font-bold cursor-pointer hover:bg-transparent hover:text-black"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <StatisticsBox stats={stats} selectedMonth={selectedMonth} />
      <div className="mt-8 text-xs font-bold uppercase flex items-center justify-around">
        <TransactionsBarChart barData={barData} />
        <PieChart ChartData={ChartData} />
      </div>
    </div>
  );
}

export default App;

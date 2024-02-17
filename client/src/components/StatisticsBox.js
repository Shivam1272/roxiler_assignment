import React from "react";

const StatisticsBox = ({ stats, selectedMonth }) => {
  if (!stats) return <div>Loading....</div>;
  return (
    <div className=" w-full flex items-center justify-center flex-col">
      <h1 className="font-bold text-lg p-3"> Statistics for {selectedMonth}</h1>
      <div className="bg-yellow-300 p-3 rounded-md shadow-sm ">
        <p>Total Sale : ${Math.round(stats.totalSaleAmount)}</p>
        <p>Total Sold Items: {stats.totalNumberOfSoldItems}</p>
        <p>Total Not Sold Items: {stats.totalNumberOfNotSoldItems}</p>
      </div>
    </div>
  );
};

export default StatisticsBox;

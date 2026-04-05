import React, { useEffect, useState } from "react";
import { prepareExpenseData } from "../../utils/helper.js";
import CustomBarChart from "../Charts/CustomBarChart.jsx";
import { LuTrendingUp } from "react-icons/lu";

const Last30DaysExpense = ({ data = [] }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const result = prepareExpenseData(data);
      setChartData(result);
    } else {
      setChartData([]);
    }
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-lg">Last 30 Days Expense</h5>
      </div>

      {chartData.length > 0 ? (
        <CustomBarChart data={chartData} />
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <LuTrendingUp className="text-gray-400 text-xl" />
          </div>
          <p className="text-sm text-gray-400">
            No expense data for the last 30 days
          </p>
        </div>
      )}
    </div>
  );
};

export default Last30DaysExpense;

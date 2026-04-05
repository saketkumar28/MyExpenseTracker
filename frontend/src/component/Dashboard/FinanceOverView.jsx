import React from "react";
import CustomPieChart from "../Charts/CustomPieChart.jsx";

// Updated COLORS array with clean, professional palette
const COLORS = ["#875CF5", "#4CAF50", "#F44336"];

const FinanceOverView = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expense", amount: totalExpense },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-lg">Financial Overview</h5>
      </div>
      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={totalBalance}
        colors={COLORS}
      />
    </div>
  );
};

export default FinanceOverView;

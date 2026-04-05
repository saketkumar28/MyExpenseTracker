import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell, // ✅ was missing from imports
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip.jsx";

const CustomBarChart = ({ data }) => {
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb"; // ✅ == → ===
  };

  return (
    <div className="bg-white mt-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />{" "}
          {/* ✅ JSX element, not reference */}
          <Bar
            dataKey="amount"
            fill="#8884d8"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
            activeStyle={{ fill: "green" }}
          >
            {data.map(
              (
                entry,
                index, // ✅ return arrow: () => (...) not () => {...}
              ) => (
                <Cell key={index} fill={getBarColor(index)} />
              ),
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;

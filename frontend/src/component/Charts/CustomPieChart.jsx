import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={data}
      dataKey="amount"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={130}
      innerRadius={100}
      labelLine={false}
      // You can optionally set label here for arc labels
    >
      {data.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={colors ? colors[index % colors.length] : '#8884d8'}
        />
      ))}
    </Pie>

    {/* Centered Text Like Example */}
    <text
      x="50%"
      y="50%"
      dy={-10}
      textAnchor="middle"
      fill="#878787"
      fontSize="16px"
      fontWeight="500"
      style={{ pointerEvents: 'none' }}
    >
      {label || 'Total Balance'}
    </text>
    <text
      x="50%"
      y="50%"
      dy={22}
      textAnchor="middle"
      fill="#111827"
      fontSize="20px"
      fontWeight="600"
      style={{ pointerEvents: 'none' }}
    >
      ₹{totalAmount?.toLocaleString() || '0'}
    </text>

    {/* Optionally add Legend, Tooltip */}
    <Tooltip content={CustomTooltip} />
    <Legend content={CustomLegend} />
  </PieChart>
</ResponsiveContainer>

  );
};

export default CustomPieChart;

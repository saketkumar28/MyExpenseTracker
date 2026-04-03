import React from 'react';

const CustomLegend = ({ payload = [] }) => {
  if (!payload.length) return null;

  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 mt-3">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
            aria-hidden="true"
          />
          <span className="text-sm text-gray-700 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;

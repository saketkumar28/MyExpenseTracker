import React from 'react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white p-3 rounded-lg shadow-md shadow-gray-200'>
        <p className='text-xs font-semibold text-purple-800 mb-1'>
          {payload[0].name || label}
        </p>
        <p className='text-sm text-gray-600'>
          Amount:{" "}
          <span className='text-sm font-medium text-gray-900 '>
          ₹{payload[0].value}
          </span>
        </p>
      </div>
    );
  }

  // Always return null if not active; prevents empty divs
  return null;
};

export default CustomTooltip;

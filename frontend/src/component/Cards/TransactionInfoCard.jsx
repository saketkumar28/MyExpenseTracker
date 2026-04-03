import React from 'react';
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from 'react-icons/lu';

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete, // if you have delete functionality
}) => {
    const getAmountStyles = () => {
        return type === "income" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600";
    };

  return (
    <div className="group relative flex items-center justify-between gap-4 mt-2 p-3 rounded-lg hover:bg-gray-50">

      {/* Left side: Icon and Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
          {icon ? (
            <img src={icon} alt={title} className="w-6 h-6" />
          ) : type === 'income' ? (
            <LuTrendingUp className="text-green-600" />
          ) : type === 'expense' ? (
            <LuTrendingDown className="text-red-600" />
          ) : (
            <LuUtensils />
          )}
        </div>

        <div>
          <h5 className="text-gray-800 font-medium">{title}</h5>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>
      </div>

      {/* Right side: Amount and Delete */}
      <div className="flex items-center gap-4">
        <span className={`font-semibold ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
          ₹ {amount}
        </span>

        {!hideDeleteBtn && (
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-red-500"
          >
            <LuTrash2 />
          </button>
        )}
      </div>

    </div>
  );
};

export default TransactionInfoCard;

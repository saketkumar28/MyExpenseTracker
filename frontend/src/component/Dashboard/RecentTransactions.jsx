import React from "react";
import { LuArrowRight, LuTrendingUp, LuTrendingDown } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard.jsx";

const RecentTransactions = ({ transactions = [], onSeeMore, onDelete }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h5 className="text-lg">Recent Transactions</h5>
        {typeof onSeeMore === "function" && (
          <button
            className="card-btn flex items-center gap-1"
            onClick={onSeeMore}
          >
            See All
            <LuArrowRight className="text-base" />
          </button>
        )}
      </div>

      <div className="mt-1">
        {transactions.length > 0 ? (
          transactions
            .slice(0, 5)
            .map((item) => (
              <TransactionInfoCard
                key={item._id}
                title={item.type === "expense" ? item.category : item.source}
                icon={item.icon}
                date={moment(item.date).format("MMM D, YYYY")}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn={!onDelete}
                onDelete={onDelete ? () => onDelete(item._id) : undefined}
              />
            ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <LuTrendingUp className="text-gray-400 text-xl" />
            </div>
            <p className="text-sm text-gray-400">No recent transactions</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;

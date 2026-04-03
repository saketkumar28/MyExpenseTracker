import React from 'react';
import { LuArrowRight, LuTrendingDown } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const ExpenseTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between mb-3'>
        <h5 className='text-lg'>Expenses</h5>
        {typeof onSeeMore === 'function' && (
          <button className='card-btn flex items-center gap-1' onClick={onSeeMore}>
            See All <LuArrowRight className='text-base' />
          </button>
        )}
      </div>

      <div>
        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format('MMM D, YYYY')}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn={true}
            />
          ))
        ) : (
          <div className='flex flex-col items-center justify-center py-8 text-center'>
            <div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3'>
              <LuTrendingDown className='text-gray-400 text-xl' />
            </div>
            <p className='text-sm text-gray-400'>No expenses in the last 30 days</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
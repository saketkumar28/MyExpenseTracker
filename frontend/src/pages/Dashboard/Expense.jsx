import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../component/layout/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { axiosInstance } from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import { addThousandsSeperator } from '../../utils/helper';

const Expense = () => {
  useUserAuth();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ascending, setAscending] = useState(true); // State to track sorting direction
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    source: '',
    amount: '',
    date: '',
  });

  const fetchExpenses = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATH.EXPENSE.GET_ALL_EXPENSE);
      if (res.data) {
        setExpenses(res.data);
      }
    } catch (err) {
      console.error('Error fetching expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(API_PATH.EXPENSE.ADD_EXPENSE, formData);

      // reset
      setFormData({ source: '', amount: '', date: '' });
      setShowForm(false);

      // refresh
      fetchExpenses();
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDownload = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATH.EXPENSE.DOWNLOAD,
          {
            responseType: 'blob',
          }
        );
    
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
    
        const url = window.URL.createObjectURL(blob);
    
        const link = document.createElement('a');
        link.href = url;
        link.download = 'expense.xlsx';
    
        document.body.appendChild(link);
        link.click();
    
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download failed:', error);
      }
    };

    const handleSort = () => {
      setExpenses(prevExpense => {
        const sorted =  prevExpense.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          // Toggle logic: if ascending is true, sort Desc; else sort Asc
          return ascending ? dateB - dateA : dateA - dateB;
        });
        return sorted;
      });
      
      // Toggle the direction for the NEXT click
      setAscending(!ascending);
    };

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Expenses</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            + Add Expense
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleAddExpense}
            className="bg-white shadow rounded-lg p-4 mb-4 space-y-3"
          >
            <input
              type="text"
              placeholder="Source"
              value={formData.source}
              onChange={(e) =>
                setFormData({ ...formData, source: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Save Expense
            </button>
          </form>
        )}

        <div className="bg-white shadow rounded-lg p-4">
          {expenses.length === 0 ? (
            <p>No expenses found</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Source</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2 cursor-pointer" onClick={handleSort}>
                    Date
                    <span className="ml-2 text-sm text-gray-500">
                      {ascending ? '↓' : '↑'} 
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.source}</td>
                    <td className="py-2 text-red-500">
                      ₹{addThousandsSeperator(item.amount)}
                    </td>
                    <td className="py-2">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <button onClick={handleDownload} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Download Excel</button>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
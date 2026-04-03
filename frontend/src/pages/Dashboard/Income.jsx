import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../component/layout/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { axiosInstance } from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import { addThousandsSeperator } from '../../utils/helper';

const Income = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ source: '', amount: '', date: '' });
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ascending, setAscending] = useState(true); // State to track sorting direction
  useUserAuth();

  const fetchIncome = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATH.INCOME.GET_ALL_INCOME);
      if (res.data) {
        setIncome(res.data);
      }
    } catch (err) {
      console.error('Error fetching income:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(API_PATH.INCOME.ADD_INCOME, formData);
      
      // reset form
      setFormData({ source: '', amount: '', date: '' });
      setShowForm(false);

      // refresh list
      fetchIncome();
    } catch (err) {
      console.error('Error adding income:', err);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATH.INCOME.DOWNLOAD,
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
      link.download = 'income.xlsx';
  
      document.body.appendChild(link);
      link.click();
  
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };
  
  const handleSort = () => {
    setIncome(prevIncome => {
      const sorted = [...prevIncome].sort((a, b) => {
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
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Income</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Income
          </button>
          
        </div>

        {showForm && (
          <form
            onSubmit={handleAddIncome}
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
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save Income
            </button>
          </form>
        )}

        <div className="bg-white shadow rounded-lg p-4">
          {income.length === 0 ? (
            <p>No income records found</p>
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
                {income.map((item, index) => (
                  <tr key={item._id || index} className="border-b">
                    <td className="py-2">{item.source}</td>
                    <td className="py-2 text-green-600">
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

export default Income;
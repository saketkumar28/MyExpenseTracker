import React, { useEffect, useState } from "react";
import DashboardLayout from "../../component/layout/DashboardLayout.jsx";
import { useUserAuth } from "../../hooks/useUserAuth.jsx";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance.js";
import { API_PATH } from "../../utils/apiPath.js";
import InfoCard from "../../component/Cards/InfoCard.jsx";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { addThousandsSeperator } from "../../utils/helper.js";
import RecentTransactions from "../../component/Dashboard/RecentTransactions.jsx";
import FinanceOverView from "../../component/Dashboard/FinanceOverView.jsx";
import ExpenseTransactions from "../../component/Dashboard/ExpenseTransactions.jsx";
import Last30DaysExpense from "../../component/Dashboard/Last30DaysExpense.jsx";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATH.DASHBOARD.GET_DASHBOARD_DATA,
      );
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <InfoCard
            icon={<IoMdCard className="w-7 h-7" />}
            label="Total Balance"
            value={addThousandsSeperator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal className="w-7 h-7" />}
            label="Total Income"
            value={addThousandsSeperator(dashboardData?.totalIncome || 0)}
            color="bg-green-600"
          />
          <InfoCard
            icon={<LuHandCoins className="w-7 h-7" />}
            label="Total Expense"
            value={addThousandsSeperator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <RecentTransactions
            transactions={dashboardData?.last5Transactions || []}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverView
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />
          <ExpenseTransactions
            transactions={
              dashboardData?.last5Transactions?.filter(
                (t) => t.type === "expense",
              ) || []
            }
            onSeeMore={() => navigate("/expense")}
          />
          <Last30DaysExpense
            data={
              dashboardData?.last5Transactions?.filter(
                (t) => t.type === "expense",
              ) || []
            }
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;

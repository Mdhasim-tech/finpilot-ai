import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Layout from "../components/layout/Layout";

import SummaryCard from "../components/dashboard/SummaryCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import ExpensePieChart from "../components/dashboard/ExpensePieChart";
import MonthlyTrendChart from "../components/dashboard/MonthlyTrendChart";
import AIInsights from "../components/dashboard/AIInsights";

import {
    getDashboardData,
    getAIInsights,
} from "../services/dashboardService";

import "../styles/dashboard.css";

import {
    FaWallet,
    FaArrowTrendUp,
    FaArrowTrendDown,
} from "react-icons/fa6";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [insights, setInsights] = useState("");

    const [loadingInsights, setLoadingInsights] = useState(false);

    const location = useLocation();

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                setLoading(true);

                setError("");

                const data = await getDashboardData();

                setDashboard(data.dashboard);

                // Clear previous AI insights whenever dashboard reloads
                setInsights("");

            } catch (error) {

                console.log(error);

                setError("Unable to load dashboard.");

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, [location.pathname]);

    const handleGenerateInsights = async () => {

        try {

            setLoadingInsights(true);

            const data = await getAIInsights();

            setInsights(data.insights);

        } catch (error) {


    console.log(error);

    console.log(error.response);

    console.log(error.response?.data);


        } finally {

            setLoadingInsights(false);

        }

    };

    if (loading) {

        return (

            <Layout>

                <h2>Loading Dashboard...</h2>

            </Layout>

        );

    }

    if (error) {

        return (

            <Layout>

                <h2>{error}</h2>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="dashboard">

                <div className="summary-grid">

                    <SummaryCard
                        title="Balance"
                        amount={dashboard.balance}
                        icon={<FaWallet />}
                        color="#3b82f6"
                        subtitle="Available Balance"
                    />

                    <SummaryCard
                        title="Income"
                        amount={dashboard.totalIncome}
                        icon={<FaArrowTrendUp />}
                        color="#10b981"
                        subtitle="Money Received"
                    />

                    <SummaryCard
                        title="Expense"
                        amount={dashboard.totalExpense}
                        icon={<FaArrowTrendDown />}
                        color="#ef4444"
                        subtitle="Money Spent"
                    />

                </div>

                <div className="dashboard-row">

                    <div className="left-panel">

                        <ExpensePieChart
                            data={dashboard.categoryBreakdown}
                        />

                    </div>

                    <div className="right-panel">

                        <RecentTransactions
                            transactions={dashboard.recentTransactions}
                        />

                    </div>

                </div>

                <MonthlyTrendChart
                    data={dashboard.monthlyTrend}
                />

                <AIInsights
                    insights={insights}
                    loading={loadingInsights}
                    onGenerate={handleGenerateInsights}
                />

            </div>

        </Layout>

    );

}

export default Dashboard;
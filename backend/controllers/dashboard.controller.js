import Transaction from "../models/transaction.model.js";
import { generateFinancialInsights } from "../services/ai.service.js";

export const getDashboardData = async (req, res) => {
    try {

        // ==========================
        // Total Income & Expense
        // ==========================
        const totals = await Transaction.aggregate([
            {
                $match: {
                    user: req.user._id,
                },
            },
            {
                $group: {
                    _id: "$type",
                    total: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

        let totalIncome = 0;
        let totalExpense = 0;

        totals.forEach((item) => {
            if (item._id === "income") {
                totalIncome = item.total;
            } else if (item._id === "expense") {
                totalExpense = item.total;
            }
        });

        const balance = totalIncome - totalExpense;

        // ==========================
        // Recent Transactions
        // ==========================
        const recentTransactions = await Transaction.find({
            user: req.user._id,
        })
            .sort({
                date: -1,
                createdAt: -1,
            })
            .limit(5);

        // ==========================
        // Category Breakdown
        // ==========================
        const categoryBreakdown = await Transaction.aggregate([
            {
                $match: {
                    user: req.user._id,
                    type: "expense",
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    amount: "$total",
                },
            },
            {
                $sort: {
                    amount: -1,
                },
            },
        ]);

        // ==========================
        // Monthly Trend
        // ==========================
        const monthlyTrend = await Transaction.aggregate([
            {
                $match: {
                    user: req.user._id,
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        type: "$type",
                    },
                    total: {
                        $sum: "$amount",
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]);

        const monthlyMap = {};

        monthlyTrend.forEach((item) => {

            const key = `${item._id.year}-${item._id.month}`;

            if (!monthlyMap[key]) {

                monthlyMap[key] = {
                    year: item._id.year,
                    month: item._id.month,
                    income: 0,
                    expense: 0,
                };

            }

            if (item._id.type === "income") {
                monthlyMap[key].income = item.total;
            } else {
                monthlyMap[key].expense = item.total;
            }

        });

        const monthNames = [
            "",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const monthlyTrendData = Object.values(monthlyMap).map((item) => ({
            year: item.year,
            month: monthNames[item.month],
            income: item.income,
            expense: item.expense,
        }));

        res.status(200).json({
            success: true,
            dashboard: {
                totalIncome,
                totalExpense,
                balance,
                recentTransactions,
                categoryBreakdown,
                monthlyTrend: monthlyTrendData,
            },
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

export const generateAIInsights = async (req, res) => {

    try {

        // ==========================
        // Total Income & Expense
        // ==========================
        const totals = await Transaction.aggregate([
            {
                $match: {
                    user: req.user._id,
                },
            },
            {
                $group: {
                    _id: "$type",
                    total: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

        let totalIncome = 0;
        let totalExpense = 0;

        totals.forEach((item) => {
            if (item._id === "income") {
                totalIncome = item.total;
            } else if (item._id === "expense") {
                totalExpense = item.total;
            }
        });

        const balance = totalIncome - totalExpense;

        // ==========================
        // Recent Transactions
        // ==========================
        const recentTransactions = await Transaction.find({
            user: req.user._id,
        })
            .sort({
                date: -1,
                createdAt: -1,
            })
            .limit(5);

        // ==========================
        // Category Breakdown
        // ==========================
        const categoryBreakdown = await Transaction.aggregate([
            {
                $match: {
                    user: req.user._id,
                    type: "expense",
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    amount: "$total",
                },
            },
            {
                $sort: {
                    amount: -1,
                },
            },
        ]);

        // ==========================
        // Monthly Trend
        // ==========================
        const monthlyTrend = await Transaction.aggregate([
            {
                $match: {
                    user: req.user._id,
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        type: "$type",
                    },
                    total: {
                        $sum: "$amount",
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]);

        const monthlyMap = {};

        monthlyTrend.forEach((item) => {

            const key = `${item._id.year}-${item._id.month}`;

            if (!monthlyMap[key]) {

                monthlyMap[key] = {
                    year: item._id.year,
                    month: item._id.month,
                    income: 0,
                    expense: 0,
                };

            }

            if (item._id.type === "income") {
                monthlyMap[key].income = item.total;
            } else {
                monthlyMap[key].expense = item.total;
            }

        });

        const monthNames = [
            "",
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        const monthlyTrendData = Object.values(monthlyMap).map((item) => ({
            year: item.year,
            month: monthNames[item.month],
            income: item.income,
            expense: item.expense,
        }));

        const financialSummary = {

            totalIncome,
            totalExpense,
            balance,
            recentTransactions,
            categoryBreakdown,
            monthlyTrend: monthlyTrendData,

        };

        const insights =
            await generateFinancialInsights(financialSummary);

        res.status(200).json({

            success: true,
            insights,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error",

        });

    }

};
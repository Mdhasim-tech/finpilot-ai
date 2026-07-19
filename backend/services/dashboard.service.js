import Transaction from "../models/transaction.model.js";

export const getFinancialSummary = async (userId) => {

    // ==========================
    // Total Income & Expense
    // ==========================
    const totals = await Transaction.aggregate([
        {
            $match: {
                user: userId,
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
        } else {
            totalExpense = item.total;
        }
    });

    const balance = totalIncome - totalExpense;

    // ==========================
    // Recent Transactions
    // ==========================
    const recentTransactions = await Transaction.find({
        user: userId,
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
                user: userId,
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
                user: userId,
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

    return {
        totalIncome,
        totalExpense,
        balance,
        recentTransactions,
        categoryBreakdown,
        monthlyTrend: monthlyTrendData,
    };
};
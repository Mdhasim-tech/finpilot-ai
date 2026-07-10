import Transaction from "../models/transaction.model.js";

export const createTransaction = async (req, res) => {
    try {
        const { type, amount, category, description, date } = req.body;

        if (!type || !amount || !category) {
            return res.status(400).json({
                success: false,
                message: "Type, amount and category are required.",
            });
        }

        const transaction = await Transaction.create({
            user: req.user._id,
            type,
            amount,
            category: category.trim(),
            description: description?.trim() || "",
            date: date || Date.now(),
        });

        res.status(201).json({
            success: true,
            message: "Transaction created successfully.",
            transaction,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getTransactions = async (req, res) => {
    try {

        const query = {
            user: req.user._id,
        };

        // Search (Description OR Category)
        if (req.query.search) {

            query.$or = [
                {
                    description: {
                        $regex: req.query.search,
                        $options: "i",
                    },
                },
                {
                    category: {
                        $regex: req.query.search,
                        $options: "i",
                    },
                },
            ];

        }

        // Filter by type
        if (req.query.type) {

            query.type = req.query.type;

        }

        // Filter by amount
        // Filter by amount range
        if (req.query.minAmount || req.query.maxAmount) {

            query.amount = {};

            if (req.query.minAmount) {
                query.amount.$gte = Number(req.query.minAmount);
            }

            if (req.query.maxAmount) {
                query.amount.$lte = Number(req.query.maxAmount);
            }

        }

        // Date Range Filter
        if (req.query.fromDate || req.query.toDate) {

            query.date = {};

            if (req.query.fromDate) {
                query.date.$gte = new Date(req.query.fromDate);
            }

            if (req.query.toDate) {

                const endDate = new Date(req.query.toDate);

                endDate.setHours(23, 59, 59, 999);

                query.date.$lte = endDate;
            }

        }

        const transactions = await Transaction.find(query)
            .sort({
                date: -1,
                createdAt: -1,
            });

        res.status(200).json({
            success: true,
            count: transactions.length,
            transactions,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

export const getTransactionById = async (req, res) => {
    try {

        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        res.status(200).json({
            success: true,
            transaction,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};


export const updateTransaction = async (req, res) => {
    try {

        const { type, amount, category, description, date } = req.body;

        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        if (type) transaction.type = type;
        if (amount !== undefined) transaction.amount = amount;
        if (category) transaction.category = category.trim();
        if (description !== undefined)
            transaction.description = description.trim();
        if (date) transaction.date = date;

        await transaction.save();

        res.status(200).json({
            success: true,
            message: "Transaction updated successfully",
            transaction,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

export const deleteTransaction = async (req, res) => {
    try {

        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        await transaction.deleteOne();

        res.status(200).json({
            success: true,
            message: "Transaction deleted successfully",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};
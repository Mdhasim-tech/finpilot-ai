import { generateFinancialInsights } from "../services/ai.service.js";

import { getFinancialSummary } from "../services/dashboard.service.js";

export const getDashboardData = async (req, res) => {
    try {

        const dashboard = await getFinancialSummary(req.user._id);

        res.status(200).json({
            success: true,
            dashboard,
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

        const financialSummary =
            await getFinancialSummary(req.user._id);

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
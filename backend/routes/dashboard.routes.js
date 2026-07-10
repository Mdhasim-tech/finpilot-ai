import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
    getDashboardData,
    generateAIInsights,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getDashboardData);

router.get("/insights", authMiddleware, generateAIInsights);

export default router;
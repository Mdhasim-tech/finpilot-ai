import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createTransaction,getTransactions,getTransactionById,updateTransaction,deleteTransaction, } from "../controllers/transaction.controller.js";


const router = express.Router();

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getTransactions);
router.get("/:id", authMiddleware, getTransactionById);
router.put("/:id", authMiddleware, updateTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);

export default router;
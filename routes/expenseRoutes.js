import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import {
  createExpense,
  getExpenses,
  expenseInfo,
  deleteExpense,
  updateExpense,
} from "../controllers/category/expenseController.js";

const router = express.Router();

// All routes passed through the 'auth' middleware
router.post("/", auth, createExpense);
router.get("/", auth, getExpenses);
router.get("/:expenseId", auth, expenseInfo);
router.delete("/:expenseId", auth, deleteExpense);
router.put("/:expenseId", auth, updateExpense);

export default router;

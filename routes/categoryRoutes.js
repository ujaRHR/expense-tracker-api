import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import {
  getCategories,
  categoryInfo,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// All routes passed through the 'auth' middleware
router.post("/", auth, createCategory);
router.get("/", auth, getCategories);
router.get("/:categoryId", auth, categoryInfo);
router.delete("/:categoryId", auth, deleteCategory);
router.put("/:categoryId", auth, updateCategory);

export default router;

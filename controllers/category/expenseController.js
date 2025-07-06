import Expense from "../../models/Expense.js";
import Category from "../../models/Category.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find(
      { user: req.user._id },
      { user: 0, __v: 0 }
    ).populate("category", ["_id", "title"]);

    if (expenses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No expenses found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      expenses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const expenseInfo = async (req, res) => {
  try {
    const expense = await Expense.findOne(
      { user: req.user._id, _id: req.params.expenseId },
      { __v: 0 }
    )
      .populate("user", ["_id", "fullname"])
      .populate("category", ["_id", "title"]);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense fetched successfully",
      expense,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      reason: err.message,
    });
  }
};

export const createExpense = async (req, res) => {
  try {
    const title =
      typeof req.body.title === "string" && req.body.title.length >= 1
        ? req.body.title
        : null;

    const amount = typeof req.body.amount === "number" ? req.body.amount : 0;

    const categoryId =
      typeof req.body.categoryId === "string" ? req.body.categoryId : null;

    const existingCategory = await Category.findOne({ _id: categoryId });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "This category does not exist",
      });
    }

    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount,
      category: categoryId,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Failed to create new expense",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense created successfully",
      expense,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      reason: err.message,
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.expenseId;

    const existingExpense = await Expense.findOne({
      user: req.user._id,
      _id: expenseId,
    });

    if (!existingExpense) {
      return res.status(404).json({
        success: false,
        message: "This expense doesn't exist",
      });
    }

    const deleted = await Expense.deleteOne({
      user: req.user._id,
      _id: expenseId,
    });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Failed to delete the expense",
      });
    }

    res.status(200).json({
      success: true,
      message: "expense deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      reason: err.message,
    });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.expenseId;

    const existingExpense = await Expense.findOne({ _id: expenseId });

    if (!existingExpense) {
      return res.status(404).json({
        success: false,
        message: "This expense does not exist",
      });
    }

    const title =
      typeof req.body.title === "string" && req.body.title.length >= 1
        ? req.body.title
        : existingExpense.title;

    const amount =
      typeof req.body.amount === "number"
        ? req.body.amount
        : existingExpense.amount;

    const category =
      typeof req.body.category === "string" && req.body.category.length >= 1
        ? req.body.category
        : existingExpense.category;

    if (!title || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: "Invalid, please review all informations",
      });
    }

    if (category !== existingExpense.category) {
      const existingCategory = await Category.findOne({
        user: req.user._id,
        _id: category,
      });

      if (!existingCategory) {
        return res.status(404).json({
          success: false,
          message: "This category doesn't exist",
        });
      }
    }

    const updated = await Expense.updateOne(
      { user: req.user._id, _id: expenseId },
      { title, amount, category }
    );

    if (updated.modifiedCount === 0) {
      return res.status(400).json({
        success: false,
        message: "All values are the same or failed to update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      reason: err.message,
    });
  }
};

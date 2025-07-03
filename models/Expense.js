import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const expenseSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;

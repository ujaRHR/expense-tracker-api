import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const categorySchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 25,
      trim: true,
    },
  },
  { timestamps: true }
);

// To avoid duplicate category issue
categorySchema.index({ user: 1, title: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;

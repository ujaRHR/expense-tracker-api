import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const categorySchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 25,
    },
  },
  { timestamps: true }
);

// Compound unique indexing
// To avoid duplicate category issue for each user
categorySchema.index({ userId: 1, name: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;

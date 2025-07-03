import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxLength: 64,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      maxLength: 256,
      minLength: 5,
    },
    password: {
      type: String,
      required: true,
      maxLength: 256,
      minLength: 5,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

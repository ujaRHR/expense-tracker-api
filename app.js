import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

const port = process.env.PORT || 3000;
const dbBase = process.env.DB_BASE;

const app = express();
app.use(express.json());

// Database Setup
mongoose
  .connect(dbBase)
  .then(() => console.log("Database Connected..."))
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

// Assigning route handler
app.use("/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/expenses", expenseRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

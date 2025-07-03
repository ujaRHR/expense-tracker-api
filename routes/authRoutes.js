import express from "express";
import { userSignup } from "../controllers/auth/signupController.js";

const router = express.Router();

router.post("/signup", userSignup);
// router.get("/login", userSignup);

export default router;

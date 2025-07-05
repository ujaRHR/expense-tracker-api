import express from "express";
import { userSignup } from "../controllers/auth/signupController.js";
import { userLogin } from "../controllers/auth/loginController.js";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);

export default router;

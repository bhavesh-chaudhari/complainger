import express from "express";
import * as authController from "../controllers/auth";
import { ensureAuth } from "../middlewares/auth";

const router = express.Router();

// @route   POST /signup
// @desc    Signup User
// @access  Public
router.post("/signup", authController.signup);

// @route   POST /login
// @desc    Login User
// @access  Public
router.post("/login", authController.login);

router.get("/checkAuth", ensureAuth, authController.checkAuth)

export default router
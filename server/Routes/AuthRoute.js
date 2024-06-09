import express from "express";
import {
	logOutUser,
	loginUser,
	registerUser,
} from "../Controllers/AuthController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);

export default router;

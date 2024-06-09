import express from "express";
import {
	deleteUser,
	getAllUsers,
	getUser,
	updateUser,
	countAllUsers,
	countAdmins,
	getAllAdmins,
} from "../Controllers/UserController.js";
import upload from "../utils/upload.js";

const router = express.Router();

// Route to get all users
router.get("/", getAllUsers);

// Route to update a user with image upload
router.put(
	"/",
	upload.fields([
		{ name: "profile_picture", maxCount: 1 },
		{ name: "cover_picture", maxCount: 1 },
	]),
	updateUser
);

// Route to get total users count
router.get("/count", countAllUsers);

// Route to get all admins
router.get("/admins", getAllAdmins);

// Route to get total admins count
router.get("/count/admins", countAdmins);

// Route to get a user by ID
router.get("/:id", getUser);

export default router;

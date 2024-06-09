import express from "express";
import {
	deleteUser,
	getAllReporters,
	getAllUsers,
	getUser,
	updateUser,
	countUsers,
	countAdmins,
} from "../Controllers/UserController.js";
import authMiddleWare from "../Middleware/authMiddleWare.js";

const router = express.Router();

// Route to get all users
router.get("/", getAllUsers);

// Route to get all reporters
router.get("/reporter", getAllReporters);

// Route to get total users count
router.get("/count", countUsers);

// Route to get total admins count
router.get("/count/admins", countAdmins);

// Route to get a user by ID
router.get("/:id", getUser);

// Route to update a user
router.put("/:id", updateUser);
// router.put("/:id", authMiddleWare, updateUser);

// Route to delete a user
router.delete("/:id", authMiddleWare, deleteUser);

export default router;

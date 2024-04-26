// userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const {
	authenticateToken,
} = require("../middlewares/auth");

// Routes for users
router.post("/", userController.createUser);
router.get("/", authenticateToken, userController.getUsers);
router.get(
	"/:id",
	authenticateToken,
	userController.getUserById
);
router.put(
	"/:id",
	authenticateToken,
	userController.updateUserById
);
router.delete(
	"/:id",
	authenticateToken,
	userController.deleteUserById
);

module.exports = router;

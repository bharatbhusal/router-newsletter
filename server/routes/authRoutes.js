// authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const imageHandler = require("../middlewares/image");

// Routes for authentication
router.post(
	"/signup",
	imageHandler.single("dp"),
	authController.signup
);
router.post("/login", authController.login);

module.exports = router;

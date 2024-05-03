// authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");

// Routes for authentication
router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;

const express = require("express");
const newsController = require("../controllers/newsControllers");
const router = express.Router();

// Create news
router.post("/", newsController.createNews);

// Get news
router.get("/:year/:month", newsController.getNewsOfMonth);

// Update news
router.put("/", newsController.updateNews);

// Delete news
router.delete("/", newsController.deleteNews);

module.exports = router;

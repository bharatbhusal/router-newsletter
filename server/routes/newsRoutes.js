const express = require("express");
const newsController = require("../controllers/newsControllers");
const router = express.Router();

// Create news
router.post("/", newsController.createNews);

// Get news
router.get("/:year/:month", newsController.getNewsOfMonth);
// Get news
router.get("/:year/:month/:day", newsController.getNews);

// Get news of whole month

// Update news
router.put("/:id", newsController.updateNews);

// Delete news
router.delete("/:id", newsController.deleteNews);

module.exports = router;

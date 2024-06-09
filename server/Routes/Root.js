import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";
import path from "path";

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.use(/^\/$|\/index(.html)?/, (req, res) => {
	res.sendFile(
		path.join(__dirname, "..", "Public", "html", "index.html")
	);
});

export default router;

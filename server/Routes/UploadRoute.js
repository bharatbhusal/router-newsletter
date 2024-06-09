import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid"; // Import uuid for filename generation

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const uploadFolder = path.join(
	__dirname,
	"..",
	"public",
	"images"
);

// Ensure upload folder exists
if (!fs.existsSync(uploadFolder)) {
	fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadFolder);
	},
	filename: (req, file, cb) => {
		// Generate a unique filename using uuid
		const uniqueFilename =
			uuidv4() + path.extname(file.originalname);
		cb(null, uniqueFilename);
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 10MB
	fileFilter: (req, file, cb) => {
		// Validate file types (e.g., allow only images)
		if (file.mimetype.startsWith("image/")) {
			cb(null, true);
		} else {
			cb(
				new Error(
					"Unsupported file type. Please upload an image."
				),
				false
			);
		}
	},
});

router.post("/", upload.single("file"), (req, res) => {
	try {
		if (!req.file) {
			// No file was uploaded
			return res
				.status(400)
				.json({ error: "No file uploaded" });
		}
		// File uploaded successfully
		res.status(200).json({
			message: "File uploaded successfully",
			filename: req.file.filename,
		});
	} catch (error) {
		// Multer or other internal server error
		res.status(500).json({
			error: "Internal server error",
			details: error.message,
		});
	}
});

export default router;

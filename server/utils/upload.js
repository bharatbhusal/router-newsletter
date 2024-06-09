import { fileURLToPath } from "url";
import multer from "multer";
import path from "path";
import fs from "fs";
import { dirname } from "path";

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define storage configuration for multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		let folder = getUploadFolder(file.fieldname);
		const uploadDir = path.join(
			__dirname,
			"../",
			"./Public",
			"./images",
			folder
		);

		ensureDirectoryExists(uploadDir);

		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		const uniqueSuffix =
			Date.now() + path.extname(file.originalname);
		cb(null, file.fieldname + "-" + uniqueSuffix);
	},
});

// Create multer instance with the storage configuration
const upload = multer({ storage });

// Helper function to determine upload folder based on field name
const getUploadFolder = (fieldName) => {
	switch (fieldName) {
		case "profile_picture":
			return "profile";
		case "cover_picture":
			return "cover";
		default:
			return "others";
	}
};

// Helper function to ensure directory existence
const ensureDirectoryExists = (dirPath) => {
	try {
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath, { recursive: true });
		}
	} catch (err) {
		console.error("Error creating directory:", err);
	}
};

export default upload;

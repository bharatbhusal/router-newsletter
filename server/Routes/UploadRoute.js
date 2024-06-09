import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const uploadFolder = path.join(
	__dirname,
	"..",
	"public",
	"images"
);

if (!fs.existsSync(uploadFolder)) {
	fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadFolder);
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
	try {
		console.log(req.file);
		res
			.status(200)
			.json({ message: "File uploaded successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

export default router;

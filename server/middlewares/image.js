const multer = require("multer");
// Multer setup for image handling
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		console.log(file);
		cb(null, file.originalname);
	},
});
const imageHandler = multer({ storage: storage });

module.exports = imageHandler;

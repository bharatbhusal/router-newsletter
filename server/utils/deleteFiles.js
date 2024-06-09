import fs from "fs";
import path from "path";

// Function to delete a file from the filesystem
const deleteFile = (filePath) => {
	try {
		fs.unlinkSync(filePath);
		console.log(`Deleted file: ${filePath}`);
	} catch (err) {
		console.error(`Error deleting file: ${filePath}`, err);
	}
};

// Function to delete the profile picture
export const deleteProfilePicture = (fileName) => {
	if (!fileName) {
		return; // No file to delete
	}
	const filePath = path.join(
		__dirname,
		"../Public/images/profile",
		fileName
	);
	deleteFile(filePath);
};

// Function to delete the cover picture
export const deleteCoverPicture = (fileName) => {
	if (!fileName) {
		return; // No file to delete
	}
	const filePath = path.join(
		__dirname,
		"../Public/images/cover",
		fileName
	);
	deleteFile(filePath);
};

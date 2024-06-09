import UserModel from "../Models/UserModel.js";
import mongoose from "mongoose";
import {
	decodeToken,
	generateToken,
} from "../Middleware/authMiddleWare.js";
import {
	deleteCoverPicture,
	deleteProfilePicture,
} from "../utils/deleteFiles.js";

// Helper function to remove password from user object
const removePassword = (user) => {
	const { password, ...otherDetails } = user._doc;
	return otherDetails;
};

// Helper function to validate user ID and existence
const validateUserId = async (id) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new Error("Invalid user ID");
	}
	const userExists = await UserModel.exists({ _id: id });
	if (!userExists) {
		throw new Error("User not found");
	}
};

// Get all users
export const getAllUsers = async (req, res) => {
	try {
		let users = await UserModel.find();
		users = users.map(removePassword);
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({
			message: "Error retrieving users",
			error: error.message,
		});
	}
};

// Get total users count
export const countAllUsers = async (req, res) => {
	try {
		const count = await UserModel.countDocuments();
		res.status(200).json(count);
	} catch (error) {
		res.status(500).json({
			message: "Error counting users",
			error: error.message,
		});
	}
};
// Get all admins
export const getAllAdmins = async (req, res) => {
	try {
		const admins = await UserModel.find({
			is_admin: true,
		}).select("-password");
		res.status(200).json(admins);
	} catch (error) {
		res.status(500).json({
			message: "Error retrieving admins",
			error: error.message,
		});
	}
};

// Get total admins count
export const countAdmins = async (req, res) => {
	try {
		const count = await UserModel.countDocuments({
			is_admin: true,
		});
		res.status(200).json(count);
	} catch (error) {
		res.status(500).json({
			message: "Error counting admins",
			error: error.message,
		});
	}
};
// Get a user by ID
export const getUser = async (req, res) => {
	const id = req.params.id;
	try {
		await validateUserId(id);
		const user = await UserModel.findById(id);
		res.status(200).json(removePassword(user));
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
export const updateUser = async (req, res) => {
	try {
		const {
			username,
			email,
			first_name,
			last_name,
			lives_in,
			works_at,
			bio,
		} = req.body;

		// Extract user ID from JWT token
		const token = req.cookies.authToken;
		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const { id } = decodeToken(token);
		if (!id) {
			return res
				.status(403)
				.json({ message: "Invalid token" });
		}
		const user = await UserModel.findById(id);
		deleteProfilePicture(user.profile_picture);
		deleteCoverPicture(user.cover_picture);

		// Get filenames of uploaded images from req.files
		let profileImage = "";
		let coverImage = "";
		if (req.files) {
			if (req.files["profile_picture"]) {
				profileImage = req.files["profile_picture"][0].filename;
			}
			if (req.files["cover_picture"]) {
				coverImage = req.files["cover_picture"][0].filename;
			}
		}

		// Update user with profileImage and coverImage
		const updatedUser = await UserModel.findByIdAndUpdate(
			id,
			{
				username,
				email,
				first_name,
				last_name,
				lives_in,
				works_at,
				bio,
				profile_picture: profileImage,
				cover_picture: coverImage,
			},
			{ new: true }
		);

		res.status(200).json({
			user: removePassword(updatedUser),
		});
	} catch (error) {
		res.status(500).json({
			message: "Error updating user",
			error: error.message,
		});
	}
};

// Delete a user
export const deleteUser = async (req, res) => {
	const id = req.params.id;
	const { _id, currentUserAdminStatus } = req.body;
	if (_id !== id && !currentUserAdminStatus) {
		return res
			.status(403)
			.json(
				"Access Denied! You can only delete your own profile"
			);
	}
	try {
		await UserModel.findByIdAndDelete(id);
		res.status(200).json("User deleted successfully");
	} catch (error) {
		res.status(500).json({
			message: "Error deleting user",
			error: error.message,
		});
	}
};

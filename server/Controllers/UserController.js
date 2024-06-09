import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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

// Get all reporters
export const getAllReporters = async (req, res) => {
	try {
		let users = await UserModel.find({
			isAdmin: true,
		}).select("-password");
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({
			message: "Error retrieving reporters",
			error: error.message,
		});
	}
};

// Get total users count
export const countUsers = async (req, res) => {
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

// Get total admins count
export const countAdmins = async (req, res) => {
	try {
		const count = await UserModel.countDocuments({
			isAdmin: true,
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

// Update a user
export const updateUser = async (req, res) => {
	const id = req.params.id;
	const { _id, password } = req.body;
	if (id !== _id) {
		return res
			.status(403)
			.json(
				"Access Denied! You can only update your own profile"
			);
	}
	try {
		if (password) {
			const salt = await bcrypt.genSalt(10);
			req.body.password = await bcrypt.hash(
				password.toString(),
				salt
			);
		}
		const user = await UserModel.findByIdAndUpdate(
			id,
			req.body,
			{ new: true }
		);
		const token = jwt.sign(
			{ email: user.email, id: user._id },
			process.env.JWT_KEY
		);
		res.status(200).json({ user, token });
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

// Follow a user
export const followUser = async (req, res) => {
	const id = req.params.id;
	const { _id } = req.body;
	if (_id === id) {
		return res.status(403).json("Action forbidden");
	}
	try {
		const followUser = await UserModel.findById(id);
		const followingUser = await UserModel.findById(_id);
		if (!followUser.followers.includes(_id)) {
			await followUser.updateOne({
				$push: { followers: _id },
			});
			await followingUser.updateOne({
				$push: { following: id },
			});
			res.status(200).json("User Followed!");
		} else {
			res.status(403).json("User is already followed by you");
		}
	} catch (error) {
		res.status(500).json({
			message: "Error following user",
			error: error.message,
		});
	}
};

// Unfollow a user
export const UnFollowUser = async (req, res) => {
	const id = req.params.id;
	const { _id } = req.body;
	if (_id === id) {
		return res.status(403).json("Action forbidden");
	}
	try {
		const followUser = await UserModel.findById(id);
		const followingUser = await UserModel.findById(_id);
		if (followUser.followers.includes(_id)) {
			await followUser.updateOne({
				$pull: { followers: _id },
			});
			await followingUser.updateOne({
				$pull: { following: id },
			});
			res.status(200).json("User Unfollowed!");
		} else {
			res.status(403).json("User is not followed by you");
		}
	} catch (error) {
		res.status(500).json({
			message: "Error unfollowing user",
			error: error.message,
		});
	}
};

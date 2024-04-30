// userController.js
const User = require("../models/userModel");

// Controller for creating a new user
const createUser = async (req, res) => {
	try {
		const newUser = await User.create(req.body);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Controller for getting all users
const getUsers = async (req, res) => {
	try {
		const users = await User.find({}, "-password");
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Controller for getting a user by ID
const getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		if (!user) {
			return res
				.status(404)
				.json({ message: "User not found" });
		}
		console.log("Returned user =====> ", user);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Controller for updating a user by ID
const updateUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedUser = await User.findByIdAndUpdate(
			id,
			req.body,
			{ new: true }
		);
		if (!updatedUser) {
			return res
				.status(404)
				.json({ message: "User not found" });
		}
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Controller for deleting a user by ID
const deleteUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedUser = await User.findByIdAndDelete(id);
		if (!deletedUser) {
			return res
				.status(404)
				.json({ message: "User not found" });
		}
		res
			.status(200)
			.json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	createUser,
	getUsers,
	getUserById,
	updateUserById,
	deleteUserById,
};

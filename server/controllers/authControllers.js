const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middlewares/auth");

// Controller for user signup
const signup = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	try {
		// Check if the user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				message: "User already exists",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});
		await newUser.save();
		res.status(201).json({
			message: "User signed up successfully",
			user: {
				id: newUser._id,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				email: newUser.email,
				isReporter: newUser.isReporter,
			},
		});
	} catch (error) {
		res.status(500).json({
			error: "Internal server error",
			message: error.message,
		});
	}
};

// Controller for user login
const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(401)
				.json({ message: "User doesn't exist" });
		}

		const isMatch = await bcrypt.compare(
			password,
			user.password
		);
		if (!isMatch) {
			return res
				.status(401)
				.json({ message: "Incorrect password" });
		}

		const token = generateToken(user._id, user.email); // Generate token using user ID
		res.status(200).json({
			message: "User logged in successfully",
			user: {
				id: user._id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
			},
			token,
		});
	} catch (error) {
		res.status(500).json({
			error: "Internal server error",
			message: error.message,
		});
	}
};

module.exports = {
	signup,
	login,
};

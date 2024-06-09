import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import {
	decodeToken,
	generateToken,
} from "../Middleware/authMiddleWare.js";
import { createUsername } from "../utils/createUsername.js";

// Register new users
export const registerUser = async (req, res) => {
	const { email, password, first_name, last_name } =
		req.body;

	try {
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "User already exists!" });
		}

		const username = createUsername(first_name, last_name);

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new UserModel({
			email: email.trim(),
			password: hashedPassword,
			first_name: first_name.trim(),
			last_name: last_name.trim(),
			username,
		});

		const user = await newUser.save();

		const token = generateToken(
			user._id.toString(),
			user.email
		);
		const { password: userPassword, ...userWithoutPassword } =
			user.toObject();

		// Set token in a cookie named "authToken"
		res.cookie("authToken", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 24 * 60 * 60 * 1000,
			sameSite: "strict",
		});

		const response = {
			user: userWithoutPassword,
			message: "User registered successfully!",
		};

		res.status(201).json(response);
	} catch (error) {
		console.error("Error during registration:", error);
		res.status(500).json({ message: error.message });
	}
};

// Login users
export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await UserModel.findOne({ email });
		if (!user) {
			return res
				.status(404)
				.json({ message: "Incorrect email or password!" });
		}

		const isValidPassword = await bcrypt.compare(
			password,
			user.password
		);
		if (!isValidPassword) {
			return res
				.status(400)
				.json({ message: "Incorrect email or password!" });
		}
		const token = generateToken(
			user._id.toString(),
			user.email
		);

		const { password: userPassword, ...userWithoutPassword } =
			user.toObject();

		// Set token in a cookie named "authToken"
		res.cookie("authToken", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 24 * 60 * 60 * 1000,
			sameSite: "strict",
		});

		const response = {
			user: userWithoutPassword,
			message: "User logged in successfully!",
		};
		res.status(200).json(response);
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({ message: error.message });
	}
};

// Logout users
export const logOutUser = (req, res) => {
	res.clearCookie("authToken");
	res.status(200).json({ message: "User logged out!" });
};

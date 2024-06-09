import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Register new users
export const registerUser = async (req, res) => {
	const { email, password, firstName, lastName } = req.body;
	console.log("req.body:", req.body);
	try {
		const oldUser = await UserModel.findOne({ email });
		if (oldUser) {
			return res
				.status(400)
				.json({ message: "This User already exists!" });
		}

		const username = createUsername(firstName, lastName);

		const saltRounds = 10;
		const hashedPass = await bcrypt.hash(
			password,
			saltRounds
		);

		const newUser = new UserModel({
			...req.body,
			firstName: firstName.trim(), // Remove leading and trailing whitespaces
			lastName: lastName.trim(), // Remove leading and trailing whitespaces
			username: username,
			password: hashedPass,
		});

		const user = await newUser.save();
		const token = jwt.sign(
			{ email: user.email, id: user._id },
			process.env.JWT_KEY,
			{ expiresIn: "1h" }
		);

		// Converting to plain object to remove the password field
		const userObject = user.toObject();
		const { password: userPassword, ...userWithoutPassword } =
			userObject;

		res
			.status(201)
			.json({ user: userWithoutPassword, token });
	} catch (error) {
		console.error("Error during registration:", error);
		res.status(500).json({ message: error.message });
	}
};

// Helper function to create a username with camelCase style
const createUsername = (firstName, lastName) => {
	const formattedFirstName = firstName.trim().toLowerCase();
	const formattedLastName = lastName.trim().toLowerCase();

	const firstNameParts = formattedFirstName.split(" ");
	const lastNameParts = formattedLastName.split(" ");

	const username =
		firstNameParts[0] + // Keep only the first part of firstName
		lastNameParts[0].charAt(0).toUpperCase() +
		lastNameParts[0].slice(1); // Capitalize the first letter of lastName's first part

	return username;
};

// Login users
export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(404).json({
				message:
					"User not found. Please enter the correct email or password!",
			});
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

		const token = jwt.sign(
			{ email: user.email, id: user._id },
			process.env.JWT_KEY,
			{ expiresIn: "1h" }
		);

		const userObject = user.toObject();
		const { password: userPassword, ...userWithoutPassword } =
			userObject;

		res
			.status(200)
			.json({ user: userWithoutPassword, token });
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({ message: error.message });
	}
};

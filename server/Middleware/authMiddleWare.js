import User from "../Models/UserModel.js";
import config from "../config.js";
import jwt from "jsonwebtoken";

const generateToken = (id, email) => {
	const secretKey = config.JWT_KEY;
	const dataToSign = `${id}_${email}`;
	const token = jwt.sign({ dataToSign }, secretKey, {
		expiresIn: "30d",
	});
	return token;
};

const decodeToken = (token) => {
	const secretKey = config.JWT_KEY;
	try {
		const decoded = jwt.verify(token, secretKey);
		const dataToSign = decoded.dataToSign;
		const [id, email] = dataToSign.split("_");
		return { id, email };
	} catch (error) {
		return { userId: "", email: "" };
	}
};

const authenticateToken = async (req, res, next) => {
	try {
		const token = req.cookies.authToken;
		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const { id, email } = decodeToken(token);
		if (!id || !email) {
			return res
				.status(403)
				.json({ message: "Invalid token" });
		}
		const user = await User.findById(id).select("-password");
		if (!user) {
			return res
				.status(401)
				.json({ message: "Invalid token" });
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Internal Server Error" });
	}
};

export { generateToken, decodeToken, authenticateToken };

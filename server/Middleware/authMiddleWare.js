import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import config from "../config.js";

dotenv.config();

const secret = config.JWT_KEY;

const authMiddleWare = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		console.log(req.headers);
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({
				message: "Authorization header is missing or malformed",
			});
		}

		const token = authHeader.split(" ")[1];
		console.log("Token: ", token);

		if (token) {
			const decoded = jwt.verify(token, secret);
			console.log("Decoded: ", decoded);

			req.body._id = decoded?.id;
		} else {
			return res
				.status(401)
				.json({ message: "Token is missing" });
		}

		next();
	} catch (error) {
		console.error("Auth Middleware Error: ", error);
		return res
			.status(401)
			.json({ message: "Unauthorized", error: error.message });
	}
};

export default authMiddleWare;

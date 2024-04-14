const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = () => {
	mongoose
		.connect(process.env.MONGO_URL)
		.then(() => {
			console.log("Connected to MongoDB");
		})
		.catch((error) => {
			console.error("Failed to connect to MongoDB:", error);
		});
};

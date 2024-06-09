import mongoose from "mongoose";
import config from "../config.js";

// Get the MongoDB URI from the configuration
const uri = config.MONGO_CONNECTION_STRING;

// Define the function to connect to the database
const connectDB = async () => {
	try {
		// Connect to the MongoDB database using Mongoose
		await mongoose.connect(uri);
		console.log("Connected to MongoDB Users Database!");
	} catch (error) {
		// Handle connection errors
		console.error(
			`Couldn't connect to database.\n${error.message}`
		);
	}
};

// Export the connectDB function
export default connectDB;

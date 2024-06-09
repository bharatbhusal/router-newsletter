import app from "./app.js";
import config from "./config.js";
import connectDB from "./Config/dbConnection.js";
import mongoose from "mongoose";

/**
 * Start the MongoDB connection.
 * This function initializes the connection to the MongoDB database using the connectDB function from the dbConnection module.
 */
connectDB();

/**
 * Start the HTTP server.
 * This function starts the HTTP server using the app.listen() method, listening on the specified port from the configuration.
 * @param {number} PORT - The port number on which the server should listen for incoming requests.
 */
const startServer = (PORT) => {
	app.listen(PORT, () => {
		console.log(
			`Router Protocol Newsletter Server is running on port ${PORT}`
		);
	});
};

// Get the port from the configuration
const PORT = config.PORT;

// Start the server
startServer(PORT);

// Handle MongoDB connection errors
/**
 * Handle MongoDB connection errors.
 * This event listener logs MongoDB connection errors using the logEvents function from the logger middleware.
 * @param {Error} err - The MongoDB connection error object.
 */
mongoose.connection.on("error", (err) => {
	logEvents(
		`errorName: ${err.name}\terrorMessage: ${err.message}\tsystemCall: ${err.syscall}\thostName: ${err.hostname}`,
		"mongoErrLog.log"
	);
});

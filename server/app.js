import express from "express";
import corsOptions from "./Config/corsOptions.js";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import root from "./Routes/Root.js";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {
	requestLogger,
	errorLogger,
} from "./Middleware/logger.js";

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Logger middleware
app.use(requestLogger);

// CORS middleware
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: "30mb" }));
app.use(
	express.urlencoded({ limit: "30mb", extended: true })
);

// Cookie parser middleware
app.use(cookieParser());

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "Public")));

// Define routes
app.use("/", root);
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);

// Handle 404
app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(
			path.join(
				__dirname,
				"Public",
				"html",
				"PageNotFound.html"
			)
		);
	} else if (req.accepts("json")) {
		res.json({ message: "PAGE NOT FOUND" });
	} else {
		res.type("txt").send("PAGE NOT FOUND");
	}
});

// Error logging middleware
app.use(errorLogger);

export default app;

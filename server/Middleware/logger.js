import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logEvents = async (message, logFileName) => {
	const dateTime = `${format(
		new Date(),
		"yyyyMMdd\tHH:mm:ss"
	)}`;
	const logItem = `dateTime: ${dateTime}\tid: ${uuid()}\t${message}\n`;

	try {
		const logsDir = path.join(__dirname, "..", "logs");
		const logFilePath = path.join(logsDir, logFileName);

		// Create logs directory if it doesn't exist
		if (!fs.existsSync(logsDir)) {
			await fsPromises.mkdir(logsDir);
		}

		// Create log file if it doesn't exist
		if (!fs.existsSync(logFilePath)) {
			await fsPromises.writeFile(logFilePath, "");
		}

		// Append log item to log file
		await fsPromises.appendFile(logFilePath, logItem);
	} catch (error) {
		console.log(error);
	}
};

const requestLogger = (req, res, next) => {
	logEvents(
		`method: "${req.method}"\t path: "${req.originalUrl}"\tuser-agent: "${req.headers["user-agent"]}"\torigin: "${req.headers.origin}"`,
		"reqLog.log"
	);
	next();
};

const errorLogger = (err, req, res, next) => {
	logEvents(
		`errorName: "${err.name}"\terrorMessage: "${err.message}"\tmethod: "${req.method}"\tpath: "${req.url}"\tuserAgent: "${req.headers["user-agent"]}"\torigin: "${req.headers.origin}"`,
		"errLog.log"
	);
	next();
};

export { requestLogger, errorLogger, logEvents };

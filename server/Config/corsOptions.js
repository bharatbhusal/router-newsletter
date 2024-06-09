import allowedOrigins from "./allowedOrigins.js";
const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true); // Allow if origin is in the list or if it's undefined (same origin)
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
export default corsOptions;

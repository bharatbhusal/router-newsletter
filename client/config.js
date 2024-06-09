import { cleanEnv, str } from "envalid";

// Validate and clean environment variables
const env = cleanEnv(import.meta.env, {
	VITE_APP_BACKEND_URL: str(),
	VITE_APP_PUBLIC_FOLDER: str(),
});

// Structure the configuration object
const config = {
	VITE_APP_BACKEND_URL: env.VITE_APP_BACKEND_URL,
	VITE_APP_PUBLIC_FOLDER: env.VITE_APP_PUBLIC_FOLDER,
	// Add more variables as needed
};

export default config;

import { config as dotenvConfig } from "dotenv";
import { cleanEnv, str, port } from "envalid";

const loadEnvFile = () => {
	const envFile =
		process.env.NODE_ENV === "production"
			? ".env.production"
			: ".env.development";

	dotenvConfig({ path: envFile });
};

const loadConfig = () => {
	const config = cleanEnv(process.env, {
		MONGO_CONNECTION_STRING: str(),
		JWT_KEY: str(),
		PORT: port(),
	});

	return config;
};

loadEnvFile();

const config = loadConfig();

export default config;

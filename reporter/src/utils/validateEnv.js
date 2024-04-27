import { cleanEnv, str } from "envalid";

export default cleanEnv(process.env, {
	REACT_APP_SERVER_URL: str(),
	REACT_APP_SOCIAL_LINKEDIN: str(),
	REACT_APP_SOCIAL_FACEBOOK: str(),
	REACT_APP_SOCIAL_GITHUB: str(),
	REACT_APP_SOCIAL_TWITTER: str(),
	REACT_APP_SOCIAL_INSTAGRAM: str(),
});

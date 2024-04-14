import React from "react";

import { BsLinkedin } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { IoLogoTwitter } from "react-icons/io";
import { FiInstagram } from "react-icons/fi";
import env from "../utils/validateEnv";
const Footer = () => {
	return (
		<div className="footer flex space-around">
			<div className="footer-socials  flex space-around">
				<a
					href={env.REACT_APP_SOCIAL_LINKEDIN}
					target="_blank"
					rel="noreferrer"
				>
					<BsLinkedin />
				</a>
				<a
					href={env.REACT_APP_SOCIAL_FACEBOOK}
					target="_blank"
					rel="noreferrer"
				>
					<BsFacebook />
				</a>
				<a
					href={env.REACT_APP_SOCIAL_GITHUB}
					target="_blank"
					rel="noreferrer"
				>
					<BsGithub />
				</a>
				<a
					href={env.REACT_APP_SOCIAL_TWITTER}
					target="_blank"
					rel="noreferrer"
				>
					<IoLogoTwitter />
				</a>
				<a
					href={env.REACT_APP_SOCIAL_INSTAGRAM}
					target="_blank"
					rel="noreferrer"
				>
					<FiInstagram />
				</a>
			</div>
		</div>
	);
};

export default Footer;

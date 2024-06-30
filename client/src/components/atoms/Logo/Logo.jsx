// Logo.jsx

import React from "react";
import "./Logo.css"; // Import CSS file for styling
import logoImage from "../../../assets/Logo.png";

const Logo = ({ type = "square", alt }) => {
	const containerClass = `logo ${type === "circular" ? "circular" : ""}`;

	return (
		<div className={containerClass}>
			<img src={logoImage} alt={alt} className="logo-image" />
		</div>
	);
};

export default Logo;

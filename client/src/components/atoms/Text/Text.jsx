// Text.jsx

import React from "react";
import "./Text.css"; // Import CSS file for styling

const Text = ({ variant = "body", children }) => {
	const textClass = `text ${variant}`;

	return <p className={textClass}>{children}</p>;
};

export default Text;

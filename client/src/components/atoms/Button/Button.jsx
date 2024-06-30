// Button.jsx

import React from "react";
import "./Button.css"; // Import CSS file for styling

const Button = ({ label, onClick, primary }) => {
	const buttonClass = primary
		? "button-primary"
		: "button-secondary";

	return (
		<button
			className={`button ${buttonClass}`}
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default Button;

// Button.jsx

import React from "react";
import "./Button.css"; // Import CSS file for styling

const Button = ({
	label,
	onClick,
	type = "primary",
	disabled = false,
}) => {
	const buttonClass = `button button-${type} `;

	return (
		<button
			className={buttonClass}
			onClick={onClick}
			disabled={disabled}
		>
			{label}
		</button>
	);
};

export default Button;

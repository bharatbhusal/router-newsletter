// Input.jsx

import React from "react";
import "./InputBox.css"; // Import CSS file for styling

const Input = ({
	type = "text",
	placeholder,
	value,
	onChange,
	disabled = false,
}) => {
	return (
		<input
			type={type}
			className="input"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			disabled={disabled}
		/>
	);
};

export default Input;

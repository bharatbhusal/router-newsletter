// Input.jsx

import React from "react";
import "./InputBox.css"; // Import CSS file for styling

const InputBox = ({
	type = "text",
	placeholder,
	value,
	onChange,
	disabled = false,
	name,
}) => {
	return (
		<input
			type={type}
			name={name}
			className="input"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			disabled={disabled}
		/>
	);
};

export default InputBox;

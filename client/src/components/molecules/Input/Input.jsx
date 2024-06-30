// Input.js

import React from "react";
import InputBox from "../../atoms/InputBox/InputBox";
import Button from "../../atoms/Button/Button";
import "./Input.css";

const Input = ({ label, placeholder }) => {
	return (
		<div className="input-container">
			<label className="input-label">{label}</label>
			<div className="input-content">
				<InputBox placeholder={placeholder} />
			</div>
		</div>
	);
};

export default Input;

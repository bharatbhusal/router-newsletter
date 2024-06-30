import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/Button/Button";
import InputBox from "../../atoms/InputBox/InputBox";
import "./Form.css";

const Form = ({ heading, fields, onSubmit }) => {
	const initialValues = fields.reduce((acc, field) => {
		acc[field.name] = field.value || "";
		return acc;
	}, {});

	const [formData, setFormData] = useState(initialValues);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			<h2>{heading}</h2>
			{fields.map((field, index) => (
				<InputBox
					key={index}
					type={field.type}
					name={field.name}
					value={formData[field.name]}
					onChange={handleChange}
					placeholder={field.placeholder}
					className="form-input"
				/>
			))}
			<Button
				type="primary"
				className="form-button"
				label="Submit"
			/>
		</form>
	);
};

Form.propTypes = {
	fields: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			value: PropTypes.string,
			placeholder: PropTypes.string,
		})
	).isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default Form;

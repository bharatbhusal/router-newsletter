// Form.stories.jsx

import React from "react";
import Form from "./Form";

export default {
	title: "Components/Organisms/Form",
	component: Form,
};

const Template = (args) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {
	fields: [
		{
			type: "text",
			name: "firstName",
			placeholder: "First Name",
		},
		{
			type: "text",
			name: "lastName",
			placeholder: "Last Name",
		},
		{
			type: "email",
			name: "email",
			placeholder: "Email Address",
		},
		{
			type: "password",
			name: "password",
			placeholder: "Password",
		},
	],
	heading: "Sign Up",
	onSubmit: (formData) => {
		console.log("Form Data:", formData);
	},
};

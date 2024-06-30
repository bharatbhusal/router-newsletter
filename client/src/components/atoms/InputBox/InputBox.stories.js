// Input.stories.jsx

import React from "react";
import Input from "./InputBox";

export default {
	title: "Components/Input", // Title of the story category in Storybook UI
	component: Input, // Component being documented
	argTypes: {
		type: {
			control: {
				type: "select",
				options: ["text", "password"], // Options for input type
			},
		},
		placeholder: { control: "text" }, // Control for placeholder prop
		value: { control: "text" }, // Control for value prop
		onChange: { action: "changed" }, // Mock action for onChange event
		disabled: { control: "boolean" }, // Control for disabled prop
	},
};

// Template for the input component
const Template = (args) => <Input {...args} />;

// Text Input
export const Text = Template.bind({});
Text.args = {
	type: "text",
	placeholder: "Enter text...",
};

// Password Input
export const Password = Template.bind({});
Password.args = {
	type: "password",
	placeholder: "Enter password...",
};

// Disabled Input
export const Disabled = Template.bind({});
Disabled.args = {
	type: "text",
	placeholder: "Disabled input...",
	disabled: true,
};

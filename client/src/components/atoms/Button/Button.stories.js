// Button.stories.jsx

import React from "react";
import Button from "./Button";
import "../../../variables.css";
export default {
	title: "Components/Button", // Title of the story category in Storybook UI
	component: Button, // Component being documented
	argTypes: {
		onClick: { action: "clicked" }, // Mock action for onClick event
		type: {
			control: {
				type: "select",
				options: [
					"primary",
					"secondary",
					"danger",
					"warning",
					"hover",
					"disabled",
				],
			},
		},
		label: { control: "text" }, // Control for label prop
		disabled: { control: "boolean" }, // Control for disabled prop
	},
};

// Template for the button component
const Template = (args) => <Button {...args} />;

// Primary Button
export const Primary = Template.bind({});
Primary.args = {
	type: "primary",
	label: "Primary Button",
};

// Secondary Button
export const Secondary = Template.bind({});
Secondary.args = {
	type: "secondary",
	label: "Secondary Button",
};

// Danger Button
export const Danger = Template.bind({});
Danger.args = {
	type: "danger",
	label: "Danger Button",
};

// Warning Button
export const Warning = Template.bind({});
Warning.args = {
	type: "warning",
	label: "Warning Button",
};

// Disabled Button
export const Disabled = Template.bind({});
Disabled.args = {
	type: "disabled",
	label: "Disabled Button",
	disabled: true,
};

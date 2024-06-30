// Button.stories.jsx

import React from "react";
import Button from "./Button";

export default {
	title: "Components/Button", // Title of the story category in Storybook UI
	component: Button, // Component being documented
	argTypes: {
		onClick: { action: "clicked" }, // Mock action for onClick event
		primary: { control: "boolean" }, // Control for primary prop
		label: { control: "text" }, // Control for label prop
	},
};

// Template for the button component
const Template = (args) => <Button {...args} />;

// Primary Button
export const Primary = Template.bind({});
Primary.args = {
	primary: true,
	label: "Primary Button",
};

// Secondary Button
export const Secondary = Template.bind({});
Secondary.args = {
	primary: false,
	label: "Secondary Button",
};

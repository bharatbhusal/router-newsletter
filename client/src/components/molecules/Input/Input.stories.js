// Input.stories.jsx

import React from "react";
import Input from "./Input";

export default {
	title: "Components/molecules/Input",
	component: Input,
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: "Email",
	placeholder: "Enter your email",
	buttonText: "Submit",
	onClick: () => alert("Button clicked!"),
};

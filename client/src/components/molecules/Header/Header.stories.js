// Header.stories.jsx

import React from "react";
import Header from "./Header";
import "../../../variables.css";

export default {
	title: "Components/molecules/Header", // Title of the story category in Storybook UI
	component: Header, // Component being documented
};

// Template for the Header component
const Template = (args) => <Header {...args} />;

// Default Header
export const Default = Template.bind({});

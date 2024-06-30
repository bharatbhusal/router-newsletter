// Footer.stories.jsx

import React from "react";
import Footer from "./Footer";

export default {
	title: "Components/molecules/Footer",
	component: Footer,
};

const Template = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {};

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
	stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"], // Define where Storybook looks for stories
	addons: [
		"@storybook/addon-links", // Essential links addon
		"@storybook/addon-essentials", // Essential addons (like actions and controls)
		"@storybook/preset-create-react-app", // Preset for Create React App projects
		"@storybook/addon-onboarding", // Onboarding addon for guided tours
		"@storybook/addon-interactions", // Addon for interactions
	],
	framework: {
		name: "@storybook/react-webpack5", // Framework for React with webpack 5
		options: {
			builder: {
				useSWC: true, // Use SWC as the JavaScript/TypeScript compiler
			},
		},
	},
	docs: {
		autodocs: "tag", // Autogenerate docs based on tags
	},
	staticDirs: ["../public"], // Serve static files from the public directory
};

export default config;

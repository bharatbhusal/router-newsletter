// Helper function to create a username with camelCase style
export const createUsername = (firstName, lastName) => {
	const formattedFirstName = firstName.trim().toLowerCase();
	const formattedLastName = lastName.trim().toLowerCase();

	const firstNameParts = formattedFirstName.split(" ");
	const lastNameParts = formattedLastName.split(" ");

	const username =
		firstNameParts[0] + // Keep only the first part of firstName
		lastNameParts[0].charAt(0).toUpperCase() +
		lastNameParts[0].slice(1); // Capitalize the first letter of lastName's first part

	return username;
};

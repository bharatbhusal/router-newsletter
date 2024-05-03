// userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	isReporter: {
		type: Boolean,
		default: false,
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;

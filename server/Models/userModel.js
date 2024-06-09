import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		username: {
			type: String,
			required: true,
		},
		profilePicture: String,
		coverPicture: String,
		about: String,
		livesIn: String,
		worksAt: String,
		country: String,
	},
	{ timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;

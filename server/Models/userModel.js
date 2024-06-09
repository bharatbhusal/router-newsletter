import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		first_name: {
			type: String,
			required: [true, "First name is required"],
			trim: true,
		},
		last_name: {
			type: String,
			required: [true, "Last name is required"],
			trim: true,
		},
		is_admin: {
			type: Boolean,
			default: false,
		},
		username: {
			type: String,
			required: [true, "Username is required"],
			trim: true,
		},
		profile_picture: {
			type: String,
			trim: true,
		},
		cover_picture: {
			type: String,
			trim: true,
		},
		bio: {
			type: String,
			trim: true,
		},
		lives_in: {
			type: String,
			trim: true,
		},
		works_at: {
			type: String,
			trim: true,
		},
	},
	{ timestamps: true }
);

// Index on email field to ensure uniqueness and improve query performance
userSchema.index({ email: 1 });

// Index on username field to ensure uniqueness and improve query performance
userSchema.index({ username: 1 });

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

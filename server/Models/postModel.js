import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		posted_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Posted By is required"],
		},
		headline: {
			type: String,
			required: [true, "Headline is required"],
			trim: true,
		},
		source: {
			type: String,
			required: [true, "Source is required"],
			unique: [true, "Source must be unique"],
			trim: true,
		},
		summary: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

// Add an index to improve query performance on user_id and source
postSchema.index({ user_id: 1, source: 1 });

// Define a virtual for populating user details
postSchema.virtual("user", {
	ref: "User",
	localField: "user_id",
	foreignField: "_id",
	justOne: true,
});

// Ensure virtual fields are serialized
postSchema.set("toObject", { virtuals: true });
postSchema.set("toJSON", { virtuals: true });

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;

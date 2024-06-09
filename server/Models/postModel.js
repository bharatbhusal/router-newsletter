import mongoose from "mongoose";

const postSchema = mongoose.Schema(
	{
		userId: { type: String, required: true },
		headline: { type: String, required: true },
		source: { type: String, required: true, unique: true },
		summary: { type: String, required: false },
	},
	{
		timestamps: true,
	}
);

const postModel = mongoose.model("Posts", postSchema);

export default postModel;

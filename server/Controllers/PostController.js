import postModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";

// Helper function to get date range
const getDateRange = (start, end) => ({
	createdAt: { $gte: start, $lte: end },
});

// Helper function to get the start of a day
const getStartOfDay = (date) => {
	date.setHours(0, 0, 0, 0);
	return date;
};

// Helper function to get the start of a week
const getStartOfWeek = (date) => {
	const firstDay = date.getDate() - date.getDay();
	return getStartOfDay(new Date(date.setDate(firstDay)));
};

// Helper function to get the start of a month
const getStartOfMonth = (date) => {
	date.setDate(1);
	return getStartOfDay(date);
};

// Helper function to get the start of a year
const getStartOfYear = (date) => {
	date.setMonth(0, 1);
	return getStartOfDay(date);
};

// Create new post
export const createPost = async (req, res) => {
	const newPost = new postModel(req.body);

	try {
		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get a post
export const getPost = async (req, res) => {
	const { id } = req.params;

	try {
		const post = await postModel.findById(id);
		if (!post) {
			return res
				.status(404)
				.json({ message: "Post not found" });
		}
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Count all posts
export const countAllPosts = async (req, res) => {
	try {
		const count = await postModel.countDocuments();
		res.status(200).json(count);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Count today's posts
export const countTodayPosts = async (req, res) => {
	try {
		const startOfDay = getStartOfDay(new Date());
		const endOfDay = new Date(startOfDay);
		endOfDay.setDate(startOfDay.getDate() + 1);

		const count = await postModel.countDocuments({
			createdAt: { $gte: startOfDay, $lt: endOfDay },
		});
		res.status(200).json(count);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Count this week's posts
export const countThisWeekPosts = async (req, res) => {
	try {
		const startOfWeek = getStartOfWeek(new Date());
		const endOfWeek = new Date(startOfWeek);
		endOfWeek.setDate(startOfWeek.getDate() + 7);

		const count = await postModel.countDocuments({
			createdAt: { $gte: startOfWeek, $lt: endOfWeek },
		});
		res.status(200).json(count);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Count this month's posts
export const countThisMonthPosts = async (req, res) => {
	try {
		const startOfMonth = getStartOfMonth(new Date());
		const endOfMonth = new Date(startOfMonth);
		endOfMonth.setMonth(startOfMonth.getMonth() + 1);

		const count = await postModel.countDocuments({
			createdAt: { $gte: startOfMonth, $lt: endOfMonth },
		});
		res.status(200).json(count);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Count this year's posts
export const countThisYearPosts = async (req, res) => {
	try {
		const startOfYear = getStartOfYear(new Date());
		const endOfYear = new Date(startOfYear);
		endOfYear.setFullYear(startOfYear.getFullYear() + 1);

		const count = await postModel.countDocuments({
			createdAt: { $gte: startOfYear, $lt: endOfYear },
		});
		res.status(200).json(count);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update a post
export const updatePost = async (req, res) => {
	const { id } = req.params;
	const { userId, ...rest } = req.body;

	try {
		const post = await postModel.findById(id);
		if (post.userId !== userId) {
			console.log(post.userId, userId);

			return res
				.status(403)
				.json({ message: "Action forbidden" });
		}

		const updatedPost = await post.updateOne(
			{ $set: rest },
			{ new: true }
		);
		res.status(200).json({
			message: "Post updated successfully",
			updatedPost,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Delete a post
export const deletePost = async (req, res) => {
	const { postId } = req.params;
	const { userId } = req.body;
	console.log(req.params, req.body);

	try {
		const post = await postModel.findById(postId);
		if (post.userId !== userId) {
			return res
				.status(403)
				.json({ message: "Action forbidden" });
		}

		await post.deleteOne();
		res
			.status(200)
			.json({ post, message: "Post deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Like/Dislike a post
export const like_dislike_Post = async (req, res) => {
	const { id } = req.params;
	const { userId } = req.body;

	try {
		const post = await postModel.findById(id);
		const action = post.likes.includes(userId)
			? "$pull"
			: "$push";
		await post.updateOne({ [action]: { likes: userId } });

		res.status(200).json({
			message:
				action === "$push" ? "Post liked" : "Post unliked",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// My posts
export const myPosts = async (req, res) => {
	const { id } = req.params;

	try {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res
				.status(400)
				.json({ message: "Invalid user ID" });
		}

		const posts = await postModel
			.find({ userId: id })
			.sort({ createdAt: -1 });
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({
			message:
				"An error occurred while fetching the user's posts",
			error: error.message,
		});
	}
};

// Posts by date range
const getPostsByDateRange = async (
	startDate,
	endDate,
	res
) => {
	try {
		const posts = await postModel
			.find(getDateRange(startDate, endDate))
			.sort({ createdAt: -1 });
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getTodayPosts = async (req, res) => {
	const startOfDay = new Date().setHours(0, 0, 0, 0);
	const endOfDay = new Date().setHours(23, 59, 59, 999);
	await getPostsByDateRange(
		new Date(startOfDay),
		new Date(endOfDay),
		res
	);
};

export const getThisWeekPosts = async (req, res) => {
	const startOfWeek = new Date();
	startOfWeek.setDate(
		startOfWeek.getDate() - startOfWeek.getDay()
	);
	startOfWeek.setHours(0, 0, 0, 0);

	const endOfWeek = new Date();
	endOfWeek.setDate(
		endOfWeek.getDate() + (6 - endOfWeek.getDay())
	);
	endOfWeek.setHours(23, 59, 59, 999);

	await getPostsByDateRange(startOfWeek, endOfWeek, res);
};

export const getThisMonthPosts = async (req, res) => {
	const startOfMonth = new Date();
	startOfMonth.setDate(1);
	startOfMonth.setHours(0, 0, 0, 0);

	const endOfMonth = new Date(
		startOfMonth.getFullYear(),
		startOfMonth.getMonth() + 1,
		0
	);
	endOfMonth.setHours(23, 59, 59, 999);

	await getPostsByDateRange(startOfMonth, endOfMonth, res);
};

export const getThisYearPosts = async (req, res) => {
	const startOfYear = new Date(
		new Date().getFullYear(),
		0,
		1
	);
	const endOfYear = new Date(
		new Date().getFullYear(),
		11,
		31
	);
	endOfYear.setHours(23, 59, 59, 999);

	await getPostsByDateRange(startOfYear, endOfYear, res);
};

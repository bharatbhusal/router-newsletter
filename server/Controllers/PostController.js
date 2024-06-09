import PostModel from "../Models/PostModel.js";
import { decodeToken } from "../Middleware/authMiddleWare.js";

// Constants and Helper Functions
const getDateRange = (start, end) => ({
	createdAt: { $gte: start, $lte: end },
});

const getStartOfDay = (date) => {
	date.setHours(0, 0, 0, 0);
	return date;
};

const getStartOfWeek = (date) => {
	const firstDay = date.getDate() - date.getDay();
	return getStartOfDay(new Date(date.setDate(firstDay)));
};

const getStartOfMonth = (date) => {
	date.setDate(1);
	return getStartOfDay(date);
};

const getStartOfYear = (date) => {
	date.setMonth(0, 1);
	return getStartOfDay(date);
};

const getPostsByDateRange = async (
	startDate,
	endDate,
	res
) => {
	try {
		const posts = await PostModel.find(
			getDateRange(startDate, endDate)
		).sort({ createdAt: -1 });
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get a post
export const getPost = async (req, res) => {
	const { id } = req.params;
	try {
		const post = await PostModel.findById(id);
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
		const count = await PostModel.countDocuments();
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

		const count = await PostModel.countDocuments({
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

		const count = await PostModel.countDocuments({
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

		const count = await PostModel.countDocuments({
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

		const count = await PostModel.countDocuments({
			createdAt: { $gte: startOfYear, $lt: endOfYear },
		});
		res.status(200).json(count);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const myPosts = async (req, res) => {
	try {
		const token = req.cookies.authToken;
		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const { id } = decodeToken(token);
		if (!id) {
			return res
				.status(403)
				.json({ message: "Invalid token" });
		}
		const posts = await PostModel.find({
			posted_by: id,
		}).sort({
			createdAt: -1,
		});
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({
			message:
				"An error occurred while fetching the user's posts",
			error: error.message,
		});
	}
};

// Create new post
export const createPost = async (req, res) => {
	const { headline, source, summary } = req.body;
	const token = req.cookies.authToken;

	try {
		const { id } = decodeToken(token);
		if (!id) {
			return res
				.status(403)
				.json({ message: "Invalid token" });
		}

		const newPost = new PostModel({
			headline,
			source,
			summary,
			posted_by: id,
		});

		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update a post
export const updatePost = async (req, res) => {
	const { id } = req.params;
	const { headline, source, summary } = req.body;
	const token = req.cookies.authToken;

	try {
		const { id: userId } = decodeToken(token);
		if (!userId) {
			return res
				.status(403)
				.json({ message: "Invalid token" });
		}

		const post = await PostModel.findById(id);
		if (!post) {
			return res
				.status(404)
				.json({ message: "Post not found" });
		}

		if (post.posted_by.toString() !== userId) {
			return res
				.status(403)
				.json({ message: "Action forbidden" });
		}

		const updatedPost = await PostModel.findByIdAndUpdate(
			id,
			{ $set: { headline, source, summary } },
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
	const { id } = req.params;
	const token = req.cookies.authToken;

	try {
		const { id: userId } = decodeToken(token);
		if (!userId) {
			return res
				.status(403)
				.json({ message: "Invalid token" });
		}

		const post = await PostModel.findById(id);
		if (!post) {
			return res
				.status(404)
				.json({ message: "Post not found" });
		}

		if (post.posted_by.toString() !== userId) {
			return res
				.status(403)
				.json({ message: "Action forbidden" });
		}

		await PostModel.findByIdAndDelete(id);
		res
			.status(200)
			.json({ message: "Post deleted successfully" });
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
	const startOfWeek = getStartOfWeek(new Date());
	const endOfWeek = new Date(startOfWeek);
	endOfWeek.setDate(startOfWeek.getDate() + 7);

	await getPostsByDateRange(startOfWeek, endOfWeek, res);
};

export const getThisMonthPosts = async (req, res) => {
	const startOfMonth = getStartOfMonth(new Date());
	const endOfMonth = new Date(startOfMonth);
	endOfMonth.setMonth(startOfMonth.getMonth() + 1);

	await getPostsByDateRange(startOfMonth, endOfMonth, res);
};

export const getThisYearPosts = async (req, res) => {
	const startOfYear = getStartOfYear(new Date());
	const endOfYear = new Date(startOfYear);
	endOfYear.setFullYear(startOfYear.getFullYear() + 1);

	await getPostsByDateRange(startOfYear, endOfYear, res);
};

const News = require("../models/newsModel");

exports.getNews = async (req, res) => {
	try {
		const { year, month, day } = req.params;
		const news = await News.find();
		const filteredNews = news.filter((item) => {
			return (
				item.date.year === parseInt(year) &&
				item.date.month === parseInt(month) &&
				item.date.day === parseInt(day)
			);
		});
		console.log("Returned news =====> ", filteredNews);
		res.status(200).json(filteredNews);
	} catch (error) {
		res.status(500).json({
			error: "Internal server error",
			message: error.message,
		});
	}
};

// Read by ID
exports.getNewsById = async (req, res) => {
	try {
		const { id } = req.params;
		const newsItem = await News.findById(id);
		if (!newsItem) {
			return res
				.status(404)
				.json({ message: "News not found" });
		}
		console.log("Returned news =====> ", newsItem);
		res.status(200).json(newsItem);
	} catch (error) {
		res.status(500).json({
			error: "Internal server error",
			message: error.message,
		});
	}
};

// Read

exports.getNewsOfMonth = async (req, res) => {
	try {
		const { year, month } = req.params;
		console.log(year, month);
		const news = await News.find();
		const filteredNews = news.filter((item) => {
			return (
				item.date.year === parseInt(year) &&
				item.date.month === parseInt(month)
			);
		});

		console.log("Returned news =====> ", filteredNews);
		res.status(200).json(filteredNews);
	} catch (error) {
		res.status(500).json({
			error: "Internal server error",
			message: error.message,
		});
	}
};

// Create
exports.createNews = async (req, res) => {
	try {
		const existingNews = await News.findOne({
			source: req.body.source,
		});
		if (existingNews) {
			res.status(400).json({
				message: "News already exists",
				existingNews,
			});
		} else {
			const news = new News(req.body);
			await news.save();
			console.log("Saved news =====> ", news);
			res
				.status(201)
				.json({ message: "News created successfully", news });
		}
	} catch (error) {
		res.status(500).json({
			error: "Internal server error",
			message: error.message,
		});
	}
};

// Update
exports.updateNews = async (req, res) => {
	try {
		console.log(req.body);
		const { headline, source, summary, reporter } = req.body;
		const newsItem = await News.findById(req.params.id);
		if (!newsItem) {
			return res
				.status(404)
				.json({ message: "News not found" });
		}
		if (newsItem.reporter !== reporter) {
			return res.status(403).json({
				message: "Can't Edit or Delete other's news.",
			});
		}
		const newsItems = await News.find({ source });
		if (newsItems.length > 1) {
			return res.status(400).json({
				message: "News already exists",
				newsItems,
			});
		}
		const updatedNews = await News.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{
				headline,
				source,
				summary,
			},
			{ new: true }
		);
		console.log("Updated news =====> ", updatedNews);
		res.status(200).json({
			message: "News updated successfully",
			updatedNews,
		});
	} catch (error) {
		res.status(500).json({
			error: "Internal server error",
			message: error.message,
		});
	}
};
exports.deleteNews = async (req, res) => {
	try {
		const { reporter } = req.body;
		const newsItem = await News.findById(req.params.id);
		if (!newsItem) {
			return res.status(404).json({ error: "News not found" });
		}
		if (newsItem.reporter !== reporter) {
			return res.status(403).json({
				message: "Can't Delete or Edit other's news.",
			});
		}
		const deletedNews = await News.findOneAndDelete({
			_id: req.params.id,
		});
		console.log("Deleted news id =====> ", req.params.id);
		res.status(200).json({
			message: "News deleted successfully",
			deletedNews,
		});
	} catch (error) {
		res.status(500).json({
			error: "Internal server error",
			message: error.message,
		});
	}
};

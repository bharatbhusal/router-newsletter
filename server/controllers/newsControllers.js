const News = require("../models/newsModel");

// Create
exports.createNews = async (req, res) => {
	try {
		const existingNews = await News.findOne({
			source: req.body.source,
		});
		if (existingNews) {
			res.status(400).json({
				error: "News with this source already exists",
			});
		} else {
			const news = new News(req.body);
			await news.save();
			res.status(201).json(news);
		}
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.getNews = async (req, res) => {
	try {
		const { year, month, day } = req.params;
		console.log(year, month, day);
		const news = await News.find();
		const filteredNews = news.filter((item) => {
			return (
				item.date.year === parseInt(year) &&
				item.date.month === parseInt(month) &&
				item.date.day === parseInt(day)
			);
		});

		console.log(filteredNews);
		res.status(200).json(filteredNews);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
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
				.json({ error: "News item not found" });
		}
		res.status(200).json(newsItem);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
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

		console.log(filteredNews);
		res.status(200).json(filteredNews);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};

// Update
exports.updateNews = async (req, res) => {
	try {
		console.log(req.body);
		const { headline, source, summary } = req.body;
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
		console.log(updatedNews);
		if (!updatedNews) {
			return res.status(404).json({ error: "News not found" });
		}
		res.status(200).json(updatedNews);
	} catch (error) {
		res.status(500).json({
			error: "Internal server error",
			message: error.message,
		});
	}
};

exports.deleteNews = async (req, res) => {
	try {
		const deletedNews = await News.findOneAndDelete({
			_id: req.params.id,
		});
		if (!deletedNews) {
			return res.status(404).json({ error: "News not found" });
		}
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

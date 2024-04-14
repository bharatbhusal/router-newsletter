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

// Read;
exports.getNews = async (req, res) => {
	try {
		const { year, month, day } = req.params;
		const news = await News.find();
		const filteredNews = news.filter((item) => {
			const itemYear = new Date(item.date).getFullYear();
			const itemMonth = new Date(item.date).getMonth() + 1;
			const itemDay = new Date(item.date).getDate();
			return (
				itemYear === parseInt(year) &&
				itemMonth === parseInt(month) &&
				itemDay === parseInt(day)
			);
		});
		res.status(200).json(filteredNews);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};

// Read

exports.getNewsOfMonth = async (req, res) => {
	try {
		const { year, month } = req.params;
		const news = await News.find();
		const newsByDay = {};
		news.forEach((item) => {
			const itemYear = new Date(item.date).getFullYear();
			const itemMonth = new Date(item.date).getMonth() + 1;
			const itemDay = new Date(item.date).getDate();
			if (
				itemYear === parseInt(year) &&
				itemMonth === parseInt(month)
			) {
				if (!newsByDay[itemDay]) {
					newsByDay[itemDay] = [];
				}
				newsByDay[itemDay].push(item);
			}
		});
		res.status(200).json(newsByDay);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};

// Update
exports.updateNews = async (req, res) => {
	try {
		const { headline, source, summary } = req.body;
		console.log(req.body);
		console.log(req.params.id);
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

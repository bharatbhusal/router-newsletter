const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
	{
		headline: String,
		source: String,
		summary: String,
		reporter: {
			type: String,
			default: "https://t.me/Petermartin0",
		},
		date: {
			year: {
				type: Number,
				default: new Date().getFullYear(),
			},
			month: {
				type: Number,
				default: new Date().getMonth() + 1,
			},
			day: {
				type: Number,
				default: new Date().getDate(),
			},
		},
	},
	{ timestamps: true }
);

const News = mongoose.model("News", newsSchema);

module.exports = News;

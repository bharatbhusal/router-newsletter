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
				default: new Date().toLocaleString("en-IN", {
					timeZone: "Asia/Kolkata",
					year: "numeric",
				}),
			},
			month: {
				type: Number,
				default: new Date().toLocaleString("en-IN", {
					timeZone: "Asia/Kolkata",
					month: "numeric",
				}),
			},
			day: {
				type: Number,
				default: new Date().toLocaleString("en-IN", {
					timeZone: "Asia/Kolkata",
					day: "numeric",
				}),
			},
		},
	},
	{ timestamps: true }
);

const News = mongoose.model("News", newsSchema);

module.exports = News;

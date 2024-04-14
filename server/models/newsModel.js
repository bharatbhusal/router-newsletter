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
		date: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

const News = mongoose.model("News", newsSchema);

module.exports = News;

import React, { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { getOneMonthNews } from "../api";
import { months, getCurrentMonth } from "../utils/months";

import {
	generateTextContent,
	copyToClipboard,
} from "../utils/downloader";

const MonthlyView = ({ month }) => {
	month = month || getCurrentMonth();
	const [newsMonthData, setNewsMonthData] = useState();

	useEffect(() => {
		async function fetchData() {
			const result = await getOneMonthNews(2024, month);
			console.log(result);
			setNewsMonthData(result);
		}
		fetchData();
	}, [month]);

	const [showCopiedMessage, setShowCopiedMessage] =
		useState(false); // State to manage the visibility of the "Copied to clipboard" message

	if (
		!newsMonthData ||
		Object.keys(newsMonthData).length === 0
	) {
		return (
			<div className="table-mini">
				<div className="future flex space-around">
					You are in the future
				</div>
			</div>
		);
	}

	const CopyToClipboard = ({ newsDay }) => {
		const handleCopyToClipboard = async () => {
			// navigator.clipboard.writeText(generateTextContent(newsDayData[newsDay], month, newsDay))

			await copyToClipboard(
				generateTextContent(
					newsMonthData[newsDay],
					months[month],
					newsDay
				)
			);
			// textDownloader(generateTextContent(newsDayData[newsDay], month, newsDay), "name")
			setShowCopiedMessage(true); // Set state to show the "Copied to clipboard" message
			// Hide the message after a certain duration (e.g., 2 seconds)
			setTimeout(() => {
				setShowCopiedMessage(false);
			}, 2000);
		};

		return (
			<div
				className="download flex space-around"
				onClick={handleCopyToClipboard}
			>
				<FaCopy />
			</div>
		);
	};

	return (
		<div className="outlet">
			<div className="news-list">
				{newsMonthData &&
					Object.entries(newsMonthData)
						.reverse()
						.map(([day, articles]) => {
							const date = new Date(2024, month, day);
							const dayOfWeek = date.toLocaleString("en-US", {
								weekday: "long",
							});

							return (
								<div key={day}>
									<ul>
										<div className="daily-header flex space-between">
											<h3>{`${months[month]} ${day}, 2024 | ${dayOfWeek}`}</h3>
											<CopyToClipboard newsDay={day} />
										</div>
										{articles.map((article, index) => (
											<li key={index} className="flex space-around">
												<a href={article.source} target="_blank">
													<strong>{article.headline}</strong>
													<p>{article.summary}</p>
												</a>
											</li>
										))}
									</ul>
								</div>
							);
						})}

				{showCopiedMessage && (
					<div className="copied-message">
						Copied to Clipboard
					</div>
				)}
			</div>
		</div>
	);
};

export default MonthlyView;

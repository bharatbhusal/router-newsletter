import React, { Fragment, useState } from "react";
import { addNews } from "../apis/newsAPIs";
import { useNewsContext } from "../context/newsContext";
import { getNewsByDate } from "../apis/newsAPIs";
import { useDateContext } from "../context/dateContext";

const AddNews = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const [newNews, setNewNews] = useState({
		headline: "",
		summary: "",
		source: "",
		reporter: "",
	});
	const { setNewsOfGivenDate } = useNewsContext();
	const { date } = useDateContext();

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			await addNews({
				...newNews,
				reporter: user.email,
			});
			setNewsOfGivenDate(
				await getNewsByDate(
					date.year(),
					date.month() + 1,
					date.date()
				)
			);
			setNewNews({
				headline: "",
				summary: "",
				source: "",
				reporter: "",
			});
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<Fragment>
			{localStorage.getItem("user-jwt-token") && (
				<form
					className="d-flex mt-5 input_news"
					onSubmit={onSubmitForm}
				>
					<input
						className="form-control input_news"
						type="text"
						name="headline"
						placeholder="Headline"
						required
						value={newNews.headline}
						onChange={(e) =>
							setNewNews({ ...newNews, headline: e.target.value })
						}
						autoFocus
					/>
					<textarea
						style={{ height: "10rem" }}
						className="form-control input_news"
						type="text"
						name="summary"
						placeholder="Summary"
						value={newNews.summary}
						onChange={(e) =>
							setNewNews({ ...newNews, summary: e.target.value })
						}
					/>
					<input
						className="form-control input_news"
						type="url"
						name="source"
						placeholder="Source"
						required
						value={newNews.source}
						onChange={(e) =>
							setNewNews({ ...newNews, source: e.target.value })
						}
					/>
					<button className="btn btn-add">Add</button>
				</form>
			)}
		</Fragment>
	);
};

export default AddNews;

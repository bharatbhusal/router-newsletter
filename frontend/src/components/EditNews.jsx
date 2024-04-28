import React, { Fragment, useState } from "react";
import { updateNewsById } from "../apis/newsAPIs";
import { useNewsContext } from "../context/newsContext";
import { useDateContext } from "../context/dateContext";
import { getNewsByDate } from "../apis/newsAPIs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditNews = ({ news }) => {
	const [newNews, setNewNews] = useState(news);
	const { setNewsOfGivenDate } = useNewsContext();
	const { date } = useDateContext();

	const changeNews = async (e) => {
		e.preventDefault();
		try {
			if (
				news.headline !== newNews.headline ||
				news.summary !== newNews.summary ||
				news.source !== newNews.source
			) {
				await updateNewsById(newNews);
				setNewsOfGivenDate(
					await getNewsByDate(
						date.year(),
						date.month() + 1,
						date.date()
					)
				);
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<Fragment>
			<div className="edit-news">
				{/* <!-- The Modal --> */}
				<div
					className="modal"
					id={`idEdit${newNews.id}`}
					onClick={() => setNewNews(newNews)}
				>
					<div className="modal-dialog">
						<div className="modal-content">
							{/* <!-- Modal Header --> */}
							<div className="modal-header">
								<h4
									className="modal-title"
									style={{
										color: "#bb2765",
										fontWeight: "bold",
										fontSize: "2rem",
									}}
								>
									Edit News
								</h4>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									onClick={() => setNewNews(newNews)}
								>
									&times;
								</button>
							</div>

							{/* <!-- Modal body --> */}
							<div className="modal-body">
								<form onSubmit={changeNews}>
									<TextField
										margin="normal"
										required
										fullWidth
										id="headline"
										label="Headline"
										name="Headline"
										value={newNews.headline}
										onChange={(e) =>
											setNewNews((prev) => ({
												...prev,
												headline: e.target.value,
											}))
										}
									/>

									<textarea
										style={{ height: "10rem" }}
										type="text"
										className="form-control edit_news"
										value={newNews.summary}
										onChange={(e) =>
											setNewNews((prev) => ({
												...prev,
												summary: e.target.value,
											}))
										}
									/>
									<TextField
										type="url"
										margin="normal"
										required
										fullWidth
										id="source"
										label="Source"
										name="Source"
										value={newNews.source}
										onChange={(e) =>
											setNewNews((prev) => ({
												...prev,
												source: e.target.value,
											}))
										}
									/>
								</form>
							</div>

							{/* <!-- Modal footer --> */}
							<div className="modal-footer">
								<div className="yes-no">
									<Button
										type="button"
										variant="contained"
										color="warning"
										data-dismiss="modal"
										onClick={changeNews}
									>
										Edit
									</Button>

									<Button
										type="button"
										variant="contained"
										color="error"
										data-dismiss="modal"
										onClick={() => setNewNews(newNews)}
									>
										Close
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default EditNews;

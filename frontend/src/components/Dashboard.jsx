import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router for routing
import { getNewsByUser } from "../apis/newsAPIs";
import { useUserContext } from "../context/userContext";
import DataTable from "./UserNewsTable";

const Dashboard = () => {
	const navigate = useNavigate();
	const { user, newsByGivenUser, setNewsByGivenUser } =
		useUserContext();

	useEffect(() => {
		if (!user) navigate("/login");
	});
	useEffect(() => {
		const getUserNews = async () => {
			try {
				const response = await getNewsByUser(user.email);

				setNewsByGivenUser(response.reverse());
			} catch (error) {
				console.error("Failed to get news by user:", error);
			}
		};
		getUserNews();
		console.log(newsByGivenUser);
	}, []);
	return (
		user && (
			<div className="user-profile">
				<div className="news-reported">
					<h4 style={{ marginTop: "1rem" }}>News</h4>
					<h6 style={{ fontStyle: "italic" }}>
						You have {newsByGivenUser.length} news reported so
						far.
					</h6>
					{newsByGivenUser &&
						newsByGivenUser.length !== 0 &&
						newsByGivenUser[0]._id && (
							<DataTable rows={newsByGivenUser} />
						)}
				</div>
			</div>
		)
	);
};

export default Dashboard;

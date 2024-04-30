import React, { useEffect } from "react";
import UserCard from "./UserCard";
import { getUsers } from "../apis/usersAPIs";
import { getNewsByUser } from "../apis/newsAPIs";

const Contributors = () => {
	const [contributorsData, setContributorsData] =
		React.useState([]);
	useEffect(() => {
		const getReporters = async () => {
			try {
				const contributors = await getUsers();
				setContributorsData(contributors);
			} catch (error) {
				console.error("Error fetching contributors:", error);
			}
		};
		getReporters();
	}, [contributorsData]);

	useEffect(() => {
		for (let i = 0; i < contributorsData.length; i++) {
			getNewsByUser(contributorsData[i].email)
				.then((data) => {
					contributorsData[i]["news"] = data;
				})
				.catch((error) => {
					console.error("Error fetching news by user:", error);
				});
		}
		console.log(contributorsData);
	}, []);
	return (
		<div>
			<h2>Contributors</h2>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Contributions</th>
						<th>No. of News</th>
					</tr>
				</thead>
				<tbody>
					{contributorsData.map((contributor) => (
						<tr key={contributor._id}>
							<td>
								{contributor.firstName} {contributor.lastName}
							</td>

							<td>{contributor.email}</td>
							<td>{JSON.stringify(contributor)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Contributors;

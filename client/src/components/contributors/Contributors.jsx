import React, { useEffect, useState } from "react";
import "./Contributors.css";
import UserFollow from "../userFollow/UserFollow";
import { getAdmins } from "../../api/UserRequest";

const Contributors = () => {
	const [persons, setPersons] = useState([]);
	useEffect(() => {
		const fetchPersons = async () => {
			const response = await getAdmins();
			setPersons(response);
		};
		fetchPersons();
	}, []);

	return (
		<div className="Contributors">
			<h3>Contributors</h3>

			{persons.map((person, id) => {
				return <UserFollow person={person} key={id} />;
			})}
		</div>
	);
};

export default Contributors;

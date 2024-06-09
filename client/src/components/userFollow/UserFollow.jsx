import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserFollow = ({ person }) => {
	const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<div className="follower">
			<div>
				<img
					src={
						person.profilePicture
							? serverPublic + person.profilePicture
							: serverPublic + "defaultProfile.png"
					}
					alt=""
					className="followerImg"
				/>
				<div className="name">
					<span>
						{person.firstName} {person.lastName}
					</span>
					<span>@{person.username}</span>
				</div>
			</div>
		</div>
	);
};

export default UserFollow;

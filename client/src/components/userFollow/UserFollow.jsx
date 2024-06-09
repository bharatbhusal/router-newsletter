import React from "react";
import config from "../../../config";

const UserFollow = ({ person }) => {
	const serverPublic = config.VITE_APP_PUBLIC_FOLDER;

	return (
		<div className="follower">
			<div>
				<img
					src={
						person.profile_picture
							? serverPublic + "profile/" + person.profile_picture
							: serverPublic + "profile/" + "default_profile.png"
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

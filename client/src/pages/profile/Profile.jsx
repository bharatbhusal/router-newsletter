import React from "react";
import "./Profile.css";
import ProfileCard from "../../components/profileCard/ProfileCard";
import LeftSide from "../../components/leftSide/LeftSide";
import MyPosts from "../../components/myPosts/myPosts";

const Profile = () => {
	return (
		<div className="Profile">
			{/* <LeftSide /> */}
			<div className="ProfilePage-Center">
				<ProfileCard location="profilePage" />
				<MyPosts />
			</div>
		</div>
	);
};

export default Profile;

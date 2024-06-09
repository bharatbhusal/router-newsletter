import React, { useEffect } from "react";
import "./Profile.css";
import ProfileCard from "../../components/profileCard/ProfileCard";
import InfoCard from "../../components/infoCard/InfoCard";
import LeftSide from "../../components/leftSide/LeftSide";
import Posts from "../../components/posts/Posts";
import { useDispatch } from "react-redux";
import { getMyPosts } from "../../actions/PostAction";
import { useSelector } from "react-redux";

const Profile = () => {
	const { profile } = useSelector(
		(state) => state.postReducer
	);
	const { user } = useSelector(
		(state) => state.authReducer.authData
	);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMyPosts(user._id));
	}, [profile]);

	return (
		<div className="Profile">
			<LeftSide />
			<div className="ProfilePage-Center">
				<ProfileCard location="profilePage" />
				<Posts />
			</div>
		</div>
	);
};

export default Profile;

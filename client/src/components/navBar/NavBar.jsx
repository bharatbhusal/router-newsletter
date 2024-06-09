import React from "react";
import "./NavBar.css";

import { useDispatch } from "react-redux";
import {
	getTodayPosts,
	getThisWeekPosts,
	getThisMonthPosts,
	getThisYearPosts,
} from "../../actions/PostAction";

const NavBar = () => {
	const dispatch = useDispatch();

	const handleTodayClick = () => {
		dispatch(getTodayPosts());
	};

	const handleThisWeekClick = () => {
		dispatch(getThisWeekPosts());
	};

	const handleThisMonthClick = () => {
		dispatch(getThisMonthPosts());
	};

	const handleThisYearClick = () => {
		dispatch(getThisYearPosts());
	};

	return (
		<div className="navBar">
			<div className="today" onClick={handleTodayClick}>
				<span>Today</span>
			</div>
			<div className="thisWeek" onClick={handleThisWeekClick}>
				<span>This Week</span>
			</div>
			<div
				className="thisMonth"
				onClick={handleThisMonthClick}
			>
				<span>This Month</span>
			</div>
			<div className="thisYear" onClick={handleThisYearClick}>
				<span>This Year</span>
			</div>
		</div>
	);
};

export default NavBar;

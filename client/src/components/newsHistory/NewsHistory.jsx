import React, { useEffect, useState } from "react";
import "./NewsHistory.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	getTodayPosts,
	getThisWeekPosts,
	getThisMonthPosts,
	getThisYearPosts,
} from "../../actions/PostAction";
import {
	countTodayPosts,
	countThisWeekPosts,
	countThisMonthPosts,
	countThisYearPosts,
} from "../../api/PostRequest";

const NewsHistory = () => {
	const { posts } = useSelector(
		(state) => state.postReducer
	);
	const dispatch = useDispatch();
	const [todayCount, setTodayCount] = useState(0);
	const [thisWeekCount, setThisWeekCount] = useState(0);
	const [thisMonthCount, setThisMonthCount] = useState(0);
	const [thisYearCount, setThisYearCount] = useState(0);

	useEffect(() => {
		const fetchCounts = async () => {
			try {
				const today = await countTodayPosts();
				const week = await countThisWeekPosts();
				const month = await countThisMonthPosts();
				const year = await countThisYearPosts();

				setTodayCount(today);
				setThisWeekCount(week);
				setThisMonthCount(month);
				setThisYearCount(year);
			} catch (error) {
				console.error("Error fetching counts:", error);
			}
		};

		fetchCounts();
	}, [posts]);

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
		<div className="NewsHistory">
			<h3>News</h3>
			<div className="today" onClick={handleTodayClick}>
				<span>Today</span>
				<span className="count">{todayCount}</span>
			</div>
			<div className="thisWeek" onClick={handleThisWeekClick}>
				<span>This Week</span>
				<span className="count">{thisWeekCount}</span>
			</div>
			<div
				className="thisMonth"
				onClick={handleThisMonthClick}
			>
				<span>This Month</span>
				<span className="count">{thisMonthCount}</span>
			</div>
			<div className="thisYear" onClick={handleThisYearClick}>
				<span>This Year</span>
				<span className="count">{thisYearCount}</span>
			</div>
		</div>
	);
};

export default NewsHistory;

import express from "express";
import {
	createPost,
	deletePost,
	getPost,
	myPosts,
	updatePost,
	getTodayPosts,
	getThisWeekPosts,
	getThisMonthPosts,
	getThisYearPosts,
	countAllPosts,
	countTodayPosts,
	countThisWeekPosts,
	countThisMonthPosts,
	countThisYearPosts,
} from "../Controllers/PostController.js";

const router = express.Router();

router.post("/", createPost);

router.get("/count", countAllPosts);
router.get("/count/today", countTodayPosts);
router.get("/count/thisWeek", countThisWeekPosts);
router.get("/count/thisMonth", countThisMonthPosts);
router.get("/count/thisYear", countThisYearPosts);

router.get("/today", getTodayPosts);
router.get("/thisWeek", getThisWeekPosts);
router.get("/thisMonth", getThisMonthPosts);
router.get("/thisYear", getThisYearPosts);
router.get("/myPosts", myPosts);
router.get("/:postId", getPost);

router.put("/:postId", updatePost);

router.delete("/:postId", deletePost);

export default router;

import express from "express";
import {
	createPost,
	deletePost,
	getPost,
	like_dislike_Post,
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

router.get("/count", countAllPosts);
router.get("/count/today", countTodayPosts);
router.get("/count/thisWeek", countThisWeekPosts);
router.get("/count/thisMonth", countThisMonthPosts);
router.get("/count/thisYear", countThisYearPosts);

router.post("/", createPost);
router.get("/today", getTodayPosts);
router.get("/thisWeek", getThisWeekPosts);
router.get("/thisMonth", getThisMonthPosts);
router.get("/thisYear", getThisYearPosts);
router.get("/:id", getPost);

router.put("/:id", updatePost);
router.delete("/:postId", deletePost);
router.put("/:id/like_dislike", like_dislike_Post);
router.get("/:id/myPosts", myPosts);

export default router;

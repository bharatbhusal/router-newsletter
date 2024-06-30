// AuthRequest.js
import API from "./axiosConfig";

// Count all posts
export const countAllPosts = () =>
	API.get(`/post/count`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// Count today's posts
export const countTodayPosts = () =>
	API.get(`/post/count/today`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// Count this week's posts
export const countThisWeekPosts = () =>
	API.get(`/post/count/thisWeek`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// Count this month's posts
export const countThisMonthPosts = () =>
	API.get(`/post/count/thisMonth`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// Count this year's posts
export const countThisYearPosts = () =>
	API.get(`/post/count/thisYear`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// Get my posts
export const getMyPosts = () =>
	API.get(`/post/myPosts`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// Like/Dislike a post
export const likePost = (id, userId) =>
	API.put(`/post/${id}/like_dislike`, { userId })
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// Get today's posts
export const getTodayPosts = () =>
	API.get(`/post/today`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// Get this week's posts
export const getThisWeekPosts = () =>
	API.get(`/post/thisWeek`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// Get this month's posts
export const getThisMonthPosts = () =>
	API.get(`/post/thisMonth`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// Get this year's posts
export const getThisYearPosts = () =>
	API.get(`/post/thisYear`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// Add a new post
export const uploadPost = (postData) =>
	API.post("/post", postData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// Update an existing post
export const updatePost = (postId, updatedData) =>
	API.put(`/post/${postId}`, updatedData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// Delete a post
export const deletePost = (postId) =>
	API.delete(`/post/${postId}`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

import API from "./axiosConfig";
export const uploadMedia = (formData) =>
	API.post("/media/upload", formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

export const getMedia = (mediaId) =>
	API.get(`/media/${mediaId}`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

export const deleteMedia = (mediaId) =>
	API.delete(`/media/${mediaId}`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

export const updateMedia = (mediaId, formData) =>
	API.put(`/media/${mediaId}`, formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

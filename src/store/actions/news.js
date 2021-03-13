/** @format */

import * as actionTypes from './actionTypes';
import { deleteData, getData, postData } from '../../utils/fetch';

const setNews = news => {
	return {
		type: actionTypes.SET_NEWS,
		news
	};
};

export const clearNews = () => {
	return {
		type: actionTypes.CLEAR_NEWS
	};
};

const setTotalPages = totalPages => {
	return {
		type: actionTypes.SET_TOTAL_PAGES,
		totalPages
	};
};

export const getNews = (pathName, userParams) => {
	return async dispatch => {
		const data = await getData(pathName, userParams);

		// destructure for potential error message
		const { articles, totalPages, message: errorMsg } = data;

		// server-side catches potential errors and sends an error object with a message property
		// in that case, data object will represent error object with a message property
		if (errorMsg) {
			dispatch(fetchNewsFailed(errorMsg));
		} else {
			dispatch(setNews(articles));
			dispatch(setTotalPages(totalPages));
		}
	};
};

const fetchNewsFailed = error => {
	return {
		type: actionTypes.FETCH_NEWS_FAILED,
		error
	};
};

export const getDashboardNews = () => {
	return async (dispatch, getState) => {
		try {
			const { user } = getState().auth;
			const categoryParam = { categories: user.categories.join(',') };
			const data = await getData('dashboard-news', categoryParam);

			dispatch(setDashboardNews(data));
		} catch (error) {
			console.error(error);
			dispatch(fetchNewsFailed(error));
		}
	};
};

const setDashboardNews = news => {
	return {
		type: actionTypes.SET_DASHBOARD_NEWS,
		news
	};
};

// POST request to add news story to user's collection of news stories
export const saveNewsStory = newsStory => {
	return async (dispatch, getState) => {
		const { user } = getState().auth;
		try {
			// object is used to find user and add news story to user's collection
			const userNewsStory = { username: user.username, newsStory: newsStory };
			const savedNewsStory = ( 
				await postData('/add-to-collection', userNewsStory)
			);
			dispatch(setCollectionNews(savedNewsStory));
		} catch (error) {
			console.error(error);
			dispatch(fetchNewsFailed(error));
		}
	};
};

const setCollectionNews = news => {
	return {
		type: actionTypes.SET_COLLECTION_NEWS,
		news
	};
};

export const removeFromCollection = newsStory => {
	return async dispatch => {
		try {
			const remainingUserNews = await deleteData('remove-from-collection', newsStory._id);

			dispatch(setCollectionNews(remainingUserNews));
		} catch (error) {
			console.error(error);
		}
	}
};

export const clearTopicNews = () => {
	return {
		type: actionTypes.CLEAR_TOPIC_NEWS
	};
};

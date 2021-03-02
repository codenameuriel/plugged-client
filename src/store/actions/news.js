/** @format */

import * as actionTypes from './actionTypes';
import { getData, postData } from '../../utils/fetch';

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

export const saveNewsStory = newsStory => {
	return async (dispatch, getState) => {
		const { user } = getState().auth.user;
		try {
			const savedNewsStory = await postData(
				'http://localhost:4000/articles',
				newsStory
			);
			saveToUserCollection(savedNewsStory, user);
		} catch (error) {
			console.error(error);
			dispatch(fetchNewsFailed(error));
		}
	};
};

const saveToUserCollection = (newsStory, user) => {
	let collectionObject = {
		user_id: user.id,
		article_id: newsStory.id
	};

	postData('http://localhost:4000/collections', collectionObject);
};

const setCollectionNews = news => {
	return {
		type: actionTypes.SET_COLLECTION_NEWS,
		news,
		totalCollectionNews: news.length
	};
};

export const getCollection = () => {
	return async (dispatch, getState) => {
		const { user } = getState().auth.user;
		const { collectionNews } = getState().news;
		const { articlesPerPage } = getState().pageManager;
		try {
			const userSavedNews = await getData(
				`http://localhost:4000/collections/${user.id}`
			);
			const initialPageLoad = !Boolean(collectionNews);
			const hasSavedMoreNews =
				collectionNews && Boolean(userSavedNews.length > collectionNews.length);

			if (initialPageLoad || hasSavedMoreNews) {
				dispatch(setCollectionNews(userSavedNews));
				// setPaginationData(dispatch, userSavedNews, articlesPerPage)
			}
		} catch (error) {
			console.error(error);
			dispatch(fetchNewsFailed(error));
		}
	};
};

export const clearTopicNews = () => {
	return {
		type: actionTypes.CLEAR_TOPIC_NEWS
	};
};

// export const getTopicNews = userParams => {
//   return async dispatch => {
//     try {
//       const data = await getData('topic-news', userParams)
//       const { articles, totalPages } = data

//       // set news instead of set topic news
//       dispatch(setTopicNews(articles))
//       dispatch(setTotalPages(totalPages))
//     } catch (error) {
//       console.error(error)
//       dispatch(fetchNewsFailed(error))
//     }
//   }
// }

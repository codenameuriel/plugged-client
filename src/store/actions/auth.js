import * as actionTypes from './actionTypes';
import { postData } from '../../utils/fetch';
import { setNewspapers } from './newspaper';

const authErrorMsg = 'Unable to Log in. Please check your credentials';

export const login = userData => {
	return async dispatch => {
		const { returnedUser: user } = await postData('/login', userData);

		if (!user) {
			dispatch(loginFailed(authErrorMsg));
		} else {
			const { newspapers } = user;
			dispatch(setUser(user));
			dispatch(setUserLoggedIn());
			dispatch(setCollectionNews(user.articles));
			dispatch(setNewspapers(newspapers));
			dispatch(setAuthRedirect());
		}
	};
};

export const signup = newUserData => {
	return async dispatch => {
		const { returnedUser: newUser } = await postData('/signup', newUserData);

		if (!newUser) {
			dispatch(signupFailed(authErrorMsg));
		} else {
			dispatch(setUser(newUser));
			dispatch(setUserLoggedIn());
      dispatch(setCollectionNews(newUser.articles));
			dispatch(setAuthRedirect());
		}
	};
};

const setCollectionNews = news => {
	return {
		type: actionTypes.SET_COLLECTION_NEWS,
		news
	};
};

export const clearAuthError = () => {
	return {
		type: actionTypes.CLEAR_AUTH_ERROR
	};
};

const setUserLoggedIn = () => {
	return {
		type: actionTypes.SET_USER_LOGGED_IN
	};
};

const setUser = user => {
	return {
		type: actionTypes.SET_USER,
		user
	};
};

const setAuthRedirect = () => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT,
		authRedirect: '/dashboard'
	};
};

const loginFailed = error => {
	return {
		type: actionTypes.LOGIN_FAILED,
		error
	};
};

const signupFailed = error => {
	return {
		type: actionTypes.SIGNUP_FAILED,
		error
	};
};

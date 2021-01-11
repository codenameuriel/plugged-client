import * as actionTypes from './actionTypes';

export const login = username => {
  return dispatch => {
    authenticateUser(dispatch, username);
  };
};

const authenticateUser = async(dispatch, username) => {
  try {
    const resp = await fetch(`http://localhost:4000/users/login/${username}`);
    let user = await resp.json();
    user = {
      user,
      username: user.username,
      categories: user.categories,
      topics: user.topics,
      sources: user.sources,
      newspapers: user.get_newspapers
    };
    dispatch(setUser(user));
    dispatch(setAuthRedirect());
  } catch (error) {
    dispatch(authenticateUserFailed());
  }
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
    authRedirect: "/dashboard"
  };
};

const authenticateUserFailed = () => {
  return {
    type: actionTypes.AUTHENTICATE_USER_FAILED
  };
};
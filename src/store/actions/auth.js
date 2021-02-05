import * as actionTypes from "./actionTypes";
import { postData, error } from "../../utils/fetch";

export const login = userData => {
  return async dispatch => {
    const { user } = await postData("/login", userData);
    if (!user.username) {
      dispatch(loginFailed(error));
    } else {
      dispatch(setUser(user));
      dispatch(setAuthRedirect());
    }
  };
};

export const signup = newUserData => {
  return async dispatch => {
    const { user: newUser } = await postData("/signup", newUserData);

    if (!newUser.username) {
      dispatch(signupFailed(error));
    } else {
      dispatch(setUser(newUser));
      dispatch(setAuthRedirect());
    }
  };
};

// const authenticateUser = async(dispatch, username) => {
//   try {
//     const resp = await fetch(`http://localhost:4000/users/login/${username}`);
//     let user = await resp.json();
//     user = {
//       user,
//       username: user.username,
//       categories: user.categories,
//       topics: user.topics,
//       sources: user.sources,
//       newspapers: user.get_newspapers
//     };
//     dispatch(setUser(user));
//     dispatch(setAuthRedirect());
//   } catch (error) {
//     dispatch(authenticateUserFailed());
//   }
// };

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
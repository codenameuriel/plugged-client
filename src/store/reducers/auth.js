import * as actionTypes from '../actions/actionTypes'

const initialState = {
  user: null,
  userLoggedIn: false,
  authRedirect: null,
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_USER_LOGGED_IN:
      return {
        ...state, 
        userLoggedIn: true
      };
    case actionTypes.SET_AUTH_REDIRECT:
      return {
        ...state,
        authRedirect: action.authRedirect,
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.SIGNUP_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null
      };
    case actionTypes.UPDATE_USER_CATEGORIES:
      return {
        ...state,
        user: {
          ...state.user, 
          articles: [...state.user.articles], 
          categories: action.categories 
        }
      };
    default:
      return state;
  }
};

export default reducer;

import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  authRedirect: null
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_USER: 
      return {
        ...state,
        user: action.user
      };
    case actionTypes.SET_AUTH_REDIRECT:
      return {
        ...state,
        authRedirect: action.authRedirect
      }; 
    default: return state;
  }
};

export default reducer;
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  articles: null,
  totalArticles: null
};

const reducer = (state=initialState, action)=> {
  switch(action.type) {
    case actionTypes.SET_ARTICLES: 
      return {
        ...state,
        articles: action.articles,
        totalArticles: action.totalArticles
      };
    default: return state;
  }
};

export default reducer;
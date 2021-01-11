import * as actionTypes from '../actions/actionTypes';

const initialState = {
  articles: null,
  categoryArticles: null,
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
    case actionTypes.SET_CATEGORY_ARTICLES:
      const updatedArticles = state.articles ? [...state.articles] : null;
      const updatedCategoryArticles = state.categoryArticles ? {...state.categoryArticles, ...action.articles} : action.articles;
      return {
        ...state,
        articles: updatedArticles,
        categoryArticles: updatedCategoryArticles
      };
    default: return state;
  }
};

export default reducer;
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  articles: null,
  categoryArticles: null,
  collectionArticles: null,
  totalArticles: null,
  totalCollectionArticles: null
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
    case actionTypes.SET_COLLECTION_ARTICLES:
      return {
        ...state,
        articles: state.articles ? [...state.articles] : null,
        categoryArticles: state.categoryArticles ? {...state.categoryArticles} : null,
        collectionArticles: state.collectionArticles ? [...state.collectionArticles, ...action.articles] : action.articles
      };
    default: return state;
  }
};

export default reducer;
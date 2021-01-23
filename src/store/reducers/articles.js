import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  articles: null,
  categoryArticles: null,
  collectionArticles: null,
  topicArticles: null,
  searchTopic: null,
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
        // collectionArticles: state.collectionArticles ? [...state.collectionArticles, ...action.articles] : action.articles
        collectionArticles: action.articles
      };
    case actionTypes.SET_TOPIC_ARTICLES:
      return {
        ...state,
        articles: state.articles ? [...state.articles] : null,
        categoryArticles: state.catergoryArticles ? {...state.categoryArticles} : null,
        collectionArticles: state.collectionArticles ? [...state.collectionArticles] : null,
        topicArticles: state.topicArticles ? [...state.topicArticles] : action.articles,
        searchTopic: action.searchTopic
      };
    case actionTypes.FETCH_ARTICLES_FAILED:
      return {
        ...state,
        error: action.error,
        articles: state.articles ? [...state.articles] : null,
        categoryArticles: state.catergoryArticles ? {...state.categoryArticles} : null,
        collectionArticles: state.collectionArticles ? [...state.collectionArticles] : null,
        topicArticles: state.topicArticles ? [...state.topicArticles] : action.articles
      }
    default: return state;
  }
};

export default reducer;
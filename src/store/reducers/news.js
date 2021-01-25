import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  news: null,
  categoryNews: null,
  collectionNews: null,
  topicNews: null,
  searchTopic: null,
  totalNews: null,
  totalCollectionNews: null
};

const reducer = (state=initialState, action)=> {
  switch(action.type) {
    case actionTypes.SET_NEWS: 
      return {
        ...state,
        news: action.news,
        totalNews: action.totalNews
      };
    case actionTypes.SET_CATEGORY_NEWS:
      const updatedNews = state.news ? [...state.news] : null;
      const updatedCategoryNews = state.categoryNews ? {...state.categoryNews, ...action.news} : action.news;
      return {
        ...state,
        news: updatedNews,
        categoryNews: updatedCategoryNews
      };
    case actionTypes.SET_COLLECTION_NEWS:
      return {
        ...state,
        news: state.news ? [...state.news] : null,
        categoryNews: state.categoryNews ? {...state.categoryNews} : null,
        collectionNews: action.news
      };
    case actionTypes.SET_TOPIC_NEWS:
      return {
        ...state,
        news: state.news ? [...state.news] : null,
        categoryNews: state.catergoryNews ? {...state.categoryNews} : null,
        collectionNews: state.collectionNews ? [...state.collectionNews] : null,
        topicNews: action.news,
        searchTopic: action.searchTopic,
        totalNews: action.totalNews
      };
    case actionTypes.CLEAR_TOPIC_NEWS:
      return {
        ...state,
        topicNews: null,
        news: state.news ? [...state.news] : null,
        categoryNews: state.categoryNews ? {...state.categoryNews} : null,
        collectionNews: state.collectionNews ? [...state.collectionNews] : null
      };
    case actionTypes.FETCH_NEWS_FAILED:
      return {
        ...state,
        error: action.error,
        news: state.news ? [...state.news] : null,
        categoryNews: state.catergoryNews ? {...state.categoryNews} : null,
        collectionNews: state.collectionNews ? [...state.collectionNews] : null,
        topicNews: state.topicNews ? [...state.topicNews] : action.news
      };
    default: return state;
  }
};

export default reducer;
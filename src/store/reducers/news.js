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

const updateState = state => {
  if (typeof state === "object" && Array.isArray(state)) {
    return state ? [...state] : null;
  } else {
    return state ? {...state} : null;
  }
}

const reducer = (state=initialState, action)=> {
  switch(action.type) {
    case actionTypes.SET_NEWS: 
      return {
        ...state,
        news: action.news,
        totalNews: action.totalNews,
        categoryNews: updateState(state.categoryNews),
        collectionNews: updateState(state.collectionNews),
        topicNews: updateState(state.topicNews)
      };
    case actionTypes.SET_CATEGORY_NEWS:
      const updatedCategoryNews = state.categoryNews ? {...state.categoryNews, ...action.news} : action.news;
      return {
        ...state,
        categoryNews: updatedCategoryNews,
        news: updateState(state.news),
        collectionNews: updateState(state.collectionNews),
        topicNews: updateState(state.topicNews)
      };
    case actionTypes.SET_COLLECTION_NEWS:
      return {
        ...state,
        collectionNews: action.news,
        news: updateState(state.news),
        categoryNews: updateState(state.categoryNews),
        topicNews: updateState(state.topicNews)
      };
    case actionTypes.SET_TOPIC_NEWS:
      console.log(action.news);
      return {
        ...state,
        topicNews: action.news,
        searchTopic: action.searchTopic,
        totalNews: action.totalNews,
        news: updateState(state.news),
        categoryNews: updateState(state.categoryNews),
        collectionNews: updateState(state.collectionNews)
      };
    case actionTypes.CLEAR_TOPIC_NEWS:
      return {
        ...state,
        topicNews: null,
        news: updateState(state.news),
        categoryNews: updateState(state.categoryNews),
        collectionNews: updateState(state.collectionNews)
      };
    case actionTypes.FETCH_NEWS_FAILED:
      return {
        ...state,
        error: action.error,
        news: updateState(state.news),
        categoryNews: updateState(state.categoryNews),
        collectionNews: updateState(state.collectionNews),
        topicNews: updateState(state.topicNews)
      };
    default: return state;
  }
};

export default reducer;
/** @format */

import * as actionTypes from '../actions/actionTypes'

const initialState = {
  error: null,
  news: null,
  dashboardNews: null,
  collectionNews: null,
  topicNews: null,
  searchTopic: null,
  totalCollectionNews: null,
}

const updateState = state => {
  if (typeof state === 'object' && Array.isArray(state)) {
    return state ? [...state] : null
  } else {
    return state ? { ...state } : null
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NEWS:
      return {
        ...state,
        news: action.news,
        dashboardNews: updateState(state.dashboardNews),
        collectionNews: updateState(state.collectionNews),
        topicNews: updateState(state.topicNews),
      }
    case actionTypes.SET_DASHBOARD_NEWS:
      // collectionNews requires updating to new state
      return {
        ...state,
        dashboardNews: action.news,
        collectionNews: updateState(state.collectionNews),
      }
    case actionTypes.SET_COLLECTION_NEWS:
      return {
        ...state,
        collectionNews: action.news,
        news: updateState(state.news),
        categoryNews: updateState(state.categoryNews),
        topicNews: updateState(state.topicNews),
      }
    case actionTypes.SET_TOPIC_NEWS:
      console.log(action.news)
      return {
        ...state,
        topicNews: action.news,
        totalNews: action.totalNews,
        news: updateState(state.news),
        categoryNews: updateState(state.categoryNews),
        collectionNews: updateState(state.collectionNews),
      }
    // case actionTypes.SET_SEARCH_TOPIC:
    //   return {
    //     ...state,
    //     searchTopic: action.searchTopic,
    //     news: updateState(state.news),
    //     categoryNews: updateState(state.categoryNews),
    //     collectionNews: updateState(state.collectionNews),
    //     topicNew: updateState(state.topicNews)
    //   };
    case actionTypes.CLEAR_TOPIC_NEWS:
      return {
        ...state,
        topicNews: null,
        news: updateState(state.news),
        categoryNews: updateState(state.categoryNews),
        collectionNews: updateState(state.collectionNews),
      }
    case actionTypes.FETCH_NEWS_FAILED:
      return {
        ...state,
        error: action.error,
        news: updateState(state.news),
        categoryNews: updateState(state.categoryNews),
        collectionNews: updateState(state.collectionNews),
        topicNews: updateState(state.topicNews),
      }
    default:
      return state
  }
}

export default reducer

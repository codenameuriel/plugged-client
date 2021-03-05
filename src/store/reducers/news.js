import * as actionTypes from '../actions/actionTypes'

const initialState = {
  error: null,
  news: null,
  dashboardNews: null,
  collectionNews: null
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
        collectionNews: updateState(state.collectionNews),
      }
    case actionTypes.CLEAR_NEWS:
      return {
        ...state,
        news: null,
        collectionNews: updateState(state.collectionNews)
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

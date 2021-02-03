import * as actionTypes from '../actions/actionTypes';

const initialState = {
  page: 1,
  totalPages: null,
  lastPage: null,
  articlesPerPage: 9,
  prevLastArticleIndex: 0,
  lastNewsStoryIndex: null,
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.totalPages
      };
    case actionTypes.SET_LAST_NEWS_STORY_INDEX:
      return {
        ...state,
        lastNewsStoryIndex: action.lastNewsStoryIndex
      };
    case actionTypes.SET_LAST_PAGE:
      return {
        ...state,
        lastPage: action.lastPage
      };
    case actionTypes.PREV_PAGE:
      return {
        ...state,
        page: state.page - 1
      };
    case actionTypes.NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1
      };
    case actionTypes.LAST_PAGE:
      return {
        ...state,
        page: state.lastPage,
        prevLastArticleIndex: action.prevLastArticleIndex,
        lastNewsStoryIndex: action.lastNewsStoryIndex
      };
    case actionTypes.FIRST_PAGE:
      return {
        ...state,
        page: 1
      };
    default: return state;
  }
};

export default reducer;
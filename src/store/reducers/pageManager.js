import * as actionTypes from '../actions/actionTypes';

const initialState = {
  page: 1,
  lastPage: null,
  articlesPerPage: 9,
  prevLastArticleIndex: 0,
  lastArticleIndex: null,
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_LAST_ARTICLE_INDEX:
      return {
        ...state,
        lastArticleIndex: action.lastArticleIndex
      };
    case actionTypes.SET_LAST_PAGE:
      return {
        ...state,
        lastPage: action.lastPage
      };
    case actionTypes.PREV_PAGE:
      const prevLastArticleIndex = state.prevLastArticleIndex - state.articlesPerPage;
      return {
        ...state,
        page: state.page - 1,
        prevLastArticleIndex,
        lastArticleIndex: state.prevLastArticleIndex
      };
    case actionTypes.NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
        prevLastArticleIndex: state.lastArticleIndex,
        lastArticleIndex: action.lastArticleIndex
      };
    case actionTypes.LAST_PAGE:
      return {
        ...state,
        page: state.lastPage,
        prevLastArticleIndex: action.prevLastArticleIndex,
        lastArticleIndex: action.lastArticleIndex
      };
    case actionTypes.FIRST_PAGE:
      return {
        ...state,
        page: action.page,
        prevLastArticleIndex: action.prevLastArticleIndex,
        lastArticleIndex: action.lastArticleIndex
      };
    default: return state;
  }
};

export default reducer;
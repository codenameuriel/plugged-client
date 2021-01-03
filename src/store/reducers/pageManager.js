import * as actionTypes from '../actions/actionTypes';

const initialState = {
  totalArticles: null,
  page: 1,
  prevLastArticleIndex: null,
  lastArticleIndex: 8,
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_TOTAL_ARTICLES:
      return {
        ...state,
        totalArticles: action.totalArticles
      };
    case actionTypes.NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
        prevLastArticleIndex: state.lastArticleIndex,
        lastArticleIndex: state.lastArticleIndex + 9
      };
    default: return state;
  }
};

export default reducer;
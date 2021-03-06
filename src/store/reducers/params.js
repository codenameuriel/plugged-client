import * as actionTypes from '../actions/actionTypes';

const initialState = {
  params: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE_PARAMS:
      return {
        params: {
          ...state.params,
          page: action.page
        }
      };
    case actionTypes.SET_CATEGORY_PARAM:
      return {
        params: {
          ...state.params,
          category: action.category
        }
      };
    case actionTypes.SET_SOURCES_PARAM:
      return {
        params: {
          ...state.params,
          sources: action.sources
        }
      };
    case actionTypes.SET_SEARCH_TOPIC:
      return {
        params: {
          ...state.params,
          q: action.searchTopic
        }
      };
    case actionTypes.CLEAR_PARAMS:
      return {
        params: {}
      };
    default:
      return state
  }
}

export default reducer

import * as actionTypes from "../actions/actionTypes";
const initialState = {
  params: {}
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE_PARAMS:
      return {
        params: {
          ...state.params,
          page: action.page
        }
      };
    case actionTypes.SET_SEARCH_TOPIC:
      return {
        params: {
          ...state.params,
          q: action.searchTopic
        }
      };
    default: return state;
  }
};

export default reducer;
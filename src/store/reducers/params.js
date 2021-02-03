import * as actionTypes from "../actions/actionTypes";
const initialState = {
  params: {}
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE_PARAMS:
      return {
        ...state,
        params: {
          ...state.params,
          page: action.page
        }
      };
    default: return state;
  }
};

export default reducer;
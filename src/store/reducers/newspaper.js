import * as actionTypes from '../actions/actionTypes';

const initialState = {
  newspapers: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NEWSPAPERS:
      return {
        newspapers: action.newspapers
      };
    default:
      return state;
  }
};

export default reducer;
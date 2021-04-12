import * as actionTypes from './actionTypes';

import { postData } from '../../utils/fetch';

// POST thunk 
export const createNewspaper = newspaperData => {
  return async (dispatch, getState) => {
    const { user: { username } } = getState().auth;
    try {
      // POST request returns array of newspaper belonging to user
      // including the newly created newspaper
      const newspapers = (
        await postData('/newspaper', { username, ...newspaperData })
      );

      console.log('retrieved newspapers:', newspapers)

      // store the newspapers to state
      dispatch(setNewspapers(newspapers));
    } catch (error) {
      console.error(error);
    }
  };
};

// action creator to set users newspapers to redux state
export const setNewspapers = newspapers => {
  return {
    type: actionTypes.SET_NEWSPAPERS,
    newspapers
  };
};

import { postData } from '../../utils/fetch';

// POST thunk 
export const createNewspaper = newspaperData => {
  return async (dispatch, getState) => {
    const { user: { username } } = getState().auth;
    try {
      console.log('inside createNewspaper:', username, newspaperData)
      // POST request returns the newly created newspaper object
      const newspaper = (
        await postData('/newspaper', { username, ...newspaperData })
      );
    // store the newspaper to state
    dispatch();
    } catch (error) {
      console.error(error);
    }
  };
};

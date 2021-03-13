import * as actionTypes from './actionTypes';
import { postData } from '../../utils/fetch';

// subscription data consists of username and the categories to add to user's collection
export const subscribeToCategories = categories => {
  return async (dispatch, getState) => {
    const { user } = getState().auth;
    const subscriptionData = {
      username: user.username,
      categories: categories
    };

    try {
      // destructure for categories array
      const { categories: updatedCategories} = await postData('/subscribe/categories', subscriptionData);

      dispatch(updateUsersCategories(updatedCategories));
    } catch (error) {

    }
  };
};

const updateUsersCategories = categories => {
  return {
    type: actionTypes.UPDATE_USER_CATEGORIES,
    categories
  };
};

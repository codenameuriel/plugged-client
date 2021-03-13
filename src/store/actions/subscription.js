import * as actionTypes from './actionTypes';
import { postData } from '../../utils/fetch';

export const subscribeToCategories = (isSubscribed, categories) => {
  return async (dispatch, getState) => {
    const { user } = getState().auth;

    // format categories for backend
    const formattedCategories = categories.split(',');
    const subscriptionData = {
      username: user.username,
      categories: formattedCategories,
      isSubscribed // backend will use isSubscribed to determine action to take with categories
    };

    try {
      // updated array of user's categories
      const updatedCategories = await postData('/subscriptions/categories', subscriptionData);

      dispatch(updateUsersCategories(updatedCategories));
    } catch (error) {
      console.error(error);
    }
  };
};

const updateUsersCategories = categories => {
  return {
    type: actionTypes.UPDATE_USER_CATEGORIES,
    categories
  };
};

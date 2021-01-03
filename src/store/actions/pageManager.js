import * as actionTypes from './actionTypes';

export const nextPage = () => {
  return {
    type: actionTypes.NEXT_PAGE
  };
};

export const setTotalArticles = totalArticles => {
  return {
    type: actionTypes.SET_TOTAL_ARTICLES,
    totalArticles
  }
};
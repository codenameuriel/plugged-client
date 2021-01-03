import * as actionTypes from './actionTypes';

export const calculateNextPage = () => {
  return (dispatch, getState) => {
    const { totalArticles } = getState().articles;
    const { lastArticleIndex, articlesPerPage } = getState().pageManager;
    const remainingArticles = totalArticles - (lastArticleIndex + 1);
    let index = remainingArticles > articlesPerPage ? lastArticleIndex + articlesPerPage : lastArticleIndex + remainingArticles;
    dispatch(nextPage(index));
  };
};

const nextPage = lastArticleIndex => {
  return {
    type: actionTypes.NEXT_PAGE,
    lastArticleIndex
  };
};
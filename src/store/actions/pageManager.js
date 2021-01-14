import * as actionTypes from './actionTypes';

export const changePage = changeType => {
  return (dispatch, getState) => {
    const { totalArticles } = getState().articles;
    const { lastArticleIndex, articlesPerPage, lastPage } = getState().pageManager;
    switch (changeType) {
      case "next":
        const remainingArticles = totalArticles - lastArticleIndex;
        let index = remainingArticles > articlesPerPage ? lastArticleIndex + articlesPerPage : lastArticleIndex + remainingArticles;
        dispatch(nextPage(index));
        break;
      case "previous":
        dispatch(prevPage());
        break;
      case "last":
        const updates = {
          prevLastArticleIndex: articlesPerPage * (lastPage - 1),
          lastArticleIndex: totalArticles
        };
        dispatch(goToLastPage(updates));
        break;
      default: break;
    }
  };
};

const nextPage = lastArticleIndex => {
  return {
    type: actionTypes.NEXT_PAGE,
    lastArticleIndex
  };
};

const prevPage = () => {
  return {
    type: actionTypes.PREV_PAGE
  };
};

const goToLastPage = ({ prevLastArticleIndex, lastArticleIndex }) => {
  return {
    type: actionTypes.LAST_PAGE,
    prevLastArticleIndex,
    lastArticleIndex
  };
};
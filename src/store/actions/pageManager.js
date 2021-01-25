import * as actionTypes from './actionTypes';

export const changePage = changeType => {
  return (dispatch, getState) => {
    const { totalNews } = getState().news;
    const { lastNewsStoryIndex, articlesPerPage, lastPage } = getState().pageManager;
    switch (changeType) {
      case "next":
        const remainingArticles = totalNews - lastNewsStoryIndex;
        let index = remainingArticles > articlesPerPage ? lastNewsStoryIndex + articlesPerPage : lastNewsStoryIndex + remainingArticles;
        dispatch(nextPage(index));
        break;
      case "previous":
        dispatch(prevPage());
        break;
      case "last":
        const updates = {
          prevLastArticleIndex: articlesPerPage * (lastPage - 1),
          lastNewsStoryIndex: totalNews
        };
        dispatch(goToLastPage(updates));
        break;
      case "first":
        const stateUpdates = {
          page: 1,
          prevLastArticleIndex: 0,
          lastNewsStoryIndex: articlesPerPage
        };
        dispatch(goToFirstPage(stateUpdates));
        break;
      default: break;
    }
  };
};

const nextPage = lastNewsStoryIndex => {
  return {
    type: actionTypes.NEXT_PAGE,
    lastNewsStoryIndex
  };
};

const prevPage = () => {
  return {
    type: actionTypes.PREV_PAGE
  };
};

const goToLastPage = ({ prevLastArticleIndex, lastNewsStoryIndex }) => {
  return {
    type: actionTypes.LAST_PAGE,
    prevLastArticleIndex,
    lastNewsStoryIndex
  };
};

const goToFirstPage = ({ page, prevLastArticleIndex, lastNewsStoryIndex }) => {
  return {
    type: actionTypes.FIRST_PAGE,
    page,
    prevLastArticleIndex,
    lastNewsStoryIndex
  };
};
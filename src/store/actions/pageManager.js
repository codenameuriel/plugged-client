import * as actionTypes from './actionTypes'

// export const changePage = changeType => {
//   return (dispatch, getState) => {
//     const { totalNews } = getState().news;
//     const { lastNewsStoryIndex, articlesPerPage, lastPage } = getState().pageManager;
//     switch (changeType) {
//       case "next":
//         const remainingArticles = totalNews - lastNewsStoryIndex;
//         let index = remainingArticles > articlesPerPage ? lastNewsStoryIndex + articlesPerPage : lastNewsStoryIndex + remainingArticles;
//         dispatch(nextPage(index));
//         break;
//       case "previous":
//         dispatch(prevPage());
//         break;
//       case "last":
//         const updates = {
//           prevLastArticleIndex: articlesPerPage * (lastPage - 1),
//           lastNewsStoryIndex: totalNews
//         };
//         dispatch(goToLastPage(updates));
//         break;
//       case "first":
//         const stateUpdates = {
//           page: 1,
//           prevLastArticleIndex: 0,
//           lastNewsStoryIndex: articlesPerPage
//         };
//         dispatch(goToFirstPage(stateUpdates));
//         break;
//       default: break;
//     }
//   };
// };

// const nextPage = lastNewsStoryIndex => {
//   return {
//     type: actionTypes.NEXT_PAGE,
//     lastNewsStoryIndex
//   };
// };

const nextPage = () => {
  return {
    type: actionTypes.NEXT_PAGE
  }
}

const prevPage = () => {
  return {
    type: actionTypes.PREV_PAGE
  }
}

export const firstPage = () => {
  return {
    type: actionTypes.FIRST_PAGE 
  }
}

const setPageParams = page => {
  return {
    type: actionTypes.SET_PAGE_PARAMS,
    page
  }
}

export const changePage = type => {
  return (dispatch, getState) => {
    const { page } = getState().pageManager
    switch (type) {
      case "next":
        dispatch(nextPage());
        dispatch(setPageParams(page + 1))
        break
      case "prev":
        dispatch(prevPage());
        dispatch(setPageParams(page - 1))
        break
      case "first":
        dispatch(firstPage());
        dispatch(setPageParams(1))
        break
      default: return
    }
  }
}

// const goToLastPage = ({ prevLastArticleIndex, lastNewsStoryIndex }) => {
//   return {
//     type: actionTypes.LAST_PAGE,
//     prevLastArticleIndex,
//     lastNewsStoryIndex
//   };
// };

// const goToFirstPage = ({ page, prevLastArticleIndex, lastNewsStoryIndex }) => {
//   return {
//     type: actionTypes.FIRST_PAGE,
//     page,
//     prevLastArticleIndex,
//     lastNewsStoryIndex
//   };
// };
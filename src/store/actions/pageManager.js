import * as actionTypes from './actionTypes'

const nextPage = () => {
  return {
    type: actionTypes.NEXT_PAGE,
  }
}

const prevPage = () => {
  return {
    type: actionTypes.PREV_PAGE,
  }
}

export const firstPage = () => {
  return {
    type: actionTypes.FIRST_PAGE,
  }
}

const setPageParams = page => {
  return {
    type: actionTypes.SET_PAGE_PARAMS,
    page,
  }
}

export const changePage = type => {
  return (dispatch, getState) => {
    const { page } = getState().pageManager
    switch (type) {
      case 'next':
        dispatch(nextPage())
        dispatch(setPageParams(page + 1))
        break
      case 'prev':
        dispatch(prevPage())
        dispatch(setPageParams(page - 1))
        break
      case 'first':
        dispatch(firstPage())
        dispatch(setPageParams(1))
        break
      default:
        return
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

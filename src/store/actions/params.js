/** @format */

import * as actionTypes from '../actions/actionTypes'

export const clearParams = () => {
  return {
    type: actionTypes.CLEAR_PARAMS,
  }
}

export const setSearchTopic = searchTopic => {
  return {
    type: actionTypes.SET_SEARCH_TOPIC,
    searchTopic
  }
}
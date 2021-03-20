import * as actionTypes from '../actions/actionTypes'

export const clearParams = () => {
  return {
    type: actionTypes.CLEAR_PARAMS,
  };
};

export const setSearchTopic = searchTopic => {
  return {
    type: actionTypes.SET_SEARCH_TOPIC,
    searchTopic
  };
};

export const setCategoryParam = category => {
  return {
    type: actionTypes.SET_CATEGORY_PARAM,
    category
  };
};

export const setSourcesParam = source => {
  return {
    type: actionTypes.SET_SOURCES_PARAM,
    sources: source
  };
};

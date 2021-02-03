import * as actionTypes from "./actionTypes";
import { createURLString } from "../../serverURLs";

const getData = async (pathName, userParams) => {
  let url = createURLString(pathName, userParams);
  const response = await fetch(url);
  return response.json();
};

const postData = async (url='', data={}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

const setPaginationData = (cb, news, articlesPerPage) => {
  cb(setLastNewsStoryIndex(news, articlesPerPage));
  cb(setLastPage(news, articlesPerPage));
};

const setNews = news => {
  return {
    type: actionTypes.SET_NEWS,
    news,
    totalNews: news.length
  };
};

const initializeTopNewsPage = userParams => {
  return async (dispatch, getState) => {
    try {

    } catch (error) {

    }
  };
};

const setTotalPages = totalPages => {
  return {
    type: actionTypes.SET_TOTAL_PAGES,
    totalPages
  };
};

export const getTopNews = userParams => {
  return async dispatch => {
    try {
      const data = await getData("top-news", userParams);
      const { articles, totalPages } = data;

      dispatch(setNews(articles));
      dispatch(setTotalPages(totalPages));
    } catch (error) {
      console.error(error);
      dispatch(fetchNewsFailed(error));
    }
  };
};

const setLastNewsStoryIndex = (news, articlesPerPage) => {
  let lastNewsStoryIndex = news.length > articlesPerPage ? articlesPerPage : news.length;
  return {
    type: actionTypes.SET_LAST_NEWS_STORY_INDEX,
    lastNewsStoryIndex
  };
};

const calculateLastPage = (news, articlesPerPage) => {
  return (
    news.length % articlesPerPage === 0 ? (news.length / articlesPerPage) : Math.ceil((news.length / articlesPerPage))
  );
};

const setLastPage = (news, articlesPerPage) => {
  return {
    type: actionTypes.SET_LAST_PAGE,
    lastPage: calculateLastPage(news, articlesPerPage)
  };
};

const fetchNewsFailed = error => {
  return {
    type: actionTypes.FETCH_NEWS_FAILED,
    error
  };
};

export const getDashboardNews = () => {
  return (dispatch, getState) => {
    const { user } = getState().auth;
    const userSubscribedNewsCategories = user.categories.map(category => category.name.toLowerCase());

    try {
      userSubscribedNewsCategories.forEach(async category => {
        // const data = await getData(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=6&page=1`, apiKey);
        // const news = data.articles;
        // const newsByCategory = { [category]: news };

        // dispatch(setCategoryNews(newsByCategory));
      });
    } catch (error) {
      console.error(error);
      dispatch(fetchNewsFailed(error));
    }
  };
};

const setCategoryNews = news => {
  return {
    type: actionTypes.SET_CATEGORY_NEWS,
    news
  };
};

export const saveNewsStory = newsStory => {
  return async (dispatch, getState) => {
    const { user } = getState().auth.user;
    try {
      const savedNewsStory = await postData("http://localhost:4000/articles", newsStory);
      saveToUserCollection(savedNewsStory, user);
    } catch (error) {
      console.error(error);
      dispatch(fetchNewsFailed(error));
    }
  };
};

const saveToUserCollection = (newsStory, user) => {
  let collectionObject = {
    user_id: user.id,
    article_id: newsStory.id
  };

  postData("http://localhost:4000/collections", collectionObject);
};

const setCollectionNews = news => {
  return {
    type: actionTypes.SET_COLLECTION_NEWS,
    news,
    totalCollectionNews: news.length
  };
};

export const getCollectionNews = () => {
  return async (dispatch, getState) => {
    const { user } = getState().auth.user;
    const { collectionNews } = getState().news;
    const { articlesPerPage } = getState().pageManager;
    try {
      const userSavedNews = await getData(`http://localhost:4000/collections/${user.id}`);
      const initialPageLoad = !(Boolean(collectionNews));
      const hasSavedMoreNews = collectionNews && Boolean(userSavedNews.length > collectionNews.length);
 
      if (initialPageLoad || hasSavedMoreNews) {
        dispatch(setCollectionNews(userSavedNews));
        setPaginationData(dispatch, userSavedNews, articlesPerPage);
      }
    } catch (error) {
      console.error(error);
      dispatch(fetchNewsFailed(error));
    }
  };
};

export const clearTopicNews = () => {
  return {
    type: actionTypes.CLEAR_TOPIC_NEWS
  }; 
}

export const clearTotalNews = () => {
  return {
    type: actionTypes.CLEAR_TOTAL_NEWS
  };
}

export const setSearchTopic = searchTopic => {
  return {
    type: actionTypes.SET_SEARCH_TOPIC,
    searchTopic
  };
};

const setTopicNews = (news, totalNews) => {
  return {
    type: actionTypes.SET_TOPIC_NEWS,
    news,
    totalNews
  };
};

export const getTopicNews = () => {
  return async (dispatch, getState) => {
    const { articlesPerPage } = getState().pageManager;
    const { searchTopic } = getState().news;
    try {
      // const data = await getData(`https://newsapi.org/v2/everything?q=${searchTopic}&language=en`, apiKey);
      // const news = data.articles;

      // dispatch(setTopicNews(news, news.length));
      // setPaginationData(dispatch, news, articlesPerPage);
    } catch (error) {
      console.error(error);
      dispatch(fetchNewsFailed(error));
    }
  };
};
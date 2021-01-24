import * as actionTypes from './actionTypes';
import { apiKey } from '../../apiKey';

const getData = async (url='', apiKey=null) => {
  const response = await fetch(url, apiKey);
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
  cb(setLastNewsIndex(news, articlesPerPage));
  cb(setLastPage(news, articlesPerPage));
};

const setNews = news => {
  return {
    type: actionTypes.SET_NEWS,
    news,
    totalNews: news.length
  };
};

export const getTopNews = () => {
  return async(dispatch, getState) => {
    const { articlesPerPage } = getState().pageManager;
    try {
      const data = await getData("https://newsapi.org/v2/top-headlines?country=us", apiKey);
      const news = data.articles;

      dispatch(setNews(news));
      setPaginationData(dispatch, news, articlesPerPage);
    } catch (error) {
      dispatch(fetchNewsFailed(error));
    }
  };
};

const setLastNewsIndex = (news, articlesPerPage) => {
  let lastNewsIndex = news.length > articlesPerPage ? articlesPerPage : news.length;
  return {
    type: actionTypes.SET_LAST_NEWS_INDEX,
    lastNewsIndex
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
        const data = await getData(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=6&page=1`, apiKey);
        const news = data.articles;
        const newsByCategory = { [category]: news };

        dispatch(setCategoryNews(newsByCategory));
      });
    } catch (error) {
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
      dispatch(fetchNewsFailed(error));
    }
  };
};

const setTopicNews = (news, searchTopic) => {
  return {
    type: actionTypes.SET_TOPIC_NEWS,
    news,
    searchTopic
  };
};

export const getTopicNews = searchTopic => {
  return async (dispatch, getState) => {
    const { articlesPerPage } = getState().pageManager;
    try {
      const data = await getData(`https://newsapi.org/v2/everything?q=${searchTopic}&language=en`, apiKey);
      const news = data.articles;

      dispatch(setTopicNews(news, searchTopic));
      setPaginationData(dispatch, news, articlesPerPage);
    } catch (error) {
      dispatch(fetchNewsFailed());
    }
  };
};
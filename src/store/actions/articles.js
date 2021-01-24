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

const setPaginationData = (cb, articles, articlesPerPage) => {
  cb(setLastArticleIndex(articles, articlesPerPage));
  cb(setLastPage(articles, articlesPerPage));
};

export const getTopNews = () => {
  return async(dispatch, getState) => {
    const { articlesPerPage } = getState().pageManager;
    try {
      const data = await getData("https://newsapi.org/v2/top-headlines?country=us", apiKey);
      const articles = data.articles;

      dispatch(setArticles(articles));
      setPaginationData(dispatch, articles, articlesPerPage);
    } catch (error) {
      dispatch(fetchArticlesFailed(error));
    }
  };
};

const setLastArticleIndex = (articles, articlesPerPage) => {
  let lastArticleIndex = articles.length > articlesPerPage ? articlesPerPage : articles.length;
  return {
    type: actionTypes.SET_LAST_ARTICLE_INDEX,
    lastArticleIndex
  };
};

const calculateLastPage = (articles, articlesPerPage) => {
  return (
    articles.length % articlesPerPage === 0 ? (articles.length / articlesPerPage) : Math.ceil((articles.length / articlesPerPage))
  );
};

const setLastPage = (articles, articlesPerPage) => {
  return {
    type: actionTypes.SET_LAST_PAGE,
    lastPage: calculateLastPage(articles, articlesPerPage)
  };
};

const setArticles = articles => {
  return {
    type: actionTypes.SET_ARTICLES,
    articles,
    totalArticles: articles.length
  };
};

const fetchArticlesFailed = error => {
  return {
    type: actionTypes.FETCH_ARTICLES_FAILED,
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
        const articles = data.articles;
        const articlesPerCategory = { [category]: articles };

        dispatch(setCategoryArticles(articlesPerCategory));
      });
    } catch (error) {
      dispatch(fetchArticlesFailed(error));
    }
  };
};

const setCategoryArticles = articles => {
  return {
    type: actionTypes.SET_CATEGORY_ARTICLES,
    articles
  };
};

export const saveArticle = article => {
  return async (dispatch, getState) => {
    const { user } = getState().auth.user;
    try {
      const savedArticle = await postData("http://localhost:4000/articles", article);
      saveToUserCollection(savedArticle, user);
    } catch (error) {
      dispatch(fetchArticlesFailed(error));
    }
  };
};

const saveToUserCollection = (article, user) => {
  let collectionObject = {
    user_id: user.id,
    article_id: article.id
  };

  postData("http://localhost:4000/collections", collectionObject);
};

const setCollectionArticles = articles => {
  return {
    type: actionTypes.SET_COLLECTION_ARTICLES,
    articles,
    totalCollectionArticles: articles.length
  };
};

export const getCollectionNews = () => {
  return async (dispatch, getState) => {
    const { user } = getState().auth.user;
    const { collectionArticles } = getState().articles;
    const { articlesPerPage } = getState().pageManager;
    try {
      const userSavedNews = await getData(`http://localhost:4000/collections/${user.id}`);
      const initialPageLoad = !(Boolean(collectionArticles));
      const hasSavedMoreNews = collectionArticles && Boolean(userSavedNews.length > collectionArticles.length);
 
      if (initialPageLoad || hasSavedMoreNews) {
        dispatch(setCollectionArticles(userSavedNews));
        setPaginationData(dispatch, userSavedNews, articlesPerPage);
      }
    } catch (error) {
      dispatch(fetchArticlesFailed(error));
    }
  };
};

const setTopicArticles = (articles, searchTopic) => {
  return {
    type: actionTypes.SET_TOPIC_ARTICLES,
    articles,
    searchTopic
  };
};

export const getTopicNews = searchTopic => {
  return async (dispatch, getState) => {
    const { articlesPerPage } = getState().pageManager;
    try {
      const data = await getData(`https://newsapi.org/v2/everything?q=${searchTopic}&language=en`, apiKey);
      const articles = data.articles;

      dispatch(setTopicArticles(articles, searchTopic));
      setPaginationData(dispatch, articles, articlesPerPage);
    } catch (error) {
      dispatch(fetchArticlesFailed());
    }
  };
};
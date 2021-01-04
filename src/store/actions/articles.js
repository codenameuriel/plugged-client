import * as actionTypes from './actionTypes';
import { apiKey } from '../../apiKey';

export const fetchArticles = () => {
  return async(dispatch, getState) => {
    try {
      const { articlesPerPage } = getState().pageManager;
      const resp = await fetch("https://newsapi.org/v2/top-headlines?country=us", apiKey);
      const articles = (await resp.json()).articles;
      dispatch(setArticles(articles));
      dispatch(setLastArticleIndex(articles, articlesPerPage));
      dispatch(setLastPage(articles, articlesPerPage));
    } catch(error) {
      dispatch(fetchArticlesFailed());
    }
  };
};

const setLastArticleIndex = (articles, articlesPerPage) => {
  let lastArticleIndex = null;
  lastArticleIndex = articles.length > articlesPerPage ? articlesPerPage : articles.length;
  return {
    type: actionTypes.SET_LAST_ARTICLE_INDEX,
    lastArticleIndex
  };
};

const setLastPage = (articles, articlesPerPage) => {
  let lastPage = null;
  lastPage = articles.length % articlesPerPage === 0 ? (articles.length / articlesPerPage) : Math.ceil((articles.length / articlesPerPage));
  return {
    type: actionTypes.SET_LAST_PAGE,
    lastPage
  };
};

const setArticles = articles => {
  return {
    type: actionTypes.SET_ARTICLES,
    articles,
    totalArticles: articles.length
  };
};

const fetchArticlesFailed = () => {
  return {
    type: actionTypes.FETCH_ARTICLES_FAILED
  };
};
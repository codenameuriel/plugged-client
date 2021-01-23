import * as actionTypes from './actionTypes';
import { apiKey } from '../../apiKey';

export const fetchArticles = () => {
  return async(dispatch, getState) => {
    try {
      const { articlesPerPage } = getState().pageManager;
      const resp = await fetch("https://newsapi.org/v2/top-headlines?country=us", apiKey);
      const parsedResp = await resp.json();
      const articles = parsedResp.articles;
      console.log(parsedResp); // object

      dispatch(setArticles(articles));
      dispatch(setLastArticleIndex(articles, articlesPerPage));
      dispatch(setLastPage(articles, articlesPerPage));
    } catch (error) {
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

export const fetchCategoryArticles = () => {
  return (dispatch, getState) => {
    const categories = getState().auth.user.categories.map(category => category.name.toLowerCase());

    categories.forEach(async category => {
      try {
        const resp = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=6&page=1`, apiKey);
        const parsedResp = await resp.json();
        const articles = parsedResp.articles;
        const categoryArticles = { [category]: articles };

        dispatch(setCategoryArticles(categoryArticles));
      } catch (error) {
        dispatch(fetchCategoryArticlesFailed());
      }
    });
  };
};

const setCategoryArticles = articles => {
  return {
    type: actionTypes.SET_CATEGORY_ARTICLES,
    articles
  };
};

const fetchCategoryArticlesFailed = () => {
  return {
    type: actionTypes.FETCH_CATEGORY_ARTICLES_FAILED
  };
};

export const saveArticle = article => {
  return async (dispatch, getState) => {
    const { user } = getState().auth.user;
    const postedArticle = await postArticle(article);
    saveToUserCollection(postedArticle, user);
  };
};

const postArticle = async article => {
  const resp = await fetch('http://localhost:4000/articles', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
    body: JSON.stringify(article)
    });
  const savedArticle = await resp.json();
  return savedArticle;
};

const saveToUserCollection = (article, user) => {
  let collectionInstance = {
    user_id: user.id,
    article_id: article.id
  };

  fetch('http://localhost:4000/collections', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(collectionInstance)
  });
};

const setCollectionArticles = articles => {
  return {
    type: actionTypes.SET_COLLECTION_ARTICLES,
    articles,
    totalCollectionArticles: articles.length
  };
};

export const fetchCollectionArticles = () => {
  return async (dispatch, getState) => {
    const { collectionArticles: stateCollectionArticles } = getState().articles;
    const { user } = getState().auth.user;
    const { articlesPerPage } = getState().pageManager;
    const resp = await fetch(`http://localhost:4000/collections/${user.id}`);
    const collectionArticles = await resp.json();
    
    if (!stateCollectionArticles || stateCollectionArticles.length !== collectionArticles.length) {
      dispatch(setCollectionArticles(collectionArticles));
      dispatch(setLastArticleIndex(collectionArticles, articlesPerPage));
      dispatch(setLastPage(collectionArticles, articlesPerPage));
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

// getTopicNews = () => {
  //   const { page, searchTopic } = this.state

  //   fetch(`https://newsapi.org/v2/everything?q=${searchTopic}&language=en&pageSize=9&page=${page}`, apiKey)
  //   .then(resp => resp.json())
  //   .then(data => this.setState({
  //     topicNews: data.articles
  //   }, () => this.setTotalResults(data.totalResults)))
  //   .then(this.setState({
  //     topicHeader: searchTopic
  //   }))
  //   .then(this.clearSearch())
  // }

export const fetchTopicArticles = searchTopic => { 
  return async (dispatch) => {
    try {
      const resp = await fetch(`https://newsapi.org/v2/everything?q=${searchTopic}&language=en`, apiKey);
      const parsedResp = await resp.json();
      const articles = await parsedResp.articles;
      dispatch(setTopicArticles(articles, searchTopic));
    } catch (error) {
      dispatch(fetchArticlesFailed());
    }
  };
};
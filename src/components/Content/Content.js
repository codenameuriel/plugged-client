import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import Spinner from '../../components/Spinner/Spinner';
import ArticleCard from '../ArticleCard/ArticleCard';

import ContentStyles from './Content.module.css';

class Content extends Component {
  renderContent() {
    const { type, user } = this.props;
    switch (type) {
      case "top-news":
        const { articles, prevLastArticleIndex, lastArticleIndex, onPostArticle } = this.props;
        let topNewsContent = null;
        if (articles) {
          const articlesPerPage = articles.slice(prevLastArticleIndex, lastArticleIndex);

          topNewsContent = articlesPerPage.map((article, index) => {
            return <ArticleCard {...article} key={index} isAuthenticated={!!user} inCollection={false} onPostArticle={onPostArticle}/>;
          });

          return (
            <section className={ContentStyles.Articles}>{topNewsContent}</section>
          );
        }
        break;
      case "dashboard":
        const { categoryArticles, onPostArticle: saveArticle } = this.props;
        let dashboardContent = [];
        for (let category in categoryArticles) {
          dashboardContent.push(
            <section className={ContentStyles.Dashboard}>
              <h1><span><hr/></span>{category}<span><hr/></span></h1>
              <div className={ContentStyles.Articles}>
                {categoryArticles[category].map((article, index) => {
                  return <ArticleCard {...article} key={`${index}${article.url}`} isAuthenticated={!!user} inCollection={false} onPostArticle={saveArticle}/>;
                })}
              </div>
            </section> 
          );
        }
        return dashboardContent;
      case "collection":
        const { collectionArticles } = this.props;
        if (collectionArticles) {
          return collectionArticles.map(({ article }, index) => {
            return <ArticleCard {...article} key={`${index}${article.id}`} isAuthenticated={!!user} inCollection={true}/>;
          });
        }
        break;
      default: return null;
    }
  }

  render() {
    let content = <Spinner />;
    if (this.renderContent()) {
      content = this.renderContent();
    }
    return content;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    articles: state.articles.articles,
    categoryArticles: state.articles.categoryArticles,
    collectionArticles: state.articles.collectionArticles,
    prevLastArticleIndex: state.pageManager.prevLastArticleIndex,
    lastArticleIndex: state.pageManager.lastArticleIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPostArticle: article => dispatch(actionCreators.saveArticle(article))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
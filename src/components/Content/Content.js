import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/Spinner/Spinner';
import ArticleCard from '../ArticleCard/ArticleCard';

class Content extends Component {
  renderContent() {
    const { type, user } = this.props;
    switch (type) {
      case "top-news":
        const { articles, prevLastArticleIndex, lastArticleIndex, onPostArticle } = this.props;
        if (articles) {
          const articlesPerPage = articles.slice(prevLastArticleIndex, lastArticleIndex);

          return articlesPerPage.map((article, index) => {
            return <ArticleCard {...article} key={index} isAuthenticated={!!user} inCollection={false} onPostArticle={onPostArticle}/>;
          });
        }
        break;
      case "dashboard":
        const { categoryArticles, onPostArticle: saveArticle } = this.props;
        let content = [];
        for (let category in categoryArticles) {
          content.push(
            <>
              <h1>{category}</h1>
              {categoryArticles[category].map((article, index) => {
                return <ArticleCard {...article} key={index} isAuthenticated={!!user} inCollection={false} onPostArticle={saveArticle}/>;
              })}
            </> 
          );
        }
        return content;
      case "collection":
        const { collectionArticles } = this.props;
        if (collectionArticles) {
          return collectionArticles.map(({article}, index) => {
            return <ArticleCard {...article} key={index} isAuthenticated={!!user} inCollection={true}/>;
          });
        }
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
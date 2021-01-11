import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import NewsCard from '../../components/NewsCard';
import DBNewsCard from '../DBNewsCard';

class Content extends Component {
  renderContent() {
    const { type, user } = this.props;
    switch (type) {
      case "top-news":
        const { articles, prevLastArticleIndex, lastArticleIndex } = this.props;
        if (articles) {
          const articlesPerPage = articles.slice(prevLastArticleIndex, lastArticleIndex);
          return articlesPerPage.map((article, index) => {
              // return <ArticleCard {...article} key={index}/>;
              return <NewsCard {...article} key={index} isAuthenticated={!!user}/>;
          });
        }
        break;
      case "dashboard":
        const { categoryArticles } = this.props;
        let content = [];
        for (let category in categoryArticles) {
          content.push(
            <>
              <h1>{category}</h1>
              {categoryArticles[category].map((article, index) => {
                return <NewsCard {...article} key={index} isAuthenticated={!!user}/>;
              })}
            </> 
          );
        }
        return content;
      case "collection":
        const { articles: collectionArticles } = this.props;
        if (collectionArticles) {
          return collectionArticles.map((article, index) => {
            return <DBNewsCard {...article} key={index} isAuthenticated={!!user}/>;
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
    prevLastArticleIndex: state.pageManager.prevLastArticleIndex,
    lastArticleIndex: state.pageManager.lastArticleIndex
  };
};

export default connect(mapStateToProps)(Content);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import NewsCard from '../../components/NewsCard';

class Content extends Component {
  render() {
    const { articles, prevLastArticleIndex, lastArticleIndex } = this.props;
    let content = <Spinner />;

    if (articles) {
      const articlesPerPage = articles.slice(prevLastArticleIndex || 0, lastArticleIndex);
      content = (
        articlesPerPage.map((article, index) => {
          // return <ArticleCard {...article} key={index}/>;
          return <NewsCard {...article} key={index}/>;
        })  
      );
    }
    return content;
  }
}

const mapStateToProps = state => {
  return {
    prevLastArticleIndex: state.pageManager.prevLastArticleIndex,
    lastArticleIndex: state.pageManager.lastArticleIndex
  };
};

export default connect(mapStateToProps)(Content);
/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import Layout from '../../hoc/Layout/Layout';
import PageManager from '../PageManager/PageManager';
import Articles from '../../components/Articles/Articles';
// import Loader from '../../components/Loader/Loader';
// import Button from '../../components/UI/Button/Button';

import CollectionNewsStyles from './CollectionNews.module.css';

class Collection extends Component {
  state = {
    type: 'collection',
    title: 'Collection',
    subtitle: 'Here are your saved news articles'
  };

  createArticlesProps(news, userLoggedIn, removeFromCollection) {
    let articlesProps = { news, userLoggedIn };
    let loggedInProps = { onClick: removeFromCollection };
    if (userLoggedIn) {
      articlesProps = {
        ...articlesProps,
        ...loggedInProps,
        inCollection: true
      };
    }
    return articlesProps;
  }

  content(articlesProps) {
    return (
      <section className={CollectionNewsStyles.Articles}>
        <Articles articlesProps={articlesProps} />
      </section>
    );
  }

  render() {
    const { type, title, subtitle } = this.state;
    const { collectionNews: news, userLoggedIn, removeFromCollection } = this.props;
    const articlesProps = this.createArticlesProps(
      news,
      userLoggedIn,
      removeFromCollection
    );

    return (
      <Layout type={type} title={title} subtitle={subtitle}>
        <PageManager />
        {news.length ? this.content(articlesProps) : <p>No saved news</p>}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.auth.userLoggedIn,
    collectionNews: state.news.collectionNews
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCollection: newsStory => dispatch(actionCreators.removeFromCollection(newsStory))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);

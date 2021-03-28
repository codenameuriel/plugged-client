import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';
import { checkParamsForUpdate } from '../../utils/params';

import Layout from '../../hoc/Layout/Layout';
import PageManager from '../PageManager/PageManager';
import Articles from '../../components/Articles/Articles';
import Loader from '../../components/Loader/Loader';

import CategoryNewsStyles from './CategoryNews.module.css';

const category = window.location.pathname.split('/')[1];
const categoryTitle = category[0].toUpperCase() + category.slice(1);

class CategoryNews extends React.Component {
  state = {
    title: 'Category News',
    subtitle: `Top News in ${categoryTitle}`,
    type: 'category news'
  }

  componentDidMount() {
    const { params } = this.props;
    this.props.getCategoryNews('category-news', params);
  }

  componentDidUpdate(prevProps) {
    const { getCategoryNews, params: currParams } = this.props;
    const { params: prevParams } = prevProps;

    let paramsHaveChanged = checkParamsForUpdate(prevParams, currParams);
    if (paramsHaveChanged) getCategoryNews('category-news', currParams);
  }

  componentWillUnmount() {
    const { clearParams } = this.props;
    clearParams();
  }

  createArticlesProps(news, userLoggedIn, addToCollection) {
    let articlesProps = { news, userLoggedIn };
    let loggedInProps = { onClick: addToCollection };
    if (userLoggedIn) {
      articlesProps = {
        ...articlesProps,
        ...loggedInProps
      };
    }
    return articlesProps;
  }

  content(articlesProps) {
    return (
      <section className={CategoryNewsStyles.Articles}>
        <Articles articlesProps={articlesProps} />
      </section>
    );
  }

  render() {
    const { title, subtitle, type } = this.state;
    const { news, userLoggedIn, addToCollection } = this.props;
    const articlesProps = this.createArticlesProps(
      news,
      userLoggedIn,
      addToCollection
    );

    return (
      <Layout title={title} subtitle={subtitle} type={type}>
        <PageManager />
        {news ? this.content(articlesProps) : <Loader />}
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.auth.userLoggedIn,
    news: state.news.news,
    params: state.params.params
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategoryNews: (pathName, params) => 
      dispatch(actionCreators.getNews(pathName, params)),
    clearParams: () => dispatch(actionCreators.clearParams()),
    addToCollection: newsStory =>
      dispatch(actionCreators.saveNewsStory(newsStory))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryNews);

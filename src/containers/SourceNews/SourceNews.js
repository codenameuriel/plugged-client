import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';
import { checkParamsForUpdate } from '../../utils/params';

import Layout from '../../hoc/Layout/Layout';
import PageManager from '../PageManager/PageManager';
import Articles from '../../components/Articles/Articles';
import Loader from '../../components/Loader/Loader';

import SourceNewsStyles from './SourceNews.module.css';

class SourceNews extends React.Component {
  state = {
    title: 'Source News',
    subtitle: '',
    type: 'sources news'
  }

  componentDidMount() {
    this.setSubtitle();
    const { params } = this.props;
    this.props.getSourcesNews('sources-news', params);
  }

  componentDidUpdate(prevProps) {
    const { getSourcesNews, params: currParams } = this.props;
    const { params: prevParams } = prevProps;

    let paramsHaveChanged = checkParamsForUpdate(prevParams, currParams);
    if (paramsHaveChanged) getSourcesNews('sources-news', currParams);
  }

  componentWillUnmount() {
    const { clearParams } = this.props;
    clearParams();
  }

  setSubtitle() {
    const sourcesString = window.location.pathname.split('/')[2];
    const sourcesArray = sourcesString.split('-');
    const sources = (
      sourcesArray.map(source => source[0].toUpperCase() + source.slice(1))
    );
    const sourcesTitle = sources.join(' ');
    this.setState({ subtitle: `Top News in ${sourcesTitle}` });
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
      <section className={SourceNewsStyles.Articles}>
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
    getSourcesNews: (pathName, params) => 
      dispatch(actionCreators.getNews(pathName, params)),
    clearParams: () => dispatch(actionCreators.clearParams()),
    addToCollection: newsStory =>
      dispatch(actionCreators.saveNewsStory(newsStory))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceNews);

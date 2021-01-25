import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import Layout from '../../hoc/Layout/Layout';
import Content from '../../components/Content/Content';
import PageManager from '../PageManager/PageManager';

class TopNews extends Component {
  state = {
    type: "top-news",
    title: "Top Headlines",
    subtitle: "Live and breaking headlines"
  }

  componentDidMount() {
    this.props.onGetTopNews();
  }

  render() {
    const { type, title, subtitle } = this.state;
    return (
      <Layout title={title} subtitle={subtitle} type={type}>
        <PageManager />
        <Content type={type} />
        <button 
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}>Scroll Top</button>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.news.news
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetTopNews: () => dispatch(actionCreators.getTopNews())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNews);
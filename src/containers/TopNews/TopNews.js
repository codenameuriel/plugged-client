import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
// import Nav from '../../components/Nav.js'
// import NewsMapper from '../../components/NewsMapper'

// import TopNewsStyles from '../styles/TopNews.module.css'\
import TopNewsStyles from './TopNews.module.css';

import Layout from '../../hoc/Layout/Layout';
import Content from '../../components/Content/Content';
import PageManager from '../PageManager/PageManager';

class TopNews extends Component {
  state = {
    title: "Top Headlines",
    subtitle: "Live and breaking headlines"
  }

  componentDidMount() {
    this.props.onFetchArticles();
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.page !== this.props.page)
  //     // this.getArticlesFromDB()
  //     this.getTopNews()
  // }

  // getTopNews = () => {
  //   const { page } = this.state;
    
  //   fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=9&page=${page}`, apiKey)
  //     .then(resp => resp.json())
  //     .then(data => this.setState({
  //        topNews: data.articles 
  //      }, () => setTotalResults(data.totalResults)))
  // }

  render() {
    // const { 
    //   page, loggedInUser, showPrevPageButton, prevPage, nextPage, lastPage
    // } = this.props

    // let jumbotronMessage; 
    // let nextPageInnerText = `Go to Page ${page + 1}`

    // if (!loggedInUser.username) {
    //   jumbotronMessage = 'Log in or sign up to get your news'
    // } else if (loggedInUser.username) {
    //   jumbotronMessage = 'Live and breaking headlines'
    // }

    // if (lastPage) {
    //   nextPageInnerText = 'Back to Page 1'
    // }

   const { title, subtitle } = this.state;

    return (
      // create TopNews styling
      <div className={TopNewsStyles.TopNews}>
          {/* <header className={TopNewsStyles.header} >
            <h1>Top Headlines</h1>
            <p>{jumbotronMessage}</p>
          </header>
        <Nav 
          links={this.props.links}
        />
        {showPrevPageButton && 
          <button className={TopNewsStyles.button} onClick={prevPage} >Previous Page</button>
        }
        <button
          className={TopNewsStyles.button} 
          onClick={nextPage} >{nextPageInnerText}</button>
        <NewsMapper
          news={this.state.topNews}
          loggedInUser={this.props.loggedInUser}
          postArticle={this.props.postArticle}
        /> */}
        <Layout title={title} subtitle={subtitle}>
          <PageManager/>
          <Content/>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articles.articles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchArticles: () => dispatch(actionCreators.fetchArticles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNews);
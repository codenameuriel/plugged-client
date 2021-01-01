import React, { Component } from 'react'
import { apiKey } from '../../apiKey'
// import Nav from '../../components/Nav.js'
// import NewsMapper from '../../components/NewsMapper'

// import TopNewsStyles from '../styles/TopNews.module.css'\
import TopNewsStyles from './TopNews.module.css';

import Layout from '../../hoc/Layout/Layout';
import Content from '../../components/Content/Content';

class TopNews extends Component {
  state = {
    topNews: null,
    totalResults: 0,
    title: "Top Headlines",
    subtitle: "Live and breaking headlines"
  }

  componentDidMount() {
    this.getTopNews();
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
  getTopNews = () => {
    fetch("https://newsapi.org/v2/top-headlines?country=us", apiKey)
      .then(resp => resp.json())
      .then(data => this.setState({
         topNews: data.articles,
         topResults: data.totalResults }
      ));
  }
  
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

    const { page, totalResults, title, subtitle } = this.state;

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
          {/* <PageManager page={page} totalResults={totalResults}/> */}
          <Content articles={this.state.topNews}/>
        </Layout>
      </div>
    )
  }
}

export default TopNews

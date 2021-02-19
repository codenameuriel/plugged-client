/** @format */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actionCreators from '../../store/actions/index'
import { checkParamsForUpdate } from '../../utils/params'

import Layout from '../../hoc/Layout/Layout'
import PageManager from '../PageManager/PageManager'
import Articles from '../../components/Articles/Articles'
import Loader from '../../components/Loader/Loader'

import TopNewsStyles from './TopNews.module.css'

class TopNews extends Component {
  state = {
    type: 'top-news',
    title: 'Top Headlines',
    subtitle: 'Live and breaking headlines'
  }

  componentDidMount() {
    this.props.getNews('top-news')
  }

  componentDidUpdate(prevProps) {
    const { getNews, params: currParams } = this.props
    const { params: prevParams } = prevProps

    let paramsHaveChanged = checkParamsForUpdate(prevParams, currParams)
    if (paramsHaveChanged) getNews('top-news', currParams)
  }

  createArticlesProps(news, userLoggedIn, addToCollection) {
    let articlesProps = { news, userLoggedIn }
    let loggedInProps = { onClick: addToCollection }
    if (userLoggedIn) {
      articlesProps = {
        ...articlesProps,
        ...loggedInProps
      }
    }
    return articlesProps
  }

  content(articlesProps) {
    return (
      <section className={TopNewsStyles.Articles}>
        <Articles articlesProps={articlesProps} />
      </section>
    )
  }

  render() {
    const { type, title, subtitle } = this.state
    const { news, userLoggedIn, addToCollection } = this.props
    const articlesProps = this.createArticlesProps(
      news,
      userLoggedIn,
      addToCollection
    )

    return (
      <Layout title={title} subtitle={subtitle} type={type}>
        <PageManager />
        {news ? this.content(articlesProps) : <Loader />}
        <button
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }
        >
          Scroll Top
        </button>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.auth.userLoggedIn,
    news: state.news.news,
    params: state.params.params
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNews: (pathName, params) =>
      dispatch(actionCreators.getNews(pathName, params)),
    addToCollection: newsStory =>
      dispatch(actionCreators.saveNewsStory(newsStory))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNews)

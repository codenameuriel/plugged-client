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
    this.props.getTopNews()
  }

  componentDidUpdate(prevProps) {
    const { getTopNews, params: currParams } = this.props
    const { params: prevParams } = prevProps
    // "check for new params" more meaningful name

    let paramsHaveChanged = checkParamsForUpdate(prevParams, currParams)
    if (paramsHaveChanged) getTopNews(currParams)
  }

  renderArticles(news, isLoggedIn, addToCollection) {
    let articlesProps = { news, isLoggedIn }

    if (isLoggedIn) {
      articlesProps = {
        ...articlesProps,
        isLoggedIn,
        inCollection: false,
        addToCollection
      }
    }

    return (
      <section className={TopNewsStyles.Articles}>
        <Articles articlesProps={articlesProps} />
      </section>
    )
  }

  render() {
    const { type, title, subtitle } = this.state
    const { news, user, addToCollection } = this.props

    return (
      <Layout title={title} subtitle={subtitle} type={type}>
        <PageManager />
        {news ? this.renderArticles(news, !!user, addToCollection) : <Loader />}
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
    user: state.auth.user,
    news: state.news.news,
    params: state.params.params
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTopNews: params => dispatch(actionCreators.getTopNews(params)),
    addToCollection: newsStory =>
      dispatch(actionCreators.saveNewsStory(newsStory))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNews)

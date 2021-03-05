import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import { checkParamsForUpdate } from '../../utils/params'

import Layout from '../../hoc/Layout/Layout'
import PageManager from '../PageManager/PageManager'
import Articles from '../../components/Articles/Articles'
import Loader from '../../components/Loader/Loader'

import TopicNewsStyles from './TopicNews.module.css'

class TopicNews extends Component {
  state = {
    type: 'topic-news',
    title: 'Topic News',
    subtitle: (
      <>
        Here's the latest on <span>"{this.props.params.q}"</span>
      </>
    )
  }

  componentDidMount() {
    this.props.getNews('topic-news', this.props.params)
  }

  componentDidUpdate(prevProps) {
    const { getNews, params: currParams } = this.props
    const { params: prevParams } = prevProps
    let paramsHaveChanged = checkParamsForUpdate(prevParams, currParams)
    if (paramsHaveChanged) {
      getNews('topic-news', currParams)
      this.setState({
        subtitle: (
          <>
            Here's the latest on <span>"{currParams.q}"</span>
          </>
        )
      })
    }
  }

  componentWillUnmount() {
    this.props.onClearParams()
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
      <section className={TopicNewsStyles.Articles}>
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
    params: state.params.params,
    news: state.news.news
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNews: (pathName, params) =>
      dispatch(actionCreators.getNews(pathName, params)),
    onClearParams: () => {
      dispatch(actionCreators.clearParams())
      dispatch(actionCreators.firstPage())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicNews)

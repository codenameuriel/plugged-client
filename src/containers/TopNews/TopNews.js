/** @format */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import { checkParamsForUpdate } from '../../utils/params'

import Layout from '../../hoc/Layout/Layout'
import PageManager from '../PageManager/PageManager'
import Content from '../../components/Content/Content'

class TopNews extends Component {
  state = {
    type: 'top-news',
    title: 'Top Headlines',
    subtitle: 'Live and breaking headlines',
  }

  componentDidMount() {
    this.props.onGetTopNews()
  }

  componentDidUpdate(prevProps) {
    const { onGetTopNews, params: currParams } = this.props
    const { params: prevParams } = prevProps
    let paramsHaveChanged = checkParamsForUpdate(prevParams, currParams)
    if (paramsHaveChanged) onGetTopNews(currParams)
  }

  render() {
    const { type, title, subtitle } = this.state
    return (
      <Layout title={title} subtitle={subtitle} type={type}>
        <PageManager />
        <Content type={type} />
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
    news: state.news.news,
    params: state.params.params,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetTopNews: params => dispatch(actionCreators.getTopNews(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNews)

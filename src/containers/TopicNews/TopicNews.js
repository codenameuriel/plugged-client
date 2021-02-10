/** @format */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import { checkParamsForUpdate } from '../../utils/params'

import Layout from '../../hoc/Layout/Layout'
import PageManager from '../PageManager/PageManager'
import Content from '../../components/Content/Content'

class TopicNews extends Component {
  state = {
    type: 'topic-news',
    title: 'Topic News',
    subtitle: (
      <>
        Here's the latest on <span>"{this.props.params.q}"</span>
      </>
    ),
  }

  componentDidMount() {
    this.props.onGetTopicNews(this.props.params)
  }

  componentDidUpdate(prevProps) {
    const { onGetTopicNews, params: currParams } = this.props
    const { params: prevParams } = prevProps
    let paramsHaveChanged = checkParamsForUpdate(prevParams, currParams)
    if (paramsHaveChanged) {
      onGetTopicNews(currParams)
      this.setState({
        subtitle: (
          <>
            Here's the latest on <span>"{currParams.q}"</span>
          </>
        ),
      })
    }
  }

  componentWillUnmount() {
    this.props.onClearParams()
  }

  // renderDisplay = () => {
  //   const { searchTopic, topicHeader, postArticle, loggedInUser, links } = this.props

  //   const { topicNews } = this.state

  //   // const { page, showPrevPageButton, prevPage, nextPage, lastPage } = this.props
  //   let display;

  //   // let nextPageInnerText = `Go to Page ${page + 1}`

  //   // if (lastPage) {
  //   //   nextPageInnerText = 'Back to Page 1'
  //   // }

  //   if (topicNews.length > 0) {
  //   display =
  //     <>
  //       <header className={TopicNewsStyles.header} >
  //         <h1>Topic News</h1>
  //         <p>Here's the latest on "<span className={TopicNewsStyles.span} >{topicHeader}</span>"</p>
  //       </header>
  //       <Nav links={links} />
  //       {/* {showPrevPageButton &&
  //         <button className={TopicNewsStyles.button} onClick={prevPage} >Previous Page</button>}
  //         <button className={TopicNewsStyles.button} onClick={nextPage} >{nextPageInnerText}</button> */}
  //       <NewsMapper
  //         news={topicNews}
  //         postArticle={postArticle}
  //         loggedInUser={loggedInUser}
  //       />
  //     </>
  //   } else if (!loggedInUser.username) {
  //     display =
  //       <h5 className={TopicNewsStyles.h5} ><Link className={TopicNewsStyles.link} to="/login">Log in</Link> to search for news</h5>
  //   } else if (topicNews.length < 1) {
  //     display =
  //       <>
  //         <Nav links={links} />
  //         <h1>Sorry there were no news found on "{searchTopic}"</h1>
  //       </>
  //   }
  //   return display
  // }

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
    // searchTopic: state.news.searchTopic,
    params: state.params.params,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetTopicNews: params => dispatch(actionCreators.getTopicNews(params)),
    onClearParams: () => {
      dispatch(actionCreators.clearParams())
      dispatch(actionCreators.firstPage())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicNews)

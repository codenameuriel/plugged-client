/** @format */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'

import Loader from '../Loader/Loader'
import ArticleCard from '../ArticleCard/ArticleCard'

import ContentStyles from './Content.module.css'

class Content extends Component {
  renderTopNews() {
    const { news, user, onPostNewsStory } = this.props
    let topNewsContent = null
    if (news) {
      topNewsContent = news.map((newsStory, index) => {
        return (
          <ArticleCard
            {...newsStory}
            key={index}
            isAuthenticated={!!user}
            inCollection={false}
            onPostNewsStory={onPostNewsStory}
          />
        )
      })

      return <section className={ContentStyles.News}>{topNewsContent}</section>
    }
  }

  renderDashboardNews() {
    const { user, dashboardNews, onPostNewsStory } = this.props
    let dashboardContent = []
    for (let category in dashboardNews) {
      dashboardContent.push(
        <section className={ContentStyles.Dashboard}>
          <h1>
            <span>
              <hr />
            </span>
            {category}
            <span>
              <hr />
            </span>
          </h1>
          <div className={ContentStyles.News}>
            {dashboardNews[category].map((newsStory, index) => {
              return (
                <ArticleCard
                  {...newsStory}
                  key={`${index}${newsStory.url}`}
                  isAuthenticated={!!user}
                  inCollection={false}
                  onPostNewsStory={onPostNewsStory}
                />
              )
            })}
          </div>
        </section>
      )
    }
    return dashboardContent
  }

  renderCollectionNews() {
    const { user, collectionNews } = this.props
    if (collectionNews) {
      return collectionNews.map(({ article }, index) => {
        return (
          <ArticleCard
            {...article}
            key={`${index}${article.id}`}
            isAuthenticated={!!user}
            inCollection={true}
          />
        )
      })
    }
  }

  renderTopicNews() {
    const { user, topicNews, totalNews, searchTopic } = this.props
    let topicNewsContent = null
    if (topicNews) {
      topicNewsContent = topicNews.map((newsStory, index) => {
        return (
          <ArticleCard
            {...newsStory}
            key={`${index}${newsStory.id}`}
            isAuthenticated={!!user}
            inCollection={false}
          />
        )
      })
      return (
        <section className={ContentStyles.News}>{topicNewsContent}</section>
      )
    }
    if (totalNews) {
      return <p>Sorry, couldn't find any news on {searchTopic}</p>
    }
  }

  renderContent() {
    const { type } = this.props
    switch (type) {
      case 'top-news':
        return this.renderTopNews()
      case 'dashboard':
        return this.renderDashboardNews()
      case 'collection':
        return this.renderCollectionNews()
      case 'topic-news':
        return this.renderTopicNews()
      default:
        return null // error page
    }
  }

  render() {
    let content = <Loader />
    if (this.renderContent()) {
      content = this.renderContent()
    }
    return content
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    news: state.news.news,
    dashboardNews: state.news.dashboardNews,
    collectionNews: state.news.collectionNews,
    topicNews: state.news.topicNews,
    totalNews: state.news.totalNews,
    searchTopic: state.news.searchTopic,
    prevLastArticleIndex: state.pageManager.prevLastArticleIndex,
    lastNewsStoryIndex: state.pageManager.lastNewsStoryIndex
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPostNewsStory: newsStory =>
      dispatch(actionCreators.saveNewsStory(newsStory))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)

import React, { Component } from 'react'
import NewsMapper from './NewsMapper'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import TopicNewsStyles from '../styles/TopicNewsStyles.module.css'

class TopicNews extends Component {
  renderDisplay = () => {
    const { topicNews, searchTopic, postArticle, loggedInUser, links } = this.props
    let display;

    if (topicNews.length > 0) {
    display = 
      <>
        <Nav links={links} />
        <h1>Here's the latest on "{searchTopic}"</h1>
        <NewsMapper 
          news={topicNews} 
          postArticle={postArticle} 
          loggedInUser={loggedInUser} 
        />
      </>
    } else if (!loggedInUser.username) {
      display = 
        <h1><Link to="/login">Log in</Link> to search for news</h1>
    } else if (topicNews.length < 1) {
      display = 
        <>
          <Nav links={links} />
          <h1>Sorry there were no news found on "{searchTopic}"</h1>
        </>
    }
    return display
  }

  render() {
    return (
      <div className={TopicNewsStyles.container} >
       {this.renderDisplay()}
      </div>
    )
  }
}

export default TopicNews

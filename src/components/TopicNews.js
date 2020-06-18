import React, { Component } from 'react'
import NewsMapper from './NewsMapper'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import TopicNewsStyles from '../styles/TopicNewsStyles.module.css'

class TopicNews extends Component {
  state = {
    topicNews: []
  }

  componentDidMount = () => {
    this.setState({
      topicNews: this.props.topicNews
    })
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.topicNews[0] !== this.props.topicNews[0]) {
      console.log(prevProps.topicNews)
      console.log(this.props.topicNews)
      this.setState({
        topicNews: this.props.topicNews
      })
    }
  }

  renderDisplay = () => {
    const { searchTopic, postArticle, loggedInUser, links } = this.props

    const { topicNews } = this.state 

    const { page, showPrevPageButton, prevPage, nextPage, lastPage } = this.props
    let display;

    let nextPageInnerText = `Go to Page ${page + 1}`

    if (lastPage) {
      nextPageInnerText = 'Back to Page 1'
    }

    if (topicNews.length > 0) {
    display = 
      <>
        <header className={TopicNewsStyles.header} >
          <h1>Topic News</h1>
          {/* <p>Here's the latest on "<span className={TopicNewsStyles.span} >{searchTopic}</span>"</p> */}
        </header>
        <Nav links={links} />
        {/* {showPrevPageButton && 
          <button className={TopicNewsStyles.button} onClick={prevPage} >Previous Page</button>}
          <button className={TopicNewsStyles.button} onClick={nextPage} >{nextPageInnerText}</button> */}
        <NewsMapper 
          news={topicNews} 
          postArticle={postArticle} 
          loggedInUser={loggedInUser} 
        />
      </>
    } else if (!loggedInUser.username) {
      display = 
        <h5 className={TopicNewsStyles.h5} ><Link className={TopicNewsStyles.link} to="/login">Log in</Link> to search for news</h5>
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

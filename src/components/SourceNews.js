import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import NewsMapper from './NewsMapper'
import SourceNewsStyles from '../styles/SourceNews.module.css'

class SourceNews extends Component {
  renderDisplay = () => {
    const { loggedInUser, links, postArticle, sourceNews } = this.props
    let display;

    if (loggedInUser.username) {
      display = 
        <>
          <header className={SourceNewsStyles.header} >
            <h1>Welcome to the source news</h1>
          </header>
          <Nav links={links}/>
          <NewsMapper news={sourceNews} loggedInUser={loggedInUser} postArticle={postArticle}/>
        </>
    } else {
      display = 
        <>
          <h1><Link to="/login">Log in</Link> to view your source news</h1>
        </>
    }
    return display
  }

  render() {
    return (
      <div>
        {this.renderDisplay()}
      </div>
    )
  }
}

export default SourceNews 

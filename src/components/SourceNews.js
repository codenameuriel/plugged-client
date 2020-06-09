import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import NewsMapper from './NewsMapper'

class SourceNews extends Component {
  renderDisplay = () => {
    const { loggedInUser, links, postArticle, sourceNews } = this.props
    let display;

    if (loggedInUser.username) {
      display = 
        <>
          <h1>Welcome to the source news</h1>
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

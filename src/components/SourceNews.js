import React, { Component } from 'react'
import Nav from './Nav'
import NewsMapper from './NewsMapper'

class SourceNews extends Component {
  render() {
    const { sourceNews,links, loggedInUser, postArticle } = this.props

    return (
      <div>
        <h1>Welcome to the source news</h1>
        <Nav links={links}/>
        <NewsMapper news={sourceNews} loggedInUser={loggedInUser} postArticle={postArticle}/>
      </div>
    )
  }
}

export default SourceNews 

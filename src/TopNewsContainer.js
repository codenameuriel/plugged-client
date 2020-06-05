import React, { Component } from 'react'
import Nav from './Nav.js'
import NewsCard from './NewsCard.js'

class TopNewsContainer extends Component {
  renderNewsCards = () => {
    const { topNews, loggedInUser, postArticle } = this.props

    return topNews.map((article, index) => 
      <NewsCard 
        key={index} 
        {...article} 
        loggedInUser={loggedInUser}
        postArticle={postArticle}
      />)
  }

  render() {
    const { 
      page, loggedInUser, showPrevPageButton, prevPage, nextPage
    } = this.props
    const [login, signup] = this.props.links

    let jumbotronMessage = 'Log in or create an account to see your top stories'
    let nextPageInnerText = `Go to Page ${page + 1}`

    if (loggedInUser.username) {
      jumbotronMessage = `Welcome back ${loggedInUser.username}`
    }

    if (page === 8) {
      nextPageInnerText = 'Back to Page 1'
    }

  

    return (
      <div>
          <div>
            <h1>Trending Stories</h1>
            <p>{jumbotronMessage}</p>
          </div>
        <Nav 
          links={[login, signup]}
        />
        {showPrevPageButton && 
          <button 
            onClick={prevPage} >Previous Page</button>}
        <button 
          onClick={nextPage} >{nextPageInnerText}</button>
        {this.renderNewsCards()}
      </div>
    )
  }
}

export default TopNewsContainer

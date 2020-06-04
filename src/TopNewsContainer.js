import React, { Component } from 'react'
import Nav from './Nav.js'
import NewsCard from './NewsCard.js'

class TopNewsContainer extends Component {
  renderNewsCards = () => (
    this.props.topNews.map((article, index) => 
      <NewsCard 
        key={index} {...article} 
        loggedInUser={this.props.loggedInUser}
        postArticle={this.props.postArticle}
      />)
  )

  render() {
    let jumbotronMessage = 'Log in or create an account to see your top stories'
    let nextPageInnerText = `Go to Page ${this.props.page + 1}`

    if (this.props.loggedInUser.username) {
      jumbotronMessage = `Welcome back ${this.props.loggedInUser.username}`
    }

    if (this.props.page === 8) {
      nextPageInnerText = 'Back to Page 1'
    }

    const [login, signup] = this.props.links

    return (
      <div>
          <div>
            <h1>Trending Stories</h1>
            <p>{jumbotronMessage}</p>
          </div>
        <Nav 
          links={[login, signup]}
        />
        {this.props.showPrevPageButton && 
          <button 
            onClick={this.props.prevPage} >Previous Page</button>}
        <button 
          onClick={this.props.nextPage} >{nextPageInnerText}</button>
        {this.renderNewsCards()}
      </div>
    )
  }
}

export default TopNewsContainer

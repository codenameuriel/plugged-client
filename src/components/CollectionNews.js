import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DBNewsCard from './DBNewsCard'
import Nav from './Nav'

class CollectionNews extends Component {
  state = {
    newsCollection: [],
    page: 1,
    showPrevPageButton: false,
    totalNews: 0,
    lastPage: false
  }

  getNewsCollection = () => {
    const { loggedInUser } = this.props
    const { page } = this.state

    fetch(`http://localhost:4000/collections/${loggedInUser.id}per_page=9&page=${page}`)
    .then(resp => resp.json())
    .then(data => this.setState({
      newsCollection: data
    }, () => this.setTotalNews(data.length)))
  }

  componentDidMount() {
    this.getNewsCollection()
  }

  renderDBNewsCards = () => {
    const { newsCollection } = this.state
    const { loggedInUser }  = this.props

    return newsCollection.map(article => (
      <DBNewsCard 
        key={article.article.id} 
        {...article.article} 
        loggedInUser={loggedInUser}
        removeFromCollection={this.removeFromCollection}
      />
    ))
  }

  removeFromCollection = articleID => {
    fetch(`http://localhost:4000/articles/${articleID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({id: articleID})
    })
    .then(resp => resp.json())
    .then(this.getNewsCollection)
  }

  setTotalNews = total => {
    this.setState({
      totalResults: total
    })
  }

  // toggleLastPage = () => {
  //   let isLastPage = this.state.lastPage

  //   this.setState({
  //     lastPage: !isLastPage
  //   })
  // }

  // togglePrevPageButton = () => {
  //   if (this.state.page === 1) {
  //     this.setState({
  //       showPrevPageButton: false
  //     })
  //   } else {
  //     this.setState({
  //       showPrevPageButton: true
  //     })
  //   }
  // }

  // nextPage = () => {
  //   const { page, totalNews } = this.state

  //   let lastPage;
    
  //   if (totalNews % 9 === 0) {
  //     lastPage = totalNews / 9
  //   } else if (totalNews % 9 !== 0) {
  //     lastPage = Math.ceil(totalNews / 9)
  //   }

  //   if (page === lastPage) {
  //     this.setState({
  //       page: 1
  //     }, () => {
  //       this.togglePrevPageButton()
  //       this.toggleLastPage()
  //     })
  //   } else {
  //     this.setState({
  //       page: page + 1
  //     }, () => {
  //       this.togglePrevPageButton()
  //     })
  //   }

  //   if (page === lastPage - 1) {
  //     this.toggleLastPage()
  //   }
  // }

  prevPage = () => {
    let page = this.state.page
    if (page !== 1) {
      this.setState({
        page: page - 1
      }, () => {
        this.togglePrevPageButton()
      })
    }
  }

  render() {
    const { newsCollection, showPrevPageButton, page, lastPage } = this.state
    const { links, loggedInUser } = this.props
    // const { prevPage, nextPage } = this
    let collectionDisplay;
    // let nextPageInnerText = `Go to Page ${page + 1}`

    // if (lastPage) {
    //   nextPageInnerText = 'Back to Page 1'
    // }

    if (newsCollection.length > 0) {
      collectionDisplay = 
        <>
          <h1>Here are your saved news, {loggedInUser.username}</h1>
          {/* {showPrevPageButton && 
            <button onClick={prevPage} >Previous Page</button>}
            <button onClick={nextPage} >{nextPageInnerText}</button> */}
        </>
    } else if (!loggedInUser.username) {
      collectionDisplay = <h1><Link to="/login">Log in</Link> to see your saved news</h1>
    } else {
      collectionDisplay = 
        <>
          <h1>You have no saved news</h1>
          <p><Link to="/categories">Add</Link> some news to your collection!</p>
        </>
    }

    return (
      <div>
        <Nav links={links}/>
        {collectionDisplay}
        {this.renderDBNewsCards()}
      </div>
    )
  }
}

export default CollectionNews

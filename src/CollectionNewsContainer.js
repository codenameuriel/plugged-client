import React, { Component } from 'react'
import DBNewsCard from './DBNewsCard'
import Nav from './Nav'

export default class CollectionNewsContainer extends Component {
  state = {
    newsCollection: []
  }

  getUsersNewsCollection = () => {
    const { loggedInUser } = this.props

    fetch(`http://localhost:4000/collections/${loggedInUser.id}`)
    .then(resp => resp.json())
    .then(data => this.setState({
      newsCollection: data
    }))
  }

  componentDidMount() {
    this.getUsersNewsCollection()
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
    .then(this.getUsersNewsCollection)
  }

  render() {
    const { newsCollection } = this.state
    const { links, loggedInUser } = this.props
    let collectionDisplay;

    if (newsCollection.length > 0) {
      collectionDisplay = <h1>Here are your saved news, {loggedInUser.username}</h1>
    } else {
      collectionDisplay = <>
      <h1>You have no saved news</h1>
      <p>Add some news to your collection!</p>
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

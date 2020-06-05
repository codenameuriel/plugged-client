import React, { Component } from 'react'
import DBNewsCard from './DBNewsCard'
import Nav from './Nav'

export default class Collection extends Component {
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
      />
    ))
  }

  render() {
    console.log(this.state.newsCollection)
    const { links, loggedInUser } = this.props

    return (
      <div>
        <Nav links={links}/>
        <h1>Here are your top news, {loggedInUser.username}</h1>
        {this.renderDBNewsCards()}
      </div>
    )
  }
}

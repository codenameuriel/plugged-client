import React, { Component } from 'react'
import Nav from './Nav'

class Sources extends Component {
  state = {
    "business": [],
    "entertainment": [],
    "general": [],
    "health": [],
    "science": [],
    "sports": [],
    "technology": []
  }

  componentDidMount() {
    this.getSources('business')
    this.getSources('entertainment')
    this.getSources('general')
    this.getSources('health')
    this.getSources('science')
    this.getSources('sports')
    this.getSources('technology')
  }

  getSources = category => {
    fetch(`http://localhost:4000/get-sources/${category}`)
    .then(resp => resp.json())
    .then(data => this.setState({[category]: data})
    )
  }

  renderSources = category => {
    const { getSourceNews, history } = this.props

    return this.state[category].map(source => {
      return (
        <>
          <h4 onClick={() => {
            getSourceNews(source.name)
            history.push(`/source-news/${source.name.toLowerCase()}`)
            }}>{source.name}</h4>
          <p>{source.description}</p>
          <a target="_blank" rel="noopener noreferrer" href={source.url}>{source.url}</a>
        </>
      )
    })
  }

  render() {
    const { links } = this.props
    return (
      <div>
        <Nav links={links} />
        <h1>Search for your news by sources</h1>
        <h2>Business</h2>
        {this.renderSources("business")}
        <h2>Entertainment</h2>
        {this.renderSources("entertainment")}
        <h2>General</h2>
        {this.renderSources("general")}
        <h2>Health</h2>
        {this.renderSources("health")}
        <h2>Science</h2>
        {this.renderSources("science")}
        <h2>Sports</h2>
        {this.renderSources("sports")}
        <h2>Technology</h2>
        {this.renderSources("technology")}
      </div>
    )
  }
}

export default Sources

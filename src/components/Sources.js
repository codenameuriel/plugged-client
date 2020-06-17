import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import SourcesStyles from '../styles/Sources.module.css'
import Plug from '../assets/Plug.png'

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

    return (
      <div className={SourcesStyles.container} >
        {this.state[category].map(source => {
          return (
            <div className={SourcesStyles.sourceCard} >
              <div className={SourcesStyles.info} >
                <h4 
                  className={SourcesStyles.h4}
                  onClick={() => {
                  getSourceNews(source.name)
                  history.push(`/source-news/${source.name.toLowerCase()}`)
                  }}>{source.name}</h4>
                  <img
                    onClick={() => {
                      getSourceNews(source.name)
                      history.push(`/source-news/${source.name.toLowerCase()}`)
                    }} 
                    className={SourcesStyles.img} 
                    src={source.image_url || Plug} />
                <p>{source.description}</p>
                <a className={SourcesStyles.a} target="_blank" rel="noopener noreferrer" href={source.url}>{source.url}</a>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  renderDisplay = () => {
    const { loggedInUser, links } = this.props
    let display;

    if (loggedInUser.username) {
      display = 
        <>
          <header className={SourcesStyles.header} >
            <h1>Sources</h1>
            <p>Search your news by sources</p>
          </header>
          <Nav links={links} />
          <div>
            <h2 className={SourcesStyles.h2} >Business</h2>
            {this.renderSources("business")}
            <h2 className={SourcesStyles.h2} >Entertainment</h2>
            {this.renderSources("entertainment")}
            <h2 className={SourcesStyles.h2} >General</h2>
            {this.renderSources("general")}
            <h2 className={SourcesStyles.h2} >Health</h2>
            {this.renderSources("health")}
            <h2 className={SourcesStyles.h2} >Science</h2>
            {this.renderSources("science")}
            <h2 className={SourcesStyles.h2} >Sports</h2>
            {this.renderSources("sports")}
            <h2 className={SourcesStyles.h2} >Technology</h2>
            {this.renderSources("technology")}
          </div>
        </>
    } else {
      display = 
        <>
          <h5 className={SourcesStyles.h5} ><Link className={SourcesStyles.link} to="/login">Log in</Link> to see your news by sources</h5>
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

export default Sources

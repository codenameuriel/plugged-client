import React, { Component } from 'react'
import { apiKey } from '../apiKey'
import NewsMapper from './NewsMapper'
import { Link } from 'react-router-dom'
import Nav from './Nav'

class NewspaperNews extends Component {
  state = {
    categories: [],
    sources: [],
    topics: []
  }

  componentDidMount() {
    const { categories, sources, topics } = this.props.newspaper

    categories !== undefined && categories.map(category => this.renderByCategories(category.name))
    sources !== undefined && sources.map(source => this.renderBySources(source.name))
    topics !== undefined && topics.map(topic => this.renderByTopics(topic.name))
  }

  setCategories = data => {
    const { categories } = this.state

    this.setState({
      categories: [...categories, ...data]
    })
  }

  setSources = data => {
    const { sources } = this.state

    this.setState({
      sources: [...sources, ...data]
    })
  }

  setTopics = data => {
    const { topics } = this.state

    this.setState({
      topics: [...topics, ...data]
    })
  }

  renderByCategories = category => {
    return (
      fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=3&page=1`, apiKey)
      .then(resp => resp.json())
      .then(data => this.setCategories(data.articles))  
    ) 
  }
  
  renderBySources = source => {
    let parsedSource;
    if (source.indexOf(' ') > 0) {
      parsedSource = source.replace(/\s+/g, '-').toLowerCase();
    } else {
      parsedSource = source
    }

    return (
      fetch(`https://newsapi.org/v2/top-headlines?sources=${parsedSource}&pageSize=3&page=1`, apiKey)
      .then(resp => resp.json())
      .then(data => this.setSources(data.articles))  
    ) 
  }

  renderByTopics = topic => {
    return (
      fetch(`https://newsapi.org/v2/top-headlines?q=${topic}&pageSize=3&page=1`, apiKey)
      .then(resp => resp.json())
      .then(data => this.setTopics(data.articles))  
    ) 
  }

  render() {
    const { newspaper, loggedInUser, postArticle, links } = this.props
    const { categories, sources, topics } = this.state
    let display;

    if (categories.length >= 1 || sources.length >= 1 || topics.length >= 1) {
      display = 
        <>
        <h1>Welcome to your "{newspaper.title}" Newspaper</h1>
        <Nav links={links} />
        <hr />
        <h3>Categories</h3>
           {categories.length >= 1 ? <NewsMapper news={categories} loggedInUser={loggedInUser} postArticle={postArticle} /> 
           : <h5>Sorry no news were found for your categories</h5>
           }
        <h3>Sources</h3>
           {sources.length >= 1 ? <NewsMapper news={sources} loggedInUser={loggedInUser} postArticle={postArticle} /> 
           : <h5>Sorry no news were found for your sources</h5>
           }
        <h3>Topics</h3>
           {topics.length >= 1 ? <NewsMapper news={topics} loggedInUser={loggedInUser} postArticle={postArticle} />
           : <h5>Sorry no news were found for your topics</h5>
           }
        </>
    } else {
      display = 
        <h1><Link to="/login">Log in</Link> to view your newspapers</h1>
    }

    return (
      <div>
        {display}
      </div>
    )
  }
}

export default NewspaperNews

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import NewspaperMapper from './NewspaperMapper'

class Newspaper extends Component {
  state = {
    viewForm: false,
    title: '',
    categorySelect: '',
    categories: [],
    sources: [],
    renderSourceForm: false,
    sourceNames: [],
    topic: '',
    addedTopics: [],
    newspapers: []
  }

  componentDidUpdate(prevProps) {
    if (prevProps.newspaper !== this.props.newspaper) {
      const { newspapers } = this.state
      const { newspaper } = this.props

      this.setState({
        newspapers: [...newspapers, newspaper]
      })
    }
  }

  toggleViewForm = () => {
    let view = this.state.viewForm

    this.setState({
      viewForm: !view
    })
  }

  addCategories = event => {
    const { categories } = this.state
    if (categories.find(category => category === event.target.value)) {
      this.setState({
        categories: [...categories].filter(category => category !== event.target.value)
      })
    } else {
      this.setState({
        categories: [...categories, event.target.value]
      })
    }
  }

  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    })
  }

  handleCategoryChange = event => {
    const { renderSourceForm } = this.state
    if (renderSourceForm) {
      this.setState({
        renderSourceForm: false 
      })
    }
    this.setState({
      categorySelect: event.target.value
    }, () => this.fetchSources(this.state.categorySelect.toLowerCase()))
  }

  fetchSources = category => {
    fetch(`http://localhost:4000/get-sources/${category}`)
    .then(resp => resp.json())
    .then(data => this.setState({
      sources: data
    }, () => this.setState({
      renderSourceForm: true
    })))
  }

  handleSourcesFormCheck = event => {
    const { sourceNames } = this.state
    if (sourceNames.find(sourceName => sourceName === event.target.value)) {
      this.setState({
        sourceNames: [...sourceNames].filter(sourceName => sourceName !== event.target.value)
      })
    } else {
      this.setState({
        sourceNames: [...this.state.sourceNames, event.target.value]
      })
    }
  }

  handleTopicChange = event => {
    this.setState({
      topic: event.target.value
    })
  }

  addTopic = event => {
    event.preventDefault()
    const { topic, addedTopics } = this.state
    this.setState({
      addedTopics: [...addedTopics, topic]
    })
  }

  removeFromAddedTopics = target => {
    const { addedTopics } = this.state
    this.setState({
      addedTopics: [...addedTopics].filter(topic => topic !== target)
    })
  }

  renderTopics = () => {
    const { addedTopics } = this.state
    return addedTopics.map(t => {
      return (
        <>
          <p onClick={() => this.removeFromAddedTopics(t)} >"{t}"</p>
        </>
      )  
    })
  }


  renderSourcesForm = () => {
    const { sources, sourceNames } = this.state
    return sources.map(source => {
      return (
        <>
          <input
            onChange={this.handleSourcesFormCheck}
            checked={sourceNames.find(sn => sn === source.name) && "checked"}
            type="checkbox" 
            name="sources" 
            value={source.name} />{source.name}<br />
        </>
      )
    })
  }

  handleFormSubmit = event => {
    event.preventDefault()
    fetch('http://localhost:4000/newspaper/build-newspaper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        user: this.props.loggedInUser.id,
        categories: this.state.categories,
        sources: this.state.sourceNames,
        topics: this.state.addedTopics
      })
    })
    .then(resp => resp.json())
    // .then(data => this.props.setNewspaper(data))
    .then(console.log)
  }

  renderForm = () => {
    return (
      <>
        <form onSubmit={this.handleFormSubmit} >
          <label>Title: </label>
          <input onChange={this.handleTitleChange} type="text" value={this.state.title} required/>
  
          <fieldset onChange={this.addCategories}>      
              <legend>Select Categories: </legend>      
              <input type="checkbox" name="categories" value="Business" />Business<br />      
              <input type="checkbox" name="categories" value="Entertainment" />Entertainment<br />      
              <input type="checkbox" name="categories" value="Health" />Health<br />       
              <input type="checkbox" name="categories" value="Science" />Science<br />         
              <input type="checkbox" name="categories" value="Sports" />Sports<br />       
              <input type="checkbox" name="categories" value="Technology" />Technology<br />         
          </fieldset> 

          <label>Select Sources by Category: </label>
          <select onChange={this.handleCategoryChange} >
            <option value="Select" >Select Category</option>
            <option value="Business" >Business</option>
            <option value="Entertainment" >Entertainment</option>
            <option value="Health" >Health</option>
            <option value="Science" >Science</option>
            <option value="Sports" >Sports</option>
            <option value="Technology" >Technology</option>
          </select>

        
          {this.state.renderSourceForm && 
          <fieldset>
            {this.renderSourcesForm()}
          </fieldset>
          }    
         

          <label>Add a Topic</label>
          <input onChange={this.handleTopicChange} type="text" value={this.state.topic} />
          <button onClick={this.addTopic} >Add</button><br /><br />

          {this.state.addedTopics.length > 0 &&
          <> 
          <h3>Added Topics</h3>
          {this.renderTopics()}
          </>
          }

          <input onClick={() => alert(`You've just created the ${this.state.title} newspaper`)} type="submit" value="Build Newspaper"/>     
        </form>
      </>
    )
  }

  renderDisplay = () => {
    const { links, loggedInUser, loggedInUsersNewspapers } = this.props
    const { viewForm } = this.state
    let display;
    let noNewspapers = 
      <h3>You currently don't have any newspapers</h3>
  
    if (loggedInUser.username) {
      display = 
      <>
        <h1>Welcome to your Newspaper Collection</h1>
        <p>Here you can build or view your newspapers</p>
        <Nav links={links} />
        <button onClick={this.toggleViewForm}>{viewForm ? "Close Form" : "Build a Newspaper"}</button><br /><br />
        {viewForm && this.renderForm()}
        {loggedInUsersNewspapers.length > 0 ? <NewspaperMapper 
          newspapers={loggedInUsersNewspapers} /> : noNewspapers}
      </>
    } else if (!loggedInUser.username) {
      display = 
        <>
          <Nav links={links}/>
          <h1><Link to="/login">Log in</Link> to view your newspapers</h1>
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

export default Newspaper

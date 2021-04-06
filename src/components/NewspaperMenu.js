import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import NewspaperMapper from './NewspaperMapper'
import NewspaperMenuStyles from '../styles/NewspaperMenu.module.css'

class NewspaperMenu extends Component {
  state = {
    // viewForm: false,
    // title: '',
    // categorySelect: '',
    // categories: [],
    // sources: [],
    // renderSourceForm: false,
    // sourceNames: [],
    // topic: '',
    // addedTopics: [],
    newspapers: []
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggedInUsersNewspapers.length < this.props.loggedInUsersNewspapers.length) {
      this.toggleViewForm()
    }
  }

  // toggleViewForm = () => {
  //   let view = this.state.viewForm

  //   this.setState({
  //     viewForm: !view
  //   })
  // }

  // addCategories = event => {
  //   const { categories } = this.state
  //   if (categories.find(category => category === event.target.value)) {
  //     this.setState({
  //       categories: [...categories].filter(category => category !== event.target.value)
  //     })
  //   } else {
  //     this.setState({
  //       categories: [...categories, event.target.value]
  //     })
  //   }
  // }

  // handleTitleChange = event => {
  //   this.setState({
  //     title: event.target.value
  //   })
  // }

  // handleCategoryChange = event => {
  //   const { renderSourceForm } = this.state
  //   if (renderSourceForm) {
  //     this.setState({
  //       renderSourceForm: false 
  //     })
  //   }
  //   this.setState({
  //     categorySelect: event.target.value
  //   }, () => this.fetchSources(this.state.categorySelect.toLowerCase()))
  // }

  // fetchSources = category => {
  //   fetch(`http://localhost:4000/get-sources/${category}`)
  //   .then(resp => resp.json())
  //   .then(data => this.setState({
  //     sources: data
  //   }, () => this.setState({
  //     renderSourceForm: true
  //   })))
  // }

  // handleSourcesFormCheck = event => {
  //   const { sourceNames } = this.state
  //   if (sourceNames.find(sourceName => sourceName === event.target.value)) {
  //     this.setState({
  //       sourceNames: [...sourceNames].filter(sourceName => sourceName !== event.target.value)
  //     })
  //   } else {
  //     this.setState({
  //       sourceNames: [...this.state.sourceNames, event.target.value]
  //     })
  //   }
  // }

  // handleTopicChange = event => {
  //   this.setState({
  //     topic: event.target.value
  //   })
  // }

  // addTopic = event => {
  //   event.preventDefault()
  //   const { topic, addedTopics } = this.state
  //   this.setState({
  //     addedTopics: [...addedTopics, topic],
  //     topic: ''
  //   })
  // }

  // removeFromAddedTopics = target => {
  //   const { addedTopics } = this.state
  //   this.setState({
  //     addedTopics: [...addedTopics].filter(topic => topic !== target)
  //   })
  // }

  // renderTopics = () => {
  //   const { addedTopics } = this.state
  //   return addedTopics.map(t => {
  //     return (
  //       <>
  //         <p className={NewspaperMenuStyles.topics} onClick={() => this.removeFromAddedTopics(t)} >"{t}"</p>
  //       </>
  //     )  
  //   })
  // }

  // renderSourcesForm = () => {
  //   const { sources, sourceNames } = this.state
  //   return sources.map(source => {
  //     return (
  //       <>
  //         <input
  //           className={NewspaperMenuStyles.checkbox}
  //           onChange={this.handleSourcesFormCheck}
  //           checked={sourceNames.find(sn => sn === source.name) && "checked"}
  //           type="checkbox" 
  //           name="sources" 
  //           value={source.name} />
  //         <label className={NewspaperMenuStyles.sourceOption} >{source.name}</label><br />
  //       </>
  //     )
  //   })
  // }

  handleFormSubmit = event => {
    const { title, categories, sourceNames, addedTopics } = this.state
    const { loggedInUser, updateUsersNewspapers } = this.props

    event.preventDefault()
    fetch('http://localhost:4000/newspaper/build-newspaper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        user: loggedInUser.id,
        categories: categories,
        sources: sourceNames,
        topics: addedTopics
      })
    })
    .then(resp => resp.json())
    .then(data => updateUsersNewspapers(data))
  }

  renderForm = () => {
    return (
      <>
        <form className={NewspaperMenuStyles.form} onSubmit={this.handleFormSubmit} >
          {/* <label className={NewspaperMenuStyles.label} >Newspaper Title: </label><br />
          <input className={NewspaperMenuStyles.input} onChange={this.handleTitleChange} type="text" value={this.state.title} required/>
          <br /> */}
  
          {/* <fieldset onChange={this.addCategories}>      
              <label className={NewspaperMenuStyles.label}>Select Categories: </label><br /><br />      
              <input className={NewspaperMenuStyles.checkbox} type="checkbox" name="categories" value="Business" />
              <label className={NewspaperMenuStyles.business} >Business</label><br />      
              <input className={NewspaperMenuStyles.checkbox} type="checkbox" name="categories" value="Entertainment" />
              <label className={NewspaperMenuStyles.entertainment} >Entertainment</label><br />      
              <input className={NewspaperMenuStyles.checkbox} type="checkbox" name="categories" value="Health" />
              <label className={NewspaperMenuStyles.health} >Health</label><br />       
              <input className={NewspaperMenuStyles.checkbox} type="checkbox" name="categories" value="Science" />
              <label className={NewspaperMenuStyles.science} >Science</label><br />         
              <input className={NewspaperMenuStyles.checkbox} type="checkbox" name="categories" value="Sports" />
              <label className={NewspaperMenuStyles.sports} >Sports</label><br />       
              <input className={NewspaperMenuStyles.checkbox} type="checkbox" name="categories" value="Technology" />
              <label className={NewspaperMenuStyles.technology} >Technology</label><br />         
          </fieldset><br /> */}

          {/* <label className={NewspaperMenuStyles.label} >Select Sources by Category: </label><br /><br />
          <select className={NewspaperMenuStyles.select} onChange={this.handleCategoryChange} >
            <option value="Select" >Select Category</option>
            <option value="Business" >Business</option>
            <option value="Entertainment" >Entertainment</option>
            <option value="Health" >Health</option>
            <option value="Science" >Science</option>
            <option value="Sports" >Sports</option>
            <option value="Technology" >Technology</option>
          </select> */}

        
          {/* {this.state.renderSourceForm &&
          <>
            <br /><br />
            <fieldset>
              {this.renderSourcesForm()}
            </fieldset>
          </>
          }     */}
         
          {/* <br /><br/>
          <label className={NewspaperMenuStyles.label} >Add a Topic: </label><br />
          <input className={NewspaperMenuStyles.input} onChange={this.handleTopicChange} type="text" value={this.state.topic} />
          <button className={NewspaperMenuStyles.addBtn} onClick={this.addTopic} >Add</button><br /> */}

          {/* {this.state.addedTopics.length > 0 &&
          <> 
          <h3>Added Topics</h3>
          {this.renderTopics()}
          </>
          } */}

          <input className={NewspaperMenuStyles.build} onClick={() => {
            alert(`You've just created the ${this.state.title} newspaper`)
            }} type="submit" value="Build Newspaper"/>     
        </form>
      </>
    )
  }

  renderDisplay = () => {
    const { 
      links, loggedInUser, loggedInUsersNewspapers, setNewspaper, history, deleteNewspaper
    } = this.props
    const { viewForm } = this.state
    let display;
    let noNewspapers = 
      <h3 
        className={NewspaperMenuStyles.h3}>
          You currently don't have any newspapers
      </h3>
    let hasNewspapers = (loggedInUsersNewspapers.length > 0);
    let isLoggedIn = loggedInUser.username;
  
    if (isLoggedIn) {
      display = 
      <>
        <header className={NewspaperMenuStyles.header} >
          <h1>Newspaper Collection</h1>
          <p>Build or view your newspapers</p>
        </header>
        <Nav links={links} />
        <button className={NewspaperMenuStyles.button} onClick={this.toggleViewForm}>{viewForm ? "Close Form" : "Build a Newspaper"}</button><br /><br />
        {viewForm && this.renderForm()}
      
        {hasNewspapers ? <NewspaperMapper 
          newspapers={loggedInUsersNewspapers} setNewspaper={setNewspaper} history={history} deleteNewspaper={deleteNewspaper} loggedInUser={loggedInUser} /> : noNewspapers}
      </>
    } else if (!isLoggedIn) {
      display = 
        <>
          <h5 className={NewspaperMenuStyles.h5} ><Link className={NewspaperMenuStyles.link} to="/login">Log in</Link> to view your newspapers</h5>
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

export default NewspaperMenu

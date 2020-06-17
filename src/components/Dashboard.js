import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { apiKey } from '../apiKey'
import Nav from './Nav'
import NewsMapper from './NewsMapper'
import DashboardStyles from '../styles/Dashboard.module.css'

class Dashboard extends Component {
  state = {
    articles: [],
    categories: []
  }

  componentDidMount() {
    if (this.props.loggedInUser.categories) {
      this.getUsersCategoryNews()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getUsersCategoryNews()
    }
  }

  getUsersCategoryNews = () => {
    const { loggedInUser } = this.props
  
    loggedInUser.categories.forEach(category => {
      fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category.name.toLowerCase()}&pageSize=6&page=1`, apiKey)
      .then(resp => resp.json())
      .then(data => this.setState({
        articles: [...this.state.articles, data.articles]
      }, this.setState({
        categories: [...this.state.categories, category.name]
        })
      ))
    })
  }

  passDownToNewsMapper = () => {
    let views = []
    this.state.articles.forEach((articles, index) => views.push(<NewsMapper 
    key={index} news={articles} loggedInUser={this.props.loggedInUser} postArticle={this.props.postArticle} />))
    return views
  }

  createH1ForCategories = () => {
    let headers = []
    this.state.categories.forEach(category => headers.push(<h2 className={DashboardStyles.h2} >Top News in <span className={DashboardStyles.span} >{category}</span></h2>))
    return headers
  }

  render() {
    const { loggedInUser, links, history, handleSearchChange, searchTopic, getTopicNews } = this.props
    const search = <input className={DashboardStyles.search} onChange={handleSearchChange} type="text" placeholder="Search news by topic" value={searchTopic} />
    const searchBtn = <button className={DashboardStyles.submitBtn} onClick={() => {
      getTopicNews(searchTopic)
      history.push("/dashboard/topic-news")
    }}>Search</button>

    let dashboardDisplay;
    let dashboardDisplayHeader;
    let v1, v2, v3, v4, v5, v6
    let header1, header2, header3, header4, header5, header6

    if (this.state.articles.length > 0) {
      const [view1, view2, view3, view4, view5, view6] = this.passDownToNewsMapper()
      const [h1, h2, h3, h4, h5, h6] = this.createH1ForCategories()

      v1 = view1
      v2 = view2
      v3 = view3
      v4 = view4
      v5 = view5
      v6 = view6

      header1 = h1
      header2 = h2
      header3 = h3
      header4 = h4
      header5 = h5
      header6 = h6

      dashboardDisplay = 
        <>
          <h1 className={DashboardStyles.h1} >Here are your top news</h1>
          {header1}
          {v1}
          {header2}
          {v2}
          {header3}
          {v3}
          {header4}
          {v4}
          {header5}
          {v5}
          {header6}
          {v6}
        </>
      
      dashboardDisplayHeader = 
        <>
          <header className={DashboardStyles.header} >
            <h1>Dashboard</h1>
            <p>Welcome back <span className={DashboardStyles.span} >{loggedInUser.username}</span></p>
          </header>
          <Nav links={links} search={search} searchBtn={searchBtn} />
        </>
    } else if (!loggedInUser.username) {
      dashboardDisplay = <h5 className={DashboardStyles.h5} ><Link className={DashboardStyles.link} to="/login">Log in</Link> to see your top news</h5>
    } else {
      dashboardDisplay = 
        <>
          <header className={DashboardStyles.header} >
            <h1>Dashboard</h1>
            <p>You are not subscribed to any news <span className={DashboardStyles.span} >{loggedInUser.username}</span></p>
          </header>
          <Nav links={links} search={search} searchBtn={searchBtn} />
          <h3 className={DashboardStyles.h3} ><Link className={DashboardStyles.link} to="/categories">Subscribe</Link> to news here</h3>
        </>
    }
    
    return (
      <div>
        {dashboardDisplayHeader}
        {dashboardDisplay}
      </div>
    )
  }
}

export default Dashboard

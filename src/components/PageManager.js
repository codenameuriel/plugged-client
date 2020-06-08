import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { apiKey } from '../apiKey'
import CategorySelector from './CategorySelector'
import TopNews from './TopNews'
import CollectionNews from './CollectionNews'
import BusinessNews from './BusinessNews'
import EntertainmentNews from './EntertainmentNews'
import HealthNews from './HealthNews'
import ScienceNews from './ScienceNews'
import SportsNews from './SportsNews'
import TechnologyNews from './TechnologyNews'
import Dashboard from "./Dashboard"
import TopicNews from './TopicNews'

class PageManager extends Component {
  state = {
    page: 1,
    showPrevPageButton: false,
    totalResults: 0,
    lastPage: false,
    topicNews: [],
    searchTopic: ''
  }

  setTotalResults = total => {
    this.setState({
      totalResults: total
    })
  }

  toggleLastPage = () => {
    let isLastPage = this.state.lastPage

    this.setState({
      lastPage: !isLastPage
    })
  }

  togglePrevPageButton = () => {
    if (this.state.page === 1) {
      this.setState({
        showPrevPageButton: false
      })
    } else {
      this.setState({
        showPrevPageButton: true
      })
    }
  }

  nextPage = () => {
    const { page, totalResults } = this.state
    let lastPage;
    
    if (totalResults % 9 === 0) {
      lastPage = totalResults / 9
    } else if (totalResults % 9 !== 0) {
      lastPage = Math.ceil(totalResults / 9)
    }

    if (page === lastPage) {
      this.setState({
        page: 1
      }, () => {
        this.togglePrevPageButton()
        this.toggleLastPage()
      })
    } else {
      this.setState({
        page: page + 1
      }, () => {
        this.togglePrevPageButton()
      })
    }

    if (page === lastPage - 1) {
      this.toggleLastPage()
    }
  }

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

  handleSearchChange = event => {
    this.setState({
      searchTopic: event.target.value
    })
  }

  getTopicNews = search => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&q=${search}&pageSize=9&page=1`, apiKey)
    .then(resp => resp.json())
    .then(data => this.setState({
      topicNews: data.articles
    }))
  }

  render() {
    const [logout, collection, topNews, login, signup, categories, dashboard, account] = this.props.links
    let topNewsLinks;
    let collectionLinks;
    let categoryLinks;
    let categorySelectionLinks;
    let dashboardLinks;
    let topicNewsLinks;

    if (this.props.loggedInUser.username) {
      topNewsLinks = [dashboard, categories, collection, account, logout]
      collectionLinks = [dashboard, topNews, categories, account, logout]
      categoryLinks = [dashboard, topNews, collection, account, logout]
      categorySelectionLinks = [dashboard, topNews, collection, categories, account, logout]
      dashboardLinks = [topNews, categories, collection, account, logout]
      topicNewsLinks = [dashboard, topNews, categories, collection, account, logout]
    } else {
      topNewsLinks = [login, signup]
    }

    return (
      <div>
        <Route
          exact path="/categories"
          render={routerProps => <CategorySelector
            {...routerProps}
            links={categoryLinks}
            loggedInUser={this.props.loggedInUser}
            subscribeToCategory={this.props.subscribeToCategory} 
          />}
        />
        <Route
          exact path="/:username/dashboard"
          render={routerProps => <Dashboard
            {...routerProps}
            links={dashboardLinks}
            loggedInUser={this.props.loggedInUser}
            postArticle={this.props.postArticle}
            handleSearchChange={this.handleSearchChange}
            searchTopic={this.state.searchTopic}
            getTopicNews={this.getTopicNews}
          />} 
        />
        <Route
          path="/dashboard/topic-news"
          render={routerProps => <TopicNews
            {...routerProps}
            links={topicNewsLinks}
            loggedInUser={this.props.loggedInUser}
            postArticle={this.props.postArticle}
            topicNews={this.state.topicNews}
            searchTopic={this.state.searchTopic}
            />} 
        />
        <Route 
          exact path="/top-news"
          render={routerProps => <TopNews
            {...routerProps}
            links={topNewsLinks}
            loggedInUser={this.props.loggedInUser}
            postArticle={this.props.postArticle}
            page={this.state.page}
            lastPage={this.state.lastPage}
            setTotalResults={this.setTotalResults}
            showPrevPageButton={this.state.showPrevPageButton}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
          />}
        />
        <Route
          path="/collection"
          render={routerProps => <CollectionNews
            links={collectionLinks}
            loggedInUser={this.props.loggedInUser}
            postArticle={this.props.postArticle}
            // page={this.state.page}
            // showPrevPageButton={this.state.showPrevPageButton}
            // nextPage={this.nextPage}
            // prevPage={this.prevPage}
          />}
        />
        <Route
          exact path="/categories/business"
          render={routerProps => <BusinessNews
            {...routerProps}
            links={categorySelectionLinks}
            loggedInUser={this.props.loggedInUser}
            postArticle={this.props.postArticle}
            page={this.state.page}
            lastPage={this.state.lastPage}
            setTotalResults={this.setTotalResults}
            showPrevPageButton={this.state.showPrevPageButton}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
          />} 
        />
        <Route
          exact path="/categories/entertainment"
          render={routerProps => <EntertainmentNews
            {...routerProps}
            links={categorySelectionLinks}
            loggedInUser={this.props.loggedInUser}
            postArticle={this.props.postArticle}
            page={this.state.page}
            lastPage={this.state.lastPage}
            setTotalResults={this.setTotalResults}
            showPrevPageButton={this.state.showPrevPageButton}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
          />} 
        />
        <Route
          exact path="/categories/health"
          render={routerProps => <HealthNews
            {...routerProps}
            links={categorySelectionLinks}
            loggedInUser={this.props.loggedInUser}
            postArticle={this.props.postArticle}
            page={this.state.page}
            lastPage={this.state.lastPage}
            setTotalResults={this.setTotalResults}
            showPrevPageButton={this.state.showPrevPageButton}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
          />} 
        />
        <Route
          exact path="/categories/science"
          render={routerProps => <ScienceNews
            {...routerProps}
            links={categorySelectionLinks}
            loggedInUser={this.props.loggedInUser}
            postArticle={this.props.postArticle}
            page={this.state.page}
            lastPage={this.state.lastPage}
            setTotalResults={this.setTotalResults}
            showPrevPageButton={this.state.showPrevPageButton}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
          />} 
        />
        <Route
          exact path="/categories/sports"
          render={routerProps => <SportsNews
            {...routerProps}
            links={categorySelectionLinks}
            loggedInUser={this.props.loggedInUser}
            postArticle={this.props.postArticle}
            page={this.state.page}
            lastPage={this.state.lastPage}
            setTotalResults={this.setTotalResults}
            showPrevPageButton={this.state.showPrevPageButton}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
          />} 
        />
        <Route
          exact path="/categories/technology"
          render={routerProps => <TechnologyNews
            {...routerProps}
            links={categorySelectionLinks}
            loggedInUser={this.props.loggedInUser}
            postArticle={this.props.postArticle}
            page={this.state.page}
            lastPage={this.state.lastPage}
            setTotalResults={this.setTotalResults}
            showPrevPageButton={this.state.showPrevPageButton}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
          />} 
        />
      </div>
    )
  }
}

export default PageManager

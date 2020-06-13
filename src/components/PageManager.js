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
import Sources from './Sources'
import SourceNews from './SourceNews'
import NewspaperMenu from './NewspaperMenu'
import NewspaperNews from './NewspaperNews';

class PageManager extends Component {
  state = {
    page: 1,
    showPrevPageButton: false,
    totalResults: 0,
    lastPage: false,
    topicNews: [],
    searchTopic: '',
    displaySearchTopic: '',
    source: '',
    sourceNews: []
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

  clearSearch = () => {
    this.setState({
      searchTopic: ''
    })
  }

  getTopicNews = search => {
    fetch(`https://newsapi.org/v2/everything?q=${search}&pageSize=9&page=1`, apiKey)
    .then(resp => resp.json())
    .then(data => this.setState({
      topicNews: data.articles
    }))
  }

  getSourceNews = source => {
    let parsedSource;
    if (source.indexOf(' ') > 0) {
      parsedSource = source.replace(/\s+/g, '-').toLowerCase();
    } else {
      parsedSource = source
    }

    fetch(`https://newsapi.org/v2/top-headlines?sources=${parsedSource}&pageSize=9&page=1`, apiKey)
    .then(resp => resp.json())
    .then(data => this.setState({
      sourceNews: data.articles
    }, () => this.setSource(source)))
  }

  setSource = source => {
    this.setState({
      source: source
    })
  }

  render() {
    const [logout, collection, topNews, login, signup, categories, dashboard, account, sources, newspapers] = this.props.links
    let topNewsLinks;
    let collectionLinks;
    let categoryLinks;
    let categorySelectionLinks;
    let dashboardLinks;
    let topicNewsLinks;
    let sourceLinks;
    let sourceNewsLinks;
    let newspapersMenuLinks;
    let newspapersNewsLinks;

    if (this.props.loggedInUser.username) {
      topNewsLinks = [logout, account, dashboard, categories, sources,collection, newspapers]
      collectionLinks = [dashboard, topNews, categories, sources, newspapers, account, logout]
      categoryLinks = [dashboard, topNews, collection, sources, newspapers, account, logout]
      categorySelectionLinks = [dashboard, topNews, categories, sources, newspapers, collection, account, logout]
      dashboardLinks = [topNews, categories, sources, collection, newspapers, logout, account]
      topicNewsLinks = [dashboard, topNews, categories, sources, collection, newspapers, account, logout]
      sourceLinks = [dashboard, topNews, categories, collection, newspapers, account, logout].reverse()
      sourceNewsLinks = [dashboard, topNews, categories, sources, collection, newspapers, account, logout].reverse()
      newspapersMenuLinks = [dashboard, topNews, categories, sources, collection, account, logout].reverse()
      newspapersNewsLinks = [dashboard, topNews, categories, sources, collection, newspapers, account, logout].reverse()
    } else {
      topNewsLinks = [signup, login]
    }

    return (
      <div>
        <Route
          exact path="/newspapers"
          render={routerProps => <NewspaperMenu
            {...routerProps}
            links={newspapersMenuLinks}
            loggedInUser={this.props.loggedInUser}
            postArticle={this.props.postArticle}
            loggedInUsersNewspapers={this.props.loggedInUsersNewspapers}
            updateUsersNewspapers={this.props.updateUsersNewspapers}
            setNewspaper={this.props.setNewspaper}
            />} 
        />
        <Route
          exact path="/newspapers/:title"
          render={routerProps => <NewspaperNews
            links={newspapersNewsLinks}
            newspaper={this.props.newspaper}
            loggedInUser={this.props.loggedInUser}
            postArticle={this.props.postArticle} 
            />}
        />
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
          exact path="/sources"
          render={routerProps => <Sources
            {...routerProps}
            links={sourceLinks}
            getSourceNews={this.getSourceNews}
            setSource={this.setSource}
          />}
        />
        <Route
          exact path="/source-news/:source"
          render={routerProps => <SourceNews
            {...routerProps}
            links={sourceNewsLinks}
            sourceNews={this.state.sourceNews}
            loggedInUser={this.props.loggedInUser}
            postArticle={this.props.postArticle}
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

import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import CategorySelector from './CategorySelector'
import TopNewsContainer from './TopNewsContainer'
import CollectionNewsContainer from './CollectionNewsContainer'
import BusinessNews from './BusinessNews'
import EntertainmentNews from './EntertainmentNews'
import GeneralNews from './GeneralNews'
import HealthNews from './HealthNews'
import ScienceNews from './ScienceNews'
import SportsNews from './SportsNews'
import TechnologyNews from './TechnologyNews'


export default class PageManager extends Component {
  state = {
    page: 1,
    showPrevPageButton: false,
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
    let page = this.state.page
    if (page === 8 ) {
      this.setState({
        page: 1
      }, () => {
        this.togglePrevPageButton()
      })
    } else {
      this.setState({
        page: page + 1
      }, () => {
        this.togglePrevPageButton()
      })
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

  render() {
    const [logout, collection, dashboard, login, signup, categories] = this.props.links
    let topNewsLinks;
    let collectionLinks;
    let categoryLinks;
    let categorySelectionLinks;

    if (this.props.loggedInUser.username) {
      topNewsLinks = [collection, categories, logout]
      collectionLinks = [dashboard, categories, logout]
      categoryLinks = [dashboard, collection, logout]
      categorySelectionLinks = [dashboard, categories, collection, logout]
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
          />}
        />
        <Route 
          exact path="/top-news"
          render={routerProps => <TopNewsContainer
            {...routerProps}
            links={topNewsLinks}
            loggedInUser={this.props.loggedInUser}
            postArticle={this.props.postArticle}
            page={this.state.page}
            showPrevPageButton={this.state.showPrevPageButton}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
          />}
        />
        <Route
          path="/collection"
          render={routerProps => <CollectionNewsContainer
            links={collectionLinks}
            loggedInUser={this.props.loggedInUser}
            postArticle={this.props.postArticle}
            page={this.state.page}
            showPrevPageButton={this.state.showPrevPageButton}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
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
            showPrevPageButton={this.state.showPrevPageButton}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
          />} 
        />
        <Route
          exact path="/categories/general"
          render={routerProps => <GeneralNews
            {...routerProps}
            links={categorySelectionLinks}
            loggedInUser={this.props.loggedInUser}
            postArticle={this.props.postArticle}
            page={this.state.page}
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
            showPrevPageButton={this.state.showPrevPageButton}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
          />} 
        />
      </div>
    )
  }
}

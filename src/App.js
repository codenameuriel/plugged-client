import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// import components
import TopNews from './containers/TopNews/TopNews';
import Dashboard from './containers/Dashboard/Dashboard';
import CollectionNews from './containers/CollectionNews/CollectionNews';
import Categories from './containers/Categories/Categories';
import CategoryNews from './containers/CategoryNews/CategoryNews';
import Sources from './containers/Sources/Sources';
import SourceNews from './containers/SourceNews/SourceNews';
import NewspaperMenu from './containers/Newspaper/NewspaperMenu/NewspaperMenu';
import Auth from './containers/Auth/Auth';
import TopicNews from './containers/TopicNews/TopicNews';

class App extends React.Component {
  // state = {
  //   loggedInUser: {},
  //   categories: [],
  //   unsubscribe: [],
  //   article: {},
  //   topics: [],
  //   sources: [],
  //   loggedInUsersNewspapers: [],
  //   newspaper: {},
  //   isAuthenticated: false
  // }

  // setNewspaper = title => {
  //   const { loggedInUsersNewspapers } = this.state
  //   let selectedNewspaper = loggedInUsersNewspapers.find(newspaper => newspaper.title === title)

  //   this.setState({
  //     newspaper: selectedNewspaper
  //   })
  // }

  // updateUsersNewspapers = newspaper => {
  //   const { loggedInUsersNewspapers } = this.state

  //   this.setState({
  //     loggedInUsersNewspapers: [...loggedInUsersNewspapers, newspaper]
  //   })
  // }

  // deleteNewspaper = (newspaper, user) => {
  //   fetch(`http://localhost:4000/newspaper/${newspaper.title}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       title: newspaper.title,
  //       user: user.id
  //     })
  //   })
  //   .then(resp => resp.json())
  //   .then(this.setState({
  //     loggedInUsersNewspapers: [...this.state.loggedInUsersNewspapers].filter(n => n.title !== newspaper.title)
  //   }))
  // }

  // logOutUser = () => {
  //   this.setState({
  //     loggedInUser: {},
  //     categories: [],
  //     topics: [],
  //     sources: []
  //   })
  // }

  render() {
    const { user: isAuthenticated } = this.props;

    // base routes, no user authentication needed
    let routes = (
      <Switch>
        <Route path='/login' component={Auth} />
        <Route path='/signup' component={Auth} />
        <Route path='/top-news' component={TopNews} />
        <Redirect from='/' to='/top-news' />
      </Switch>
    );

    // routes only available when a user is authenticated
    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/login' component={Auth} />
          <Route path='/signup' component={Auth} />
          <Route path='/top-news' component={TopNews} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/topic-news' component={TopicNews} />
          <Route path='/collection' component={CollectionNews} />
          <Route path='/categories/:category' component={CategoryNews} />
          <Route path='/categories' component={Categories} />
          <Route path='/sources/:source' component={SourceNews} />
          <Route path='/sources' component={Sources} />
          <Route path='/newspaper/menu' component={NewspaperMenu} />
        </Switch>
      );
    }

    // const links = [
    //   <NavLink className={`${AppStyles.link} ${AppStyles.right}`} onClick={this.logOutUser} to="/top-news">LOG OUT</NavLink>,
    //   <NavLink className={AppStyles.link} to="/collection">COLLECTION</NavLink>,
    //   <NavLink
    //     className={AppStyles.link}
    //     to="/top-news"
    //   >TOP NEWS</NavLink>,
    //   <NavLink className={`${AppStyles.link} ${AppStyles.right}`} to="/login">LOG IN</NavLink>,
    //   <NavLink className={`${AppStyles.link} ${AppStyles.right}`} to="/signup">SIGN UP</NavLink>,
    //   <NavLink className={AppStyles.link} to="/categories">CATEGORIES</NavLink>,
    //   <NavLink className={AppStyles.link} to={`/${this.state.loggedInUser.username}/dashboard`}>DASHBOARD</NavLink>,
    //   <NavLink className={`${AppStyles.link} ${AppStyles.right}`} to={`/${this.state.loggedInUser.username}/account`}>ACCOUNT</NavLink>,
    //   <NavLink  className={AppStyles.link} to="/sources">SOURCES</NavLink>,
    //   <NavLink className={AppStyles.link} to="/newspapers">NEWSPAPER</NavLink>
    // ]

    return routes;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(App);

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavManager extends Component {
  state = {
    links: [
      { page: "top-news", auth: false, link: <NavLink to="/top-news">TOP NEWS</NavLink>},
      { page: "collection", auth: true, link: <NavLink to="/collection">COLLECTION</NavLink>},
      { page: "login", auth: false, link: <NavLink to="/login">LOG IN</NavLink>},
      { page: "signup", auth: false, link: <NavLink to="/signup">SIGN UP</NavLink>}
    ]
  }

  renderLinks() {
    const { type } = this.props;
    const { links } = this.state;
    const renderedLinks = links.filter(link => (link.page !== type && !link.auth));

    return renderedLinks.map(link => {
      return <li>{link.link}</li>;
    });
  }

  render() {
    return (
      <nav>
        <ul>
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

export default NavManager;

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
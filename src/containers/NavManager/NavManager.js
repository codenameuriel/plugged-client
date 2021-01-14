import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import DrawerToggle from '../../components/DrawerToggle/DrawerToggle';

import NavManagerStyles from './NavManager.module.css';

class NavManager extends Component {
  state = {
    links: [
      { page: "collection", auth: true, link: <NavLink to="/collection">COLLECTION</NavLink> },
      { page: "signup", auth: false, link: <NavLink to="/signup">SIGN UP</NavLink> },
      { page: "login", auth: false, link: <NavLink to="/login">LOG IN</NavLink> },
      { page: "dashboard", auth: true, link: <NavLink to="/dashboard">DASHBOARD</NavLink> },
      { page: "top-news", auth: false, link: <NavLink to="/top-news">TOP NEWS</NavLink> }
    ]
  }

  renderLinks() {
    const { type, user } = this.props;
    const { links } = this.state;
    const topNewsLink = links.find(link => link.page === "top-news");
    let renderedLinks = links.filter(link => (link.page !== type && link.auth === !!user));

    if (!!user) renderedLinks = links.filter(link => (link.page !== type && link.auth === !!user)).concat(topNewsLink);
  
    return renderedLinks.map((link, index) => {
      return <li className={NavManagerStyles.ListItem} key={index}>{link.link}</li>;
    });
  }

  render() {
    const { openSideDrawer } = this.props;
    return (
      <nav className={NavManagerStyles.Nav}>
        <DrawerToggle openSideDrawer={openSideDrawer}/>
        <ul className={NavManagerStyles.NavLinks}>
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(NavManager);

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
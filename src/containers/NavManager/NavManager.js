import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import DrawerToggle from '../../components/DrawerToggle/DrawerToggle';
import Search from '../../components/Search/Search';

import NavManagerStyles from './NavManager.module.css';

class NavManager extends Component {
	state = {
		links: [
			{
				page: 'collection',
				auth: true,
				link: <NavLink to='/collection'>COLLECTION</NavLink>
			},
			{
				page: 'signup',
				auth: false,
				link: <NavLink to='/signup'>SIGN UP</NavLink>
			},
			{
				page: 'login',
				auth: false,
				link: <NavLink to='/login'>LOG IN</NavLink>
			},
			{
				page: 'dashboard',
				auth: true,
				link: <NavLink to='/dashboard'>DASHBOARD</NavLink>
			},
			{
				page: 'top-news',
				auth: false,
				link: <NavLink to='/top-news'>TOP NEWS</NavLink>
			},
			{
				page: 'categories',
				auth: true,
				link: <NavLink to='/categories'>CATEGORIES</NavLink>
			},
			{
				page: 'sources',
				auth: true,
				link: <NavLink to='/sources'>SOURCES</NavLink>
			},
			{
				page: 'newspaper-menu',
				auth: true,
				link: <NavLink to='/newspaper/menu'>NEWSPAPER</NavLink>
			}
		]
	};

	renderLinks() {
		const { type, userLoggedIn } = this.props;
		const { links } = this.state;

    // base links
    // user is not authenticated
		let renderedLinks = (
      links.filter(link => link.page !== type && !link.auth)
    );

    // if user is authenticated
		if (userLoggedIn) {
			renderedLinks = (
        links.filter(link => {
          return link.page !== type && link.auth === userLoggedIn;
        })
      );

      // render top news links when not in top news page and user is authenticated
      const topNewsLink = links.find(link => link.page === 'top-news');
      if (type !== 'top-news') renderedLinks.push(topNewsLink);
    }

		return renderedLinks.map((link, index) => {
			return (
				<li className={NavManagerStyles.ListItem} key={index}>
					{link.link}
				</li>
			);
		});
	}

	render() {
		const { openSideDrawer, fromSideDrawer } = this.props;
		const onDashboardPage = window.location.pathname === '/dashboard';
		const onTopicNewsPage = window.location.pathname === '/topic-news';
		let navStyles = NavManagerStyles.Nav;
		let navLinksStyles = NavManagerStyles.NavLinks;

		if (fromSideDrawer) {
			navStyles = NavManagerStyles.SideDrawerNav;
			navLinksStyles = NavManagerStyles.SideDrawerNavLinks;
		}

		return (
			<nav className={navStyles}>
				{fromSideDrawer ? null : (
					<DrawerToggle openSideDrawer={openSideDrawer} />
				)}
				{(onDashboardPage || onTopicNewsPage) && <Search />}
				<ul className={navLinksStyles}>{this.renderLinks()}</ul>
			</nav>
		);
	}
}

const mapStateToProps = state => {
	return {
		userLoggedIn: state.auth.userLoggedIn
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

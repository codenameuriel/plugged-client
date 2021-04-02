import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import Layout from '../../hoc/Layout/Layout';
import Articles from '../../components/Articles/Articles';
import DecoratedHeading from '../../components/UI/DecoratedHeading/DecoratedHeading';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/UI/Button/Button';

import DashboardStyles from './Dashboard.module.css';

class Dashboard extends React.Component {
	state = {
		type: 'dashboard',
		title: 'Dashboard',
		subtitle: ''
	};

	componentDidMount() {
		this.setSubtitle();
		this.props.getDashboardNews();
	}

	setSubtitle() {
		const { userLoggedIn } = this.props;
		let subtitle = 'All your news in one place.';
		if (userLoggedIn) {
			const { username } = this.props.user;
			const stylizedUsername = <span>{username}</span>;
			subtitle = (
				<>
					{subtitle} Welcome back {stylizedUsername} 
				</>
			);
		}
    this.setState({ subtitle });
  }

	createArticlesProps(news, userLoggedIn, addToCollection) {
		let articlesProps = { news, userLoggedIn };
		if (userLoggedIn) {
			articlesProps = {
				...articlesProps,
				userLoggedIn,
				onClick: addToCollection
			};
		}
		return articlesProps;
	}

	allUserContent(dashboardNews, userLoggedIn, addToCollection) {
		let userContent = null;

		// check if new user signed up and subscribed to categories
		if (Object.keys(dashboardNews).length) {
			userContent = [];

			for (let category in dashboardNews) {
				let news = dashboardNews[category];
				let articlesProps = this.createArticlesProps(
					news,
					userLoggedIn,
					addToCollection
				);
				userContent.push(this.content(articlesProps, category));
			}

			userContent.push(
				<Button
					key={"scroll-btn"}
					description='Scroll Top'
					onClick={() =>
						window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} />
			);
		} else {
			userContent = (
				<p>It looks like you're not subscribed to news. Go to Categories and subscribe to your news</p>
			);
		}
		return userContent;
	}

	content(articlesProps, category) {
		return (
			<div key={category} className={DashboardStyles.Dashboard}>
				<DecoratedHeading heading={category} />
				<section className={DashboardStyles.Articles}>
					<Articles articlesProps={articlesProps} />
				</section>
			</div>
		);
	}

	render() {
		const { type, title, subtitle } = this.state;
		const { dashboardNews, userLoggedIn, addToCollection } = this.props;
		
		return (
			<Layout title={title} subtitle={subtitle} type={type}>
				{dashboardNews ? 
					this.allUserContent(dashboardNews, userLoggedIn, addToCollection)
					: <Loader />}
			</Layout>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user,
		userLoggedIn: state.auth.userLoggedIn,
		dashboardNews: state.news.dashboardNews
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getDashboardNews: () => dispatch(actionCreators.getDashboardNews()),
		addToCollection: newsStory =>
			dispatch(actionCreators.saveNewsStory(newsStory))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';

import PageManagerStyles from './PageManager.module.css';

class PageManager extends Component {
	renderButtons() {
		const { 
			onNextPage, onPrevPage, onFirstPage, page, totalPages: lastPage
		} = this.props;
		let buttons = null;

		// do not render buttons if only one page of news articles
		if (lastPage === 1) return buttons;

		if (page === 1) {
			buttons = (
				<Button
					type={'pageManager'}
					onClick={onNextPage}
					description={'Next Page'}
				/>
			);
		} else if (page !== 1 && page !== lastPage) {
			buttons = (
				<>
					<Button
						type={'pageManager'}
						onClick={onPrevPage}
						description={'Previous Page'}
					/>
					<Button
						type={'pageManager'}
						onClick={onNextPage}
						description={'Next Page'}
					/>
				</>
			);
		} else {
			buttons = (
				<>
					<Button
						type={'pageManager'}
						onClick={onPrevPage}
						description={'Previous Page'}
					/>
					<Button
						type={'pageManager'}
						onClick={onFirstPage}
						description={'First Page'}
					/>
				</>
			);
		}

		return buttons;
	}

	// render() {
	// const [logout, collection, topNews, login, signup, categories, dashboard, account, sources, newspapers] = this.props.links
	// let topNewsLinks;
	// let collectionLinks;
	// let categoryLinks;
	// let categorySelectionLinks;
	// let dashboardLinks;
	// let topicNewsLinks;
	// let sourceLinks;
	// let sourceNewsLinks;
	// let newspapersMenuLinks;
	// let newspapersNewsLinks;

	// if (this.props.loggedInUser.username) {
	//   topNewsLinks = [logout, account, dashboard, categories, sources,collection, newspapers]
	//   collectionLinks = [dashboard, topNews, categories, sources, newspapers, logout, account]
	//   categoryLinks = [dashboard, topNews, sources, collection, newspapers,  logout, account]
	//   categorySelectionLinks = [dashboard, topNews, categories, sources, newspapers, collection, logout, account]
	//   dashboardLinks = [topNews, categories, sources, collection, newspapers, logout, account]
	//   topicNewsLinks = [dashboard, topNews, categories, sources, collection, newspapers, logout, account]
	//   sourceLinks = [dashboard, topNews, categories, collection, newspapers, logout, account]
	//   sourceNewsLinks = [dashboard, topNews, categories, sources, collection, newspapers, logout, account]
	//   newspapersMenuLinks = [dashboard, topNews, categories, sources, collection, logout, account]
	//   newspapersNewsLinks = [dashboard, topNews, categories, sources, collection, newspapers, logout, account]
	// } else {
	//   topNewsLinks = [signup, login]
	// }

	render() {
		return (
			<div className={PageManagerStyles.PageManager}>
				{this.renderButtons()}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		page: state.pageManager.page,
		totalPages: state.pageManager.totalPages
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onNextPage: () => {
			dispatch(actionCreators.clearNews());
			dispatch(actionCreators.changePage('next'));
		},
		onPrevPage: () => {
			dispatch(actionCreators.clearNews());
			dispatch(actionCreators.changePage('prev'));
		},
		onFirstPage: () => {
			dispatch(actionCreators.clearNews());
			dispatch(actionCreators.changePage('first'));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PageManager);

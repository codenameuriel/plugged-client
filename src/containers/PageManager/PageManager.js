import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';

import PageManagerStyles from './PageManager.module.css';

class PageManager extends Component {
	// state = {
	//   page: 1,
	//   currentPage: '',
	//   showPrevPageButton: false,
	//   totalResults: 0,
	//   lastPage: false,
	//   topicNews: [],
	//   searchTopic: '',
	//   topicHeader: '',
	//   displaySearchTopic: '',
	//   source: '',
	//   sourceNews: []
	// }

	renderButtons() {
		const {
			onNextPage,
			onPrevPage,
			onFirstPage,
			page,
			totalPages: lastPage
		} = this.props;
		let buttons = null;
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

	// componentDidUpdate = (prevProps) => {
	//   if (prevProps.loggedInUser !== this.props.loggedInUser) {
	//     this.setState({
	//       page: 1,
	//       searchTopic: '',
	//       topicHeader: ''
	//     })
	//   }
	// }

	// setTotalResults = total => {
	//   this.setState({
	//     totalResults: total
	//   })
	// }

	// toggleLastPage = () => {
	//   let isLastPage = this.state.lastPage

	//   this.setState({
	//     lastPage: !isLastPage
	//   })
	// }

	// togglePrevPageButton = () => {
	//   if (this.state.page === 1) {
	//     this.setState({
	//       showPrevPageButton: false
	//     })
	//   } else {
	//     this.setState({
	//       showPrevPageButton: true
	//     })
	//   }
	// }

	// nextPage = () => {
	//   const { page, totalResults } = this.state
	//   let lastPage;

	//   if (totalResults % 9 === 0) {
	//     lastPage = totalResults / 9
	//   } else if (totalResults % 9 !== 0) {
	//     lastPage = Math.ceil(totalResults / 9)
	//   }

	//   if (page === lastPage) {
	//     this.setState({
	//       page: 1
	//     }, () => {
	//       this.togglePrevPageButton()
	//       this.toggleLastPage()
	//     })
	//   } else {
	//     this.setState({
	//       page: page + 1
	//     }, () => {
	//       this.togglePrevPageButton()
	//     })
	//   }

	//   if (page === lastPage - 1) {
	//     this.toggleLastPage()
	//   }
	// }

	// topicNextPage = () => {
	//   const { page, totalResults } = this.state
	//   let lastPage;

	//   if (totalResults % 9 === 0) {
	//     lastPage = totalResults / 9
	//   } else if (totalResults % 9 !== 0) {
	//     lastPage = Math.ceil(totalResults / 9)
	//   }

	//   if (page === lastPage) {
	//     this.setState({
	//       page: 1
	//     }, () => {
	//       this.togglePrevPageButton()
	//       this.toggleLastPage()
	//     })
	//   } else {
	//     this.setState({
	//       page: page + 1
	//     }, () => {
	//       this.togglePrevPageButton()
	//     })
	//   }

	//   if (page === lastPage - 1) {
	//     this.toggleLastPage()
	//   }

	//   this.getTopicNews()
	// }

	// prevPage = () => {
	//   let page = this.state.page
	//   if (page !== 1) {
	//     this.setState({
	//       page: page - 1
	//     }, () => {
	//       this.togglePrevPageButton()
	//     })
	//   }
	// }

	// topicPrevPage = () => {
	//   let page = this.state.page
	//   if (page !== 1) {
	//     this.setState({
	//       page: page - 1
	//     }, () => {
	//       this.togglePrevPageButton()
	//     })
	//   }

	//   this.getTopicNews()
	// }

	// handleSearchChange = event => {
	//   this.setState({
	//     searchTopic: event.target.value
	//   })
	// }

	// clearSearch = () => {
	//   this.setState({
	//     searchTopic: ''
	//   })
	// }

	// getTopicNews = () => {
	//   const { page, searchTopic } = this.state

	//   fetch(`https://newsapi.org/v2/everything?q=${searchTopic}&language=en&pageSize=9&page=${page}`, apiKey)
	//   .then(resp => resp.json())
	//   .then(data => this.setState({
	//     topicNews: data.articles
	//   }, () => this.setTotalResults(data.totalResults)))
	//   .then(this.setState({
	//     topicHeader: searchTopic
	//   }))
	//   .then(this.clearSearch())
	// }

	// getSourceNews = source => {
	//   let parsedSource;
	//   if (source.indexOf(' ') > 0) {
	//     parsedSource = source.replace(/\s+/g, '-').toLowerCase();
	//   } else {
	//     parsedSource = source
	//   }

	//   fetch(`https://newsapi.org/v2/top-headlines?sources=${parsedSource}&pageSize=9&page=1`, apiKey)
	//   .then(resp => resp.json())
	//   .then(data => this.setState({
	//     sourceNews: data.articles
	//   }, () => this.setSource(source)))
	// }

	// setSource = source => {
	//   this.setState({
	//     source: source
	//   })
	// }

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

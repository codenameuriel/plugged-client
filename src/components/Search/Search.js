import React, { Component } from 'react';
import * as actionCreators from '../../store/actions/index';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Button from '../UI/Button/Button';

import SearchStyles from './Search.module.css';

class Search extends Component {
	state = {
		inputValue: ''
	};

	clearInput = () => {
		this.setState({ inputValue: '' });
	};

	inputChange = ({ target: { value } }) => {
		this.setState({ inputValue: value });
	};

	handleEnterInput = ({ key, target: { value } }) => {
		if (key === 'Enter') {
			this.handleEmptyInput(value);
		}
	};

	handleEmptyInput = input => {
		input ? this.enterSearch() : alert('Must enter a topic!');
	};

	enterSearch = () => {
		const { inputValue } = this.state;
		const { setSearchTopic, history } = this.props;
		setSearchTopic(inputValue);
		this.clearInput();
    this.props.clearNews();
		history.push('/topic-news');
	};

	render() {
		const { inputValue } = this.state;
		return (
			<div className={SearchStyles.Search}>
				<input
					type='text'
					value={inputValue}
					onChange={this.inputChange}
					onKeyDown={this.handleEnterInput}
					placeholder='Search by topic'
				/>
				<Button
					type='search'
					onClick={() => this.handleEmptyInput(inputValue)}
					description='Search'
				/>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setSearchTopic: searchTopic =>
			dispatch(actionCreators.setSearchTopic(searchTopic)),
    clearNews: () => dispatch(actionCreators.clearNews())
	};
};

export default withRouter(connect(null, mapDispatchToProps)(Search));

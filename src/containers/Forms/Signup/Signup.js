/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';

import SignupStyles from './Signup.module.css';

class Signup extends Component {
	state = {
		username: '',
		password: '',
		categories: []
	};

	handleInputChange = ({ target: { value, name } }) => {
		this.setState({ [name]: value });
	};

	handleCheckboxChange = ({ target: { checked, name } }) => {
		if (checked) {
			this.setState({
				categories: [...this.state.categories, name]
			});
		} else {
			this.setState({
				categories: [...this.state.categories].filter(
					category => category !== name
				)
			});
		}
	};

	formHandler = event => {
		event.preventDefault();
		const { onSignup } = this.props;
		const { username, password, categories } = this.state;
		const newUserData = { username, password, categories };
		onSignup(newUserData);
	};

	generateCategoryCheckboxes() {
		const CATEGORIES = [
			'Business',
			'Entertainment',
			'General',
			'Health',
			'Science',
			'Sports',
			'Technology'
		];

		return CATEGORIES.map((category, idx) => {
			return (
				<>
					<label className={SignupStyles.Checkbox} key={idx} htmlFor={category}>
						<input
              className={SignupStyles.Checkbox}
							type='checkbox'
							name={category}
							value={category}
							onChange={this.handleCheckboxChange}
						/>
						<span className={SignupStyles.CategoryName}>{category}</span>
					</label>
					<br />
				</>
			);
		});
	}

	render() {
		const { username, password } = this.state;
		return (
			<form className={SignupStyles.SignupForm} onSubmit={this.formHandler}>
				<fieldset className={SignupStyles.Credentials}>
					<legend>Create a Username and Password</legend>
					<br />
					<label htmlFor='username'>
						Username:
						<br />
						<input
							id='username'
							type='text'
							name='username'
							value={username}
							onChange={this.handleInputChange}
							required
						/>
					</label>
					<br />
					<label htmlFor='password'>
						Password:
						<br />
						<input
							id='password'
							type='password'
							name='password'
							title='Password must contain minimum of 4 characters'
							value={password}
							onChange={this.handleInputChange}
							required
						/>
					</label>
				</fieldset>
				<fieldset className={SignupStyles.Categories}>
					<legend>Select news categories of interest</legend>
					{this.generateCategoryCheckboxes()}
				</fieldset>
				<input className={SignupStyles.Submit} type='submit' value='Sign up' />
			</form>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSignup: newUserData => dispatch(actionCreators.signup(newUserData))
	};
};

export default connect(null, mapDispatchToProps)(Signup);

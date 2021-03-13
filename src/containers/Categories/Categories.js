import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

import CategoryCard from '../../components/CategoryCard/CategoryCard';
import Layout from '../../hoc/Layout/Layout';

import technologyBackground from '../../assets/technologynews.png';
import businessBackground from '../../assets/businessnews.jpg';
import entertainmentBackground from '../../assets/entertainmentnews.png';
import healthBackground from '../../assets/healthnews.jpg';
import scienceBackground from '../../assets/sciencenews.jpg';
import sportsBackground from '../../assets/sportsnews.jpg';

import CategoriesStyles from './Categories.module.css';

const CATEGORIES = [
	{ type: 'Business', image: businessBackground }, 
	{ type: 'Entertainment', image: entertainmentBackground }, 
	{ type: 'Health', image: healthBackground }, 
	{ type: 'Science', image: scienceBackground }, 
	{ type: 'Sports', image: sportsBackground }, 
	{ type: 'Technology', image: technologyBackground }
];

class Categories extends React.Component {
	state = {
		title: 'Categories',
		subtitle: 'View your news by categories',
		type: 'categories'
	}

	renderCategories() {
		const { 
			userCategories, 
			subscribeToCategories, 
			setCategoryParam 
		} = this.props;

		return CATEGORIES.map(category => {
			const { type, image } = category;
			const isSubscribed = userCategories.includes(type);

			return (
				<CategoryCard 
					category={type} 
					image={image}
					isSubscribed={isSubscribed}
					subscribeToCategories={subscribeToCategories}
					setCategoryParam={setCategoryParam} />
			);
		});
	}

	render() {
		const { title, subtitle, type } = this.state;

		return (
			<Layout title={title} subtitle={subtitle} type={type}>
				<div className={CategoriesStyles.Categories}>
					{this.renderCategories()}
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = state => {
	return {
		userCategories: state.auth.user.categories
	};
};

const mapDispatchToProps = dispatch => {
	return {
		subscribeToCategories: (isSubscribed, categories) => dispatch(actionCreators.subscribeToCategories(isSubscribed, categories)),
		setCategoryParam: category => dispatch(actionCreators.setCategoryParam(category))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

import React from 'react';
import CategoryCard from './CategoryCard';

// import CategorySelectorStyles from '../styles/CategorySelector.module.css';
import technologyBackground from '../assets/technologynewsbackground.png';
import businessBackground from '../assets/businessnewsbackground.jpg';
import entertainmentBackground from '../assets/entertainmentnews.png';
import healthBackground from '../assets/healthnewsbackground.jpg';
import scienceBackground from '../assets/sciencenewsbackground.jpg';
import sportsBackground from '../assets/sportsnewsbackground.jpg';

import Layout from '../hoc/Layout/Layout';

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
		return CATEGORIES.map(category => {
			return (
				<CategoryCard 
					title={category.title} 
					image={category.image}
					history={null}
					subscribeToCategory={null} />
			);
		});
	}

	render() {
		const { title, subtitle, type } = this.state;

		return (
			<Layout title={title} subtitle={subtitle} type={type}>
				<div>
					{this.renderCategories()}
				</div>
			</Layout>
		);
	}
}

export default Categories;

import React from 'react';
import { withRouter } from 'react-router';

import Button from './UI/Button/Button';

import CategoryCardStyles from '../styles/CategoryCard.module.css'

const CategoryCard = ({ category, history, subscribeToCategories, image }) => {
  const redirectToCategoryNews = category => {
    const cat = category.toLowerCase();
    history.push(`/categories/${cat}`);
  };

  const subscribe = category => {
    alert('You subscribed!');
    subscribeToCategories(category);
  };

  return (
    <div 
      style={{backgroundImage: `url(${image})`}} 
      className={CategoryCardStyles.categoryCard} >
      <h3 
        className={CategoryCardStyles.h3} 
        onClick={() => redirectToCategoryNews(category)}>{category}</h3>
      <Button 
        type={null} 
        description={'Subscribe'} 
        onClick={() => subscribe(category)} />
    </div>
  );
};

export default withRouter(CategoryCard);

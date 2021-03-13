import React from 'react';
import { withRouter } from 'react-router';

import Button from '../UI/Button/Button';

import CategoryCardStyles from './CategoryCard.module.css'

const CategoryCard = props => {
  const { 
    category,
    image, 
    history, 
    isSubscribed, 
    subscribeToCategories, 
    setCategoryParam
  } = props;

  const redirectToCategoryNews = category => {
    const cat = category.toLowerCase();
    setCategoryParam(cat);
    history.push(`/categories/${cat}`);
  };

  const subscribe = () => {
    const alertMsg = isSubscribed ? 'You unsubscribed!' : 'You subscribed'
    alert(alertMsg);
    subscribeToCategories(isSubscribed, category);
  };

  const btnDescription = isSubscribed ? 'Unsubscribe' : 'Subscribe';

  return (
    <div 
      style={{backgroundImage: `url(${image})`}} 
      className={CategoryCardStyles.categoryCard} >
      <h3 
        className={CategoryCardStyles.h3} 
        onClick={() => redirectToCategoryNews(category)}>{category}</h3>
      <Button 
        type={null} 
        description={btnDescription} 
        onClick={subscribe} />
    </div>
  );
};

export default withRouter(CategoryCard);

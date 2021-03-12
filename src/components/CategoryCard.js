import React from 'react';
import { withRouter } from 'react-router';

import Button from './UI/Button/Button';

import CategoryCardStyles from '../styles/CategoryCard.module.css'

const CategoryCard = ({ category, history, subscribeToCategory, image }) => {
  const redirectToCategory = category => {
    const cat = category.toLowerCase();
    history.push(`/categories/${cat}`);
  };

  return (
    <div 
      style={{backgroundImage: `url(${image})`}} 
      className={CategoryCardStyles.categoryCard} >
      <h3 
        className={CategoryCardStyles.h3} 
        onClick={() => redirectToCategory(category)}>{category}</h3>
      {/* <button 
        className={CategoryCardStyles.button} 
        onClick={() => {
        alert('You subscribed');
        // subscribeToCategory(loggedInUser.id, title);
        }}>Subscribe</button> */}
      <Button type={null} description={'Subscribe'} onClick={null} />
    </div>
  )
}

export default withRouter(CategoryCard);

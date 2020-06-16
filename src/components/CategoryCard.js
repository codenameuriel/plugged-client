import React from 'react'
import CategoryCardStyles from '../styles/CategoryCard.module.css'

const CategoryCard = ({ title, history, loggedInUser, subscribeToCategory, image }) => {
  return (
    <div style={{backgroundImage: `url(${image})`}} className={CategoryCardStyles.categoryCard} >
      <h3 className={CategoryCardStyles.h3} onClick={() => history.push(`/categories/${title.toLowerCase()}`)}>{ title }</h3>
      <button className={CategoryCardStyles.button} onClick={() => {
        alert('You subscribed')
        subscribeToCategory(loggedInUser.id, title)
        }}>Subscribe</button>
    </div>
  )
}

export default CategoryCard

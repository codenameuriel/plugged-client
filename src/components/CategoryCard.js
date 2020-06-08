import React from 'react'

const CategoryCard = ({ title, history, loggedInUser, subscribeToCategory }) => {
  return (
    <div>
      <h3 onClick={() => history.push(`/categories/${title.toLowerCase()}`)}>{ title }</h3>
      <button onClick={() => {
        alert('You subscribed')
        subscribeToCategory(loggedInUser.id, title)
        }}>Subscribe</button>
    </div>
  )
}

export default CategoryCard

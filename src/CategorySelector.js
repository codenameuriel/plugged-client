import React from 'react'
import Nav from './Nav'
import CategoryCard from './CategoryCard'

const CategorySelector = ({history, links, loggedInUser, subscribeToCategory}) => {
  return (
    <div>
      <Nav links={links}/>
      <CategoryCard title={"Business"} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
      <CategoryCard title={"Entertainment"} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
      <CategoryCard title={"Health"} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
      <CategoryCard title={"Science"} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
      <CategoryCard title={"Sports"} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
      <CategoryCard title={"Technology"} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
    </div>
  )
}

export default CategorySelector

import React from 'react'
import Nav from './Nav'
import CategoryCard from './CategoryCard'
import { Link } from 'react-router-dom'

const CategorySelector = ({history, links, loggedInUser, subscribeToCategory}) => {

  const renderDisplay = () => {
    let display;

    if (loggedInUser.username) {
      display = 
      <>
        <CategoryCard title={"Business"} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
        <CategoryCard title={"Entertainment"} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
        <CategoryCard title={"Health"} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
        <CategoryCard title={"Science"} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
        <CategoryCard title={"Sports"} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
        <CategoryCard title={"Technology"} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
      </>
    } else {
      display = <h1><Link to="/login">Log in</Link> to see the news by category</h1>
    }
    return display
  }

  return (
    <div>
      <Nav links={links}/>
      {renderDisplay()}
    </div>
  )
}

export default CategorySelector

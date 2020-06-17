import React from 'react'
import Nav from './Nav'
import CategoryCard from './CategoryCard'
import { Link } from 'react-router-dom'
import CategorySelectorStyles from '../styles/CategorySelector.module.css'
import technologyBackground from "../assets/technologynewsbackground.png"
import businessBackground from "../assets/businessnewsbackground.jpg"
import entertainmentBackground from "../assets/entertainmentnews.png"
import healthBackground from "../assets/healthnewsbackground.jpg"
import scienceBackground from "../assets/sciencenewsbackground.jpg"
import sportsBackground from "../assets/sportsnewsbackground.jpg"

const CategorySelector = ({history, links, loggedInUser, subscribeToCategory}) => {

  const renderDisplay = () => {
    let display;

    if (loggedInUser.username) {
      display = 
        <React.Fragment>
          <header className={CategorySelectorStyles.header} >
            <h1>Categories</h1>
            <p>View your news by categories</p>
          </header>
          <Nav links={links}/>
          <div className={CategorySelectorStyles.container} >
            <CategoryCard title={"Business"} image={businessBackground} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
            <CategoryCard title={"Entertainment"} image={entertainmentBackground} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
            <CategoryCard title={"Health"} image={healthBackground} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
            <CategoryCard title={"Science"} image={scienceBackground} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
            <CategoryCard title={"Sports"} image={sportsBackground} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
            <CategoryCard title={"Technology"} image={technologyBackground} history={history} loggedInUser={loggedInUser}subscribeToCategory={subscribeToCategory}/>
          </div>
        </React.Fragment>
    } else {
      display = <h5 className={CategorySelectorStyles.h5} ><Link className={CategorySelectorStyles.link} to="/login">Log in</Link> to see the news by category</h5>
    }
    return display
  }

  return (
    <div>
      {renderDisplay()}
    </div>
  )
}

export default CategorySelector

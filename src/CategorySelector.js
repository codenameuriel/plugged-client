import React from 'react'
import Nav from './Nav'

const CategorySelector = ({history, links}) => {
  return (
    <div>
      <Nav links={links}/>
      <div onClick={() => history.push("/categories/business")}>
        <h3>Business</h3>
      </div>
      <div onClick={() => history.push("/categories/entertainment")}>
        <h3>Entertainment</h3>
      </div>
      {/* <div onClick={() => history.push("/categories/general")}>
        <h3>General</h3>
      </div> */}
      <div onClick={() => history.push("/categories/health")}>
        <h3>Health</h3>
      </div>
      <div onClick={() => history.push("/categories/science")}>
        <h3>Science</h3>
      </div>
      <div onClick={() => history.push("/categories/sports")}>
        <h3>Sports</h3>
      </div>
      <div onClick={() => history.push("/categories/technology")}>
        <h3>Technology</h3>
      </div>
    </div>
  )
}

export default CategorySelector

import React from 'react'
import NewspaperTileStyles from "../styles/NewspaperTile.module.css"

const NewspaperTile = ({ newspaper, setNewspaper, history }) => {
  const renderCategories = () => {
    return newspaper.categories.map(category => {
      return (
        <>
          <p className={NewspaperTileStyles.p} >{category.name}</p>
        </>
      )
    })
  }

  const renderSources = () => {
    return newspaper.sources.map(source => {
      return (
        <>
          <p className={NewspaperTileStyles.p} >{source.name}</p>
        </>
      )
    })
  }

  const renderTopics = () => {
    return newspaper.topics.map(topic => {
      return (
        <>
          <p className={NewspaperTileStyles.p} >{topic.name}</p>
        </>
      )
    })
  }

  return (
    <div
      className={NewspaperTileStyles.newspaperCard} 
      onClick={() => {
        setNewspaper(newspaper.title)
        history.push(`/newspapers/${newspaper.title}`)
      }} >
      <h1 className={NewspaperTileStyles.h1} >The {newspaper.title} Plug</h1>
      <h2>Categories</h2>
      {renderCategories()}
      <h2>Sources</h2>
      {renderSources()}
      <h2>Topics</h2>
      {renderTopics()}
      {/* <h5>Published: {(date.getMonth() + 1) (newspaper.created_at.slice(0, 10).getDay() + 1), (newspaper.created_at.slice(0, 10).getFullYear())}</h5> */}
    </div>
  )
}

export default NewspaperTile

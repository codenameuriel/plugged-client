import React from 'react'

const NewspaperTile = ({ newspaper, setNewspaper, history }) => {
  const renderCategories = () => {
    return newspaper.categories.map(category => {
      return (
        <>
          <p>{category.name}</p>
        </>
      )
    })
  }

  const renderSources = () => {
    return newspaper.sources.map(source => {
      return (
        <>
          <p>{source.name}</p>
        </>
      )
    })
  }

  const renderTopics = () => {
    return newspaper.topics.map(topic => {
      return (
        <>
          <p>{topic.name}</p>
        </>
      )
    })
  }

  return (
    <div onClick={() => {
      setNewspaper(newspaper.title)
      history.push(`/newspapers/${newspaper.title}`)
      }} >
      <h1>The {newspaper.title} Plug</h1>
      <h3>Categories</h3>
      {renderCategories()}
      <h3>Sources</h3>
      {renderSources()}
      <h3>Topics</h3>
      {renderTopics()}
      <h5>Published: {newspaper.created_at}</h5>
    </div>
  )
}

export default NewspaperTile

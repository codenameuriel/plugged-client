/** @format */

import React from 'react'

import ArticleCard from '../ArticleCard/ArticleCard'

const Articles = props => {
  // Collection page will provide inCollection prop
  const {
    articlesProps: { news, userLoggedIn, onClick, inCollection }
  } = props

  return news.map((newsStory, idx) => (
    <ArticleCard
      key={idx}
      newsStory={newsStory}
      userLoggedIn={userLoggedIn}
      onClick={onClick}
      inCollection={inCollection}
    />
  ))
}

export default Articles

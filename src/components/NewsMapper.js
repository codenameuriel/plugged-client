import React from 'react'
import NewsCard from './NewsCard'

import NewsMapperStyles from '../styles/NewsMapper.module.css'

const NewsMapper = ({ news, loggedInUser, postArticle }) => {
  const renderNewsCards = () => {
    console.log('news', news)
    return news.map((article, index) => 
      <NewsCard 
        key={index} 
        {...article} 
        loggedInUser={loggedInUser}
        postArticle={postArticle}
      />)
  }

  return (
    <div className={NewsMapperStyles.container} >
      {renderNewsCards()}
    </div>
  )
}

export default NewsMapper

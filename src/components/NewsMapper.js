import React from 'react'
import NewsCard from './NewsCard'

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
    <div>
      {renderNewsCards()}
    </div>
  )
}

export default NewsMapper

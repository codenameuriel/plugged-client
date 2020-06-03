import React from 'react'
import Newspaper from './newspaper.jpeg'

function NewsCard({title, description, url, urlToImage}) {
  return (
    <div>
      <h2>{title}</h2>
      <a target="_blank" href={url}><img src={urlToImage || Newspaper} alt={title}/></a>
      <p>{description}</p>
      <button>Add to collection</button>
    </div>
  )
}

export default NewsCard

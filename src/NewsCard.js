import React from 'react'
import Newspaper from './newspaper.jpeg'

function NewsCard({author, content, publishedAt, source, title, description, url, urlToImage, loggedInUser, postArticle}) {
  let article = {
    author: author,
    content: content,
    description: description,
    published_at: publishedAt,
    source: source.name,
    title: title,
    url: url,
    url_to_image: urlToImage
  }

  let button;

  if (loggedInUser.username) {
    button = <button onClick={() => {
      postArticle(article)
    }}>Add to collection</button>
  }

  return (
    <div>
      <h2>{title}</h2>
      <a target="_blank" rel="noopener noreferrer" href={url}><img src={urlToImage || Newspaper} alt={title}/></a>
      <p>{description}</p>
      {button}
    </div>
  )
}

export default NewsCard

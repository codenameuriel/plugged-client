import React from 'react'
import Plug from '../assets/Plug.png'
import NewsCardStyles from '../styles/NewsCard.module.css'

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
    button = <button className={NewsCardStyles.button} onClick={() => {
      postArticle(article)
      alert('article was added to your collection!')
    }}>Add to collection</button>
  }

  return (
    <div className={NewsCardStyles.newscard} >
      <h2>{title}</h2>
      <a target="_blank" rel="noopener noreferrer" href={url}><img className={NewsCardStyles.img} src={urlToImage || Plug} alt={title}/></a>
      <p>{description}</p>
      {button}
    </div>
  )
}

export default NewsCard

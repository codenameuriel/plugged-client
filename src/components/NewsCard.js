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
      <button><a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=I just want to share this article I just read ${url}`} className="twitter-share-button" data-show-count="false"
      data-size="large" data-text="I just want to share this article" data-via="codenameuriel" data-lang="en"
      >Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></button>
    </div>
  )
}

export default NewsCard

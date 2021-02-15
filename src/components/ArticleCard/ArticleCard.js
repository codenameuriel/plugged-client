/** @format */

import React from 'react'
import { FaTwitter } from 'react-icons/fa'
import Button from '../UI/Button/Button'

import Plug from '../../assets/Plug.png'
import ArticleCardStyles from './ArticleCard.module.css'
import IconStyles from '../UI/Icon/Icon.module.css'

const ArticleCard = props => {
  const { inCollection } = props
  if (inCollection) {
    const {
      id,
      title,
      description,
      url,
      url_to_image,
      removeCollection
    } = props

    // () => removeFromCollection(id)
    return (
      <article>
        <h2>{title}</h2>
        <a target='_blank' rel='noopener noreferrer' href={url}>
          <img src={url_to_image || Plug} alt={title} />
        </a>
        <p>{description}</p>
        <Button onClick={null} description={'Remove from collection'} />
      </article>
    )
  } else {
    const { newsStory, isAuthenticated, onPostNewsStory } = props
    const { title, url, urlToImage, description, content } = newsStory
    const postFormatNewsStory = formatNewsStoryForPost(newsStory)

    return (
      <article className={ArticleCardStyles.ArticleCard}>
        <h2>{title}</h2>
        <a target='_blank' rel='noopener noreferrer' href={url}>
          <img src={urlToImage || Plug} alt={title} />
        </a>
        <p>{description || formatContent(content)}</p>
        {authenticatedActions(
          isAuthenticated,
          onPostNewsStory,
          postFormatNewsStory
        )}
      </article>
    )
  }
}

export default ArticleCard

function formatNewsStoryForPost(newsStory) {
  return {
    ...newsStory,
    source: newsStory.source.name,
    content: formatContent(newsStory.content)
  }
}

function formatContent(content) {
  if (content && content.includes('[')) {
    return content.split('[')[0].trim()
  }
}

function authenticatedActions(isAuthenticated, onPostNewsStory, newsStory) {
  if (isAuthenticated) {
    const addToCollection = () => {
      onPostNewsStory(newsStory)
      alert('News story was added to your collection!')
    }

    return (
      <div className={ArticleCardStyles.Actions}>
        <Button
          onClick={addToCollection}
          description={'Add to collection'}
          type={'collection'}
        />
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={`https://twitter.com/intent/tweet?text=Just checked this out ${newsStory.url}`}
          data-show-count='false'
        >
          <FaTwitter className={IconStyles.Tweet} />
        </a>
        <script
          async
          src='https://platform.twitter.com/widgets.js'
          charSet='utf-8'
        ></script>
      </div>
    )
  }
  return
}

import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import Button from '../UI/Button/Button';

import Plug from '../../assets/Plug.png';
import ArticleCardStyles from './ArticleCard.module.css';
import IconStyles from '../UI/Icon/Icon.module.css';

const ArticleCard = props => {
  const {
    newsStory: { title, url, urlToImage, description, content }
  } = props;

  console.log(props.newsStory);

  return (
    <article className={ArticleCardStyles.ArticleCard}>
      <h2>{title}</h2>
      <a target='_blank' rel='noopener noreferrer' href={url}>
        <img src={urlToImage || Plug} alt={title} />
      </a>
      <p>{description || formatContent(content)}</p>
      {pageActions(props)}
    </article>
  );
}

export default ArticleCard;

// renders different UI elements depending on page
function pageActions(props) {
  const {
    newsStory: { title, url, urlToImage, description, content, source, publishedAt },
    onClick,
    userLoggedIn
  } = props;

  if (props.inCollection) {
    return <Button onClick={() => onClick(props.newsStory)} description={'Remove from collection'} />;
  } else {
    // modify newsStory data for POST request - add to user collection
    const formattedNewsStory = formatNewsStory({
      title,
      url,
      urlToImage,
      description,
      content,
      source,
      publishedAt
    });

    return authenticatedActions(userLoggedIn, onClick, formattedNewsStory);
  }
}

// formats the newsStory object data fields for POST request
function formatNewsStory(newsStory) {
  return {
    ...newsStory,
    source: newsStory.source.name,
    content: formatContent(newsStory.content)
  };
}

// removes '[...]' characters from content field
function formatContent(content) {
  if (content && content.includes('[')) {
    return content.split('[')[0].trim();
  }
}

// adds functionalities if user is logged in
function authenticatedActions(userLoggedIn, onClick, newsStory) {
  if (userLoggedIn) {
    const addToCollection = () => {
      onClick(newsStory);
      alert('News story was added to your collection!');
    };

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
    );
  }
}

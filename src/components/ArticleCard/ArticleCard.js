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

  return (
    <article className={ArticleCardStyles.ArticleCard}>
      <h2>{removeSourceFromTitle(title)}</h2>
      <a target='_blank' rel='noopener noreferrer' href={url}>
        <img src={urlToImage || Plug} alt={title} />
      </a>
      <p>{description || formatContent(content)}</p>
      {newsStoryActions(props)}
    </article>
  );
}

export default ArticleCard;

// format the title, removing the article source
function removeSourceFromTitle(title) {
  return title.split(' - ')[0];
}

// removes '[...]' characters from content field
function formatContent(content) {
  if (content && content.includes('[')) {
    return content.split('[')[0].trim();
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

// prepares news story depending on page source
function newsStoryActions(props) {
  const { newsStory: propsNewsStory, inCollection } = props;

  // check if Article Card is not from CollectionNews
  // will format news story for potential POST request
  let newsStory = !inCollection ? formatNewsStory(propsNewsStory) : propsNewsStory;

  return authenticatedActions(props, newsStory);
}

// adds functionalities based on user logged in status and page source
function authenticatedActions(props, newsStory) {
  const { userLoggedIn, inCollection, onClick } = props;
  let alertMsg, btnDescription, content;

  if (!inCollection) {
    alertMsg = 'News story was added to your collection';
    btnDescription = 'Add to collection';
  } else {
    alertMsg = 'News story was removed from your collection';
    btnDescription = 'Remove from collection';
  }

  const btnAction = () => {
    onClick(newsStory);
    alert(alertMsg);
  };

  if (userLoggedIn) {
    content = (
      <div className={ArticleCardStyles.Actions}>
        <Button
          onClick={btnAction}
          description={btnDescription}
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
  
  return content;
}

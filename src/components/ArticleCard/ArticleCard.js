import React from 'react';

import Button from '../UI/Button/Button';
import Plug from '../../assets/Plug.png';
import ArticleCardStyles from './ArticleCard.module.css';

const ArticleCard = props => {
  const formatContent = content => {
    if (content && content.includes("[")) {
      return content.split("[")[0].trim();
    }
  };
  const { inCollection } = props;
  if (inCollection) {
    const { id, title, description, url, url_to_image, removeCollection } = props;

    // () => removeFromCollection(id)
    return (
      <article>
        <h2>{title}</h2>
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          href={url}><img src={url_to_image || Plug} alt={title} /></a>
        <p>{description}</p>
        <Button onClick={null} description={"Remove from collection"} />
      </article>
    );
  } else {
    const { author, content, publishedAt, source, title, description, url, urlToImage, isAuthenticated, onPostArticle } = props;

    const article = {
      author: author,
      content: formatContent(content),
      description: description,
      published_at: publishedAt,
      source: source.name,
      title: title,
      url: url,
      url_to_image: urlToImage
    };
      
    let button = null;
    if (isAuthenticated) {
      const addToCollection = () => {
        onPostArticle(article);
        alert("article was added to your collection!");
      };

      button = (
        <Button 
          onClick={addToCollection}
          description={"Add to collection"} 
          type={"collection"} />
      );
    }
    
    return (
      <article className={ArticleCardStyles.ArticleCard}>
        <h2>{title}</h2>
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          href={url}><img src={urlToImage || Plug} alt={title}/></a>
        <p>{description || formatContent(content)}</p>
        {button}
        {isAuthenticated && 
          <button 
            className={ArticleCardStyles.Tweet}>
              <a className={ArticleCardStyles.a} 
                target="_blank" 
                rel="noopener noreferrer" 
                href={`https://twitter.com/intent/tweet?text=Just checked this out ${url}`} 
                data-show-count="false">Tweet</a>
                <script 
                  async src="https://platform.twitter.com/widgets.js" charset="utf-8">
                </script>
          </button>
        }
      </article>
    );
  }
};

export default ArticleCard;
import React from 'react';
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
          href={url}><img src={url_to_image || Plug} alt={title}/></a>
        <p>{description}</p>
        <button onClick={null}>Remove from collection</button>
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
      button = (
        <button 
          onClick={() => {
            onPostArticle(article);
            alert('article was added to your collection!');
          }}>Add to collection</button>
      );
    }
    
    return (
      <article className={ArticleCardStyles.ArticleCard}>
        <h2>{title}</h2>
        <div className={ArticleCardStyles.Image}>
          <a 
          target="_blank" 
          rel="noopener noreferrer" 
          href={url}><img src={urlToImage || Plug} alt={title}/></a>
        </div>
        <p>{description || formatContent(content)}</p>
        {button}
        {/* {
        loggedInUser.username && <button className={NewsCardStyles.tweet} ><a className={NewsCardStyles.a} target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=Just checked this out ${url}`} data-show-count="false" >Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></button>
        } */}
      </article>
    );
  }
};

export default ArticleCard;
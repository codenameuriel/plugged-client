import React from 'react';
import Plug from '../../assets/Plug.png';
import ArticleCardStyles from './ArticleCard.module.css';

const ArticleCard = props => {
  const { inCollection } = props;
  if (inCollection) {
    const { id, title, description, url, url_to_image, removeCollection } = props;

    // () => removeFromCollection(id)
    return (
      <div>
        <h2>{title}</h2>
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          href={url}><img src={url_to_image || Plug} alt={title}/></a>
        <p>{description}</p>
        <button onClick={null}>Remove from collection</button>
      </div>
    );
  } else {
    const { author, content, publishedAt, source, title, description, url, urlToImage, isAuthenticated, onPostArticle } = props;

    const article = {
      author: author,
      content: content,
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
      <div className={ArticleCardStyles.ArticleCard}>
        <h2>{title}</h2>
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          href={url}><img src={urlToImage || Plug} alt={title}/></a>
        <p>{description || content}</p>
        {button}
        {/* {
        loggedInUser.username && <button className={NewsCardStyles.tweet} ><a className={NewsCardStyles.a} target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=Just checked this out ${url}`} data-show-count="false" >Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></button>
        } */}
      </div>
    );
  }
};

export default ArticleCard;
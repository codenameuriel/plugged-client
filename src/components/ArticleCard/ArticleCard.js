import React from 'react';
import Plug from '../../assets/Plug.png';

const ArticleCard = props => {
  const { inCollection } = props;
  if (inCollection) {
    const { id, title, description, url, url_to_image, removeCollection } = props;

    let button;
    // () => removeFromCollection(id)
    if (title !== undefined) {
      button = <button onClick={null}>Remove from collection</button>;
    }
    
    return (
      <div>
        <h2>{title}</h2>
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          href={url}><img src={url_to_image || Plug} alt={title}/>
        </a>
        <p>{description}</p>
        {button}
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
      
    let button;
    
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
      <div>
        <h2>{title}</h2>
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          href={url}><img 
          src={urlToImage || Plug} alt={title}/></a>
        <p>{description}</p>
        {button}
        {/* {
        loggedInUser.username && <button className={NewsCardStyles.tweet} ><a className={NewsCardStyles.a} target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=Just checked this out ${url}`} data-show-count="false" >Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></button>
        } */}
      </div>
    );
  }
};

export default ArticleCard;
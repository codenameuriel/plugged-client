import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import Plug from '../assets/Plug.png'
import NewsCardStyles from '../styles/NewsCard.module.css'

class NewsCard extends Component { 
  render() {
    const { author, content, publishedAt, source, title, description, url, urlToImage, isAuthenticated } = this.props;
  
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
      const { onPostArticle } = this.props;
      button = (
        <button 
          className={NewsCardStyles.button} 
          onClick={() => {
            onPostArticle(article);
            alert('article was added to your collection!');
          }}>Add to collection</button>
      );
    }
    
    return (
      <div className={NewsCardStyles.newscard} >
        <h2>{title}</h2>
        <a target="_blank" rel="noopener noreferrer" href={url}><img className={NewsCardStyles.img} src={urlToImage || Plug} alt={title}/></a>
        <p>{description}</p>
        {button}
        {/* {
        loggedInUser.username && <button className={NewsCardStyles.tweet} ><a className={NewsCardStyles.a} target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=Just checked this out ${url}`} data-show-count="false" >Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></button>
        } */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPostArticle: article => dispatch(actionCreators.saveArticle(article))
  };
};

export default connect(null, mapDispatchToProps)(NewsCard);
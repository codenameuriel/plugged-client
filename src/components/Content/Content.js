import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import Spinner from '../../components/Spinner/Spinner';
import ArticleCard from '../ArticleCard/ArticleCard';

import ContentStyles from './Content.module.css';

class Content extends Component {
  renderContent() {
    const { type, user } = this.props;
    switch (type) {
      case "top-news":
        const { 
          news, prevLastArticleIndex, lastArticleIndex, onPostNewsStory
        } = this.props;
        let topNewsContent = null;
        if (news) {
          const newsPerPage = news.slice(prevLastArticleIndex, lastArticleIndex);

          topNewsContent = (
            newsPerPage.map((newsStory, index) => {
              return (
                <ArticleCard 
                  {...newsStory} 
                  key={index} 
                  isAuthenticated={!!user} 
                  inCollection={false} 
                  onPostNewsStory={onPostNewsStory} />
              );
            })
          );
          return (
            <section 
              className={ContentStyles.Articles}>{topNewsContent}
            </section>
          );
        }
        break;
      case "dashboard":
        const { categoryNews, onPostNewsStory } = this.props;
        let dashboardContent = [];
        for (let category in categoryNews) {
          dashboardContent.push(
            <section className={ContentStyles.Dashboard}>
              <h1><span><hr/></span>{category}<span><hr/></span></h1>
              <div className={ContentStyles.Articles}>
                {categoryNews[category].map((newsStory, index) => {
                  return (
                    <ArticleCard 
                      {...newsStory} 
                      key={`${index}${newsStory.url}`} 
                      isAuthenticated={!!user} 
                      inCollection={false} 
                      onPostNewsStory={onPostNewsStory}/>
                  );
                })}
              </div>
            </section> 
          );
        }
        return dashboardContent;
      case "collection":
        const { collectionNews } = this.props;
        if (collectionNews) {
          return (
            collectionNews.map(({ article }, index) => {
              return (
                <ArticleCard 
                  {...article} 
                  key={`${index}${article.id}`} 
                  isAuthenticated={!!user} 
                  inCollection={true} />
              );
            })
          );
        }
        break;
      case "topic-news":
        const { topicNews } = this.props;
        if (topicNews) {
          return topicNews.map((newsStory, index) => {
            return (
              <ArticleCard 
                {...newsStory} 
                key={`${index}${newsStory.id}`}
                isAuthenticated={!!user}
                inCollection={false} />
            );
          });
        }
        break;
      default: return null;
    }
  }

  render() {
    let content = <Spinner />;
    if (this.renderContent()) {
      content = this.renderContent();
    }
    return content;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    news: state.news.news,
    categoryNews: state.news.categoryNews,
    collectionNews: state.news.collectionNews,
    topicNews: state.news.topicNews,
    prevLastArticleIndex: state.pageManager.prevLastArticleIndex,
    lastArticleIndex: state.pageManager.lastArticleIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPostNewsStory: newsStory => dispatch(actionCreators.saveNewsStory(newsStory))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
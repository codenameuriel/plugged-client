/** @format */

import React from 'react'
// import { connect } from 'react-redux'
// import * as actionCreators from '../../store/actions/index'

// import Loader from '../Loader/Loader'
import ArticleCard from '../ArticleCard/ArticleCard'

// import ContentStyles from './Content.module.css'

const Articles = props => {
  const { articlesProps: { news, isLoggedIn, inCollection, addToCollection } } = props
  return news.map((newsStory, idx) => (
    <ArticleCard
      key={idx}
      newsStory={newsStory}
      isLoggedIn={isLoggedIn}
      inCollection={inCollection}
      addToCollection={addToCollection}
    />
  ))
}

export default Articles

// class Content extends Component {
//   createArticleCards(news, user, onPostNewsStory) {
//     return news.map((newsStory, index) => (
//       <ArticleCard
//         newsStory={newsStory}
//         key={index}
//         isAuthenticated={!!user}
//         inCollection={false}
//         onPostNewsStory={onPostNewsStory}
//       />
//     ))
//   }

//   renderTopNews() {
//     const { news, user, onPostNewsStory } = this.props
//     if (news) {
//       return (
//         <section className={ContentStyles.News}>
//           {this.createArticleCards(news, user, onPostNewsStory)}
//         </section>
//       )
//     }
//     return
//   }

//   renderDashboardNews() {
//     const { user, dashboardNews, onPostNewsStory } = this.props
//     let dashboardContent = []
//     for (let category in dashboardNews) {
//       dashboardContent.push(
//         <section className={ContentStyles.Dashboard}>
//           <h1>
//             <span>
//               <hr />
//             </span>
//             {category}
//             <span>
//               <hr />
//             </span>
//           </h1>
//           <div className={ContentStyles.News}>
//             {dashboardNews[category].map((newsStory, index) => {
//               return (
//                 <ArticleCard
//                   {...newsStory}
//                   key={`${index}${newsStory.url}`}
//                   isAuthenticated={!!user}
//                   inCollection={false}
//                   onPostNewsStory={onPostNewsStory}
//                 />
//               )
//             })}
//           </div>
//         </section>
//       )
//     }
//     return dashboardContent
//   }

//   renderCollectionNews() {
//     const { user, collectionNews } = this.props
//     if (collectionNews) {
//       return collectionNews.map(({ article }, index) => {
//         return (
//           <ArticleCard
//             {...article}
//             key={`${index}${article.id}`}
//             isAuthenticated={!!user}
//             inCollection={true}
//           />
//         )
//       })
//     }
//   }

//   renderTopicNews() {
//     const { user, news } = this.props
//     if (news) {
//       return (
//         <section className={ContentStyles.News}>
//           {this.createArticleCards(news, user)}
//         </section>
//       )
//     }
//     return
//   }

//   renderContent() {
//     const { type } = this.props
//     switch (type) {
//       case 'top-news':
//         return this.renderTopNews()
//       case 'dashboard':
//         return this.renderDashboardNews()
//       case 'collection':
//         return this.renderCollectionNews()
//       case 'topic-news':
//         return this.renderTopicNews()
//       default:
//         return null // error page
//     }
//   }

//   render() {
//     let content = <Loader />
//     if (this.renderContent()) {
//       content = this.renderContent()
//     }
//     return content
//   }
// }

// const mapStateToProps = state => {
//   return {
//     user: state.auth.user,
//     news: state.news.news,
//     dashboardNews: state.news.dashboardNews,
//     collectionNews: state.news.collectionNews,
//     topicNews: state.news.topicNews,
//     totalNews: state.news.totalNews,
//     searchTopic: state.news.searchTopic,
//     prevLastArticleIndex: state.pageManager.prevLastArticleIndex,
//     lastNewsStoryIndex: state.pageManager.lastNewsStoryIndex
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onPostNewsStory: newsStory =>
//       dispatch(actionCreators.saveNewsStory(newsStory))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Content)

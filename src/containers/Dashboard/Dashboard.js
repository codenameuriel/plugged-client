/** @format */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'

import Layout from '../../hoc/Layout/Layout'
import Articles from '../../components/Articles/Articles'
import Loader from '../../components/Loader/Loader'

import DashboardStyles from './Dashboard.module.css'

class Dashboard extends Component {
  state = {
    type: 'dashboard',
    title: 'Dashboard',
    subtitle: this.props.userLoggedIn
      ? `All your news in one place. Welcome back ${this.props.user.username}`
      : `All your news in one place. Welcome to Plugged, ${this.props.user.username}`
  }

  componentDidMount() {
    this.props.getDashboardNews()
  }

  createArticlesProps(news, userLoggedIn, addToCollection) {
    let articlesProps = { news, userLoggedIn }
    if (userLoggedIn) {
      articlesProps = {
        ...articlesProps,
        userLoggedIn,
        inCollection: false,
        addToCollection
      }
    }
    return articlesProps
  }

  allUserContent(dashboardNews, userLoggedIn, addToCollection) {
    let userContent = []
    for (let category in dashboardNews) {
      let news = dashboardNews[category]
      let articlesProps = this.createArticlesProps(
        news,
        userLoggedIn,
        addToCollection
      )
      userContent.push(this.content(articlesProps, category))
    }
    return userContent
  }

  articlesHeading(category) {
    return (
      <h1>
        <span>
          <hr />
        </span>
        {category}
        <span>
          <hr />
        </span>
      </h1>
    )
  }

  content(articlesProps, category) {
    return (
      <div className={DashboardStyles.Dashboard}>
        {this.articlesHeading(category)}
        <section className={DashboardStyles.Articles}>
          <Articles articlesProps={articlesProps} />
        </section>
      </div>
    )
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
  }

  render() {
    // const { loggedInUser, links, history, handleSearchChange, searchTopic, getTopicNews } = this.props
    // const search = <input className={DashboardStyles.search} onChange={handleSearchChange} type="text" placeholder="Search news by topic" value={searchTopic} />
    // const searchBtn = <button className={DashboardStyles.submitBtn} onClick={() => {
    //   getTopicNews()
    //   history.push("/dashboard/topic-news")
    // }}>Search</button>

    // let dashboardDisplay;
    // let dashboardDisplayHeader;
    // let v1, v2, v3, v4, v5, v6
    // let header1, header2, header3, header4, header5, header6

    // if (this.state.articles.length > 0) {
    //   const [view1, view2, view3, view4, view5, view6] = this.passDownToNewsMapper()
    //   const [h1, h2, h3, h4, h5, h6] = this.createH1ForCategories()

    //   v1 = view1
    //   v2 = view2
    //   v3 = view3
    //   v4 = view4
    //   v5 = view5
    //   v6 = view6

    //   header1 = h1
    //   header2 = h2
    //   header3 = h3
    //   header4 = h4
    //   header5 = h5
    //   header6 = h6

    //   dashboardDisplay =
    //     <>
    //       <h1 className={DashboardStyles.h1} >Here are your top news</h1>
    //       {header1}
    //       {v1}
    //       {header2}
    //       {v2}
    //       {header3}
    //       {v3}
    //       {header4}
    //       {v4}
    //       {header5}
    //       {v5}
    //       {header6}
    //       {v6}
    //     </>

    //   dashboardDisplayHeader =
    //     <>
    //       <header className={DashboardStyles.header} >
    //         <h1>Dashboard</h1>
    //         <p>Welcome back <span className={DashboardStyles.span} >{loggedInUser.username}</span></p>
    //       </header>
    //       <Nav links={links} search={search} searchBtn={searchBtn} />
    //     </>
    // } else if (!loggedInUser.username) {
    //   dashboardDisplay = <h5 className={DashboardStyles.h5} ><Link className={DashboardStyles.link} to="/login">Log in</Link> to see your top news</h5>
    // } else {
    //   dashboardDisplay =
    //     <>
    //       <header className={DashboardStyles.header} >
    //         <h1>Dashboard</h1>
    //         <p>You are not subscribed to any news <span className={DashboardStyles.span} >{loggedInUser.username}</span></p>
    //       </header>
    //       <Nav links={links} search={search} searchBtn={searchBtn} />
    //       <h3 className={DashboardStyles.h3} ><Link className={DashboardStyles.link} to="/categories">Subscribe</Link> to news here</h3>
    //     </>
    // }
    const { type, title, subtitle } = this.state
    const { dashboardNews, userLoggedIn, addToCollection } = this.props

    return (
      <Layout title={title} subtitle={subtitle} type={type}>
        {dashboardNews ? (
          this.allUserContent(dashboardNews, userLoggedIn, addToCollection)
        ) : (
          <Loader />
        )}
        <button
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }
        >
          Scroll Top
        </button>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    userLoggedIn: state.auth.userLoggedIn,
    dashboardNews: state.news.dashboardNews
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDashboardNews: () => dispatch(actionCreators.getDashboardNews()),
    addToCollection: newsStory =>
      dispatch(actionCreators.saveNewsStory(newsStory))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

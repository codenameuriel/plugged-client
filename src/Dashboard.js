// import React, { Component } from 'react'
// import { apiKey }  from './apiKey'
// import { NavLink } from 'react-router-dom';
// import TopNewsContainer from './TopNewsContainer'

// class Dashboard extends Component {
//   state = {
//     page: 1,
//     topNews: [],
//     showPrevPageButton: false,
//     article: {},
//     collectionLinkClicked: false
//   }

//   componentDidMount() {
//     this.getTopNews()
//   }

//   getTopNews = () => {
//     fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${this.state.page}`, apiKey)
//       .then(resp => resp.json())
//       .then(data => this.setState({
//         topNews: data.articles
//       }))
//   }

//   togglePrevPageButton = () => {
//     if (this.state.page === 1) {
//       this.setState({
//         showPrevPageButton: false
//       })
//     } else {
//       this.setState({
//         showPrevPageButton: true
//       })
//     }
//   }

//   nextPage = () => {
//     let page = this.state.page
//     if (page === 8 ) {
//       this.setState({
//         page: 1
//       }, () => {
//         this.togglePrevPageButton()
//         this.getTopNews()
//       })
//     } else {
//       this.setState({
//         page: page + 1
//       }, () => {
//         this.togglePrevPageButton()
//         this.getTopNews()
//       })
//     }
//   }

//   prevPage = () => {
//     let page = this.state.page
//     if (page !== 1) {
//       this.setState({
//         page: page - 1
//       }, () => {
//         this.togglePrevPageButton()
//         this.getTopNews()
//       })
//     }
//   }

//   postArticle = article => {
//     fetch('http://localhost:4000/articles', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify(article)
//     })
//     .then(resp => resp.json())
//     .then(this.setArticle)
//   }

//   setArticle = article => {
//     this.setState({
//       article: article
//     }, () => this.addToUserCollection(this.state.article))
//   }

//   addToUserCollection = article => {
//     let collectionObj = {
//       user_id: this.props.loggedInUser.id,
//       article_id: this.state.article.id
//     }

//     fetch('http://localhost:4000/collections', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify(collectionObj)
//     })
//     .then(resp => resp.json())
//     .then(console.log)
//   }

//   collectionLinkClicked = () => {
//     this.setState({
//       collectionLinkClicked: true
//     })
//   }

//   render() {
//     const [home, login, signup, logout] = this.props.links
//     const collectionLink =  <NavLink onClick={this.collectionLinkClicked} to="/dashboard">Collection</NavLink>
//     let conditionalLinks = []

//     if (this.props.loggedInUser.username) {
//       conditionalLinks.push(collectionLink, logout)
//     } else {
//       conditionalLinks.push(login, signup)
//     }

//     let topNewsDisplay = 
//       <TopNewsContainer
//         links={conditionalLinks}
//         loggedInUser={this.props.loggedInUser}
//         page={this.state.page}
//         topNews={this.state.topNews} 
//         showPrevPageButton={this.state.showPrevPageButton}
//         togglePrevPageButton={this.togglePrevPageButton}
//         nextPage={this.nextPage}
//         prevPage={this.prevPage}
//         postArticle={this.postArticle}
//         addToUserCollection={this.addToUserCollection}
//       />

//     let collectionDisplay = 
//       // <Collection 
//       //   links={conditionalLinks}
//       // />
//       React.cloneElement(this.props.collectionContainer, { links: conditionalLinks }) 

//     let view = topNewsDisplay
    
//     if (this.state.collectionLinkClicked) {
//       view = collectionDisplay
//     }

//     return (
//       <div>
//         {view}
//       </div>
//     )
//   }
// }

// export default Dashboard

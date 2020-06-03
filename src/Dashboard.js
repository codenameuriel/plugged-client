import React, { Component } from 'react'
import { apiKey }  from './apiKey'
import TopNewsContainer from './TopNewsContainer'

class Dashboard extends Component {
  state = {
    page: 1,
    topNews: [],
    showPrevPageButton: false
  }

  componentDidMount() {
    this.getTopNews()
  }

  getTopNews = () => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${this.state.page}`, apiKey)
      .then(resp => resp.json())
      .then(data => this.setState({
        topNews: data.articles
      }))
  }

  togglePrevPageButton = () => {
    if (this.state.page === 1) {
      this.setState({
        showPrevPageButton: false
      })
    } else {
      this.setState({
        showPrevPageButton: true
      })
    }
  }

  nextPage = () => {
    let page = this.state.page
    if (page === 8 ) {
      this.setState({
        page: 1
      }, () => {
        this.togglePrevPageButton()
        this.getTopNews()
      })
    } else {
      this.setState({
        page: page + 1
      }, () => {
        this.togglePrevPageButton()
        this.getTopNews()
      })
    }
  }

  prevPage = () => {
    let page = this.state.page
    if (page !== 1) {
      this.setState({
        page: page - 1
      }, () => {
        this.togglePrevPageButton()
        this.getTopNews()
      })
    }
  }

  render() {
    return (
      <div>
        <TopNewsContainer
          page={this.state.page}
          topNews={this.state.topNews} 
          showPrevPageButton={this.state.showPrevPageButton}
          togglePrevPageButton={this.togglePrevPageButton}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
        />
      </div>
    )
  }
}

export default Dashboard

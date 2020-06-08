import React, { Component } from 'react'

class SubscribedCategoryCard extends Component {
  state = {
    strike: false
  }

  componentDidMount() {
    this.setState({
      strike: false
    })
  }

  toggleStrike = () => {
    const {category, unsubscribeFromCategory} = this.props
    let strike = this.state.strike

    this.setState({
      strike: !strike
    }, () => unsubscribeFromCategory(category))
  }

  render() {
    const { category } = this.props
    const { strike } = this.state

    return (
      <div>
         <p 
          onClick={this.toggleStrike}>{strike ?  <s>{category}</s> : category}
        </p>
      </div>
    )
  }
}

export default SubscribedCategoryCard

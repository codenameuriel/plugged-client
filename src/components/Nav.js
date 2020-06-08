import React, { Component } from 'react'

class Nav extends Component {
  renderLinks = props => (
    (props || []).map((link, index) => <li key={index}>{link}</li>)
  )

  render() {
    const { links, search, searchBtn } = this.props

    return (
      <header>
        <nav>
          <ul className="navbar">
            {this.renderLinks(links)}
            {search}
            {searchBtn}
          </ul>
        </nav>
      </header>
    )
  }
}

export default Nav

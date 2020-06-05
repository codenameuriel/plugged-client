import React, { Component } from 'react'

class Nav extends Component {
  renderLinks = props => (
    (props || []).map((link, index) => <li key={index}>{link}</li>)
  )

  render() {
    const { links } = this.props

    return (
      <div>
        <nav>
          <ul className="navbar">
            {this.renderLinks(links)}
          </ul>
        </nav>
      </div>
    )
  }
}

export default Nav

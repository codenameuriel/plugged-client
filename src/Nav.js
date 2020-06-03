import React, { Component } from 'react'

export class Nav extends Component {
  renderLinks = props => (
    props.map(link => <li>{link}</li>)
  )

  render() {
    return (
      <div>
        <nav>
          <ul className="navbar">
            {this.renderLinks(this.props.links)}
          </ul>
        </nav>
      </div>
    )
  }
}

export default Nav

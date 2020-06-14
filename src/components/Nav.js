import React, { Component } from 'react'
import NavStyles from '../styles/Nav.module.css'

class Nav extends Component {
  renderLinks = props => (
    (props || []).map((link, index) => <li key={index}>{link}</li>)
  )

  render() {
    const { links, search, searchBtn } = this.props

    return (
        <nav className={NavStyles.nav} >
          <ul className={NavStyles.ul}>
            {this.renderLinks(links)}
            {search}
            {searchBtn}
          </ul>
        </nav>
    )
  }
}

export default Nav

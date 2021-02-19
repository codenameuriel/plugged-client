/** @format */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/index'

import Layout from '../hoc/Layout/Layout'
import Content from './Content/Content'

class Collection extends Component {
  state = {
    type: 'collection',
    title: 'Collection',
    subtitle: 'Here are your saved news articles',
  }

  componentDidMount() {
    this.props.onGetCollection()
  }

  render() {
    const { type, title, subtitle } = this.state
    return (
      <Layout type={type} title={title} subtitle={subtitle}>
        {/* <PageManager/> */}
        <Content type={type} />
      </Layout>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetCollection: () => dispatch(actionCreators.getCollection()),
  }
}

export default connect(null, mapDispatchToProps)(Collection)

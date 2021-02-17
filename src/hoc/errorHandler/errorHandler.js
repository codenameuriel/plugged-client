/** @format */

import React from 'react'

import Modal from '../../components/Modal/Modal'

const errorHandler = WrappedComponent => {
  return class extends React.Component {
    render() {
      const { error } = this.props

      return (
        <>
          {error ? <Modal error={error} /> : null}
          <WrappedComponent {...this.props} />
        </>
      )
    }
  }
}

export default errorHandler

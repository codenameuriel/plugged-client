/** @format */

import React from 'react'
import { connect } from 'react-redux'

import * as actionCreators from '../../store/actions/index'

import Button from '../UI/Button/Button'

import ModalStyles from './Modal.module.css'

class Modal extends React.Component {
  render() {
    const { error, clearAuthError } = this.props

    return (
      <>
        <div className={ModalStyles.Backdrop}></div>
        <div className={ModalStyles.Modal}>
          <Button type='modal' description='Dismiss' onClick={clearAuthError} />
          <p>{error}</p>
        </div>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearAuthError: () => dispatch(actionCreators.clearAuthError())
  }
}

export default connect(null, mapDispatchToProps)(Modal)

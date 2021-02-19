/** @format */

import React from 'react'
import ButtonStyles from './Button.module.css'

const Button = ({ type, description, onClick }) => {
  // onClick prop will contain click event
  let buttonStyles = [ButtonStyles.Button]
  switch (type) {
    case 'collection':
      buttonStyles = [ButtonStyles.Button, ButtonStyles.Collection]
      break
    case 'pageManager':
      buttonStyles = [ButtonStyles.Button, ButtonStyles.PageManager]
      break
    case 'search':
      buttonStyles = [ButtonStyles.Button, ButtonStyles.Search]
      break
    default:
      break
  }

  return (
    <button className={buttonStyles.join(' ')} onClick={onClick}>
      {description}
    </button>
  )
}

export default Button

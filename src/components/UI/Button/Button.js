import React from 'react';
import ButtonStyles from './Button.module.css';

const Button = ({ type, description, onClick }) => {
  // onClick prop will contain click event
  let buttonStyles = null;
  switch (type) {
    case "collection":
      buttonStyles = ButtonStyles.Collection;
      break;
    case "pageManager":
      buttonStyles = ButtonStyles.PageManager;
      break;
    default: break;
  }

  return (
    <button className={buttonStyles} onClick={onClick}>{description}</button>
  );
};

export default Button;
import React from 'react';
import ButtonStyles from './Button.module.css';

const Button = ({ type, description, onClick }) => {
  // onClick prop will contain click event
  let buttonStyles = null;
  switch (type) {
    case "collection":
      buttonStyles = ButtonStyles.Collection;
      break;
    case "tweet":
      buttonStyles = ButtonStyles.Tweet;
      break;
  }

  return (
    <button className={buttonStyles} onClick={onClick}>{description}</button>
  );
};

export default Button;
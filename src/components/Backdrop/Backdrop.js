import React from 'react';
import BackdropStyles from './Backdrop.module.css';

const BackDrop = props => {
  return props.show ? <div className={BackdropStyles.Backdrop}></div> : null;
};

export default BackDrop;
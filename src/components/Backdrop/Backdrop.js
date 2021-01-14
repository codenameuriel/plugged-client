import React from 'react';
import BackdropStyles from './Backdrop.module.css';

const BackDrop = props => {
  const { closeSideDrawer } = props;
  return (
    props.show ? 
      <div 
        className={BackdropStyles.Backdrop}
        onClick={() => closeSideDrawer(false)}></div> : null
  );
};

export default BackDrop;
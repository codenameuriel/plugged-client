import React from 'react';
import BackdropStyles from './Backdrop.module.css';

const BackDrop = props => {
  const { showSideDrawer, closeSideDrawer } = props;
  return (
    showSideDrawer ? 
      <div className={BackdropStyles.Backdrop}
        onClick={() => closeSideDrawer(false)}></div> : null
  );
};

export default BackDrop;
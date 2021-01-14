import React from 'react';
import DrawerToggleStyles from './DrawerToggle.module.css';

const DrawerToggle = props => {
  const { openSideDrawer } = props;
  return (
    <div 
      className={DrawerToggleStyles.DrawerToggle} 
      onClick={() => openSideDrawer(true)}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DrawerToggle;
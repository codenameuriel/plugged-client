import React from 'react';
import DrawerToggleStyles from './DrawerToggle.module.css';

const DrawerToggle = props => {
  const { showSideDrawer } = props;
  return (
    <div className={DrawerToggleStyles.DrawerToggle} onClick={showSideDrawer}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DrawerToggle;
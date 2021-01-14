import React from 'react';
import DrawerToggleStyles from './DrawerToggle.module.css';

const DrawerToggle = props => {
  const drawerToggleStyles = [DrawerToggleStyles.DrawerToggle,];

  return (
    <div className={drawerToggleStyles.join(" ")}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DrawerToggle;
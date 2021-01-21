import React from 'react';
import NavManager from '../../containers/NavManager/NavManager';
import DrawerToggle from '../DrawerToggle/DrawerToggle';

import HeaderStyles from './Header.module.css';

const Header = props => {
  const { type, title, subtitle, openSideDrawer } = props;
  return (
    <header className={HeaderStyles.Header}>
      <h1>{title}</h1>
      <p>{subtitle || null}</p>
      <NavManager 
        type={type} 
        openSideDrawer={openSideDrawer}>
          <DrawerToggle />
      </NavManager>
    </header>
  );
};

export default Header;
import React from 'react';
import { useState } from 'react';
import NavManager from '../../containers/NavManager/NavManager';
import SideDrawer from '../../containers/SideDrawer/SideDrawer';

import HeaderStyles from './Header.module.css';

const Header = props => {
  const [ showSideDrawer, setShowSideDrawer ] = useState(false);

  const { type } = props;
  return (
    <header className={HeaderStyles.Header}>
      <h1>{props.title}</h1>
      <p>{props.subtitle ? props.subtitle : null}</p>
      <SideDrawer show={showSideDrawer} closeSideDrawer={setShowSideDrawer}/>
      <NavManager type={type} openSideDrawer={setShowSideDrawer}/>
    </header>
  );
};

export default Header;
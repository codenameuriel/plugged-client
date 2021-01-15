import React from 'react';
import NavManager from '../../containers/NavManager/NavManager';

import HeaderStyles from './Header.module.css';

const Header = props => {
  const { type } = props;
  return (
    <header className={HeaderStyles.Header}>
      <h1>{props.title}</h1>
      <p>{props.subtitle ? props.subtitle : null}</p>
      <NavManager type={type} openSideDrawer={setShowSideDrawer}/>
    </header>
  );
};

export default Header;
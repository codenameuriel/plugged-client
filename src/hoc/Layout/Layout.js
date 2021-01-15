import React from 'react';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import SideDrawer from '../../containers/SideDrawer/SideDrawer';

import LayoutStyles from './Layout.module.css';

const Layout = props => {
  const [ showSideDrawer, setShowSideDrawer ] = useState(false);
  const { type, title, subtitle } = props;
  return (
    <>
      <SideDrawer show={showSideDrawer} closeSideDrawer={setShowSideDrawer}/>
      <Header type={type} title={title} subtitle={subtitle}/>
      <main className={LayoutStyles.Main}>
        {props.children}
      </main>
    </>
  );
};

export default Layout;
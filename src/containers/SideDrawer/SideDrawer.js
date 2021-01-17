import React from 'react';

import Backdrop from '../../components/Backdrop/Backdrop';
// import NavManager from '../NavManager/NavManager';

import SideDrawerStyles from './SideDrawer.module.css';

const SideDrawer = props => {
  const { showSideDrawer, closeSideDrawer } = props;
  let sideDrawerStyles = [SideDrawerStyles.SideDrawer, SideDrawerStyles.Hide];

  if (showSideDrawer) sideDrawerStyles = [SideDrawerStyles.SideDrawer, SideDrawerStyles.Show];

  return (
    <>
      <Backdrop 
        showSideDrawer={showSideDrawer} 
        closeSideDrawer={closeSideDrawer} />
      <div className={sideDrawerStyles.join(" ")}>
        {/* <NavManager/> */}
      </div>
    </>
  );
};

export default SideDrawer;
import React from 'react';
import Backdrop from '../../components/Backdrop/Backdrop';
import SideDrawerStyles from './SideDrawer.moduel.css';

const SideDrawer = props => {
  let sideDrawerStyles = [ SideDrawerStyles.SideDrawer, SideDrawerStyles.Hide];

  if (props.show) sideDrawerStyles = [ SideDrawerStyles.SideDrawer, SideDrawerStyles.Show ];

  const { closeSideDrawer } = props;
  return (
    <>
      <div className={sideDrawerStyles.join(" ")}>
        <Backdrop show={props.show} closeSideDrawer={closeSideDrawer}/>
      </div>
    </>
    
  );
};

export default SideDrawer;
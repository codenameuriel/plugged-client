import React from 'react';
import Header from '../../components/Header/Header';

import LayoutStyles from './Layout.module.css';

const layout = props => {
  const { type, title, subtitle } = props;
  return (
    <>
      <Header type={type} title={title} subtitle={subtitle}/>
      <main className={LayoutStyles.Main}>
        {props.children}
      </main>
    </>
  );
};

export default layout;
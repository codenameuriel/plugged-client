import React from 'react';
import Header from '../../components/Header/Header';

const layout = props => {
  const { type, title, subtitle } = props;
  return (
    <>
      <Header type={type} title={title} subtitle={subtitle}/>
      <main>
        {props.children}
      </main>
    </>
  );
};

export default layout;
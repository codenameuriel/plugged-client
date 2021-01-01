import React from 'react';
import Header from '../../components/Header/Header';

const layout = props => {
  const { title, subtitle } = props;
  return (
    <>
      <Header title={title} subtitle={subtitle}/>
      <main>
        {props.children}
      </main>
    </>
  );
};

export default layout;
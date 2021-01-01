import React from 'react';
// import NavManager from '../../containers/NavManager';

const header = props => {
  return (
    <header>
      <h1>{props.title}</h1>
      <p>{props.subtitle ? props.subtitle : null}</p>
      {/* <NavManager /> */}
    </header>
  );
};

export default header;
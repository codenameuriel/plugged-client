import React from 'react';
import NavManager from '../../containers/NavManager/NavManager';

const header = props => {
  const { type } = props;
  return (
    <header>
      <h1>{props.title}</h1>
      <p>{props.subtitle ? props.subtitle : null}</p>
      <NavManager type={type}/>
    </header>
  );
};

export default header;
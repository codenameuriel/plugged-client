import React from 'react';
import NavManager from '../../containers/NavManager/NavManager';
import HeaderStyles from './Header.module.css';

const header = props => {
  const { type } = props;
  return (
    <header className={HeaderStyles.Header}>
      <h1>{props.title}</h1>
      <p>{props.subtitle ? props.subtitle : null}</p>
      <NavManager type={type}/>
    </header>
  );
};

export default header;
import React from 'react';

import DecoratedHeadingStyles from './DecoratedHeading.module.css';

const DecoratedHeading = ({ heading }) => {
  return (
    <h1 className={DecoratedHeadingStyles.H1}>
      <span>
        <hr />
      </span>
      {heading}
      <span>
        <hr />
      </span>
    </h1>
  );
};

export default DecoratedHeading;

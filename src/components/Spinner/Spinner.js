import React from 'react';
import SpinnerStyles from './Spinner.module.css';

const Spinner = () => { 
  return (
    <div className={SpinnerStyles.loader}>
      Loading...
    </div>
  );
};

export default Spinner;
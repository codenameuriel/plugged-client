import React from 'react';

import Button from '../UI/Button/Button';

import SearchStyles from './Search.module.css';

const Search = props => {
  return (
    <div className={SearchStyles.Search}>
      <input type="text"/>
      <Button type={"search"} onClick={null} description={"Search"} />
    </div>
  );
};

export default Search;
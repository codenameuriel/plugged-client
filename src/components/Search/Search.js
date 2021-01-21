import React, { Component } from 'react';

import Button from '../UI/Button/Button';

import SearchStyles from './Search.module.css';

// const search = <input className={DashboardStyles.search} onChange={handleSearchChange} type="text" placeholder="Search news by topic" value={searchTopic} />
    // const searchBtn = <button className={DashboardStyles.submitBtn} onClick={() => {
    //   getTopicNews()
    //   history.push("/dashboard/topic-news")
    // }}>Search</button>

class Search extends Component {
  state = {
    inputValue: ""
  }

  inputChange = event => {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    const { inputValue } = this.state;
    return (
      <div className={SearchStyles.Search}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={this.inputChange}
          placeholder="Search by topic" />
        <Button type={"search"} onClick={null} description={"Search"} />
      </div>
    );
  }
}

export default Search;
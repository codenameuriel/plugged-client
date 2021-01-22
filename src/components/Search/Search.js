import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchTopicArticles } from '../../store/actions/articles';

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

  enterSearch = () => {
    const { inputValue } = this.state;
    const { onFetchTopicArticles, history } = this.props;
    onFetchTopicArticles(inputValue);
    history.push("/topic-news");
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
        <Button 
          type={"search"} 
          onClick={this.enterSearch} 
          description={"Search"} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchTopicArticles: topic => dispatch(fetchTopicArticles(topic))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Search));
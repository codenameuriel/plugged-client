import React, { Component } from 'react';
import * as actionCreators from '../../store/actions/index';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

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

  clearInput = () => {
    this.setState({ inputValue: "" });
  }

  inputChange = event => {
    this.setState({ inputValue: event.target.value });
  }

  handleEnterInput = event => {
    if (event.key === "Enter") {
      this.enterSearch();
    }
  }

  enterSearch = () => {
    const { inputValue } = this.state;
    const { onGetTopicNews, history } = this.props;
    onGetTopicNews(inputValue);
    this.clearInput();
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
          onKeyDown={this.handleEnterInput}
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
    onGetTopicNews: topic => dispatch(actionCreators.getTopicNews(topic))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Search));
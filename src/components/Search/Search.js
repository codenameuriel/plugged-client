import React, { Component } from 'react';
import * as actionCreators from '../../store/actions/index';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Button from '../UI/Button/Button';

import SearchStyles from './Search.module.css';

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
      this.handleEmptyInput(event.target.value);
    }
  }

  handleEmptyInput = input => {
    input ? this.enterSearch() : alert("Must enter a topic!");
  }

  enterSearch = () => {
    const { inputValue } = this.state;
    const { onSetSearchTopic, history } = this.props;
    // onGetTopicNews(inputValue);
    // set topic
    onSetSearchTopic(inputValue);
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
          onClick={() => this.handleEmptyInput(inputValue)} 
          description={"Search"} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetSearchTopic: topic => dispatch(actionCreators.setSearchTopic(topic))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Search));
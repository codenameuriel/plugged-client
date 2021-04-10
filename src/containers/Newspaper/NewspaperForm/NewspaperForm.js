import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';
import { CATEGORIES } from '../../../utils/categories';

import Button from '../../../components/UI/Button/Button';

class NewspaperForm extends React.Component {
  state = {
    newspaperTitle: '',
    categories: [],
    sourceCategory: '',
    allSources: {},
    sources: [],
    topic: '',
    topics: []
  }

  componentDidMount() {
    this.setSources();
  }

  async setSources() {
    const { getSources } = this.props;
    // fetch all sources
    const allSources = await getSources();
    this.setState({ allSources });
  }

  renderNewspaperTitleSelection(title) {
    return (
      <fieldset>
        <legend>Title</legend>
        <input 
          type="text" 
          name="newspaperTitle"
          placeholder='Enter a title'
          onChange={this.handleNewspaperTitleChange}
          value={title} 
          required />
      </fieldset>
    );
  }

  handleNewspaperTitleChange = ({ target: { value, name }}) => {
    this.setState({ [name]: value });
  }

  renderCategoriesSelection(categories) {
    return (
      <fieldset>
        <legend>Categories</legend>
          {CATEGORIES.map(category => {
            const { type } = category;
            return (
              <>
                <label htmlFor={type}>
                  <input
                    onChange={event => this.handleCategoriesSelection(event, categories)}
                    type="checkbox"
                    name={type}
                    value={type} />
                  {type}:
                </label>
                <br />
              </>
            );
          })}
      </fieldset>
    );
  }

  handleCategoriesSelection = ({ target: { checked, value }}, categories) => {
    if (checked) {
      // add category
      this.setState(prevState => {
        return { categories: [...prevState.categories, value] }
      });
    } else {
      // remove category
      const removeCategory = categories.find(category => category === value);
      const updatedCategories = (
        categories.filter(category => category !== removeCategory)
      );
      this.setState({ categories: updatedCategories });
    }
  }

  // creates form to select sources by category
  renderSourceCategoriesSelection(sourceCategory, allSources, selectedSources) {
    return (
      <fieldset>
        <legend>Sources</legend>
        <label htmlFor="sourceCategories">
          Filter by:
          <select 
            name="sourceCategories" 
            onChange={this.handleSourceCategoriesSelection}>
            <option value="Select">Select Category</option>
            {CATEGORIES.map(category => {
              const { type } = category;
              return (
                <option value={type}>{type}</option>
              );
            })}
          </select>
        </label>
        {sourceCategory && this.renderSourceSelection(sourceCategory, allSources, selectedSources)}
      </fieldset>
    );
  }

  // sets the selected category to filter sources by
  handleSourceCategoriesSelection = ({ target: { value }}) => {
    this.setState({ sourceCategory: value });
  }

  renderSourceSelection(sourceCategory, allSources, selectedSources) {
    // format sourceCategory to use as a key
    const category = sourceCategory[0].toLowerCase() + sourceCategory.slice(1);
    // store array of sources
    const sources = allSources[category];
    return (
      <fieldset>
        <legend>{`${sourceCategory} Sources`}</legend>
        {sources.map(source => {
          const { name } = source._doc;
          return (
            <>
              <label htmlFor={name}>
                <input
                  onChange={this.handleSourceSelection}
                  checked={selectedSources.includes(name)}
                  type="checkbox" 
                  name={name} 
                  value={name} />
                {name}
              </label>
              <br />
            </>
          );
        })}
      </fieldset>
    );
  }

  handleSourceSelection = ({ target: { value, checked }}) => {
    if (checked) {
      this.setState(prevState => {
        return { sources: [...prevState.sources, value]}
      });
    } else {
      const { sources } = this.state;
      const updatedSources = sources.filter(source => source !== value);
      this.setState({ sources: updatedSources });
    }
  }

  renderTopicSelection(topic, topics) {
    return (
      <fieldset>
        <legend>Topics</legend>
        <input 
          onChange={this.handleTopicSelectionChange} 
          type="text"
          placeholder={'Enter a topic'} 
          value={topic} />
        <Button description={'Add'} onClick={this.topicSelectionOnClick} />
        {topics.length !== 0 && this.renderSelectedTopics(topics)}
      </fieldset>
    );
  }

  handleTopicSelectionChange = ({ target: { value }}) => {
    this.setState({ topic: value });
  }

  topicSelectionOnClick = event => {
    event.preventDefault();
    // add topic on click of button and clear topic input field
    this.setState(prevState => {
      return { 
        topics: [...prevState.topics, prevState.topic],
        topic: ''
      };
    });
  }

  renderSelectedTopics(topics) {
    return (
      <fieldset>
        <legend>Added Topics</legend>
        {topics.map(topic => {
          return (
            <div>
              <p>{topic}</p>
              <Button 
                description={'Remove'} 
                onClick={event => this.selectedTopicsOnClick(event, topic, topics)} />
            </div>
          );
        })}
      </fieldset>
    );
  }

  selectedTopicsOnClick = (event, currentTopic, topics) => {
    event.preventDefault();
    const removeTopic = topics.find(topic => topic === currentTopic);
    const updatedTopics = topics.filter(topic => topic !== removeTopic);
    this.setState({ topics: updatedTopics });
  }

  handleFormSubmit = (event, state) => {
    // prevent form from reloading page
    event.preventDefault();
    // extract data from state to create a newspaper
    const { newspaperTitle, categories, sources, topics } = state;
    // construct data object to submit via POST request
    const formData = { newspaperTitle, categories, sources, topics };
    this.props.createNewspaper(formData);
  }

  render() {
    const { 
      newspaperTitle, 
      categories, 
      sourceCategory, 
      allSources, 
      sources, 
      topic,
      topics
    } = this.state;

    return (
      <form onSubmit={event => this.handleFormSubmit(event, this.state)}>
        {this.renderNewspaperTitleSelection(newspaperTitle)}
        <br />
        {this.renderCategoriesSelection(categories)}
        <br />
        {this.renderSourceCategoriesSelection(sourceCategory, allSources, sources)}
        <br />
        {this.renderTopicSelection(topic, topics)}
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSources: () => dispatch(actionCreators.getSources()),
    createNewspaper: newspaperData => dispatch(actionCreators.createNewspaper(newspaperData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewspaperForm);
import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';

import { CATEGORIES } from '../../../utils/categories';

class NewspaperForm extends React.Component {
  state = {
    newspaperTitle: '',
    categories: [],
    sourceCategory: '',
    allSources: {},
    sources: []
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
      <label htmlFor="newspaperTitle">
        Newspaper Title:
        <br />
        <input 
          type="text" 
          name="newspaperTitle"
          onChange={this.handleNewspaperTitleChange}
          value={title} 
          required />
      </label>
    );
  }

  handleNewspaperTitleChange = ({ target: { value, name }}) => {
    this.setState({ [name]: value });
  }

  renderCategoriesSelection(categories) {
    return (
      <fieldset>
        <legend>Select Categories</legend>
          {CATEGORIES.map(category => {
            const { type } = category;
            return (
              <>
                <label htmlFor={type}>
                  {type}:
                  <input
                    onChange={event => this.handleCategoriesSelection(event, categories)}
                    type="checkbox"
                    name={type}
                    value={type} />
                </label>
                <br />
              </>
            );
          })}
      </fieldset>
    );
  }

  handleCategoriesSelection = ({ target: { checked, value }}, categories) => {
    // add category
    if (checked) this.setState(prevState => {
      return { categories: [...prevState.categories, value] }
    });
    // remove category
    else {
      const removeCategory = categories.find(category => category === value);
      const updatedCategories = (
        categories.filter(category => category !== removeCategory)
      );
      this.setState({ categories: updatedCategories });
    }
  }

  // creates form to select sources by category
  renderSourceCategoriesSelection() {
    return (
      <label htmlFor="sourceCategories">
        Select Sources by Category:
        <br />
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
    );
  }

  // sets the selected category to filter sources by
  handleSourceCategoriesSelection = ({ target: { value }}) => {
    this.setState({ sourceCategory: value });
  }

  renderSourceSelection(selectedSources) {
    const { sourceCategory, allSources } = this.state;
    // format sourceCategory to use as a key
    const category = sourceCategory[0].toLowerCase() + sourceCategory.slice(1);
    // store array of sources
    const sources = allSources[category];
    return sources.map(source => {
      const { name } = source._doc;
      return (
        <>
          <label htmlFor={name}>
            {name}:
            <input
              onChange={this.handleSourceSelection}
              checked={selectedSources.includes(name)}
              type="checkbox" 
              name={name} 
              value={name} />
          </label>
          <br />
        </>
      );
    });
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

  render() {
    const { newspaperTitle, categories, sourceCategory, sources } = this.state;
    return (
      <form onSubmit={null}>
        {this.renderNewspaperTitleSelection(newspaperTitle)}
        <br />
        {this.renderCategoriesSelection(categories)}
        <br />
        {this.renderSourceCategoriesSelection()}
        <br />
        {sourceCategory && this.renderSourceSelection(sources)}
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
    getSources: () => dispatch(actionCreators.getSources()) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewspaperForm);
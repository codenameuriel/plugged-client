import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';

import { CATEGORIES } from '../../../utils/categories';

class NewspaperForm extends React.Component {
  state = {
    newspaperTitle: '',
    categories: [],
    sourceCategory: '',
    sources: {}
  }

  componentDidMount() {
    this.setSources();
  }

  async setSources() {
    const { getSources } = this.props;
    // fetch all sources
    const sources = await getSources();
    this.setState({ sources: sources });
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
    if (checked) this.setState({ categories: [...categories, value] });
    // remove category
    else {
      const removeCategory = categories.find(category => category === value);
      this.setState({ 
        categories: categories.filter(category => category !== removeCategory)
      });
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

  render() {
    const { newspaperTitle, categories } = this.state;
    return (
      <form action="" onSubmit={null}>
        {this.renderNewspaperTitleSelection(newspaperTitle)}
        <br />
        {this.renderCategoriesSelection(categories)}
        <br />
        {this.renderSourceCategoriesSelection()}
        <br />
        {}
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
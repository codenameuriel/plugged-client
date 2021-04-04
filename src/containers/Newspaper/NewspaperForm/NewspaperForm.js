import React from 'react';

import { CATEGORIES } from '../../../utils/categories';

class NewspaperForm extends React.Component {
  state = {
    newspaperTitle: '',
    categories: []
  }

  renderCategoriesSelection(categories) {
    console.log(categories);
    return (
      <fieldset>
        <label htmlFor="categories">
          Select Categories:
          <br />
          {CATEGORIES.map(category => {
            const { type } = category;
            return (
              <>
                <label htmlFor={type}>
                  {type}:
                  <input
                    onChange={event => this.handleCategoriesCheckbox(event, categories)}
                    type="checkbox"
                    name={type}
                    value={type} />
                </label>
                <br />
              </>
            );
          })}
        </label>
      </fieldset>
    );
  }

  handleCategoriesCheckbox = ({ target: { checked, value }}, categories) => {
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

  renderSourcesSelection() {
    return (
      <label htmlFor="sources">
        Select Sources by Category:
        <select name="sources" onChange={null}>
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
        {this.renderSourcesSelection()}
      </form>
    );
  }
}

export default NewspaperForm;
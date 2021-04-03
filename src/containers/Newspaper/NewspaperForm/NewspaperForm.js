import React from 'react';

import { CATEGORIES } from '../../../utils/categories';

class NewspaperForm extends React.Component {
  state = {
    newspaperTitle: ''
  }

  renderCategorySelection() {
    return (
      <fieldset onChange={null}>
        <label htmlFor="categories">
          Select Categories:
          <br />
          {CATEGORIES.map(category => {
            const { type } = category;
            return (
              <>
                <label htmlFor="categories">
                  {type}:
                  <input 
                    type="checkbox"
                    name="categories"
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
    const { newspaperTitle } = this.state;
    return (
      <form action="" onSubmit={null}>
        {this.renderNewspaperTitleSelection(newspaperTitle)}
        <br />
        {this.renderCategorySelection()}
        <br />
        {this.renderSourcesSelection()}
      </form>
    );
  }
}

export default NewspaperForm;
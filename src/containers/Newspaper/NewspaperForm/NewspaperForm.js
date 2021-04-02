import React from 'react';

class NewspaperForm extends React.Component {
  state = {
    newspaperTitle: ''
  }

  renderCategorySelection() {

    return (
      <fieldset onChange={null}>

      </fieldset>
    );
  }


  render() {
    const { newspaperTitle } = this.state;
    return (
      <form action="" onSubmit={null}>
        <label htmlFor="newspaperTitle">
          Newspaper Title:
          <br />
          <input 
            type="text" 
            name="newspaperTile"
            onChange={null}
            value={newspaperTitle} 
            required />
        </label>
        <br />
        {this.renderCategorySelection()}
      </form>
    );
  }
}

export default NewspaperForm;
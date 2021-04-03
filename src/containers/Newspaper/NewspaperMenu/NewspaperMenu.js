import React from 'react';

import Layout from '../../../hoc/Layout/Layout';
import Button from '../../../components/UI/Button/Button';
import NewspaperForm from '../NewspaperForm/NewspaperForm';

class NewspaperMenu extends React.Component {
  state = {
    type: 'newspaper-menu',
    title: 'Newspaper Menu',
    subtitle: 'Create and customize your news feed',
    viewForm: false
  }

  toggleFormView = () => {
    this.setState(prevState => ({ viewForm: !prevState.viewForm }));
  }

  render() {
    const { title, subtitle, type, viewForm } = this.state;
    return (
      <Layout title={title} subtitle={subtitle} type={type}>
        <Button onClick={this.toggleFormView} description={viewForm ? 'Close' : 'Build a newspaper'} />
        {viewForm && <NewspaperForm />}
      </Layout>
    );
  }
}

export default NewspaperMenu;
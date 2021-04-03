import React from 'react';

import Layout from '../../../hoc/Layout/Layout';
import NewspaperForm from '../NewspaperForm/NewspaperForm';

class NewspaperMenu extends React.Component {
  state = {
    type: 'newspaper-menu',
    title: 'Newspaper Menu',
    subtitle: 'Create and customize your news feed'
  }

  render() {
    const { title, subtitle, type } = this.state;
    return (
      <Layout title={title} subtitle={subtitle} type={type}>
        <NewspaperForm />
      </Layout>
    );
  }
}

export default NewspaperMenu;
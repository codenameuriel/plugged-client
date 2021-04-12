import React from 'react';
import { connect } from 'react-redux';

import Layout from '../../../hoc/Layout/Layout';
import Button from '../../../components/UI/Button/Button';
import NewspaperForm from '../NewspaperForm/NewspaperForm';
import NewspaperCard from '../NewspaperCard/NewspaperCard';

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

  renderNewspapers() {
    const { newspapers } = this.props;
    
    // content for when a user has no created newspapers
    if (newspapers.length === 0) {
      return <p>Get started by creating a newspaper!</p>;
    }

    // content for created newspapers
    return (
      <section>
        {newspapers.map(newspaper => <NewspaperCard newspaper={newspaper} />)}
      </section>
    );
  }

  render() {
    const { title, subtitle, type, viewForm } = this.state;
    return (
      <Layout title={title} subtitle={subtitle} type={type}>
        <Button onClick={this.toggleFormView} description={viewForm ? 'Close' : 'Build a newspaper'} />
        {viewForm && <NewspaperForm />}
        {this.renderNewspapers()}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    newspapers: state.newspaper.newspapers
  };
};

export default connect(mapStateToProps)(NewspaperMenu);

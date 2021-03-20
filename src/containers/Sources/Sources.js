import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

import Layout from '../../hoc/Layout/Layout';
import SourceCard from '../../components/SourceCard/SourceCard';
import Loader from '../../components/Loader/Loader';

class Sources extends React.Component {
  state = {
    title: 'Sources',
    subtitle: 'View your news by sources',
    type: 'sources',
    sources: null
  }

  componentDidMount() {
    this.setSources();
  }

  async setSources() {
    this.setState({ sources: await this.props.getSources() });
  }

  renderSources() {
    const { sources } = this.state;
    const { setSourcesParam } = this.props;
    const sourceCards = [];

    for(const [category, sourceArr] of Object.entries(sources)) {
      sourceCards.push(
        <SourceCard 
          category={category} 
          sources={sourceArr} 
          setSourcesParam={setSourcesParam} />
      );
    }

    return sourceCards;
  }

  renderContent() {
    const { sources } = this.state;
    if (sources) return this.renderSources();
    else return <Loader />;
  }

  render() {
    const { title, subtitle, type } = this.state;
    
    return (
      <Layout title={title} subtitle={subtitle} type={type}>
        <div>
          {this.renderContent()}
        </div>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSources: () => dispatch(actionCreators.getSources()),
    setSourcesParam: source => dispatch(actionCreators.setSourcesParam(source))
  };
};

export default connect(null, mapDispatchToProps)(Sources);

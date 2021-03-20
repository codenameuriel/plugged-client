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
    const sourceCards = [];
    for(const [category, sourceArr] of Object.entries(sources)) {
      console.log(category, sourceArr);
      sourceCards.push(<SourceCard category={category} sources={sourceArr} />);
    }
    return sourceCards;
  }

  renderContent() {
    const { sources } = this.state;
    if (sources) return this.renderSources();
    else return <Loader />;
  }

  // renderSources = category => {
  //   const { getSourceNews, history } = this.props

  //   return (
  //     <div className={SourcesStyles.container} >
  //       {this.state[category].map(source => {
  //         return (
  //           <div className={SourcesStyles.sourceCard} >
  //             <div className={SourcesStyles.info} >
  //               <h4 
  //                 className={SourcesStyles.h4}
  //                 onClick={() => {
  //                 getSourceNews(source.name)
  //                 history.push(`/source-news/${source.name.toLowerCase()}`)
  //                 }}>{source.name}</h4>
  //                 <img
  //                   onClick={() => {
  //                     getSourceNews(source.name)
  //                     history.push(`/source-news/${source.name.toLowerCase()}`)
  //                   }} 
  //                   className={SourcesStyles.img} 
  //                   src={source.image_url || Plug} alt="News"/>
  //               <p>{source.description}</p>
  //               <a className={SourcesStyles.a} target="_blank" rel="noopener noreferrer" href={source.url}>{source.url}</a>
  //             </div>
  //           </div>
  //         )
  //       })}
  //     </div>
  //   )
  // }

  // renderDisplay = () => {
  //   const { loggedInUser, links } = this.props
  //   let display;

  //   if (loggedInUser.username) {
  //     display = 
  //       <>
  //         <header className={SourcesStyles.header} >
  //           <h1>Sources</h1>
  //           <p>Search your news by sources</p>
  //         </header>
  //         <Nav links={links} />
  //         <div>
  //           <h2 className={SourcesStyles.h2} >Business</h2>
  //           {this.renderSources("business")}
  //           <h2 className={SourcesStyles.h2} >Entertainment</h2>
  //           {this.renderSources("entertainment")}
  //           <h2 className={SourcesStyles.h2} >General</h2>
  //           {this.renderSources("general")}
  //           <h2 className={SourcesStyles.h2} >Health</h2>
  //           {this.renderSources("health")}
  //           <h2 className={SourcesStyles.h2} >Science</h2>
  //           {this.renderSources("science")}
  //           <h2 className={SourcesStyles.h2} >Sports</h2>
  //           {this.renderSources("sports")}
  //           <h2 className={SourcesStyles.h2} >Technology</h2>
  //           {this.renderSources("technology")}
  //         </div>
  //       </>
  //   } else {
  //     display = 
  //       <>
  //         <h5 className={SourcesStyles.h5} ><Link className={SourcesStyles.link} to="/login">Log in</Link> to see your news by sources</h5>
  //       </>
  //   }
  //   return display
  // }

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
    getSources: () => dispatch(actionCreators.getSources())
  };
};

export default connect(null, mapDispatchToProps)(Sources);

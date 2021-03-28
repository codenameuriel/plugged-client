import React from 'react';
import { withRouter } from 'react-router';

import DecoratedHeading from '../UI/DecoratedHeading/DecoratedHeading';
import SourceCardStyles from './SourceCard.module.css';

const SourceCard = ({ category, sources, setSourcesParam, history }) => {
  const redirectToSourceNews = source => {
    const formattedSource = formatSourceName(source);
    console.log(formattedSource);
    setSourcesParam(formattedSource);
    history.push(`/sources/${formattedSource}`);
  };

  const renderSources = sources => {
    return sources.map(source => {
      const { image, _doc: { name, description, url }} = source;

      return (
        <div className={SourceCardStyles.SourceCard}>
          <img
            onClick={() => redirectToSourceNews(name)}
            src={`data:image/${'png'};base64,${image}`} 
            alt={`${name}`} />
          <p>{description}</p>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer">{formatUrl(url)}</a>
        </div>
      );
    });
  };

  return (
    <section className={SourceCardStyles.SourceSection}>
      <DecoratedHeading heading={formatCategory(category)} />
      <div className={SourceCardStyles.SourceCards}>
        {renderSources(sources)}
      </div>
    </section>
  );
};

export default withRouter(SourceCard);

const formatCategory = category => {
  return category[0].toUpperCase() + category.slice(1);
};

const formatUrl = url => {
  let splitUrl;
  splitUrl = (
    url.startsWith('http://') ? url.split('http://') : url.split('https://')
    );
  let urlString = splitUrl[1];

  if (!urlString.startsWith('www.')) urlString = `www.${urlString}`;
  
  return urlString;
};

const formatSourceName = source => {
  const pattern = /\s/g;
  return source.toLowerCase().replace(pattern, '-');
};

import React from 'react';
import NewspaperCardStyles from './NewspaperCard.module.css';

const NewspaperCard = props => {
  // extract newspaper data
  const { newspaper: { title, categories, sources, topics }} = props;

  // render newspaper data
  const renderNewspaperSection = (newspaperData, property) => {
    // newspaperData will be represented as an array e.g. array of categories
    return (
      <section>
        {newspaperData.map(section => {
          return (
            <p className={NewspaperCardStyles.Name}>{section[property]}</p>
          );
        })}
      </section>
    );
  };
  
  return (
    <div className={NewspaperCardStyles.NewspaperCard}>
      <h1>The {title} Newspaper</h1>
      <h2>Categories</h2>
      {renderNewspaperSection(categories, 'category')}
      <h2>Sources</h2>
      {renderNewspaperSection(sources, 'source')}
      <h2>Topics</h2>
      {renderNewspaperSection(topics, 'topic')}
    </div>
  );
};

export default NewspaperCard;
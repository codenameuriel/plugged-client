import React from 'react';

const NewspaperCard = props => {
  // extract newspaper data
  const { newspaper: { title, categories, sources, topics }} = props;

  // render newspaper data
  const renderNewspaperSection = newspaperData => {
    // newspaperData will be represented as an array e.g. array of categories
    return (
      <section>
        {newspaperData.map(section => {
          return <p>{section}</p>;
        })}
      </section>
    );
  };

  return (
    <div>
      <h1>The {title} Newspaper</h1>
      <h2>Categories</h2>
      {renderNewspaperSection(categories)}
      <h2>Sources</h2>
      {renderNewspaperSection(sources)}
      <h2>Topics</h2>
      {renderNewspaperSection(topics)}
    </div>
  );
};

export default NewspaperCard;
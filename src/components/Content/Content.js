import React from 'react';
import NewsCard from '../../components/NewsCard';

const content = props => {
  const { articles } = props;

  return articles ? articles.map((article, index) => {
    // return <ArticleCard {...article} key={index}/>;
    return <NewsCard {...article} key={index}/>;
  }) : null;
};

export default content;
import React from 'react';

const ProductLabel = ({type}) => {

  if (type === 'none') {
    return;
  }

  return (
    <span className={`product-label ${type}`}>
      {type === 'popular' && 'Хит'}
      {type === 'new' && 'Новинка'}
      {type === 'sale' && 'Распродажа'}
    </span>
  );
};

export default ProductLabel;

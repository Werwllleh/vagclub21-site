import React from 'react';

const ProductLabel = ({type}) => {
  return (
    <span className={`product-label ${type}`}>
      {type === 'popular' && 'Хит'}
      {type === 'new' && 'Новинка'}
      {type === 'sale' && 'Распродажа'}
    </span>
  );
};

export default ProductLabel;

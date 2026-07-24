import React from 'react';

const ProductsEmpty = () => {
  return (
    <div className="product-empty">
      <img loading="lazy" decoding="async" src="/images/products-empty.webp" alt="Список товаров пуст"/>
      <p>Кажется товары еще не завезли, приходите позже</p>
    </div>
  );
};

export default ProductsEmpty;

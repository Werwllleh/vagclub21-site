'use client'
import React from 'react';
import Link from "next/link";

const ProductItem = ({product}) => {

  console.log(product);

  return (
    <div className="product-item">
      <div className="product-item__body">
        <div className="product-item__images"></div>
        <div className="product-item__status"></div>
        <div className="product-item__info">
          <h4 className="product-item__title">{product.title}</h4>
          <span className="product-item__price">{product.price}</span>
        </div>
        <Link className="product-item__link" href={`/products/${product.slug}`} />
      </div>
    </div>
  );
};

export default ProductItem;

'use client'
import React from 'react';
import Link from "next/link";
import ProductLabel from "@/components/product-label";


const ProductItem = ({info}) => {

  const link = `/products/${info?.type}/${info?.slug}` || '/products';

  return (
    <div className="product-item white-block">
      {info?.mark && <ProductLabel type={info.mark} />}
      <div className="product-item__body">
        <div className="product-item__image">
          {info?.mainImage?.url ? <img src={info?.mainImage?.url} alt={info.name}/> : null}
          <Link href={link}/>
        </div>
        <div className="product-item__info">
          {info?.pricing ? (
            <div className="product-item__price">
              <span className="current">{info.pricing?.price}₽</span>
              {info.pricing?.oldPrice ? (
                <>
                  <span className="old">{info.pricing.oldPrice}₽</span>
                  <span
                    className="percent">-{Math.ceil(100 - (info.pricing.price / info.pricing.oldPrice) * 100)}%</span>
                </>
              ) : null}
            </div>
          ) : null}
          <Link href={link} className="product-item__name">
            <h3>{info.name}</h3>
          </Link>
        </div>
        <div className="product-item__footer">
          <Link className="btn primary m product-item__link" href={link}>
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

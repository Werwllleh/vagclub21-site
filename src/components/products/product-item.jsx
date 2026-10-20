'use client'
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import ProductLabel from "@/components/products/product-label";


const ProductItem = ({info}) => {

  const link = `/products/${info?.type}/${info?.slug}` || '/products';

  return (
    <div className="product-item white-block">
      {info?.mark && <ProductLabel type={info.mark} />}
      <div className="product-item__body">
        <div className="product-item__image">
          {info?.mainImage?.url ? (
            <Image
              loading="lazy"
              src={info.mainImage.url}
              alt={info.name || 'Товар'}
              width={350}
              height={350}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
              style={{width: '100%', height: '100%', objectFit: 'contain'}}
            />
          ) : null}
          <Link href={link}/>
        </div>
        <div className="product-item__info">
          <Link href={link} className="product-item__name">
            <h3>{info.name}</h3>
          </Link>
          {info?.pricing ? (
            <div className="product-item__price">
              <span className="current">{info.pricing?.price}₽</span>
              {info.pricing?.oldPrice ? (
                <>
                  <span className="old">{info.pricing.oldPrice}₽</span>
                  <span className="percent">
                    -{Math.ceil(100 - (info.pricing.price / info.pricing.oldPrice) * 100)}%
                  </span>
                </>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="product-item__footer">
          <Link className="btn default m product-item__link" href={link}>
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

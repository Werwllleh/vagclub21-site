'use client'
import React, {useEffect} from 'react';
import {useProductsTypes} from "@/hooks/useProducts";
import Loading from "@/app/loading";
import {PRODUCT_TYPE} from "@/constants";
import ProductItem from "@/components/products/product-item";

const ProductList = ({type}) => {

  if (!type) return <Loading/>;

  const {data, isLoading} = useProductsTypes(type);

/*  useEffect(() => {
    console.log(data)
  }, [data]);*/


  return (
    <div className="product-list ppt ppb">
      <div className="product-list__container container">
        {isLoading && !data?.items && !data?.items?.length ? <Loading/> : null}
        {!isLoading && data.items ? (
          data.items.length ? (
            <div className="product-list__body">
              <h1 className="product-list__title h1">
                {data.type === PRODUCT_TYPE.STICKERS && 'Наклейки'}
                {data.type === PRODUCT_TYPE.FLAVOURS && 'Ароматизаторы'}
                {data.type === PRODUCT_TYPE.MERCH && 'Одежда'}
                {data.type === PRODUCT_TYPE.FRAMES && 'Номерные рамки'}
              </h1>
              <div className="product-list__grid">
                {data.items.map((item) => <ProductItem key={item.id} info={item} />)}
              </div>
            </div>
          ) : (
            <div className="product-list__empty">
              NO ITEMS
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default ProductList;

'use client'
import React from 'react';
import {useProductsTypes} from "@/hooks/useProducts";
import Loading from "@/app/loading";
import {PRODUCT_TYPE} from "@/constants";
import ProductItem from "@/components/products/product-item";
import ProductsEmpty from "@/components/products/products-empty";
import AnimateSection from "@/components/blocks/animate-section";

const ProductList = ({type}) => {

  if (!type) return <Loading/>;

  const {data, isLoading} = useProductsTypes(type);

  return (
    <div className="product-list ppt ppb">
      <div className="product-list__container container">
        {isLoading && !data?.items?.length && <Loading/>}
        {!isLoading && data?.items && (
          <AnimateSection>
            <div className="product-list__body">
              <h1 className="product-list__title h1">
                {data.type === PRODUCT_TYPE.STICKERS && 'Наклейки'}
                {data.type === PRODUCT_TYPE.FLAVOURS && 'Ароматизаторы'}
                {data.type === PRODUCT_TYPE.MERCH && 'Одежда'}
                {data.type === PRODUCT_TYPE.FRAMES && 'Номерные рамки'}
              </h1>
              {!!data.items?.length ? (
                <div className="product-list__grid">
                  {data.items.map((item) => <ProductItem key={item.id} info={item}/>)}
                </div>
              ) : (
                <div className="product-list__empty">
                  <ProductsEmpty/>
                </div>
              )}
            </div>
          </AnimateSection>
        )}
      </div>
    </div>
  );
};

export default ProductList;

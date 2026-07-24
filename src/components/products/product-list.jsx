'use client'
import React from 'react';
import {useProductsTypes} from "@/hooks/useProducts";
import Loading from "@/components/loading";
import {PRODUCT_TYPE} from "@/constants";
import ProductItem from "@/components/products/product-item";
import ProductsEmpty from "@/components/products/products-empty";
import AnimateSection from "@/components/blocks/animate-section";
import H1 from "@/components/UI/h1";

const ProductList = ({type, initialData = null}) => {

  if (!type) return <Loading/>;

  const {data, isLoading} = useProductsTypes(type, initialData);

  return (
    <div className="product-list ppt ppb">
      <div className="product-list__container container">
        {isLoading && !data?.items?.length && <Loading/>}
        {!isLoading && data?.items && (
          <AnimateSection>
            <div className="product-list__body">
              <H1>
                {data.type === PRODUCT_TYPE.STICKERS && 'Наклейки'}
                {data.type === PRODUCT_TYPE.FLAVOURS && 'Ароматизаторы'}
                {data.type === PRODUCT_TYPE.MERCH && 'Одежда'}
                {data.type === PRODUCT_TYPE.FRAMES && 'Номерные рамки'}
              </H1>
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

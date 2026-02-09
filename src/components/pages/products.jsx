'use client'
import ProductsFilter from "@/components/products/products-filter";
import {useProducts} from "@/hooks/useProducts";
import ProductItem from "@/components/products/product-item";
import Loader from "@/components/loader";
import React from "react";
import Products from "@/components/pages/products/products";

const ProductsPage = () => {

  const {isLoading, products} = useProducts();

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="products-page__title h1">Атрибутика</h1>
        <div className="products-page__content">
          <Products />
        </div>
      </div>
    </div>
  );
};
{/*<div className="products-page__filter">
            <ProductsFilter/>
          </div>*/}
{/*{isLoading ? <Loader /> : (
              <>
                {products?.length ? (
                  <>
                    {products.map((product) => <ProductItem key={product.documentId} product={product} />)}
                  </>
                ) : 'No products'}
              </>
            )}*/}

export default ProductsPage;

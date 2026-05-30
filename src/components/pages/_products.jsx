'use client'
import ProductTypes from "@/components/products/products-types";
import {useProducts} from "@/hooks/useProducts";
import Loading from "@/app/loading";
import ProductItem from "@/components/products/product-item";
import AnimateSection from "@/components/blocks/animate-section";

const ProductsPage = () => {

  const {data, isLoading} = useProducts();

  return (
    <div className="products ppt ppb">
      <div className="container">
        <h1 className="products__title h1">Атрибутика</h1>
        {isLoading && !data?.products?.length && <Loading/>}
        {!isLoading && (
          <AnimateSection>
            <div className="products__content">
              <ProductTypes/>
            </div>
            {!!data.products.length && (
              <div className="products-all-list">
                <p className="products-all-list__title h3">Все товары</p>
                <div className="products-all-list__grid">
                  {data?.products?.map((item) => (
                    <ProductItem key={item.id} info={item}/>
                  ))}
                </div>
              </div>
            )}
          </AnimateSection>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

'use client'
import ProductTypes from "@/components/products/products-types";
import {useProducts} from "@/hooks/useProducts";
import Loading from "@/components/loading";
import ProductItem from "@/components/products/product-item";
import AnimateSection from "@/components/blocks/animate-section";
import H1 from "@/components/UI/h1";

const ProductsPage = ({initialData = null}) => {

  const {data, isLoading} = useProducts(initialData);

  return (
    <div className="products ppt ppb">
      <div className="container">
        <H1 className="products__title pageTitle">Атрибутика</H1>
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

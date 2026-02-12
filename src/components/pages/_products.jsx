'use client'
import ProductTypes from "@/components/products/products-types";
import {useProducts} from "@/hooks/useProducts";
import Loading from "@/app/loading";
import ProductItem from "@/components/products/product-item";

const ProductsPage = () => {

  const {data, isLoading} = useProducts();

  return (
    <div className="products ppt ppb">
      <div className="container">
        <h1 className="products__title h1">Атрибутика</h1>
        <div className="products__content">
          <ProductTypes/>
        </div>
        {isLoading && !data?.products?.length < 0 ? <Loading/> : (
          <>
            {data.products && !!data.products.length ? (
              <div className="products-all-list">
                <p className="products-all-list__title h3">Все товары</p>
                <div className="products-all-list__grid">
                  {data?.products?.map((item) => (
                    <ProductItem key={item.id} info={item}/>
                  ))}
                </div>
              </div>
            ) : <Loading/>}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

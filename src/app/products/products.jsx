'use client'
import ProductsFilter from "@/components/products/products-filter";
import {useProducts} from "@/hooks/useProducts";
import ProductItem from "@/components/products/product-item";
import Loader from "@/components/loader";

const Products = () => {

  const {isLoading, products} = useProducts();

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="products-page__title">Клубная атрибутика</h1>
        <div className="products-page__grid">
          <div className="products-page__filter">
            <ProductsFilter/>
          </div>
          <div className="products-page__content">
            {isLoading ? <Loader /> : (
              <>
                {products.length ? (
                  <>
                    {products.map((product) => <ProductItem key={product.documentId} product={product} />)}
                  </>
                ) : 'No products'}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

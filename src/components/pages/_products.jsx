'use client'
import ProductsTypes from "@/components/pages/products/products";

const ProductsPage = () => {

  return (
    <div className="products">
      <div className="container">
        <h1 className="products__title h1">Атрибутика</h1>
        <div className="products__content">
          <ProductsTypes />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

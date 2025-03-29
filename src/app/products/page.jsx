import React from 'react';
import Products from "@/app/products/products";

export const metadata = {
  title: 'Клубная атрибутика VagClub21'
}

const ProductsPage = () => {
  return (
    <div className="page">
      <Products />
    </div>
  );
};

export default ProductsPage;

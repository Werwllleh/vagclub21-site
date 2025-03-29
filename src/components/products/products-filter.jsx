'use client'
import React from 'react';
import { useProductsTypes} from "@/hooks/useProducts";
import {Checkbox} from "antd";

const ProductsFilter = () => {

  const {isLoading, types} = useProductsTypes();

  console.log(types);

  const onChange = e => {
    console.log(`checked = ${e.target.value}`);
  };

  return (
    <div className="products-filter">
      <div className="products-filter__body">
        <div className="products-filter__categories">
          <h4>Категории</h4>
          {!!types?.length && types.map((type) => (
            <Checkbox key={type} value={type} onChange={onChange}>{type}</Checkbox>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsFilter;

"use client"
import Link from "next/link";
import {productsTypes} from "@/data/content";

const ProductTypes = () => {

  return (
    <div className="product-types">
      {productsTypes && !!productsTypes.length && (
        <ul className="product-types__list">
          {productsTypes.map((product) => {
            return (
              <li
                key={product.title}
                className={`product-types__item ${!product.active === true ? 'disabled' : ''}`}
                title={product.title}
              >
                {product.image ? (
                  <div className="product-types__image">
                    <img src={`/images/products/${product.image}`} alt=""/>
                  </div>
                ) : (
                  <div className="product-types__noimage">
                    No photo
                  </div>
                )}
                {product.title && (
                  <h5 className="product-types__title">{product.title}</h5>
                )}
                {product.active ? (
                  <Link className="product-types__link" href={`/products${product.url}`}/>
                ) : (
                  <div className="product-types__bg">
                    <span>{product.label}</span>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  );
};

export default ProductTypes;

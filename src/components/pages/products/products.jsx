"use client"
import {products} from "@/data/products";
import Link from "next/link";

const Products = () => {

  return (
    <div className="products">
      {!!products.length && (
        <ul className="products__list">
          {products.map((product) => {
            return (
              <li key={product.title} className="products__item">
                {product.image ? (
                  <div className="products__item_image">
                    <img src={`/images/products/${product.image}`} alt=""/>
                  </div>
                ) : (
                  <div className="products__item_noimage">
                    No photo
                  </div>
                )}
                {product.title && (
                  <h5 className="products__item_title">{product.title}</h5>
                )}
                {product.active && (
                  <Link className="products__item_link" href={`/products${product.url}`}/>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  );
};

export default Products;
